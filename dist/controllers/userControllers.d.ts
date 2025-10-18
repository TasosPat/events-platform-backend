import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from "../types";
import { SignUpRequest } from '../types';
export declare function createUser(req: Request<{}, {}, SignUpRequest>, res: Response, next: NextFunction): Promise<void>;
export declare function createUserProgrammatically(name: string, email: string, password: string, role: "user" | "staff"): Promise<import("../types").User>;
export declare function getMe(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
export declare function getUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getUserByID(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function updateUserProfile(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=userControllers.d.ts.map