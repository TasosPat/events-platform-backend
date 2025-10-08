import { Request, Response, NextFunction } from "express";
import db from '../db/db';
import { AuthenticatedRequest } from "../types/index"
import admin from "../config/firebase";

export async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token found in header" });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded.email) {
        return res.status(400).json({ msg: "Email is missing in token" });
      }
      
      const result = await db.query('SELECT * FROM users WHERE uid = $1', [decoded.uid]);
      const dbUser = result.rows[0];
      
      if (!dbUser) {
        // console.log('User not found, allowing POST request to create user');
       
        // If the request is a POST to create a new user, proceed
        // console.log(req.method, req.originalUrl);
        if (req.method === 'POST' && req.originalUrl === '/api/users') {
          req.user = {
            uid: decoded.uid,
            email: decoded.email,
            role: "user",
          };
          next();
          return;
        }

        // Otherwise, block access
        res.status(404).json({ msg: 'User not found, please register first' });
        return;
      }
      req.user = {
        uid: decoded.uid,
        email: decoded.email,
        role: dbUser.role,
        dbUser
      };
    
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}
