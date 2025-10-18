"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = getEvents;
exports.getEventByID = getEventByID;
exports.createEvent = createEvent;
exports.deleteEvent = deleteEvent;
exports.editEvent = editEvent;
const eventModels_1 = require("../models/eventModels");
const AppError_1 = require("../errors/AppError");
async function getEvents(req, res, next) {
    try {
        const now = new Date();
        const events = await (0, eventModels_1.fetchEvents)();
        const upcoming = events.filter((event) => {
            const eventDate = new Date(event.date);
            const datePart = eventDate.toISOString().split("T")[0]; // "YYYY-MM-DD"
            const endTime = new Date(`${datePart}T${event.end_time}`);
            return endTime >= now;
        });
        const past = events.filter(event => !upcoming.includes(event));
        res.status(200).json({ upcoming, past });
    }
    catch (err) {
        next(err);
    }
}
async function getEventByID(req, res, next) {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError_1.AppError("Event ID is missing", 400);
        }
        const event = await (0, eventModels_1.fetchEventByID)(Number(id));
        res.status(200).json(event);
    }
    catch (err) {
        next(err);
    }
}
async function createEvent(req, res, next) {
    try {
        const { title, description, date, location, price, start_time, end_time } = req.body;
        if (!title || !description || !location) {
            throw new AppError_1.AppError("Missing required fields", 400);
        }
        const event = await (0, eventModels_1.addEvent)(req.body);
        res.status(201).json(event);
    }
    catch (err) {
        next(err);
    }
}
async function deleteEvent(req, res, next) {
    try {
        const { id } = req.params;
        if (!id) {
            throw { msg: 'Event ID is missing', status: 400 };
        }
        const result = await (0, eventModels_1.removeEvent)(Number(id));
        if (!result)
            throw new AppError_1.AppError("Event not found!", 404);
        res.json({ msg: "Event deleted successfully" });
    }
    catch (err) {
        next(err);
    }
}
async function editEvent(req, res, next) {
    const { id } = req.params;
    if (!id) {
        throw { msg: 'Event ID is missing', status: 400 };
    }
    const { title, description, date, location, price, start_time, end_time } = req.body;
    try {
        const event = await (0, eventModels_1.modifyEvent)({ title, description, date, location, price, start_time, end_time }, Number(id));
        if (!event) {
            throw new AppError_1.AppError("Event not found!", 404);
        }
        res.json({
            msg: "Event updated successfully",
            event
        });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=eventControllers.js.map