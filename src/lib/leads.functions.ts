import { createServerFn } from "@tanstack/react-start";
import { leadPayloadSchema } from "@/data/contact";

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadPayloadSchema.parse(data))
  .handler(async ({ data }) => {
    const { saveLead } = await import("./leads.server");
    const result = await saveLead(data);
    if (!result.ok) {
      return { ok: false as const, reason: result.reason };
    }
    return { ok: true as const };
  });
