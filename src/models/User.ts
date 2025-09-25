// src/models/User.ts
export interface NewUser {
    name: string;
    role: "user" | "staff";
    description?: string;
  }

  export interface User extends NewUser {
    id: number;
  }