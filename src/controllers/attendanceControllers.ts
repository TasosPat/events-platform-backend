import { Request, Response, NextFunction } from 'express';
import { fetchAttendancesByEvent, fetchAttendancesByUser } from "../models/attendanceModels";
import { addAttendance } from "../models/attendanceModels";
import { NewAttendance } from "../types"

export async function getAttendancesByEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        const attendees = await fetchAttendancesByEvent(Number(id));
        res.status(200).json(attendees);
    } catch (err) {
        next(err);
    } 
}

export async function getAttendancesByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        const eventsAttended = await fetchAttendancesByUser(Number(id));
        res.status(200).json(eventsAttended);
    } catch (err) {
        next(err);
    } 
}

export async function createAttendance(req: Request<{ id: string}, {}, NewAttendance>, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        const { user_id } = req.body;

        if (!user_id) {
            res.status(400).json({ msg: "User ID is required" });
            return;
          }
        const attendance = await addAttendance(Number(user_id), Number(id));

        res.status(201).json(attendance);
    } catch (err) {
        next(err);
    } 
}