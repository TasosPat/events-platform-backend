import db from '../db/db'
import { User, NewUser } from "../types";

export async function fetchUsers(): Promise<User[]> {
    return [];
}

export async function fetchUserByID(userID: number): Promise<User | null> {
    return null;
}