import {
  Rocket,
  Building2,
  CalendarCheck,
  ImageIcon,
  ShoppingBag,
  Settings2,
  type LucideIcon,
} from "lucide-react";

export type ServiceMeta = {
  id: string;
  price: string; // "€250+" or "custom" (translated at render)
  icon: LucideIcon;
};

export const services: ServiceMeta[] = [
  { id: "landing-page", price: "€250+", icon: Rocket },
  { id: "site-institucional", price: "€350+", icon: Building2 },
  { id: "site-agendamento", price: "€450+", icon: CalendarCheck },
  { id: "portfolio", price: "€300+", icon: ImageIcon },
  { id: "pagina-vendas", price: "€300+", icon: ShoppingBag },
  { id: "personalizado", price: "custom", icon: Settings2 },
];
