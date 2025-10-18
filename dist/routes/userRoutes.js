"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", auth_1.authenticate, userControllers_1.getUsers);
router.get("/me", auth_1.authenticate, userControllers_1.getMe);
router.get("/:id", auth_1.authenticate, userControllers_1.getUserByID);
router.post("/", userControllers_1.createUser);
router.patch("/", auth_1.authenticate, userControllers_1.updateUserProfile);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map