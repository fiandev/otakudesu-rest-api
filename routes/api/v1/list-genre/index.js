import { Router } from "express";
import { index } from "./genre.controller.js";

const router = Router();

router.get("/", index);

export default router;