import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { leadPayloadSchema } from "@/data/contact";

/** First hop of the forwarded chain, used only for rate limiting (hashed server-side). */
function callerIp(): string | null {
  const forwarded = getRequestHeader("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-real-ip") ?? null;
}

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadPayloadSchema.parse(data))
  .handler(async ({ data }) => {
    const { saveLead } = await import("./leads.server");
    const result = await saveLead(data, callerIp());
    if (!result.ok) {
      return { ok: false as const, reason: result.reason };
    }
    return { ok: true as const, duplicate: result.duplicate ?? false };
  });
