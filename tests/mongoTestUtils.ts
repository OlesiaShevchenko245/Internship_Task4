import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer | null = null;

export async function startMongo() {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
}

export async function stopMongo() {
  await mongoose.disconnect();
  if (mongo) await mongo.stop();
  mongo = null;
}

export async function clearMongo() {
  const collections = mongoose.connection.collections;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
}
