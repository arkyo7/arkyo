import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import type { TFunction } from "i18next";

export function makeContactSchema(t: TFunction) {
  const projectTypes = t("contact.projectTypes", { returnObjects: true }) as string[];
  const budgets = t("contact.budgets", { returnObjects: true }) as string[];
  const deadlines = t("contact.deadlines", { returnObjects: true }) as string[];

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
    projectType: z.enum(projectTypes as [string, ...string[]], {
      message: t("contact.errors.projectType"),
    }),
    budget: z.enum(budgets as [string, ...string[]], {
      message: t("contact.errors.budget"),
    }),
    deadline: z.enum(deadlines as [string, ...string[]], {
      message: t("contact.errors.deadline"),
    }),
    consent: z.literal(true, { message: t("contact.errors.consent") }),
  });
}

export type ContactInput = {
  name: string;
  company?: string;
  phone: string;
  email: string;
  instagram?: string;
  message: string;
  projectType: string;
  budget: string;
  deadline: string;
  consent: true;
};
