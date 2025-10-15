import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/index"
import { getAuthUrl, getTokens, addEventToCalendar } from "../utils/googleCalendar";
import { fetchEventByID } from "../models/eventModels"
import { createState, consumeState } from "../utils/stateStore";

// Step 1: Generate the Google OAuth URL
export function getGoogleAuthUrl(req: AuthenticatedRequest, res: Response) {
  const eventId = Number(req.query.eventId);
  if (!req.user) return res.status(401).json({ msg: "Unauthorized" });
  const { uid } = req.user; // your authenticate middleware adds this
  if (!eventId) return res.status(400).json({ msg: "Event ID missing" });

  const state = createState(uid, eventId); // store user+event temporarily
  const url = getAuthUrl(state);
  res.json({ url }); // frontend redirects the user here
}

// Step 2: Handle callback from Google
export async function handleGoogleCallback(req: Request, res: Response, next: NextFunction) {
  try {
    const code = req.query.code as string;
    const state = req.query.state as string;
    if (!code || !state) {
      return res.status(400).json({ msg: "Authorization code or state missing" });
    }
    const data = consumeState(state);
    if (!data) {
      return res.status(400).json({ msg: "Invalid or expired state" });
    }

    const { uid, eventId } = data;

    // Exchange code for tokens
    const tokens = await getTokens(code);

    // decode the state to get uid and eventId
    const eventData = await fetchEventByID(Number(eventId));
    if (!eventData) return res.status(404).json({ msg: "Event not found" });
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
    const createdEvent = await addEventToCalendar(calendarEvent);

    res.redirect(createdEvent.htmlLink!);
  } catch (err) {
    next(err);
  }
}
