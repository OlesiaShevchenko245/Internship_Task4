import { Router } from "express";
import { createEntity3, listEntity3, countsEntity3 } from "../controllers/entity3.controller.js";

export const entity3Router = Router();

entity3Router.post("/api/entity3", createEntity3);
entity3Router.get("/api/entity3", listEntity3);
entity3Router.post("/api/entity3/_counts", countsEntity3);
