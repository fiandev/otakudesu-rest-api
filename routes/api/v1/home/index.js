import { Router } from "express";
import { index } from "./home.controller.js";

const router = Router();

router.get("/", index);

export default router;