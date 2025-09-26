import { Router } from "express";
import { getAttendancesByEvent, getAttendancesByUser } from "../controllers/attendanceControllers";

const router = Router();

router.get("/events/:id", getAttendancesByEvent);
router.get("/users/:id", getAttendancesByUser);

export default router;