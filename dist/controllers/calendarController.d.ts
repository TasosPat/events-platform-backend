import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/index";
export declare function getGoogleAuthUrl(req: AuthenticatedRequest, res: Response): Response<any, Record<string, any>> | undefined;
export declare function handleGoogleCallback(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=calendarController.d.ts.map