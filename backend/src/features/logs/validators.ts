import z from "zod";
import { logLevel } from "../../types/enums";

export const addLogSchema = z.object({
  level: z.enum(logLevel),
  message: z.string().min(1, "Message is required"),
  resourceId: z.string().min(1, "resourceId is required"),
  timestamp: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Invalid ISO timestamp"),
  traceId: z.string().min(1, "traceId is required"),
  spanId: z.string().min(1, "spanId is required"),
  commit: z.string().min(1, "commit is required"),
  metadata: z.record(z.any()).refine((val) => Object.keys(val).length > 0, {
    message: "Metadata must contain at least one key-value pair",
  }),
});
