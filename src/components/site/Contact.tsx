import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, MessageCircle, Instagram, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhoneInput } from "@/components/ui/phone-input";
import { contact } from "@/data/company";
import { makeContactSchema, type ContactInput } from "@/data/contact";

export function Contact() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  const schema = useMemo(() => makeContactSchema(t), [t]);
  const projectTypes = t("contact.projectTypes", { returnObjects: true }) as string[];
  const budgets = t("contact.budgets", { returnObjects: true }) as string[];
  const deadlines = t("contact.deadlines", { returnObjects: true }) as string[];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(schema) as never,
    defaultValues: { consent: false as unknown as true, phone: "" },
  });

  const onSubmit = async (data: ContactInput) => {
    await new Promise((r) => setTimeout(r, 700));
    // TODO: enviar para Lovable Cloud (tabela leads)
    void data;
    toast.success(t("contact.toast"));
    setSent(true);
    reset();
  };

  const values = watch();

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
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight md:text-4xl">
            {t("contact.title")}
          </h2>
          <p className="mt-4 text-muted-foreground">{t("contact.subtitle")}</p>
          <div className="mt-8 space-y-3">
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noreferrer"
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
              rel="noreferrer"
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
          onSubmit={handleSubmit(onSubmit)}
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
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{t("contact.successTitle")}</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t("contact.successBody")}</p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-6 text-sm font-medium underline underline-offset-4"
              >
                {t("contact.sendAnother")}
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("contact.fields.name")} error={errors.name?.message}>
                <Input {...register("name")} placeholder={t("contact.fields.namePh")} />
              </Field>
              <Field label={t("contact.fields.company")} error={errors.company?.message}>
                <Input {...register("company")} placeholder={t("contact.fields.companyPh")} />
              </Field>
              <Field label={t("contact.fields.phone")} error={errors.phone?.message}>
                <PhoneInput
                  value={values.phone}
                  onChange={(v) => setValue("phone", v ?? "", { shouldValidate: true })}
                  aria-invalid={!!errors.phone}
                />
              </Field>
              <Field label={t("contact.fields.email")} error={errors.email?.message}>
                <Input type="email" {...register("email")} placeholder={t("contact.fields.emailPh")} />
              </Field>
              <Field label={t("contact.fields.instagram")} error={errors.instagram?.message}>
                <Input {...register("instagram")} placeholder={t("contact.fields.instagramPh")} />
              </Field>
              <Field label={t("contact.fields.projectType")} error={errors.projectType?.message}>
                <Select
                  value={values.projectType}
                  onValueChange={(v) => setValue("projectType", v, { shouldValidate: true })}
                >
                  <SelectTrigger><SelectValue placeholder={t("contact.fields.select")} /></SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label={t("contact.fields.budget")} error={errors.budget?.message}>
                <Select
                  value={values.budget}
                  onValueChange={(v) => setValue("budget", v, { shouldValidate: true })}
                >
                  <SelectTrigger><SelectValue placeholder={t("contact.fields.select")} /></SelectTrigger>
                  <SelectContent>
                    {budgets.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <Field label={t("contact.fields.deadline")} error={errors.deadline?.message}>
                <Select
                  value={values.deadline}
                  onValueChange={(v) => setValue("deadline", v, { shouldValidate: true })}
                >
                  <SelectTrigger><SelectValue placeholder={t("contact.fields.select")} /></SelectTrigger>
                  <SelectContent>
                    {deadlines.map((x) => <SelectItem key={x} value={x}>{x}</SelectItem>)}
                  </SelectContent>
                </Select>
              </Field>
              <div className="sm:col-span-2">
                <Field label={t("contact.fields.message")} error={errors.message?.message}>
                  <Textarea rows={5} {...register("message")} placeholder={t("contact.fields.messagePh")} />
                </Field>
              </div>

              <div className="sm:col-span-2">
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Checkbox
                    checked={values.consent === true}
                    onCheckedChange={(v) =>
                      setValue("consent", (v === true) as true, { shouldValidate: true })
                    }
                    aria-invalid={!!errors.consent}
                    className="mt-0.5"
                  />
                  <span>
                    {t("contact.fields.consent")}{" "}
                    <a href="/privacidade" className="text-foreground underline underline-offset-4">
                      {t("contact.fields.privacy")}
                    </a>.
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-xs text-destructive">{errors.consent.message}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-px disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
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

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
