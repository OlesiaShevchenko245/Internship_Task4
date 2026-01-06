import type { Request, Response } from "express";
import { AuthorEventModel } from "../models/authorEvent.model.js";
import { createSchema, listQuerySchema, countsSchema } from "../validation/authorEvent.schemas.js";
import { assertAuthorExists } from "../services/task2Client.js";

export async function createEntity3(req: Request, res: Response) {
  const data = createSchema.parse(req.body);

  // 1) validate Entity1 exists via Task2
  await assertAuthorExists(data.authorId);

  // 2) time field may be missing -> set automatically
  const occurredAt = data.occurredAt ?? new Date();

  // 3) create in Mongo
  const doc = await AuthorEventModel.create({
    authorId: data.authorId,
    type: data.type,
    title: data.title,
    message: (req.body as { message?: string }).message ?? null/
    occurredAt,
    payload: data.payload,
  });

  res.status(201).json(doc);
}

export async function listEntity3(req: Request, res: Response) {
  const q = listQuerySchema.parse(req.query);

  const size = q.size ?? 5;
  const from = q.from ?? 0;

  const docs = await AuthorEventModel.find({ authorId: q.entity1Id })
    .sort({ occurredAt: -1 }) // latest first
    .skip(from)
    .limit(size)
    .lean();

  res.json(docs);
}

export async function countsEntity3(req: Request, res: Response) {
  const body = countsSchema.parse(req.body);

  // aggregation (no loading documents)
  const agg = await AuthorEventModel.aggregate([
    { $match: { authorId: { $in: body.entity1Ids } } },
    { $group: { _id: "$authorId", count: { $sum: 1 } } },
  ]);

  const result: Record<string, number> = {};
  for (const id of body.entity1Ids) result[String(id)] = 0;
  for (const row of agg) result[String(row._id)] = Number(row.count);

  res.json(result);
}
