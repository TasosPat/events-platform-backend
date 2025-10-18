"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = loginUser;
const axios_1 = __importDefault(require("axios"));
const AppError_1 = require("../errors/AppError");
async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError_1.AppError("Email and password are required", 400);
        }
        const apiKey = process.env.FIREBASE_API_KEY;
        const firebaseURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
        const response = await axios_1.default.post(firebaseURL, {
            email,
            password,
            returnSecureToken: true,
        });
        const { idToken, refreshToken, expiresIn } = response.data;
        res.status(200).json({ idToken, refreshToken, expiresIn });
    }
    catch (err) {
        if (err.response?.data?.error?.message) {
            return next(new AppError_1.AppError(err.response.data.error.message, 400));
        }
        else {
            next(err);
        }
    }
}
//# sourceMappingURL=authController.js.map