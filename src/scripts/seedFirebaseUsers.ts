import admin from "../config/firebase";
import { insertUser } from "../models/userModels";
import { getRoleForEmail } from "../utils/roles"

async function seedFirebaseUsers() {
  const users = [
    { email: "staff1@example.com", password: "password123", displayName: "Staff One", role: "staff" },
    { email: "user1@example.com", password: "password123", displayName: "User One", role: "user" },
  ] as const;

  for (const user of users) {
    try {
      // Create in Firebase
      const firebaseUser = await admin.auth().createUser({
        email: user.email,
        password: user.password,
        displayName: user.displayName,
      });
      const role = getRoleForEmail(firebaseUser.email);

      console.log(`✅ Firebase user created: ${user.displayName} (${user.role})`);

      // Insert into DB
      await insertUser({
        uid: firebaseUser.uid,
        name: user.displayName,
        role: user.role,
      });
    } catch (err: any) {
      if (err.code === "auth/email-already-exists") {
        console.warn(`⚠️ User ${user.email} already exists in Firebase, skipping.`);
      } else {
        console.error("Error creating user:", err);
      }
    }
  }

  console.log("🎉 Seeding complete.");
  process.exit(0);
}

seedFirebaseUsers();
