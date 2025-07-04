export const logLevel = ["error", "warn", "info", "debug"] as const;
export type LogLevel = (typeof logLevel)[number];
