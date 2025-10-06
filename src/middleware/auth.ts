import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "No token found in header" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // attach user info to request
    (req as any).user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
}
