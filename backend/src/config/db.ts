import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, "../monitoring_logs.json");

export const readLogs = async () => {
  const data = await fs.readFile(DB_PATH, "utf-8");
  const logs = JSON.parse(data);
  return logs.reverse();
};

export const writeLogs = async (logs: any[]) => {
  await fs.writeFile(DB_PATH, JSON.stringify(logs, null, 2), "utf-8");
};
