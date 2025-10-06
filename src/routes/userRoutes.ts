import { Router } from "express";
import { getUsers, getUserByID } from "../controllers/userControllers";
import { authenticate } from "../middleware/auth"

const router = Router();

router.get("/", authenticate, getUsers);
router.get("/:id", authenticate, getUserByID);

export default router;
