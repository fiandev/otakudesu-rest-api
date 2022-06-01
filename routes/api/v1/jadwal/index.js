import { Router } from "express";
import { index } from "./jadwal.controller.js";

const router = Router();


router.get("/", index);

export default router;