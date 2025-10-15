import { Request, Response, NextFunction } from 'express';
import { fetchEvents, fetchEventByID, addEvent } from "../models/eventModels";
import { NewEvent } from "../types"

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
        const { id } = req.params;
        if (!id) {
            throw { msg: 'Event ID is missing', status: 400 };
          }
        const event = await fetchEventByID(Number(id));
        res.status(200).json(event);
    } catch (err) {
        next(err);
    } 
}

export async function createEvent(req: Request<{}, {}, NewEvent>, res: Response, next: NextFunction): Promise<void> {
    try {
        const { title, description, date, location, price, start_time, end_time } = req.body;

        if (!title || !description || !location) {
            res.status(400).json({ msg: "Missing required fields" });
            return;
          }
        const event = await addEvent(req.body);

        res.status(201).json(event);
    } catch (err) {
        next(err);
    } 
}


