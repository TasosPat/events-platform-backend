import { Request, Response, NextFunction } from "express";
import { createUserProgrammatically } from "../controllers/userControllers";
import { AppError } from "../errors/AppError";

export async function createStaff(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password, secretKey } = req.body;

    // Protect endpoint with a secret key
    if (secretKey !== process.env.ADMIN_SECRET) {
      throw new AppError("Forbidden", 403)
    }

    const newStaff = createUserProgrammatically(name, email, password, "staff");

    res.status(201).json(newStaff);
  } catch (err) {
    next(err);
  }
}
