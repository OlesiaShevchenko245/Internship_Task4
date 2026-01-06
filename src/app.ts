import express from "express";
import { entity3Router } from "./routes/entity3.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

export const app = express();

app.use(express.json());
app.use(entity3Router);
app.use(errorMiddleware);
