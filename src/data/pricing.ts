export type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    price: "€20",
    period: "/mês",
    description: "Manutenção básica para manter seu site sempre no ar.",
    features: [
      "Hospedagem e domínio",
      "Certificado SSL",
      "Backup mensal",
      "Suporte por email",
      "Pequenos ajustes de conteúdo",
    ],
  },
  {
    id: "profissional",
    name: "Profissional",
    price: "€40",
    period: "/mês",
    description: "Suporte completo com evolução contínua do seu site.",
    features: [
      "Tudo do Essencial",
      "Backup semanal",
      "Atualizações prioritárias",
      "Suporte WhatsApp",
      "Relatório mensal de performance",
      "Otimizações de SEO",
    ],
    highlighted: true,
  },
];
