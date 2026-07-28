import ptLocale from "@/i18n/locales/pt.json";
import enLocale from "@/i18n/locales/en.json";
import frLocale from "@/i18n/locales/fr.json";
import type { EmailMessage } from "./resend.server";

export const INTERNAL_RECIPIENT = "hello.arkyo@gmail.com";
const SIGNATURE_EMAIL = "hello.arkyo@gmail.com";

export type Locale = "pt" | "en" | "fr";

export type LeadEmailData = {
  submissionId: string;
  name: string;
  company: string | null;
  phone: string;
  email: string;
  instagram: string | null;
  projectType: string;
  package: string | null;
  budget: string;
  deadline: string;
  message: string;
  language: Locale;
  createdAt: string;
};

const LOCALES: Record<Locale, Record<string, unknown>> = {
  pt: ptLocale as Record<string, unknown>,
  en: enLocale as Record<string, unknown>,
  fr: frLocale as Record<string, unknown>,
};

function optionLabel(locale: Locale, group: string, id: string): string {
  const options = (
    (LOCALES[locale] as { contact?: { options?: Record<string, Record<string, string>> } }).contact
      ?.options ?? {}
  )[group];
  return options?.[id] ?? id;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMPTY: Record<Locale, string> = {
  pt: "Não informado",
  en: "Not provided",
  fr: "Non renseigné",
};

function shell(inner: string): string {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f8f8f8;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#171717;">
<div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;border-radius:16px;padding:28px;">
${inner}
<p style="margin-top:28px;font-size:12px;color:#737373;">Arkyo — ${SIGNATURE_EMAIL}</p>
</div></body></html>`;
}

/** Internal notification sent to Arkyo after a lead is stored. */
export function buildInternalEmail(lead: LeadEmailData): EmailMessage {
  const empty = EMPTY.pt;
  const rows: Array<[string, string]> = [
    ["Nome", lead.name],
    ["Empresa", lead.company ?? empty],
    ["Telefone", lead.phone],
    ["E-mail", lead.email],
    ["Instagram", lead.instagram ?? empty],
    ["Tipo de projeto", optionLabel(lead.language, "projectType", lead.projectType)],
    ["Pacote", lead.package ?? empty],
    ["Orçamento", optionLabel(lead.language, "budget", lead.budget)],
    ["Prazo", optionLabel(lead.language, "deadline", lead.deadline)],
    ["Mensagem", lead.message],
    ["Idioma", lead.language.toUpperCase()],
    ["Data e hora", new Date(lead.createdAt).toISOString()],
    ["Submission ID", lead.submissionId],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = shell(
    `<h1 style="font-size:18px;margin:0 0 16px;">Nova solicitação de orçamento</h1>
<table style="width:100%;border-collapse:collapse;font-size:14px;">${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:6px 10px 6px 0;color:#737373;vertical-align:top;white-space:nowrap;">${escapeHtml(
            label,
          )}</td><td style="padding:6px 0;">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
      )
      .join("")}</table>`,
  );

  return {
    to: INTERNAL_RECIPIENT,
    subject: "Nova solicitação de orçamento — Arkyo",
    replyTo: lead.email,
    html,
    text,
  };
}

type CustomerCopy = {
  subject: string;
  greeting: (name: string) => string;
  intro: string;
  followUp: string;
  summaryTitle: string;
  labels: { projectType: string; package: string; budget: string };
  closing: string;
};

const CUSTOMER_COPY: Record<Locale, CustomerCopy> = {
  pt: {
    subject: "Recebemos sua solicitação — Arkyo",
    greeting: (name) => `Olá, ${name}.`,
    intro:
      "Obrigado por entrar em contato com a Arkyo. Recebemos sua solicitação de orçamento e analisaremos as informações enviadas.",
    followUp: "Responderemos em breve durante o nosso horário comercial.",
    summaryTitle: "Resumo da solicitação:",
    labels: { projectType: "Tipo de projeto", package: "Pacote", budget: "Orçamento" },
    closing: "Atenciosamente,\nArkyo",
  },
  fr: {
    subject: "Nous avons reçu votre demande — Arkyo",
    greeting: (name) => `Bonjour ${name},`,
    intro:
      "Merci d’avoir contacté Arkyo. Nous avons bien reçu votre demande de devis et nous allons examiner les informations envoyées.",
    followUp: "Nous vous répondrons prochainement pendant nos heures d’ouverture.",
    summaryTitle: "Résumé de votre demande :",
    labels: { projectType: "Type de projet", package: "Formule", budget: "Budget" },
    closing: "Cordialement,\nArkyo",
  },
  en: {
    subject: "We received your request — Arkyo",
    greeting: (name) => `Hello ${name},`,
    intro:
      "Thank you for contacting Arkyo. We have received your quote request and will review the information you submitted.",
    followUp: "We will get back to you soon during our business hours.",
    summaryTitle: "Request summary:",
    labels: { projectType: "Project type", package: "Package", budget: "Budget" },
    closing: "Kind regards,\nArkyo",
  },
};

/** Confirmation sent to the visitor, in the language used on the form. */
export function buildCustomerEmail(lead: LeadEmailData): EmailMessage {
  const copy = CUSTOMER_COPY[lead.language];
  const summary: Array<[string, string]> = [
    [copy.labels.projectType, optionLabel(lead.language, "projectType", lead.projectType)],
    ...(lead.package ? ([[copy.labels.package, lead.package]] as Array<[string, string]>) : []),
    [copy.labels.budget, optionLabel(lead.language, "budget", lead.budget)],
  ];

  const text = [
    copy.greeting(lead.name),
    "",
    copy.intro,
    "",
    copy.followUp,
    "",
    copy.summaryTitle,
    ...summary.map(([label, value]) => `${label}: ${value}`),
    "",
    copy.closing,
    SIGNATURE_EMAIL,
  ].join("\n");

  const html = shell(
    `<p style="margin:0 0 16px;font-size:16px;">${escapeHtml(copy.greeting(lead.name))}</p>
<p style="margin:0 0 16px;font-size:14px;line-height:1.6;">${escapeHtml(copy.intro)}</p>
<p style="margin:0 0 24px;font-size:14px;line-height:1.6;">${escapeHtml(copy.followUp)}</p>
<p style="margin:0 0 8px;font-size:14px;font-weight:600;">${escapeHtml(copy.summaryTitle)}</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;">${summary
      .map(
        ([label, value]) =>
          `<tr><td style="padding:4px 10px 4px 0;color:#737373;white-space:nowrap;">${escapeHtml(
            label,
          )}</td><td style="padding:4px 0;">${escapeHtml(value)}</td></tr>`,
      )
      .join("")}</table>`,
  );

  return { to: lead.email, subject: copy.subject, html, text };
}
