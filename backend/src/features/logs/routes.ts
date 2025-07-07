import Express from "express";
import { getAllLogs, createLog } from "./controllers";
export const logRouter = Express.Router();

logRouter.get("/logs/all", getAllLogs);
logRouter.post("/logs/create", createLog);
