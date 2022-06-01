import { Router } from "express";
import { index } from "./complete.controller.js";

const router = Router();

router.get("/", index);

export default router;