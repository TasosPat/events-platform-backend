import { Request, Response, NextFunction } from "express";
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
    req.user = {
        uid: decoded.uid,
        email: decoded.email,
        role: decoded.role || "user", // pull role from your DB if you store it separately
      };
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}
