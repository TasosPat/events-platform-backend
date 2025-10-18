"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendanceControllers_1 = require("../controllers/attendanceControllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/events/:id", auth_1.authenticate, attendanceControllers_1.getAttendancesByEvent);
router.get("/users/:id", auth_1.authenticate, attendanceControllers_1.getAttendancesByUser);
exports.default = router;
//# sourceMappingURL=attendanceRoutes.js.map