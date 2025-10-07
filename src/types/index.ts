export interface NewUser {
    uid: string;
    name: string;
    role: "user" | "staff";
    description?: string;
  }

  export interface User extends NewUser {
    id: number;
  }

export interface NewEvent {
    title: string;
    description: string;
    date: string; // ISO format (YYYY-MM-DD)
    location: string;
    price?: number; // optional, since some events are free
  }

  export interface Event extends NewEvent {
    id: number;
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
  };
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}