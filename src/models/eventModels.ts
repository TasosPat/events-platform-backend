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
  const { title, description, date, location, price, start_time, end_time } = newEvent;
  const query = `INSERT INTO events (title, description, date, location, price, start_time, end_time)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;`;
  const args = [title, description, date, location, price, start_time, end_time];
  const { rows } = await db.query<Event>(query, args);
  if (!rows[0]) {
    throw new Error("Failed to insert event");
  }
  return rows[0];
}

export async function removeEvent(event_id: number) {
  const query = `DELETE FROM events WHERE event_id = $1 RETURNING *;`;
    const args = [event_id];
    const { rows } = await db.query<Event>(query, args);
    if (!rows[0]) {
      throw {
        status: 400,
        msg: "This Event doesn't exist",
      }
    }
    return rows[0];
}

export async function modifyEvent(newEvent: NewEvent, event_id: number) {
  const { title, description, date, location, price, start_time, end_time } = newEvent;
  const result = await db.query(
    `UPDATE events 
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         date = COALESCE($3, date),
         location = COALESCE($4, location),
         price = COALESCE($5, price),
         start_time = COALESCE($6, start_time),
         end_time = COALESCE($7, end_time)
     WHERE event_id = $8
     RETURNING *;`,
    [title, description, date, location, price, start_time, end_time, event_id]
  );
  
  return result.rows[0];
}