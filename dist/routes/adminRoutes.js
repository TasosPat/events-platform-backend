"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminControllers_1 = require("../controllers/adminControllers");
const router = (0, express_1.Router)();
router.post("/create-staff", adminControllers_1.createStaff);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map