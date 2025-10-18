"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAttendancesByEvent = fetchAttendancesByEvent;
exports.fetchAttendancesByUser = fetchAttendancesByUser;
exports.addAttendance = addAttendance;
exports.removeAttendance = removeAttendance;
const db_1 = __importDefault(require("../db/db"));
async function fetchAttendancesByEvent(event_id) {
    const query = `SELECT u.* FROM attendances a JOIN users u ON a.user_id = u.user_id WHERE a.event_id = $1`;
    const args = [event_id];
    const { rows } = await db_1.default.query(query, args);
    return rows;
}
async function fetchAttendancesByUser(user_id) {
    const query = `SELECT e.* FROM attendances a JOIN events e ON a.event_id = e.event_id WHERE a.user_id = $1`;
    const args = [user_id];
    const { rows } = await db_1.default.query(query, args);
    return rows;
}
async function addAttendance(user_id, event_id) {
    const query = `INSERT INTO attendances (user_id, event_id)
    VALUES
    ($1, $2)
    ON CONFLICT (user_id, event_id) DO NOTHING
      RETURNING *;`;
    const args = [user_id, event_id];
    const { rows } = await db_1.default.query(query, args);
    if (!rows[0]) {
        throw {
            status: 400,
            msg: "User already attending this event",
        };
    }
    return rows[0];
}
async function removeAttendance(user_id, event_id) {
    const query = `DELETE FROM attendances WHERE user_id = $1 AND event_id = $2 RETURNING *;`;
    const args = [user_id, event_id];
    const { rows } = await db_1.default.query(query, args);
    if (!rows[0]) {
        throw {
            status: 400,
            msg: "User not attending this event",
        };
    }
    return rows[0];
}
//# sourceMappingURL=attendanceModels.js.map