import { app } from "./app.js";
import { connectDb } from "./db.js";
import { config } from "./config.js";

async function bootstrap() {
  await connectDb();
  app.listen(config.PORT, () => console.log(`Task4 running on http://localhost:${config.PORT}`));
}

bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});
