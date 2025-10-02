import { Router } from "express";
import { getEvents, getEventByID, createEvent } from "../controllers/eventControllers";
import { createAttendance } from "../controllers/attendanceControllers";

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventByID);
router.post("/", createEvent);
router.post("/:id/attendances", createAttendance);

export default router;
