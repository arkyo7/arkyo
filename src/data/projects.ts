export type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: number;
  summary: string;
  challenges: string[];
  solutions: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "clinica-massoterapia",
    title: "Sistema para clínica de massoterapia",
    client: "Cliente confidencial",
    category: "Site com Agendamento",
    year: 2025,
    summary:
      "Plataforma que substituiu o agendamento manual por WhatsApp por um sistema próprio de reservas online, com confirmação automática e painel administrativo.",
    challenges: [
      "Agenda desorganizada via mensagens",
      "Falta de confirmação de horários",
      "Sem visibilidade sobre a ocupação da clínica",
    ],
    solutions: [
      "Sistema de agendamento próprio",
      "Painel administrativo com controle de horários",
      "Notificações automáticas para cliente e profissional",
    ],
    tags: ["Saúde & Bem-estar", "Agendamento", "Institucional"],
  },
];
