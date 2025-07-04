import { NextFunction, Request, Response } from "express";
import { z, ZodSchema } from "zod";
import "../types/express";
import { zodErrorMessage } from "../utils/zod";
/**
 * Middleware to validate the request body against a Zod schema.
 * @param schema - The Zod schema to validate the request body.
 * @returns Middleware function to validate `req.body`.
 */
export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ message: zodErrorMessage(result.error) });
    } else {
      next();
    }
  };
}
/**
 * Middleware to validate a query parameter as a number.
 * @param name - The name of the query parameter (default: "id").
 * @returns Middleware function to validate `req.query`.
 */
export function validateQueryId(name: string = "id") {
  return function (req: Request, res: Response, next: NextFunction) {
    const schema = z.object({
      [name]: z.coerce
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, `${name} must be a valid MongoDB ObjectId`),
    });

    const result = schema.safeParse(req.query);

    if (!result.success) {
      res.status(400).json({ message: zodErrorMessage(result.error) });
    } else {
      next();
    }
  };
}
/**
 * Middleware to validate a route parameter as a number.
 * @param name - The name of the route parameter (default: "id").
 * @returns Middleware function to validate `req.params`.
 */
export function validateParamsId(name: string = "id") {
  return function (req: Request, res: Response, next: NextFunction) {
    const result = z
      .object({ [name]: z.coerce.number() })
      .safeParse(req.params);
    if (!result.success) {
      res.status(400).json({ message: zodErrorMessage(result.error) });
    } else {
      next();
    }
  };
}

export function validateQueryParams(schema: z.ZodTypeAny) {
  return function (req: Request, res: Response, next: NextFunction) {
    const result = schema.safeParse(req.query);
    if (!result.success) {
      res.status(400).json({ message: zodErrorMessage(result.error) });
      return;
    }

    req.query = result.data;
    next();
  };
}
