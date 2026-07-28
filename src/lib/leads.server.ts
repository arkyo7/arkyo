import type { LeadPayload } from "@/data/contact";
import { MAX_PAYLOAD_CHARS, MIN_FILL_MS, leadPayloadSchema } from "@/data/contact";
import {
  buildCustomerEmail,
  buildInternalEmail,
  type LeadEmailData,
  type Locale,
} from "./email/lead-emails.server";
import { sendEmail, type EmailSendResult } from "./email/resend.server";

export type SaveLeadResult =
  | { ok: true; duplicate?: boolean }
  | { ok: false; reason: "spam" | "rate_limited" | "error" };

/** Rate limiting: at most RATE_LIMIT_MAX submissions per IP per window. */
const RATE_LIMIT_WINDOW_MS = Number(process.env.LEAD_RATE_LIMIT_WINDOW_MS ?? 60 * 60 * 1000);
const RATE_LIMIT_MAX = Number(process.env.LEAD_RATE_LIMIT_MAX ?? 5);
/** Retention for the throttle ledger and for idempotency reuse. */
const THROTTLE_TTL_MS = Number(process.env.LEAD_THROTTLE_TTL_MS ?? 24 * 60 * 60 * 1000);

type Admin = Awaited<
  typeof import("@/integrations/supabase/client.server")
>["supabaseAdmin"] extends infer T
  ? T
  : never;

async function admin(): Promise<Admin> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin as Admin;
}

function nullify(value?: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}

/**
 * Salted, irreversible fingerprint of the caller IP. The raw IP is never
 * stored or logged; the hash exists only to enforce the submission rate limit
 * and is deleted after THROTTLE_TTL_MS.
 */
async function hashIp(ip: string): Promise<string> {
  const salt = process.env.LEAD_RATE_LIMIT_SALT ?? "arkyo-lead-throttle";
  const bytes = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function isRateLimited(db: Admin, ip: string | null): Promise<boolean> {
  if (!ip) return false;
  const ipHash = await hashIp(ip);
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  const { count, error } = await db
    .from("lead_throttle")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (error) return false; // never block a legitimate visitor on infra failure

  if ((count ?? 0) >= RATE_LIMIT_MAX) return true;

  await db.from("lead_throttle").insert({ ip_hash: ipHash });
  // Opportunistic cleanup keeps the ledger (and the IP hashes) short-lived.
  await db
    .from("lead_throttle")
    .delete()
    .lt("created_at", new Date(Date.now() - THROTTLE_TTL_MS).toISOString());
  return false;
}

function statusPatch(prefix: "internal" | "customer", result: EmailSendResult, attempts: number) {
  return {
    [`${prefix}_email_status`]: result.status,
    [`${prefix}_email_attempts`]: attempts,
    [`${prefix}_email_sent_at`]: result.status === "sent" ? new Date().toISOString() : null,
    [`${prefix}_email_provider_id`]: result.status === "sent" ? result.providerId : null,
    [`${prefix}_email_error`]: result.status === "sent" ? null : result.error,
  } as Record<string, unknown>;
}

async function dispatchEmails(db: Admin, leadId: string, lead: LeadEmailData) {
  // Emails must never undo a successfully stored lead: each result is recorded
  // independently and failures are kept for a controlled retry.
  for (const [prefix, message] of [
    ["internal", buildInternalEmail(lead)],
    ["customer", buildCustomerEmail(lead)],
  ] as const) {
    let result: EmailSendResult;
    try {
      result = await sendEmail(message);
    } catch {
      result = { status: "failed", error: "unexpected_error", permanent: false };
    }

    console.info(
      `[leads] ${prefix} email ${result.status} submission=${lead.submissionId}` +
        (result.status === "sent" ? ` provider=${result.providerId ?? "unknown"}` : ` reason=${result.error}`),
    );

    const { error } = await db
      .from("leads")
      .update(statusPatch(prefix, result, 1))
      .eq("id", leadId);
    if (error) console.error(`[leads] status update failed step=${prefix}: ${error.code}`);
  }
}

export async function saveLead(input: unknown, ip: string | null): Promise<SaveLeadResult> {
  // 1) Payload size + full server-side re-validation (never trust the client).
  if (JSON.stringify(input ?? "").length > MAX_PAYLOAD_CHARS) {
    return { ok: false, reason: "error" };
  }

  const parsed = leadPayloadSchema.safeParse(input);
  if (!parsed.success) return { ok: false, reason: "error" };
  const payload: LeadPayload = parsed.data;

  // 2) Spam heuristics: honeypot (silent accept) and minimum fill time.
  if (payload.honeypot && payload.honeypot.length > 0) return { ok: true };
  if (payload.elapsedMs < MIN_FILL_MS) return { ok: false, reason: "spam" };

  const db = await admin();

  // 3) Rate limit before any costly work.
  if (await isRateLimited(db, ip)) {
    console.info(`[leads] rate limited submission=${payload.submissionId}`);
    return { ok: false, reason: "rate_limited" };
  }

  const createdAt = new Date().toISOString();
  const row = {
    name: payload.name.trim(),
    company: nullify(payload.company),
    phone: payload.phone.trim(),
    email: payload.email.trim().toLowerCase(),
    instagram: nullify(payload.instagram),
    project_type: payload.projectType,
    package: nullify(payload.package),
    budget: payload.budget,
    deadline: payload.deadline,
    message: payload.message.trim(),
    consent: true,
    language: payload.language,
    status: "new",
    submission_id: payload.submissionId,
  };

  // 4) Store the lead. The unique index on submission_id makes the insert
  //    idempotent: a replayed submission never creates a second lead nor
  //    re-sends emails.
  const { data, error } = await db.from("leads").insert(row).select("id").single();

  if (error) {
    if (error.code === "23505") {
      console.info(`[leads] duplicate submission=${payload.submissionId}`);
      return { ok: true, duplicate: true };
    }
    console.error(`[leads] insert failed submission=${payload.submissionId} code=${error.code}`);
    return { ok: false, reason: "error" };
  }

  const emailData: LeadEmailData = {
    submissionId: payload.submissionId,
    name: row.name,
    company: row.company,
    phone: row.phone,
    email: row.email,
    instagram: row.instagram,
    projectType: row.project_type,
    package: row.package,
    budget: row.budget,
    deadline: row.deadline,
    message: row.message,
    language: row.language as Locale,
    createdAt,
  };

  try {
    await dispatchEmails(db, data.id, emailData);
  } catch {
    console.error(`[leads] email dispatch aborted submission=${payload.submissionId}`);
  }

  return { ok: true };
}

/**
 * Controlled retry for leads whose emails failed. Server-to-server only:
 * it is never exposed as a public endpoint. Already-delivered emails are
 * skipped, and each lead is retried at most MAX_ATTEMPTS times.
 */
const MAX_ATTEMPTS = 3;

export async function retryPendingLeadEmails(limit = 20): Promise<{ processed: number }> {
  const db = await admin();
  const { data, error } = await db
    .from("leads")
    .select("*")
    .or("internal_email_status.eq.failed,customer_email_status.eq.failed")
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error || !data) return { processed: 0 };

  let processed = 0;
  for (const lead of data) {
    const emailData: LeadEmailData = {
      submissionId: lead.submission_id ?? lead.id,
      name: lead.name,
      company: lead.company,
      phone: lead.phone,
      email: lead.email,
      instagram: lead.instagram,
      projectType: lead.project_type,
      package: lead.package,
      budget: lead.budget,
      deadline: lead.deadline,
      message: lead.message,
      language: lead.language as Locale,
      createdAt: lead.created_at,
    };

    for (const prefix of ["internal", "customer"] as const) {
      const status = lead[`${prefix}_email_status`];
      const attempts = lead[`${prefix}_email_attempts`] ?? 0;
      if (status !== "failed" || attempts >= MAX_ATTEMPTS) continue;

      // Progressive backoff between attempts.
      await new Promise((resolve) => setTimeout(resolve, attempts * 500));

      const message =
        prefix === "internal" ? buildInternalEmail(emailData) : buildCustomerEmail(emailData);
      const result = await sendEmail(message);
      await db
        .from("leads")
        .update(statusPatch(prefix, result, attempts + 1))
        .eq("id", lead.id);
      processed += 1;
    }
  }

  return { processed };
}
