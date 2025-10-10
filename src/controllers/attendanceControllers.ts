import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from "../types/index";
import { fetchAttendancesByEvent, fetchAttendancesByUser } from "../models/attendanceModels";
import { addAttendance, removeAttendance } from "../models/attendanceModels";

export async function getAttendancesByEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        const attendees = await fetchAttendancesByEvent(Number(id));
        res.status(200).json(attendees);
    } catch (err) {
        next(err);
    } 
}

export async function getAttendancesByUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        if (!req.user || !req.user.dbUser) {
            res.status(401).json({ msg: "User not authenticated" });
            return;
        }
        const { user_id } = req.user.dbUser;

        if (user_id !== Number(id)) {
            res.status(400).json({ msg: "Unable to access other users attendances" });
            return;
          }
        const eventsAttended = await fetchAttendancesByUser(user_id);
        res.status(200).json(eventsAttended);
    } catch (err) {
        next(err);
    } 
}

export async function createAttendance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        if (!req.user || !req.user.dbUser) {
            res.status(401).json({ msg: "User not authenticated" });
            return;
        }
        const { user_id } = req.user.dbUser;

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

export async function deleteAttendance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        if (!req.user || !req.user.dbUser) {
            res.status(401).json({ msg: "User not authenticated" });
            return;
        }
        const { user_id } = req.user.dbUser;
        if (!user_id) {
            res.status(400).json({ msg: "User ID is required" });
            return;
          }
    
          const removed = await removeAttendance(Number(user_id), Number(id));

          if (!removed) {
            res.status(404).json({ msg: "Attendance not found" });
            return;
          }
    
        res.status(200).json({ message: "Attendance removed" });
      } catch (err) {
        next(err)
      }
}