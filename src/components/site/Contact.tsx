import { useEffect, useMemo, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, MessageCircle, Instagram, Check, Loader2, AlertCircle } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import { contact, whatsappUrl } from "@/data/company";
import {
  BUDGET_IDS,
  DEADLINE_IDS,
  PROJECT_TYPE_IDS,
  makeContactSchema,
  type BudgetId,
  type ContactInput,
  type DeadlineId,
  type ProjectTypeId,
} from "@/data/contact";
import { submitLead } from "@/lib/leads.functions";
import { onProjectTypeRequest } from "@/lib/prefill";

function newSubmissionId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}-4000-8000-000000000000`;
}

export function Contact() {
  const { t, i18n } = useTranslation();
  const [sent, setSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startedAt = useRef(Date.now());
  const submissionId = useRef<string>(newSubmissionId());
  const send = useServerFn(submitLead);

  const schema = useMemo(() => makeContactSchema(t), [t]);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    getValues,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(schema) as never,
    defaultValues: { consent: false as unknown as true, phone: "", honeypot: "" },
  });

  // Only the fields whose UI is driven by their value are observed. Text
  // inputs stay uncontrolled through register(), so typing in name, company,
  // email, instagram or message no longer re-renders the whole form.
  const phone = useWatch({ control, name: "phone" });
  const projectType = useWatch({ control, name: "projectType" });
  const budget = useWatch({ control, name: "budget" });
  const deadline = useWatch({ control, name: "deadline" });
  const consent = useWatch({ control, name: "consent" });

  // Radix Select triggers are not registered inputs, so setFocus() cannot
  // reach them. Keep an explicit ref map for those three fields.
  const selectRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    startedAt.current = Date.now();
    submissionId.current = newSubmissionId();
  }, []);

  useEffect(
    () =>
      onProjectTypeRequest((projectType) => {
        setSent(false);
        setValue("projectType", projectType, { shouldValidate: false });
      }),
    [setValue],
  );

  const lang = (["pt", "en", "fr"] as const).includes(
    (i18n.resolvedLanguage ?? "pt") as "pt" | "en" | "fr",
  )
    ? ((i18n.resolvedLanguage ?? "pt") as "pt" | "en" | "fr")
    : "pt";

  const onSubmit = async (data: ContactInput) => {
    if (isSubmitting) return;
    setSubmitError(null);
    try {
      const result = await send({
        data: {
          ...data,
          consent: true as const,
          language: lang,
          submissionId: submissionId.current,
          elapsedMs: Date.now() - startedAt.current,
        },
      });

      if (!result.ok) {
        // Form values are intentionally preserved so the visitor can retry.
        setSubmitError(
          result.reason === "spam"
            ? t("contact.errors.tooFast")
            : result.reason === "rate_limited"
              ? t("contact.errors.rateLimited")
              : t("contact.errors.submitFailed"),
        );
        return;
      }

      toast.success(t("contact.toast"));
      setSent(true);
      reset({ consent: false as unknown as true, phone: "", honeypot: "" });
      startedAt.current = Date.now();
      submissionId.current = newSubmissionId();
    } catch {
      setSubmitError(t("contact.errors.submitFailed"));
    }
  };

  const onInvalid = (invalid: Record<string, unknown>) => {
    setSubmitError(t("contact.errors.fixFields"));
    const first = (
      ["name", "phone", "email", "projectType", "budget", "deadline", "message", "consent"] as const
    ).find((key) => invalid[key]);
    if (!first) return;
    // Radix triggers (selects + consent checkbox) only receive focus, never
    // an automatic open, so keyboard and screen-reader flow stays predictable.
    const trigger = selectRefs.current[first];
    if (trigger) {
      trigger.focus();
      return;
    }
    setFocus(first as keyof ContactInput);
  };


  return (
    <section id="contato" className="border-y border-border bg-surface py-24 md:py-32">
      <div className="container-arkyo grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("contact.eyebrow")}
          </p>
          <h2
            data-section-focus
            tabIndex={-1}
            className="mt-4 text-balance text-3xl font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-surface md:text-4xl"
          >
            {t("contact.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("contact.subtitle")}</p>
          <div className="mt-8 space-y-3">
            <a
              href={whatsappUrl(t("contact.whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{t("contact.channels.whatsapp")}</p>
                <p className="text-sm font-medium">{contact.whatsapp}</p>
              </div>
            </a>
            <a
              href={contact.emailUrl}
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
                <Mail className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{t("contact.channels.email")}</p>
                <p className="text-sm font-medium">{contact.email}</p>
              </div>
            </a>
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
                <Instagram className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{t("contact.channels.instagram")}</p>
                <p className="text-sm font-medium">{contact.instagram}</p>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="rounded-2xl border border-border bg-card p-6 md:p-8"
          noValidate
        >
          {sent ? (
            <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">
                {t("contact.successTitle")}
              </h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                {t("contact.successBody")}
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 rounded-lg px-2 py-1 text-sm font-medium underline underline-offset-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                {t("contact.sendAnother")}
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Honeypot: invisible for humans, skipped by keyboard and screen readers */}
              <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register("honeypot")}
                />
              </div>

              <Field
                id="contact-name"
                label={t("contact.fields.name")}
                error={errors.name?.message}
              >
                {(a11y) => (
                  <Input
                    {...a11y}
                    autoComplete="name"
                    {...register("name")}
                    placeholder={t("contact.fields.namePh")}
                  />
                )}
              </Field>
              <Field
                id="contact-company"
                label={t("contact.fields.company")}
                error={errors.company?.message}
              >
                {(a11y) => (
                  <Input
                    {...a11y}
                    autoComplete="organization"
                    {...register("company")}
                    placeholder={t("contact.fields.companyPh")}
                  />
                )}
              </Field>
              <Field
                id="contact-phone"
                label={t("contact.fields.phone")}
                error={errors.phone?.message}
              >
                {(a11y) => (
                  <PhoneInput
                    id={a11y.id}
                    name="phone"
                    value={phone ?? ""}
                    onChange={(v) => setValue("phone", v, { shouldValidate: !!errors.phone })}
                    onBlur={() => setValue("phone", getValues("phone") ?? "", { shouldValidate: true })}
                    aria-invalid={a11y["aria-invalid"]}
                    aria-describedby={a11y["aria-describedby"]}
                  />
                )}
              </Field>
              <Field
                id="contact-email"
                label={t("contact.fields.email")}
                error={errors.email?.message}
              >
                {(a11y) => (
                  <Input
                    {...a11y}
                    type="email"
                    autoComplete="email"
                    {...register("email")}
                    placeholder={t("contact.fields.emailPh")}
                  />
                )}
              </Field>
              <Field
                id="contact-instagram"
                label={t("contact.fields.instagram")}
                error={errors.instagram?.message}
              >
                {(a11y) => (
                  <Input
                    {...a11y}
                    autoComplete="off"
                    {...register("instagram")}
                    placeholder={t("contact.fields.instagramPh")}
                  />
                )}
              </Field>
              <Field
                id="contact-project-type"
                label={t("contact.fields.projectType")}
                error={errors.projectType?.message}
              >
                {(a11y) => (
                  <Select
                    value={projectType}
                    onValueChange={(v) =>
                      setValue("projectType", v as ProjectTypeId, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger
                      id={a11y.id}
                      aria-invalid={a11y["aria-invalid"]}
                      aria-describedby={a11y["aria-describedby"]}
                    >
                      <SelectValue placeholder={t("contact.fields.select")} />
                    </SelectTrigger>
                    <SelectContent>
                      {PROJECT_TYPE_IDS.map((x) => (
                        <SelectItem key={x} value={x}>
                          {t(`contact.options.projectType.${x}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </Field>
              <Field
                id="contact-budget"
                label={t("contact.fields.budget")}
                error={errors.budget?.message}
              >
                {(a11y) => (
                  <Select
                    value={budget}
                    onValueChange={(v) =>
                      setValue("budget", v as BudgetId, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger
                      id={a11y.id}
                      aria-invalid={a11y["aria-invalid"]}
                      aria-describedby={a11y["aria-describedby"]}
                    >
                      <SelectValue placeholder={t("contact.fields.select")} />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGET_IDS.map((x) => (
                        <SelectItem key={x} value={x}>
                          {t(`contact.options.budget.${x}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </Field>
              <Field
                id="contact-deadline"
                label={t("contact.fields.deadline")}
                error={errors.deadline?.message}
              >
                {(a11y) => (
                  <Select
                    value={deadline}
                    onValueChange={(v) =>
                      setValue("deadline", v as DeadlineId, { shouldValidate: true })
                    }
                  >
                    <SelectTrigger
                      id={a11y.id}
                      aria-invalid={a11y["aria-invalid"]}
                      aria-describedby={a11y["aria-describedby"]}
                    >
                      <SelectValue placeholder={t("contact.fields.select")} />
                    </SelectTrigger>
                    <SelectContent>
                      {DEADLINE_IDS.map((x) => (
                        <SelectItem key={x} value={x}>
                          {t(`contact.options.deadline.${x}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </Field>
              <div className="sm:col-span-2">
                <Field
                  id="contact-message"
                  label={t("contact.fields.message")}
                  error={errors.message?.message}
                >
                  {(a11y) => (
                    <Textarea
                      {...a11y}
                      rows={5}
                      className="resize-y"
                      {...register("message")}
                      placeholder={t("contact.fields.messagePh")}
                    />
                  )}
                </Field>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Checkbox
                    checked={consent === true}
                    onCheckedChange={(v) =>
                      setValue("consent", (v === true) as true, { shouldValidate: true })
                    }
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? "contact-consent-error" : undefined}
                    className="mt-0.5"
                  />
                  <span>
                    {t("contact.fields.consent")}{" "}
                    <a href="/privacidade" className="text-foreground underline underline-offset-4">
                      {t("contact.fields.privacy")}
                    </a>
                    .
                  </span>
                </label>
                {errors.consent && (
                  <p id="contact-consent-error" className="mt-2 text-xs text-destructive">
                    {errors.consent.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2" aria-live="polite">
                {submitError && (
                  <p className="mb-3 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    {submitError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
                  {isSubmitting ? t("contact.sending") : t("contact.submit")}
                </button>
              </div>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

type FieldA11y = { id: string; "aria-invalid": boolean; "aria-describedby": string | undefined };

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: (a11y: FieldA11y) => React.ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": error ? errorId : undefined })}
      {error && (
        <p id={errorId} className="pt-0.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
