import {
  Rocket,
  Building2,
  CalendarCheck,
  ImageIcon,
  ShoppingBag,
  Settings2,
  type LucideIcon,
} from "lucide-react";
import type { ProjectTypeId } from "@/data/contact";

export type ServiceMeta = {
  id: string;
  price: string; // "€250+" or "custom" (translated at render)
  icon: LucideIcon;
  /** Pre-selected value in the contact form when the card CTA is used. */
  projectType: ProjectTypeId;
};

export const services: ServiceMeta[] = [
  { id: "landing-page", projectType: "landing", price: "€250+", icon: Rocket },
  { id: "site-institucional", projectType: "institutional", price: "€350+", icon: Building2 },
  { id: "site-agendamento", projectType: "booking", price: "€450+", icon: CalendarCheck },
  { id: "portfolio", projectType: "portfolio", price: "€300+", icon: ImageIcon },
  { id: "pagina-vendas", projectType: "sales", price: "€300+", icon: ShoppingBag },
  { id: "personalizado", projectType: "custom", price: "custom", icon: Settings2 },
];
