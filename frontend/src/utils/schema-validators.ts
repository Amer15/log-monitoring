import { z } from "zod";

export const logFormSchema = z.object({
  level: z.enum(["info", "warn", "error", "debug"]),
  message: z.string().min(1, "Message is required"),
  resourceId: z.string().min(1, "Resource ID is required"),
  traceId: z.string().min(1, "Trace ID is required"),
  spanId: z.string().min(1, "Span ID is required"),
  commit: z.string().min(1, "Commit is required"),
  metadata: z.record(z.any()),
});

export type LogFormValues = z.infer<typeof logFormSchema>;
