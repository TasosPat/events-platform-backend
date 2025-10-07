import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction)
{

  console.error("🔥 Error caught by middleware:", err);
    const status = err.status || 500;
    const msg = err.message || err.msg || "Internal server error";
    res.status(status).json({ msg });
  };
  