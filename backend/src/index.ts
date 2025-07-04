import express, { Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import { env } from "./env";
import { errorHandler } from "./middlewares/error_handler";
import { logRouter } from "./features/logs/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", logRouter);

app.get("/", async (_: Request, res: Response) => {
  res.status(200).json({
    message: "API is working!!",
  });
});

app.use(errorHandler);

app.listen(env.PORT, () => console.log(`server running at PORT: ${env.PORT}`));
