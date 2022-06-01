import { Router } from "express";
import { index } from "./listAnime.controller.js";

const router = Router();


router.get("/", index);

export default router;