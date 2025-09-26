import { Router } from "express";
import { getUsers, getUserByID } from "../controllers/userControllers";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserByID);

export default router;
