import { Router } from "express";
import { getGoogleAuthUrl, handleGoogleCallback } from "../controllers/calendarController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/auth/google",authenticate, getGoogleAuthUrl);
router.get("/oauth2callback", handleGoogleCallback);

export default router;
