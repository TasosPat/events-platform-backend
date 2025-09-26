import { Request, Response, NextFunction } from 'express';
import { fetchAttendancesByEvent, fetchAttendancesByUser } from "../models/attendanceModels";

export async function getAttendancesByEvent(req: Request, res: Response, next: NextFunction): Promise<any> {
    
}

export async function getAttendancesByUser(req: Request, res: Response, next: NextFunction): Promise<any> {

}