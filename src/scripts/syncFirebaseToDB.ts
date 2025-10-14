import admin from "../config/firebase";
import { insertUser } from "../models/userModels";
import { getRoleForEmail } from "../utils/roles"

async function syncFirebaseToDB() {
  const list = await admin.auth().listUsers();
  console.log(`Found ${list.users.length} Firebase users.`);

  for (const user of list.users) {
    const role = getRoleForEmail(user.email);
    try {
      await insertUser({
        uid: user.uid,
        name: user.displayName || user.email || "Unnamed",
        role: role,
      });
      console.log(`✅ Synced user: ${user.displayName}`);
    } catch (err) {
      if ((err as any).message.includes("duplicate key")) {
        console.warn(`⚠️ Skipped existing user: ${user.displayName}`);
      } else {
        console.error(err);
      }
    }
  }

  console.log("🎉 Sync complete.");
  process.exit(0);
}

syncFirebaseToDB();
