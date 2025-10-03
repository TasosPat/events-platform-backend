import { Router } from "express";
import { getGoogleAuthUrl, handleGoogleCallback } from "../controllers/calendarController";

const router = Router();

router.get("/auth/google", getGoogleAuthUrl);
router.get("/oauth2callback", handleGoogleCallback);

export default router;
