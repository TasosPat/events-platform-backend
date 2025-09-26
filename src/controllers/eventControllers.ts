import { Request, Response, NextFunction } from 'express';
import { fetchEvents, fetchEventByID } from "../models/eventModels";

export async function getEvents(req: Request, res: Response, next: NextFunction): Promise<any> {
    
}

export async function getEventByID(req: Request, res: Response, next: NextFunction): Promise<any> {

}

