import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { LeadPayload } from "@/data/contact";
import { MIN_FILL_MS } from "@/data/contact";
import { notifyNewLead } from "./lead-notification.server";

export type SaveLeadResult = { ok: true } | { ok: false; reason: "spam" | "error" };

function createPublicClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error("Supabase environment is not configured");

  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

function nullify(value?: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}

export async function saveLead(payload: LeadPayload): Promise<SaveLeadResult> {
  // Silent rejection for bots: honeypot filled or form submitted too fast.
  if (payload.honeypot && payload.honeypot.length > 0) return { ok: true };
  if (payload.elapsedMs < MIN_FILL_MS) return { ok: false, reason: "spam" };

  const supabase = createPublicClient();

  const row = {
    name: payload.name.trim(),
    company: nullify(payload.company),
    phone: payload.phone.trim(),
    email: payload.email.trim().toLowerCase(),
    instagram: nullify(payload.instagram),
    project_type: payload.projectType,
    budget: payload.budget,
    deadline: payload.deadline,
    message: payload.message.trim(),
    consent: true,
    language: payload.language,
    status: "new",
  };

  const { data, error } = await supabase.from("leads").insert(row).select("id, created_at").single();

  if (error || !data) {
    // Log server-side only; never surface database details to the visitor.
    console.error("[leads] insert failed:", error?.message ?? "unknown error");
    return { ok: false, reason: "error" };
  }

  // Notification must never break a successfully stored lead.
  try {
    await notifyNewLead({ ...row, id: data.id, created_at: data.created_at });
  } catch (notifyError) {
    console.error(
      "[leads] notification failed:",
      notifyError instanceof Error ? notifyError.message : "unknown error",
    );
  }

  return { ok: true };
}
