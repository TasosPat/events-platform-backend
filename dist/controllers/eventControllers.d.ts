import { Request, Response, NextFunction } from 'express';
import { NewEvent } from "../types";
export declare function getEvents(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getEventByID(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function createEvent(req: Request<{}, {}, NewEvent>, res: Response, next: NextFunction): Promise<void>;
export declare function deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function editEvent(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=eventControllers.d.ts.map