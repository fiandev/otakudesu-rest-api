import { Router } from "express";
import { index } from "./info.controller.js";

const router = Router();


router.get("/", index);

export default router;