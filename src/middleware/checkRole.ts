import { Request, Response, NextFunction } from "express";

export function checkRole(requiredRole: "staff" | "user") {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body; // later this will be from auth token/session
    if (role !== requiredRole) {
      return res.status(403).json({ msg: `This action is only allowed for ${requiredRole === "staff" ? "staff members" : requiredRole + "s"}`  });
    }
    next();
  };
}
