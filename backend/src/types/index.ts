export type MonitoringLog = {
  level: "error" | "warn" | "debug" | "info";
  message: string;
  resourceId: string;
  timestamp: string;
  traceId: string;
  spanId: string;
  commit: string;
  metadata: {
    [key: string]: any;
  };
};
