import admin from "../config/firebase";

export default async function clearFirebaseUsers() {
  let nextPageToken: string | undefined = undefined;

  do {
    const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
    const uids = listUsersResult.users.map(u => u.uid);
    if (uids.length) {
      await admin.auth().deleteUsers(uids);
      console.log(`✅ Deleted ${uids.length} Firebase users`);
    }
    nextPageToken = listUsersResult.pageToken;
  } while (nextPageToken);

  console.log("🎉 All Firebase users cleared!");
}

if (require.main === module) {
    clearFirebaseUsers().catch(console.error);
  }
