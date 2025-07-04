import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/custom_error";
import { ZodError } from "zod";
import { zodErrorMessage } from "../utils/zod";

export async function errorHandler(
  error: unknown,
  _: Request,
  res: Response,
  next: NextFunction
) {
  console.log("COMES IN ERROR")
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
  if (error instanceof ZodError) {
    res.status(400).json({ message: zodErrorMessage(error) });
    return;
  }
  if (error instanceof SyntaxError) {
    res.status(400).json({ message: error.message });
    return;
  }
  if (error instanceof Error) {
    res.status(500).json({ message: error.message });
    return;
  }
  res.status(500).json({ message: "something went wrong" });
  next(error);
}
