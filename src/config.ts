export const config = {
  PORT: Number(process.env.PORT ?? 3001),
  MONGO_URI: process.env.MONGO_URI ?? "mongodb://localhost:27017/task4_author_events",
  TASK2_BASE_URL: process.env.TASK2_BASE_URL ?? "http://localhost:8080",
};
