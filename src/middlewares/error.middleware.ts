import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: "VALIDATION_ERROR", details: err.issues });
  }
  const status = err?.status ?? 500;
  const message = err?.message ?? "INTERNAL_ERROR";
  return res.status(status).json({ error: message });
}
