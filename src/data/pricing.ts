export type PlanMeta = {
  id: "essencial" | "profissional";
  price: string;
  highlighted?: boolean;
};

export const plans: PlanMeta[] = [
  { id: "essencial", price: "€20" },
  { id: "profissional", price: "€40", highlighted: true },
];
