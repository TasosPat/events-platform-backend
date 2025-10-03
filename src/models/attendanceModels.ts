import db from '../db/db'
import { User, Attendance } from "../types";

export async function fetchAttendancesByEvent(event_id: number): Promise<User[]> {
    const query = `SELECT u.* FROM attendances a JOIN users u ON a.user_id = u.user_id WHERE a.event_id = $1`;
    const args = [event_id];
    const { rows } = await db.query<User>(query, args);
    return rows;
}

export async function fetchAttendancesByUser(user_id: number): Promise<Event[]> {
    const query = `SELECT e.* FROM attendances a JOIN events e ON a.event_id = e.event_id WHERE a.user_id = $1`;
    const args = [user_id];
    const { rows } = await db.query<Event>(query, args);
    return rows;
}

export async function addAttendance(user_id: number, event_id: number): Promise<Attendance> {
    const query = `INSERT INTO attendances (event_id, user_id)
    VALUES
    ($1, $2)
    ON CONFLICT (user_id, event_id) DO NOTHING
      RETURNING *;`;
    const args = [event_id, user_id];
    const { rows } = await db.query<Attendance>(query, args);
    if (!rows[0]) {
      throw {
        status: 400,
        msg: "User already attending this event",
      }
    }
    return rows[0];
  }