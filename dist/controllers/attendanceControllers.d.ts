import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from "../types/index";
export declare function getAttendancesByEvent(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getAttendancesByUser(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
export declare function createAttendance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
export declare function deleteAttendance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=attendanceControllers.d.ts.map