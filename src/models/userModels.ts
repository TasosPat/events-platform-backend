import db from '../db/db'
import { User, NewUser } from "../types";

export async function insertUser(newUser: NewUser): Promise<User> {
  const { uid, name, role, description } = newUser;

  const query = `
    INSERT INTO users (uid, name, role, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const args = [uid, name, role, description];
  const { rows } = await db.query<User>(query, args);
  
  if (!rows[0]) {
    throw new Error("Failed to create user in database");
  }

  return rows[0];
}


export async function fetchUsers(): Promise<User[]> {
    const query = `SELECT * FROM users ORDER BY user_id ASC`;
    const { rows } = await db.query(query);
    return rows;
}

export async function fetchUserByID(user_id: number): Promise<User | null> {
    if(!user_id) {
        return null;
    }
    const query = `SELECT * FROM users WHERE user_id=$1`;
    const args = [user_id];
    const { rows } = await db.query<User>(query, args);
    if (!rows[0]) {
        throw {
          status: 404,
          msg: `No user found for user_id: ${user_id}`,
        };
      }
    return rows[0];
}