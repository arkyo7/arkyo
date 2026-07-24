import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const projectTypes = [
  "Landing Page",
  "Site Institucional",
  "Site com Agendamento",
  "Portfólio",
  "Página de Vendas",
  "Projeto Personalizado",
] as const;

export const budgetRanges = [
  "Até €300",
  "€300 – €600",
  "€600 – €1000",
  "Acima de €1000",
  "Ainda não sei",
] as const;

export const deadlineOptions = [
  "O quanto antes",
  "Em 2 a 4 semanas",
  "Em 1 a 2 meses",
  "Sem urgência",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(80),
  company: z.string().trim().max(80).optional().or(z.literal("")),
  phone: z
    .string({ message: "Informe um telefone válido" })
    .min(1, "Informe um telefone válido")
    .refine((v) => isValidPhoneNumber(v), "Informe um telefone válido"),
  email: z.string().trim().email("Email inválido").max(120),
  instagram: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Descreva um pouco seu projeto").max(1000),
  projectType: z.enum(projectTypes, { message: "Selecione o tipo de projeto" }),
  budget: z.enum(budgetRanges, { message: "Selecione uma faixa de orçamento" }),
  deadline: z.enum(deadlineOptions, { message: "Selecione um prazo" }),
  consent: z.literal(true, { message: "É necessário aceitar a Política de Privacidade" }),
});

export type ContactInput = z.infer<typeof contactSchema>;
