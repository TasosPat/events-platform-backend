"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStaff = createStaff;
const userControllers_1 = require("../controllers/userControllers");
const AppError_1 = require("../errors/AppError");
async function createStaff(req, res, next) {
    try {
        const { name, email, password, secretKey } = req.body;
        // Protect endpoint with a secret key
        if (secretKey !== process.env.ADMIN_SECRET) {
            throw new AppError_1.AppError("Forbidden", 403);
        }
        const newStaff = (0, userControllers_1.createUserProgrammatically)(name, email, password, "staff");
        res.status(201).json(newStaff);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=adminControllers.js.map