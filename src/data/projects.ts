export type ProjectMeta = {
  id: string;
  year: number;
  image?: string;
  imageWebp?: string;
};

export const projects: ProjectMeta[] = [
  {
    id: "clinica-massoterapia",
    year: 2025,
    image: "/jr-massoterapeuta-home.png",
    imageWebp: "/jr-massoterapeuta-home.webp",
  },
];
