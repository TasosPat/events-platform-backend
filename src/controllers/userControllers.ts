import admin from "../config/firebase"
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from "../types";
import { fetchUsers, fetchUserByID, insertUser } from "../models/userModels";
import { User, SignUpRequest } from '../types';

async function handleUserCreation({
  name,
  email,
  password,
  role = "user",
}: SignUpRequest) {
  const firebaseUser = await admin.auth().createUser({
    email,
    password,
    displayName: name,
  });

  const newUser = await insertUser({
    uid: firebaseUser.uid,
    name,
    role
  });

  return newUser;
}

  export async function createUser(req: Request<{}, {}, SignUpRequest>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, role } = req.body;
  
      if (!name || !email || !password || !role) {
        res.status(400).json({ msg: 'Missing required fields' });
        return;
      }

      const newUser = await handleUserCreation({ name, email, password, role })
  
      res.status(201).json(newUser);
    } catch (err) {
        console.error("Firebase createUser error:", err);
      next(err);
    }
  }

  export async function createUserProgrammatically(
    name: string,
    email: string,
    password: string,
    role: "user" | "staff"
  ) {
    const result = await handleUserCreation({ name, email, password, role });
    return result;
  }

  export async function getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if(!req.user || !req.user.dbUser) {
        return res.status(404).json({msg: "User not found"});
      }
      res.status(200).json({
        user_id: req.user.dbUser.user_id,
        name: req.user.dbUser.name,
        role: req.user.dbUser.role,
      })
    } catch(err) {
      next(err);
    }
  }
  

export async function getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const users = await fetchUsers();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    } 
}

export async function getUserByID(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { id } = req.params;
        if (!id) {
            throw { msg: 'User ID is missing', status: 400 };
          }
        const user = await fetchUserByID(Number(id));
        res.status(200).json(user);
    } catch (err) {
        next(err);
    } 
}