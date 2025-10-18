"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleAuthUrl = getGoogleAuthUrl;
exports.handleGoogleCallback = handleGoogleCallback;
const googleCalendar_1 = require("../utils/googleCalendar");
const eventModels_1 = require("../models/eventModels");
const stateStore_1 = require("../utils/stateStore");
const AppError_1 = require("../errors/AppError");
// Step 1: Generate the Google OAuth URL
function getGoogleAuthUrl(req, res) {
    const eventId = Number(req.query.eventId);
    if (!req.user)
        return res.status(401).json({ msg: "Unauthorized" });
    const { uid } = req.user; // your authenticate middleware adds this
    if (!eventId)
        return res.status(400).json({ msg: "Event ID missing" });
    const state = (0, stateStore_1.createState)(uid, eventId); // store user+event temporarily
    const url = (0, googleCalendar_1.getAuthUrl)(state);
    res.json({ url }); // frontend redirects the user here
}
// Step 2: Handle callback from Google
async function handleGoogleCallback(req, res, next) {
    try {
        const code = req.query.code;
        const state = req.query.state;
        if (!code || !state) {
            return res.status(400).json({ msg: "Authorization code or state missing" });
        }
        const data = (0, stateStore_1.consumeState)(state);
        if (!data) {
            throw new AppError_1.AppError("Invalid or expired state", 400);
        }
        const { uid, eventId } = data;
        // Exchange code for tokens
        const tokens = await (0, googleCalendar_1.getTokens)(code);
        // decode the state to get uid and eventId
        const eventData = await (0, eventModels_1.fetchEventByID)(Number(eventId));
        if (!eventData)
            throw new AppError_1.AppError("Event not found", 404);
        const startDateTime = `${eventData.date}T${eventData.start_time}`;
        const endDateTime = `${eventData.date}T${eventData.end_time}`;
        const calendarEvent = {
            summary: eventData.title,
            description: eventData.description,
            start: {
                dateTime: startDateTime,
                timeZone: "Europe/London"
            },
            end: {
                dateTime: endDateTime,
                timeZone: "Europe/London"
            },
        };
        // Insert into Google Calendar
        const createdEvent = await (0, googleCalendar_1.addEventToCalendar)(calendarEvent);
        res.redirect(createdEvent.htmlLink);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=calendarController.js.map