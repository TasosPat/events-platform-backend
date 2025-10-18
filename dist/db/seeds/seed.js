"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const pg_format_1 = __importDefault(require("pg-format"));
const seed = async (users, events, attendances) => {
    try {
        await db_1.default.query('DROP TABLE IF EXISTS attendances;');
        await db_1.default.query('DROP TABLE IF EXISTS events;');
        await db_1.default.query('DROP TABLE IF EXISTS users;');
        await db_1.default.query(`
            CREATE TABLE users (
              user_id SERIAL PRIMARY KEY,
              uid VARCHAR(128) NOT NULL UNIQUE,
              name VARCHAR(256) NOT NULL,
              role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'staff')),
              description VARCHAR(2048),
              email VARCHAR(255) NOT NULL
            );
          `);
        await db_1.default.query(`
        CREATE TABLE events (
          event_id SERIAL PRIMARY KEY,
          title VARCHAR(512) NOT NULL,
          description VARCHAR(2048) NOT NULL,
          date DATE DEFAULT CURRENT_DATE,
          location VARCHAR(2048) NOT NULL,
          price NUMERIC(10,2),
          start_time TIME,
          end_time TIME
        );
      `);
        await db_1.default.query(`
        CREATE TABLE attendances (
        event_id INT REFERENCES events(event_id) ON DELETE CASCADE,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        PRIMARY KEY (event_id, user_id)
        );
      `);
        if (users.length) {
            const usersInsertQuery = (0, pg_format_1.default)(`INSERT INTO users (uid, name, role, description, email) VALUES %L RETURNING *;`, users.map(({ uid, name, role, description, email }) => [
                uid,
                name,
                role,
                description,
                email
            ]));
            await db_1.default.query(usersInsertQuery);
            console.log('✅ Users seeded successfully!');
        }
        if (events.length) {
            const eventsInsertQuery = (0, pg_format_1.default)(`INSERT INTO events (title, description, date, location, price, start_time, end_time) VALUES %L RETURNING *;`, events.map(({ title, description, date, location, price, start_time, end_time }) => [
                title,
                description,
                date,
                location,
                price,
                start_time,
                end_time
            ]));
            await db_1.default.query(eventsInsertQuery);
            console.log('✅ Events seeded successfully!');
        }
        if (attendances.length) {
            const attInsertQuery = (0, pg_format_1.default)(`INSERT INTO attendances (user_id, event_id) VALUES %L RETURNING *;`, attendances.map(({ user_id, event_id }) => [
                user_id,
                event_id
            ]));
            await db_1.default.query(attInsertQuery);
            console.log('✅ Attendances seeded successfully!');
        }
    }
    catch (err) {
        console.error('❌ Error seeding database:', err);
    }
};
exports.default = seed;
//# sourceMappingURL=seed.js.map