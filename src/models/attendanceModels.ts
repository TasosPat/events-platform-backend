import db from '../db/db'
import { Attendance, NewAttendance } from "../types";

export async function fetchAttendancesByEvent(event_id: number): Promise<Attendance[]> {
    return [];
}

export async function fetchAttendancesByUser(user_id: number): Promise<Attendance[] | null> {
    return null;
}