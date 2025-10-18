"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendarController_1 = require("../controllers/calendarController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/auth/google", auth_1.authenticate, calendarController_1.getGoogleAuthUrl);
router.get("/oauth2callback", calendarController_1.handleGoogleCallback);
exports.default = router;
//# sourceMappingURL=calendarRoutes.js.map