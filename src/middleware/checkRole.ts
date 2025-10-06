import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/index"

export function checkRole(requiredRole: "staff" | "user") {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ msg: "User not authenticated" });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ msg: `This action is only allowed for ${requiredRole === "staff" ? "staff members" : requiredRole + "s"}`  });
    }
    next();
  };
}
