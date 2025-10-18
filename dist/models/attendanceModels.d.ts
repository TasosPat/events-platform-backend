import { User, Attendance } from "../types";
export declare function fetchAttendancesByEvent(event_id: number): Promise<User[]>;
export declare function fetchAttendancesByUser(user_id: number): Promise<Event[]>;
export declare function addAttendance(user_id: number, event_id: number): Promise<Attendance>;
export declare function removeAttendance(user_id: number, event_id: number): Promise<Attendance>;
//# sourceMappingURL=attendanceModels.d.ts.map