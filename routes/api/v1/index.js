import { Router } from "express";
import homeRouter from "./home/index.js"
import completeRouter from "./complete/index.js"
import onGoingRouter from "./on-going/index.js"
import searchRouter from "./search/index.js"
import listGenreRouter from "./list-genre/index.js"
import listAnimeRouter from "./list-anime/index.js"
import jadwalRouter from "./jadwal/index.js"
import infoRouter from "./info/index.js"
const router = Router();

router.use("/home", homeRouter);
router.use("/search", searchRouter);
router.use("/list-genre", listGenreRouter);
router.use("/list-anime", listAnimeRouter);
router.use("/jadwal", jadwalRouter);
router.use("/info", infoRouter);
router.use("/complete", completeRouter);
router.use("/on-going", onGoingRouter);


export default router;
