import { Router } from "express";
import homeRouter from "./home/index.js"
const router = Router();

router.use("/home", homeRouter);

export default router;
