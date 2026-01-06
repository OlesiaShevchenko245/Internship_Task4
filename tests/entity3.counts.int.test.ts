import request from "supertest";
import nock from "nock";
import { app } from "../src/app";
import { AuthorEventModel } from "../src/models/authorEvent.model";
import { startMongo, stopMongo, clearMongo } from "./mongoTestUtils";

beforeAll(async () => startMongo());
afterAll(async () => stopMongo());
beforeEach(async () => {
  await clearMongo();
  nock.cleanAll();
});

test("POST /api/entity3/_counts -> returns counts for each authorId", async () => {
  await AuthorEventModel.create([
    { authorId: 1, type: "SYSTEM", title: "a", occurredAt: new Date() },
    { authorId: 1, type: "SYSTEM", title: "b", occurredAt: new Date() },
    { authorId: 2, type: "SYSTEM", title: "c", occurredAt: new Date() },
  ]);

  const res = await request(app)
    .post("/api/entity3/_counts")
    .send({ entity1Ids: [1, 2, 3, 4, 5] })
    .expect(200);

  expect(res.body).toEqual({ "1": 2, "2": 1, "3": 0, "4": 0, "5": 0 });
});

test("POST /api/entity3/_counts -> 400 validation error for empty array", async () => {
  const res = await request(app)
    .post("/api/entity3/_counts")
    .send({ entity1Ids: [] })
    .expect(400);

  expect(res.body.error).toBe("VALIDATION_ERROR");
});
