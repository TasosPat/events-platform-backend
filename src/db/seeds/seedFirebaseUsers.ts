import admin from "../../config/firebase";
import firebaseUsers from "../data/firebaseUsers"

export default async function seedFirebaseUsers() {
  for (const user of firebaseUsers) {
    try {
      const existing = await admin.auth().getUserByEmail(user.email).catch(() => null);
      if (existing) {
      console.log(`ℹ️ User ${user.email} already exists, skipping creation.`);
      continue;
      }

       await admin.auth().createUser({
        email: user.email,
        password: user.password,
        displayName: user.displayName,
      });
      console.log(`✅ Created Firebase user: ${user.email}`);
    } catch (err: any) {
      console.error(`❌ Error creating user ${user.email}:`, err.message);
    }
  }
}
if (require.main === module) {
  seedFirebaseUsers().catch(console.error);
}
