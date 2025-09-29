import { Request, Response, NextFunction } from 'express';
import { fetchAttendancesByEvent, fetchAttendancesByUser } from "../models/attendanceModels";

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