import { google } from "googleapis";
import dotenv from "dotenv";

const ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${ENV}` });

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!; // e.g., http://localhost:3000/oauth2callback

export const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Scopes for creating calendar events
export const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events",
];

// Generate an auth URL to send the user to
export function getAuthUrl(state: string) {
  return oauth2Client.generateAuthUrl({
    access_type: "offline", // to get refresh token
    scope: SCOPES,
    state
  });
}

// Exchange code for tokens
export async function getTokens(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

// Add event to user's calendar
export async function addEventToCalendar(event: any) {
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });
  const response = await calendar.events.insert({
    calendarId: "primary",
    requestBody: event,
  });
  return response.data;
}
