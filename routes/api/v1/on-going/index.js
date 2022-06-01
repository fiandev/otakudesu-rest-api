import { Router } from "express";
import { index } from "./onGoing.controller.js";

const router = Router();

router.get("/", index);

export default router;