import { Request, Response, NextFunction } from "express";
import { getAuthUrl, getTokens, addEventToCalendar } from "../utils/googleCalendar";

// Step 1: Generate the Google OAuth URL
export function getGoogleAuthUrl(req: Request, res: Response) {
  const url = getAuthUrl();
  res.json({ url }); // frontend redirects the user here
}

// Step 2: Handle callback from Google
export async function handleGoogleCallback(req: Request, res: Response, next: NextFunction) {
  try {
    const code = req.query.code as string;
    if (!code) {
      return res.status(400).json({ msg: "Authorization code missing" });
    }

    // Exchange code for tokens
    const tokens = await getTokens(code);

    // Example event data
    const event = {
      summary: "Test Event",
      description: "This event was added from our app 🚀",
      start: {
        dateTime: "2025-10-04T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2025-10-04T10:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    };

    // Insert into Google Calendar
    const createdEvent = await addEventToCalendar(event);

    res.status(201).json({ msg: "Event added to calendar", event: createdEvent, tokens });
  } catch (err) {
    next(err);
  }
}
