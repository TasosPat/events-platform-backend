import { Router } from "express";
import { getEvents, getEventByID } from "../controllers/eventControllers";

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventByID);

export default router;
