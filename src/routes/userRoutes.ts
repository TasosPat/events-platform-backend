import { Router } from "express";
import { getUsers, getMe, getUserByID, createUser, updateUserProfile } from "../controllers/userControllers";
import { authenticate } from "../middleware/auth"

const router = Router();

router.get("/", authenticate, getUsers);
router.get("/me", authenticate, getMe);
router.get("/:id", authenticate, getUserByID);
router.post("/", createUser);
router.patch("/", authenticate, updateUserProfile);

export default router;
