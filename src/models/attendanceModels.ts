import db from '../db/db'
import { Attendance, NewAttendance } from "../types";

export async function fetchAttendancesByEvent(): Promise<Attendance[]> {
    return [];
}

export async function fetchAttendancesByUser(attendanceID: number): Promise<Attendance | null> {
    return null;
}