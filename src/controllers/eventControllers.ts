import { Request, Response, NextFunction } from 'express';
import { fetchEvents, fetchEventByID } from "../models/eventModels";

export async function getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const events = await fetchEvents();
        res.status(200).json(events);
    } catch (err) {
        next(err);
    } 
}

export async function getEventByID(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { event_id } = req.params;
        if (!event_id) {
            throw { msg: 'Event ID is missing', status: 400 };
          }
        const event = await fetchEventByID(Number(event_id));
        res.status(200).json(event);
    } catch (err) {
        next(err);
    } 
}

