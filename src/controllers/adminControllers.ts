import { Request, Response, NextFunction } from "express";
import { createUserProgrammatically } from "../controllers/userControllers";

export async function createStaff(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password, secretKey } = req.body;

    // Protect endpoint with a secret key
    if (secretKey !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ msg: "Forbidden" });
    }

    const newStaff = createUserProgrammatically(name, email, password, "staff");

    res.status(201).json(newStaff);
  } catch (err) {
    console.error("Error creating staff:", err);
    next(err);
  }
}
