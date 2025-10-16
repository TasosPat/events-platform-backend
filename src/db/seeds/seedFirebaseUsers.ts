import admin from "../../config/firebase";

const testUsers = [
  { email: "alice@test.com", password: "password123", displayName: "Alice", role: "user" },
  { email: "bob@test.com", password: "password123", displayName: "Bob", role: "staff" },
];

export default async function seedFirebaseUsers() {
  for (const user of testUsers) {
    try {
      const createdUser = await admin.auth().createUser({
        email: user.email,
        password: user.password,
        displayName: user.displayName,
      });
      await admin.auth().setCustomUserClaims(createdUser.uid, { role: user.role });
      console.log(`✅ Created Firebase user: ${user.email}`);
    } catch (err: any) {
      console.error(`❌ Error creating user ${user.email}:`, err.message);
    }
  }
}
if (require.main === module) {
  seedFirebaseUsers().catch(console.error);
}
