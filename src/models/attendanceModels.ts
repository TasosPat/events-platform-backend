import db from '../db/db'
import { User } from "../types";

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