import db from '../db/db'
import { Event, NewEvent } from "../types";

export async function fetchEvents(): Promise<Event[]> {
    const query = `SELECT * FROM events ORDER BY event_id ASC`;
    const { rows } = await db.query(query);
    return rows;
}

export async function fetchEventByID(event_id: number): Promise<Event | null> {
    if(!event_id) {
        return null;
    }
    const query = `SELECT * FROM events WHERE event_id=$1`;
    const args = [event_id];
    const { rows } = await db.query<Event>(query, args);
    if (!rows[0]) {
        throw {
          status: 404,
          msg: `No event found for event_id: ${event_id}`,
        };
      }
    return rows[0];
}

export async function addEvent(newEvent: NewEvent): Promise<Event> {
  const { title, description, date, location, price } = newEvent;
  const query = `INSERT INTO events (title, description, date, location, price)
  VALUES
  ($1, $2, $3, $4, $5)
    RETURNING *;`;
  const args = [title, description, date, location, price];
  const { rows } = await db.query<Event>(query, args);
  if (!rows[0]) {
    throw new Error("Failed to insert event");
  }
  return rows[0];
}