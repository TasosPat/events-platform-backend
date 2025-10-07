import admin from "../config/firebase"
import { Request, Response, NextFunction } from 'express';
import { fetchUsers, fetchUserByID, insertUser } from "../models/userModels";
import { User, SignUpRequest } from '../types';

  export async function createUser(req: Request<{}, {}, SignUpRequest>, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        res.status(400).json({ msg: 'Missing required fields' });
        return;
      }
  
      // 1. Create user in Firebase
      const firebaseUser = await admin.auth().createUser({
        email,
        password,
        displayName: name
      });
      console.log("Firebase user created:", firebaseUser.uid);
  
      // 2. Insert user into your database
      const newUser = await insertUser({
        uid: firebaseUser.uid,
        name,
        role: 'user', // default role
      });
  
      res.status(201).json(newUser);
    } catch (err) {
        console.error("Firebase createUser error:", err);
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