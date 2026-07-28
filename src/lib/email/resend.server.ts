/**
 * Thin Resend transport. The only place in the codebase that talks to the
 * email provider. Recipients, sender and subjects are always decided by
 * server code — never by the browser.
 */
export type EmailSendResult =
  | { status: "sent"; providerId: string | null }
  | { status: "skipped"; error: string }
  | { status: "failed"; error: string; permanent: boolean };

export type EmailMessage = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/** Configured sender, e.g. `Arkyo <hello@arkyo.co>` once the domain is verified. */
function sender(): string | undefined {
  return process.env.LEAD_NOTIFICATION_FROM?.trim() || undefined;
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && sender());
}

/**
 * Resend's shared sandbox sender can only deliver to the account owner, so
 * while it is configured we must not attempt customer confirmations.
 * Switching LEAD_NOTIFICATION_FROM to a verified domain re-enables them
 * automatically — no code change required.
 */
export function isTestSender(): boolean {
  return (sender() ?? "").toLowerCase().includes("onboarding@resend.dev");
}

/** Explicit, configurable timeout so a submission never hangs. */
function timeoutMs(): number {
  const raw = Number(process.env.RESEND_TIMEOUT_MS);
  return Number.isFinite(raw) && raw > 0 ? raw : 10_000;
}

export async function sendEmail(message: EmailMessage): Promise<EmailSendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = sender();

  if (!apiKey || !from) {
    return { status: "skipped", error: "email_provider_not_configured" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs());

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [message.to],
        ...(message.replyTo ? { reply_to: message.replyTo } : {}),
        subject: message.subject,
        html: message.html,
        text: message.text,
      }),
    });
  } catch (error) {
    // Timeout and network problems are both temporary: safe to retry later.
    const aborted = error instanceof Error && error.name === "AbortError";
    return { status: "failed", error: aborted ? "timeout" : "network_error", permanent: false };
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    // 403 is what Resend returns for an unverified sending domain — permanent
    // until DNS is configured, so it must never be recorded as "sent".
    const permanent = response.status === 401 || response.status === 403 || response.status === 422;
    return {
      status: "failed",
      error: `provider_${response.status}`,
      permanent,
    };
  }

  let providerId: string | null = null;
  try {
    const body = (await response.json()) as { id?: string };
    providerId = body?.id ?? null;
  } catch {
    providerId = null;
  }

  return { status: "sent", providerId };
}
