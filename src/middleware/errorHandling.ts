import { Request, Response, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction)
{
    const status = err.status || 500;
    const msg = err.msg || "Internal server error";
    res.status(status).json({ msg });
  };
  