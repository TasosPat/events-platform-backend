import admin from "firebase-admin";
import serviceAccount from "../../firebase-service-account.json";

if (process.env.NODE_ENV !== "test") {
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
console.log("Firebase initialized ✅");
}

export default admin;
