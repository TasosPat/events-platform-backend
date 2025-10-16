import admin from "../../config/firebase";
import { NewUser } from "../../types";

export default async function fetchFirebaseUsers(): Promise<NewUser[]> {
    let allUsers: NewUser[] = [];
  let nextPageToken: string | undefined = undefined;
  do {
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
  const usersPage = listUsersResult.users.map(u => ({
    uid: u.uid,
    name: u.displayName || "No Name",
    email: u.email || "no-email@example.com",
    role: (u.customClaims?.role === "staff" ? "staff" : "user") as "staff" | "user",
    description: "",
  }));

  allUsers = allUsers.concat(usersPage);
  nextPageToken = listUsersResult.pageToken; 
} while (nextPageToken);

return allUsers;
}
