import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/index";
export declare function checkRole(requiredRole: "staff" | "user"): (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=checkRole.d.ts.map