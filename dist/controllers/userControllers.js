"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.createUserProgrammatically = createUserProgrammatically;
exports.getMe = getMe;
exports.getUsers = getUsers;
exports.getUserByID = getUserByID;
exports.updateUserProfile = updateUserProfile;
const firebase_1 = __importDefault(require("../config/firebase"));
const userModels_1 = require("../models/userModels");
const AppError_1 = require("../errors/AppError");
async function handleUserCreation({ name, email, password, role = "user", }) {
    const firebaseUser = await firebase_1.default.auth().createUser({
        email,
        password,
        displayName: name,
    });
    const newUser = await (0, userModels_1.insertUser)({
        uid: firebaseUser.uid,
        name,
        role,
        email
    });
    return newUser;
}
async function createUser(req, res, next) {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            throw new AppError_1.AppError("Missing required fields", 400);
        }
        const newUser = await handleUserCreation({ name, email, password, role });
        res.status(201).json(newUser);
    }
    catch (err) {
        next(err);
    }
}
async function createUserProgrammatically(name, email, password, role) {
    const result = await handleUserCreation({ name, email, password, role });
    return result;
}
async function getMe(req, res, next) {
    try {
        if (!req.user || !req.user.dbUser) {
            throw new AppError_1.AppError("User not found", 404);
        }
        res.status(200).json({
            user_id: req.user.dbUser.user_id,
            name: req.user.dbUser.name,
            role: req.user.dbUser.role,
            email: req.user.dbUser.email,
            description: req.user.dbUser.description
        });
    }
    catch (err) {
        next(err);
    }
}
async function getUsers(req, res, next) {
    try {
        const users = await (0, userModels_1.fetchUsers)();
        res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
}
async function getUserByID(req, res, next) {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError_1.AppError("User ID is missing", 400);
        }
        const user = await (0, userModels_1.fetchUserByID)(Number(id));
        res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
}
async function updateUserProfile(req, res, next) {
    if (!req.user || !req.user.dbUser) {
        throw new AppError_1.AppError("Unauthorised!", 401);
    }
    const { uid } = req.user; // Firebase user ID
    const { displayName, email, description } = req.body;
    try {
        // Step 1️⃣: Update Firebase if sensitive fields are changing
        const updates = {};
        if (email)
            updates.email = email;
        if (displayName)
            updates.displayName = displayName;
        if (Object.keys(updates).length > 0) {
            await firebase_1.default.auth().updateUser(uid, updates);
        }
        // Step 2️⃣: Update local DB (only fields that exist)
        const user = await (0, userModels_1.editUser)(uid, displayName, email, description);
        if (!user) {
            throw new AppError_1.AppError("User not found", 404);
        }
        // Step 3️⃣: Return updated user info
        res.json({
            msg: "Profile updated successfully",
            user
        });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=userControllers.js.map