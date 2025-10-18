"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendancesByEvent = getAttendancesByEvent;
exports.getAttendancesByUser = getAttendancesByUser;
exports.createAttendance = createAttendance;
exports.deleteAttendance = deleteAttendance;
const attendanceModels_1 = require("../models/attendanceModels");
const attendanceModels_2 = require("../models/attendanceModels");
const AppError_1 = require("../errors/AppError");
async function getAttendancesByEvent(req, res, next) {
    try {
        const { id } = req.params;
        const attendees = await (0, attendanceModels_1.fetchAttendancesByEvent)(Number(id));
        res.status(200).json(attendees);
    }
    catch (err) {
        next(err);
    }
}
async function getAttendancesByUser(req, res, next) {
    try {
        const { id } = req.params;
        if (!req.user || !req.user.dbUser) {
            throw new AppError_1.AppError("User not authenticated", 401);
        }
        const { user_id } = req.user.dbUser;
        if (user_id !== Number(id)) {
            throw new AppError_1.AppError("Unable to access other users attendances", 400);
        }
        const eventsAttended = await (0, attendanceModels_1.fetchAttendancesByUser)(user_id);
        res.status(200).json(eventsAttended);
    }
    catch (err) {
        next(err);
    }
}
async function createAttendance(req, res, next) {
    try {
        const { id } = req.params;
        if (!req.user || !req.user.dbUser) {
            throw new AppError_1.AppError("User not authenticated", 401);
        }
        const { user_id } = req.user.dbUser;
        if (!user_id) {
            throw new AppError_1.AppError("User ID is required", 400);
        }
        const attendance = await (0, attendanceModels_2.addAttendance)(Number(user_id), Number(id));
        res.status(201).json(attendance);
    }
    catch (err) {
        next(err);
    }
}
async function deleteAttendance(req, res, next) {
    try {
        const { id } = req.params;
        if (!req.user || !req.user.dbUser) {
            throw new AppError_1.AppError("User not authenticated", 401);
        }
        const { user_id } = req.user.dbUser;
        if (!user_id) {
            throw new AppError_1.AppError("User ID is required", 400);
        }
        const removed = await (0, attendanceModels_2.removeAttendance)(Number(user_id), Number(id));
        if (!removed) {
            throw new AppError_1.AppError("Attendance not found", 404);
        }
        res.status(200).json({ message: "Attendance removed" });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=attendanceControllers.js.map