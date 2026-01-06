import { z } from "zod";

export const createSchema = z.object({
  authorId: z.coerce.number().int().positive(),
  type: z.enum(["SUBSCRIBED", "UNSUBSCRIBED", "NEW_OBSERVATION", "COMMENT", "SYSTEM"]),
  title: z.string().min(1).max(120),
  message: z.string().max(2000).optional(),
  occurredAt: z.coerce.date().optional(),
  payload: z.any().optional(),
});

export const listQuerySchema = z.object({
  entity1Id: z.coerce.number().int().positive(),
  size: z.coerce.number().int().min(1).max(100).optional(),
  from: z.coerce.number().int().min(0).optional(),
});

export const countsSchema = z.object({
  entity1Ids: z.array(z.coerce.number().int().positive()).min(1).max(500),
});
