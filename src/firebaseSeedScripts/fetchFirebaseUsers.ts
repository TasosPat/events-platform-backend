import admin from "../config/firebase";
import { NewUser } from "../types";
import { dbUsers } from '../db/data';

export default async function fetchFirebaseUsers(): Promise<NewUser[]> {
    const allUsers: NewUser[] = [];
  let nextPageToken: string | undefined = undefined;
  do {
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
  const usersPage = listUsersResult.users.map(fb => {
    const dbUser = dbUsers.find(u => u.email === fb.email);
    if (!dbUser) console.warn(`⚠️ Firebase user ${fb.email} not found in dbUsers`);

    return  {
      uid: fb.uid,
      name: fb.displayName || dbUser?.name || 'No Name',
      email: fb.email || dbUser?.email || "no-email@example.com",
      role: dbUser?.role || 'user',
      description: dbUser?.description || '',
      };
  });
  
  allUsers.push(...usersPage);
  nextPageToken = listUsersResult.pageToken; 
} while (nextPageToken);

return allUsers;
}
