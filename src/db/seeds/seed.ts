import db from '../db'
import format from 'pg-format';
import { NewEvent } from '../../models/Event';
import { NewUser } from '../../models/User';
import { NewAttendance } from '../../models/Attendance';

const seed = async (users: NewUser[], events: NewEvent[], attendances: NewAttendance[]) : Promise<void> => {
    try {
        await db.query('DROP TABLE IF EXISTS attendances;')
        await db.query('DROP TABLE IF EXISTS events;')
        await db.query('DROP TABLE IF EXISTS users;')
        await db.query(`
            CREATE TABLE users (
              user_id SERIAL PRIMARY KEY,
              name VARCHAR(256) NOT NULL,
              role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'staff')),
              description VARCHAR(2048) NOT NULL
            );
          `)
        await db.query(`
        CREATE TABLE events (
          event_id SERIAL PRIMARY KEY,
          title VARCHAR(512) NOT NULL,
          description VARCHAR(2048) NOT NULL,
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          location VARCHAR(2048) NOT NULL,
          price NUMERIC(10,2)
        );
      `)
      await db.query(`
        CREATE TABLE attendances (
        event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        PRIMARY KEY (event_id, user_id)
        );
      `)
      if (users.length) {
        const usersInsertQuery = format(
          `INSERT INTO users (name, role, description) VALUES %L RETURNING *;`,
          users.map(({ name, role, description }) => [
            name,
            role,
            description
          ])
        );
      await db.query(usersInsertQuery)
        console.log('✅ Users seeded successfully!');
    }
      if (events.length) {
        const eventsInsertQuery = format(
          `INSERT INTO events (title, description, date, location, price) VALUES %L RETURNING *;`,
          events.map(({ title, description, date, location, price }) => [
            title,
            description,
            date,
            location,
            price
          ])
        );
      await db.query(eventsInsertQuery)
        console.log('✅ Events seeded successfully!');
    }
    if (attendances.length) {
        const attInsertQuery = format(
          `INSERT INTO attendances (user_id, event_id) VALUES %L RETURNING *;`,
          attendances.map(({ user_id, event_id }) => [
            user_id,
            event_id
          ])
        );
      await db.query(attInsertQuery)
        console.log('✅ Attendances seeded successfully!');
    }
}
    catch(err) {
        console.error('❌ Error seeding database:', err);
    }
}

export default seed;
