import {
  Rocket,
  Building2,
  CalendarCheck,
  ImageIcon,
  ShoppingBag,
  Settings2,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    price: "€250+",
    description: "Página única focada em conversão para um serviço, evento ou lançamento.",
    features: ["Design sob medida", "Formulário integrado", "Otimizada para SEO"],
    icon: Rocket,
  },
  {
    id: "site-institucional",
    name: "Site Institucional",
    price: "€350+",
    description: "Presença profissional completa para consolidar a imagem do seu negócio.",
    features: ["Até 5 páginas", "Blog opcional", "Painel de contato"],
    icon: Building2,
  },
  {
    id: "site-agendamento",
    name: "Site com Agendamento",
    price: "€450+",
    description: "Sistema próprio de reservas online — sem depender de plataformas externas.",
    features: ["Agenda integrada", "Confirmações automáticas", "Painel administrativo"],
    icon: CalendarCheck,
  },
  {
    id: "portfolio",
    name: "Portfólio",
    price: "€300+",
    description: "Vitrine visual para fotógrafos, designers, arquitetos e criativos.",
    features: ["Galerias otimizadas", "Cases detalhados", "Contato direto"],
    icon: ImageIcon,
  },
  {
    id: "pagina-vendas",
    name: "Página de Vendas",
    price: "€300+",
    description: "Estrutura de copywriting persuasiva para infoprodutos e ofertas.",
    features: ["Copy orientada a conversão", "Checkout integrado", "Pixel & Analytics"],
    icon: ShoppingBag,
  },
  {
    id: "personalizado",
    name: "Projeto Personalizado",
    price: "Sob orçamento",
    description: "Soluções específicas que fogem do padrão — desenvolvidas sob medida.",
    features: ["Escopo customizado", "Consultoria dedicada", "Suporte contínuo"],
    icon: Settings2,
  },
];
