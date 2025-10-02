import { Router } from "express";
import { getEvents, getEventByID, createEvent } from "../controllers/eventControllers";

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventByID);
router.post("/", createEvent);

export default router;
