import { Request, Response, NextFunction } from 'express';
import { fetchEvents, fetchEventByID } from "../models/eventModels";

export async function getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        
    } catch (err) {
        next(err);
    } 
}

export async function getEventByID(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        
    } catch (err) {
        next(err);
    } 
}

