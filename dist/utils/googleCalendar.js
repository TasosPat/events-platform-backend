"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCOPES = exports.oauth2Client = void 0;
exports.getAuthUrl = getAuthUrl;
exports.getTokens = getTokens;
exports.addEventToCalendar = addEventToCalendar;
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
const ENV = process.env.NODE_ENV || "development";
dotenv_1.default.config({ path: `.env.${ENV}` });
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI; // e.g., http://localhost:3000/oauth2callback
exports.oauth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// Scopes for creating calendar events
exports.SCOPES = [
    "https://www.googleapis.com/auth/calendar.events",
];
// Generate an auth URL to send the user to
function getAuthUrl(state) {
    return exports.oauth2Client.generateAuthUrl({
        access_type: "offline", // to get refresh token
        scope: exports.SCOPES,
        state
    });
}
// Exchange code for tokens
async function getTokens(code) {
    const { tokens } = await exports.oauth2Client.getToken(code);
    exports.oauth2Client.setCredentials(tokens);
    return tokens;
}
// Add event to user's calendar
async function addEventToCalendar(event) {
    const calendar = googleapis_1.google.calendar({ version: "v3", auth: exports.oauth2Client });
    const response = await calendar.events.insert({
        calendarId: "primary",
        requestBody: event,
    });
    return response.data;
}
//# sourceMappingURL=googleCalendar.js.map