// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  // Handle custom AppError subclasses
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Handle PostgreSQL errors
  if (err.code) {
    switch (err.code) {
      case "23505": // Unique violation
        return res.status(409).json({ success: false, message: "Duplicate entry" });
      case "23503": // Foreign key violation
        return res.status(400).json({ success: false, message: "Foreign key constraint failed" });
      case "22001": // Value too long for column
        return res.status(400).json({ success: false, message: "Value too long for column" });
      case "23514": // Check constraint violation
        return res.status(400).json({ success: false, message: "Check constraint violated" });
      default:
        return res.status(500).json({ success: false, message: "Database error" });
    }
  }

  // Handle Firebase Auth errors
  if (err.code?.startsWith("auth/")) {
    switch (err.code) {
      case "auth/user-not-found":
        return res.status(404).json({ success: false, message: "Firebase user not found" });
      case "auth/email-already-exists":
        return res.status(409).json({ success: false, message: "Email already exists" });
      case "auth/invalid-password":
        return res.status(400).json({ success: false, message: "Invalid password" });
      case "auth/invalid-email":
        return res.status(400).json({ success: false, message: "Invalid email" });
      default:
        return res.status(500).json({ success: false, message: "Firebase error" });
    }
  }

  // Fallback for unexpected errors
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
