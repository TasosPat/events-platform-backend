import { Router } from "express";
import { createStaff } from "../controllers/adminControllers";

const router = Router();

router.post("/create-staff", createStaff);

export default router;