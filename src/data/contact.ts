import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import type { TFunction } from "i18next";

export const PROJECT_TYPE_IDS = [
  "landing",
  "institutional",
  "booking",
  "portfolio",
  "sales",
  "custom",
] as const;

export const BUDGET_IDS = [
  "upTo300",
  "r300to600",
  "r600to1000",
  "above1000",
  "unknown",
] as const;

export const DEADLINE_IDS = ["asap", "weeks2to4", "months1to2", "noRush"] as const;

export const LANGUAGE_IDS = ["pt", "en", "fr"] as const;

export type ProjectTypeId = (typeof PROJECT_TYPE_IDS)[number];
export type BudgetId = (typeof BUDGET_IDS)[number];
export type DeadlineId = (typeof DEADLINE_IDS)[number];

/** Minimum time (ms) a real human needs to fill the form. */
export const MIN_FILL_MS = 2500;

/** Max characters accepted for the whole serialized payload (defense in depth). */
export const MAX_PAYLOAD_CHARS = 8000;

/**
 * Shared payload contract between the browser form and the server function.
 * Kept free of translations so it can be validated on the server too.
 * `.strict()` rejects unknown fields sent by a tampered client.
 */
export const leadPayloadSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    company: z.string().trim().max(80).optional().or(z.literal("")),
    phone: z
      .string()
      .trim()
      .min(1)
      .refine((v) => isValidPhoneNumber(v), "invalid_phone"),
    email: z.string().trim().email().max(120),
    instagram: z.string().trim().max(60).optional().or(z.literal("")),
    message: z.string().trim().min(10).max(1000),
    projectType: z.enum(PROJECT_TYPE_IDS),
    package: z.string().trim().max(60).optional().or(z.literal("")),
    budget: z.enum(BUDGET_IDS),
    deadline: z.enum(DEADLINE_IDS),
    consent: z.literal(true),
    language: z.enum(LANGUAGE_IDS),
    /** Client-generated idempotency key for this form session. */
    submissionId: z.string().uuid(),
    // Anti-spam
    honeypot: z.string().max(0).optional().or(z.literal("")),
    elapsedMs: z.number().int().nonnegative(),
  })
  .strict();

export type LeadPayload = z.infer<typeof leadPayloadSchema>;


/** Localized schema used by react-hook-form (front-end messages). */
export function makeContactSchema(t: TFunction) {
  return z.object({
    name: z.string().trim().min(2, t("contact.errors.name")).max(80),
    company: z.string().trim().max(80).optional().or(z.literal("")),
    phone: z
      .string({ message: t("contact.errors.phone") })
      .min(1, t("contact.errors.phone"))
      .refine((v) => isValidPhoneNumber(v), t("contact.errors.phone")),
    email: z.string().trim().email(t("contact.errors.email")).max(120),
    instagram: z.string().trim().max(60).optional().or(z.literal("")),
    message: z.string().trim().min(10, t("contact.errors.message")).max(1000),
    projectType: z.enum(PROJECT_TYPE_IDS, { message: t("contact.errors.projectType") }),
    budget: z.enum(BUDGET_IDS, { message: t("contact.errors.budget") }),
    deadline: z.enum(DEADLINE_IDS, { message: t("contact.errors.deadline") }),
    consent: z.literal(true, { message: t("contact.errors.consent") }),
    honeypot: z.string().max(0).optional().or(z.literal("")),
  });
}

export type ContactInput = {
  name: string;
  company?: string;
  phone: string;
  email: string;
  instagram?: string;
  message: string;
  projectType: ProjectTypeId;
  budget: BudgetId;
  deadline: DeadlineId;
  consent: true;
  honeypot?: string;
};
