"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventControllers_1 = require("../controllers/eventControllers");
const attendanceControllers_1 = require("../controllers/attendanceControllers");
const checkRole_1 = require("../middleware/checkRole");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", eventControllers_1.getEvents);
router.get("/:id", eventControllers_1.getEventByID);
router.post("/", auth_1.authenticate, (0, checkRole_1.checkRole)("staff"), eventControllers_1.createEvent);
router.delete("/:id", auth_1.authenticate, (0, checkRole_1.checkRole)("staff"), eventControllers_1.deleteEvent);
router.patch("/:id", auth_1.authenticate, (0, checkRole_1.checkRole)("staff"), eventControllers_1.editEvent);
router.post("/:id/attendances", auth_1.authenticate, attendanceControllers_1.createAttendance);
router.delete("/:id/attendances", auth_1.authenticate, attendanceControllers_1.deleteAttendance);
exports.default = router;
//# sourceMappingURL=eventRoutes.js.map