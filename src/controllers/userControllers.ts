import admin from "../config/firebase"
import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from "../types";
import { fetchUsers, fetchUserByID, insertUser, editUser } from "../models/userModels";
import { SignUpRequest } from '../types';
import { AppError } from "../errors/AppError";

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
    role,
    email
  });

  return newUser;
}

  export async function createUser(req: Request<{}, {}, SignUpRequest>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password, role } = req.body;
  
      if (!name || !email || !password || !role) {
        throw new AppError("Missing required fields", 400)
      }

      const newUser = await handleUserCreation({ name, email, password, role })
  
      res.status(201).json(newUser);
    } catch (err) {
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
        throw new AppError("User not found", 404)
      }
      res.status(200).json({
        user_id: req.user.dbUser.user_id,
        name: req.user.dbUser.name,
        role: req.user.dbUser.role,
        email: req.user.dbUser.email,
        description: req.user.dbUser.description
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
          throw new AppError("User ID is missing", 400)
          }
        const user = await fetchUserByID(Number(id));
        res.status(200).json(user);
    } catch (err) {
        next(err);
    } 
}

export async function updateUserProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user || !req.user.dbUser) {
    throw new AppError("Unauthorised!", 401)
  }
  const { uid } = req.user; // Firebase user ID
  const { displayName, email, description } = req.body;

  try {
    // Step 1️⃣: Update Firebase if sensitive fields are changing
    const updates: any = {};
    if (email) updates.email = email;
    if (displayName) updates.displayName = displayName;

    if (Object.keys(updates).length > 0) {
      await admin.auth().updateUser(uid, updates);
    }

    // Step 2️⃣: Update local DB (only fields that exist)
    const user = await editUser(uid, displayName, email, description);

    if (!user) {
      throw new AppError("User not found", 404)
    }

    // Step 3️⃣: Return updated user info
    res.json({
      msg: "Profile updated successfully",
      user
    });
  } catch (err) {
    next(err);
  }
}