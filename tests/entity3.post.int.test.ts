import request from "supertest";
import nock from "nock";
import { app } from "../src/app";
import { config } from "../src/config";
import { startMongo, stopMongo, clearMongo } from "./mongoTestUtils";

beforeAll(async () => startMongo());
afterAll(async () => stopMongo());
beforeEach(async () => {
  await clearMongo();
  nock.cleanAll();
});

test("POST /api/entity3 -> 201, sets occurredAt automatically", async () => {
  const authorId = 1;

  // мок Task2: author exists
  nock(config.TASK2_BASE_URL)
    .get(`/api/author/${authorId}`)
    .reply(200, { id: authorId });

  const res = await request(app)
    .post("/api/entity3")
    .send({ authorId, type: "SYSTEM", title: "Test event" })
    .expect(201);

  expect(res.body.authorId).toBe(authorId);
  expect(res.body.occurredAt).toBeTruthy();
  expect(res.body._id).toBeTruthy();
});

test("POST /api/entity3 -> 400 if author not found in Task2", async () => {
  const authorId = 999;

  nock(config.TASK2_BASE_URL)
    .get(`/api/author/${authorId}`)
    .reply(404);

  const res = await request(app)
    .post("/api/entity3")
    .send({ authorId, type: "SYSTEM", title: "Should fail" })
    .expect(400);

  expect(res.body.error).toBe("AUTHOR_NOT_FOUND");
});

test("POST /api/entity3 -> 400 validation error when missing fields", async () => {
  const res = await request(app)
    .post("/api/entity3")
    .send({ authorId: 1 }) // немає type/title
    .expect(400);

  expect(res.body.error).toBe("VALIDATION_ERROR");
});
