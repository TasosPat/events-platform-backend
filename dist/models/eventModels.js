"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchEvents = fetchEvents;
exports.fetchEventByID = fetchEventByID;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.modifyEvent = modifyEvent;
const db_1 = __importDefault(require("../db/db"));
const eventStr = `event_id,
  title,
  description,
  to_char(date, 'YYYY-MM-DD') AS date,
  location,
  price,
  start_time,
  end_time`;
async function fetchEvents() {
    const query = `SELECT ${eventStr} FROM events ORDER BY event_id ASC`;
    const { rows } = await db_1.default.query(query);
    return rows;
}
async function fetchEventByID(event_id) {
    if (!event_id) {
        return null;
    }
    const query = `SELECT ${eventStr} FROM events WHERE event_id=$1`;
    const args = [event_id];
    const { rows } = await db_1.default.query(query, args);
    if (!rows[0]) {
        throw {
            status: 404,
            msg: `No event found for event_id: ${event_id}`,
        };
    }
    return rows[0];
}
async function addEvent(newEvent) {
    const { title, description, date, location, price, start_time, end_time } = newEvent;
    const query = `INSERT INTO events (title, description, date, location, price, start_time, end_time)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;`;
    const args = [title, description, date, location, price, start_time, end_time];
    const { rows } = await db_1.default.query(query, args);
    if (!rows[0]) {
        throw new Error("Failed to insert event");
    }
    return rows[0];
}
async function removeEvent(event_id) {
    const query = `DELETE FROM events WHERE event_id = $1 RETURNING *;`;
    const args = [event_id];
    const { rows } = await db_1.default.query(query, args);
    if (!rows[0]) {
        throw {
            status: 400,
            msg: "This Event doesn't exist",
        };
    }
    return rows[0];
}
async function modifyEvent(newEvent, event_id) {
    const { title, description, date, location, price, start_time, end_time } = newEvent;
    const result = await db_1.default.query(`UPDATE events 
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         date = COALESCE($3, date),
         location = COALESCE($4, location),
         price = COALESCE($5, price),
         start_time = COALESCE($6, start_time),
         end_time = COALESCE($7, end_time)
     WHERE event_id = $8
     RETURNING *;`, [title, description, date, location, price, start_time, end_time, event_id]);
    return result.rows[0];
}
//# sourceMappingURL=eventModels.js.map