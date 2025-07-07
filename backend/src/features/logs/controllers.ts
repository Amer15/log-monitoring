import { Request, Response } from "express";
import { MonitoringLog } from "../../types";
import { readLogs, writeLogs } from "../../config/db";
import { validateSchema } from "../../utils/validation";
import { addLogSchema } from "./validators";
import { CustomError } from "../../utils/custom_error";

export const getAllLogs = async (req: Request, res: Response) => {
   const {
    level,
    message,
    resourceId,
    traceId,
    spanId,
    commit,
    timestamp_start,
    timestamp_end,
  } = req.query;
  const logs: MonitoringLog[] = await readLogs();

   const filteredLogs = logs.filter((log) => {
    if (level && log.level !== level) return false;
    if (message && !log.message.toLowerCase().includes(String(message).toLowerCase())) return false;
    if (resourceId && !log.resourceId.toLowerCase().includes(String(resourceId).toLowerCase())) return false;
    if (traceId && !log.traceId.toLowerCase().includes(String(traceId).toLowerCase())) return false;
    if (spanId && !log.spanId.toLowerCase().includes(String(spanId).toLowerCase())) return false;
    if (commit && !log.commit.toLowerCase().includes(String(commit).toLowerCase())) return false;

    const logTimestamp = new Date(log.timestamp).getTime();
    const start = timestamp_start ? new Date(String(timestamp_start)).getTime() : null;
    const end = timestamp_end ? new Date(String(timestamp_end)).getTime() : null;

    if (start && logTimestamp < start) return false;
    if (end && logTimestamp > end) return false;

    return true;
  });

  res.status(200).json({
    message: "successfully fetched logs",
    logs: filteredLogs,
  });
};

export const createLog = async (req: Request, res: Response) => {
  const payload = validateSchema(addLogSchema, req.body);

  const logs: MonitoringLog[] = await readLogs();

  const logExist = logs.find(
    (log) => log.traceId === payload.traceId || log.spanId === payload.spanId
  );

  if (logExist) {
    const fieldType =
      payload.traceId === logExist.traceId ? "traceId" : "spanId";
    throw new CustomError(`log already exist with provided ${fieldType}`, 400);
  }

  logs.push(payload);

  await writeLogs(logs);

  res.status(201).json({
    message: "Log created successfully",
    log: payload,
  });
};
