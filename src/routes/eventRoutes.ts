import { Router } from "express";
import { getEvents, getEventByID, createEvent, deleteEvent, editEvent } from "../controllers/eventControllers";
import { createAttendance, deleteAttendance } from "../controllers/attendanceControllers";
import { checkRole } from "../middleware/checkRole";
import { authenticate } from "../middleware/auth"

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventByID);
router.post("/", authenticate, checkRole("staff"), createEvent);
router.delete("/:id", authenticate, checkRole("staff"), deleteEvent);
router.patch("/:id", authenticate, checkRole("staff"), editEvent);
router.post("/:id/attendances", authenticate, createAttendance);
router.delete("/:id/attendances", authenticate, deleteAttendance);


export default router;
