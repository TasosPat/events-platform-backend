export interface NewUser {
    uid: string;
    name: string;
    role: "user" | "staff";
    email: string;
    description?: string;
}
export interface User extends NewUser {
    user_id: number;
}
export interface NewEvent {
    title: string;
    description: string;
    date: string;
    location: string;
    price?: number;
    start_time: string;
    end_time: string;
}
export interface Event extends NewEvent {
    event_id: number;
}
export interface NewAttendance {
    event_id: number;
    user_id: number;
}
export interface Attendance extends NewAttendance {
    id: number;
}
import { Request } from "express";
export interface AuthenticatedRequest extends Request {
    user?: {
        uid: string;
        email: string;
        role: "staff" | "user";
        dbUser?: User;
    };
}
export interface SignUpRequest {
    name: string;
    email: string;
    password: string;
    role: "user" | "staff";
}
//# sourceMappingURL=index.d.ts.map