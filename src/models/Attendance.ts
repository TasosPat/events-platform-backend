// src/models/Attendance.ts
export interface NewAttendance {
    event_id: number;
    user_id: number;
  }
  
  export interface Attendance extends NewAttendance {
    id: number;
  }