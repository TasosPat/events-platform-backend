import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from "../types/index";
import { fetchAttendancesByEvent, fetchAttendancesByUser } from "../models/attendanceModels";
import { addAttendance, removeAttendance } from "../models/attendanceModels";
import { AppError } from "../errors/AppError";

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
            throw new AppError("User not authenticated", 401)
        }
        const { user_id } = req.user.dbUser;

        if (user_id !== Number(id)) {
            throw new AppError("Unable to access other users attendances", 400)
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
            throw new AppError("User not authenticated", 401)
        }
        const { user_id } = req.user.dbUser;

        if (!user_id) {
            throw new AppError("User ID is required", 400)
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
            throw new AppError("User not authenticated", 401)
        }
        const { user_id } = req.user.dbUser;
        if (!user_id) {
            throw new AppError("User ID is required", 400)
          }
    
          const removed = await removeAttendance(Number(user_id), Number(id));

          if (!removed) {
            throw new AppError("Attendance not found", 404)
          }
    
        res.status(200).json({ message: "Attendance removed" });
      } catch (err) {
        next(err)
      }
}