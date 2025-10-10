import { Router } from "express";
import { getEvents, getEventByID, createEvent } from "../controllers/eventControllers";
import { createAttendance, deleteAttendance } from "../controllers/attendanceControllers";
import { checkRole } from "../middleware/checkRole";
import { authenticate } from "../middleware/auth"

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEventByID);
router.post("/", authenticate, checkRole("staff"), createEvent);
router.post("/:id/attendances", authenticate, createAttendance);
router.delete("/:id/attendances", authenticate, deleteAttendance);


export default router;
