import { Router } from "express";
import { getEvents, getEventByID, createEvent } from "../controllers/eventControllers";
import { createAttendance } from "../controllers/attendanceControllers";
import { checkRole } from "../middleware/checkRole";

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventByID);
router.post("/", checkRole("staff"), createEvent);
router.post("/:id/attendances", checkRole("user"), createAttendance);

export default router;
