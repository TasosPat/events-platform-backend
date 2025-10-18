import { User, NewUser } from "../types";
export declare function insertUser(newUser: NewUser): Promise<User>;
export declare function fetchUsers(): Promise<User[]>;
export declare function fetchUserByID(user_id: number): Promise<User | null>;
export declare function editUser(uid: string, displayName?: string, email?: string, description?: string): Promise<any>;
//# sourceMappingURL=userModels.d.ts.map