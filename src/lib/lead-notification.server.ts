/**
 * Notification for a newly stored lead.
 *
 * Sending requires an outbound email provider. As long as RESEND_API_KEY and
 * LEAD_NOTIFICATION_FROM are not configured, the notification is skipped and
 * only logged server-side — the lead itself is already safely stored.
 */
const NOTIFY_TO = "hello.arkyo@gmail.com";

type LeadRecord = {
  name: string;
  company: string | null;
  phone: string;
  email: string;
  instagram: string | null;
  project_type: string;
  budget: string;
  deadline: string;
  message: string;
  language: string;
  created_at: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildBody(lead: LeadRecord) {
  const rows: Array<[string, string]> = [
    ["Nome", lead.name],
    ["Empresa", lead.company ?? "—"],
    ["Telefone", lead.phone],
    ["Email", lead.email],
    ["Instagram", lead.instagram ?? "—"],
    ["Tipo de projeto", lead.project_type],
    ["Orçamento", lead.budget],
    ["Prazo", lead.deadline],
    ["Mensagem", lead.message],
    ["Idioma", lead.language],
    ["Data e hora", new Date(lead.created_at).toISOString()],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<h2>Novo lead — Arkyo</h2><table cellpadding="6">${rows
    .map(
      ([label, value]) =>
        `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`,
    )
    .join("")}</table>`;

  return { text, html };
}

export async function notifyNewLead(lead: LeadRecord): Promise<{ sent: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_NOTIFICATION_FROM;

  if (!apiKey || !from) {
    console.info(
      `[leads] notification skipped (email provider not configured) for ${lead.email}`,
    );
    return { sent: false };
  }

  const { text, html } = buildBody(lead);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [NOTIFY_TO],
      reply_to: lead.email,
      subject: `Novo lead: ${lead.name}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    console.error(`[leads] notification provider responded ${response.status}`);
    return { sent: false };
  }

  return { sent: true };
}
