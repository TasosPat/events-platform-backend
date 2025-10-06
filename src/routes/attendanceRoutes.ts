import { Router } from "express";
import { getAttendancesByEvent, getAttendancesByUser } from "../controllers/attendanceControllers";
import { authenticate } from "../middleware/auth"

const router = Router();

router.get("/events/:id", authenticate, getAttendancesByEvent);
router.get("/users/:id", authenticate, getAttendancesByUser);

export default router;