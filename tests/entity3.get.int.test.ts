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

test("GET /api/entity3 -> returns sorted desc by occurredAt and paginated", async () => {
  const authorId = 1;

  await AuthorEventModel.create([
    { authorId, type: "SYSTEM", title: "old", occurredAt: new Date("2025-01-01T00:00:00Z") },
    { authorId, type: "SYSTEM", title: "new", occurredAt: new Date("2026-01-01T00:00:00Z") },
    { authorId, type: "SYSTEM", title: "mid", occurredAt: new Date("2025-06-01T00:00:00Z") },
  ]);

  const res = await request(app)
    .get(`/api/entity3?entity1Id=${authorId}&size=2&from=0`)
    .expect(200);

  expect(res.body).toHaveLength(2);
  expect(res.body[0].title).toBe("new");
  expect(res.body[1].title).toBe("mid");

  const res2 = await request(app)
    .get(`/api/entity3?entity1Id=${authorId}&size=2&from=2`)
    .expect(200);

  expect(res2.body).toHaveLength(1);
  expect(res2.body[0].title).toBe("old");
});

test("GET /api/entity3 -> 400 when entity1Id missing", async () => {
  const res = await request(app)
    .get(`/api/entity3?size=5&from=0`)
    .expect(400);

  expect(res.body.error).toBe("VALIDATION_ERROR");
});
