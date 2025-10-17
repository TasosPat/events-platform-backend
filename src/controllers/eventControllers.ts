import { Request, Response, NextFunction } from 'express';
import { fetchEvents, fetchEventByID, addEvent, removeEvent, modifyEvent } from "../models/eventModels";
import { NewEvent } from "../types"
import { AppError } from "../errors/AppError";

export async function getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const now = new Date();
        const events = await fetchEvents();
        const upcoming = events.filter((event) => {
            const eventDate = new Date(event.date);
            const datePart = eventDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
            const endTime = new Date(`${datePart}T${event.end_time}`)
            return endTime >= now;
        })
        const past = events.filter(event => !upcoming.includes(event));
       
        res.status(200).json({ upcoming, past });
    } catch (err) {
        next(err);
    } 
}

export async function getEventByID(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError("Event ID is missing", 400)
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
            throw new AppError("Missing required fields", 400)
          }
        const event = await addEvent(req.body);

        res.status(201).json(event);
    } catch (err) {
        next(err);
    } 
}

export async function deleteEvent(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        if (!id) {
            throw { msg: 'Event ID is missing', status: 400 };
          }
        const result = await removeEvent(Number(id));
        if (!result) throw new AppError("Event not found!", 404)

    res.json({ msg: "Event deleted successfully" });
    } catch (err) {
        next(err);
    } 
}

export async function editEvent(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) {
        throw { msg: 'Event ID is missing', status: 400 };
      }
     const { title, description, date, location, price, start_time, end_time } = req.body;
    try {
       const event = await modifyEvent({ title, description, date, location, price, start_time, end_time }, Number(id))

       if (!event) {
        throw new AppError("Event not found!", 404)
      }

       res.json({
        msg: "Event updated successfully",
        event
      });
    } catch (err: any) {
        next(err);
    } 
}


