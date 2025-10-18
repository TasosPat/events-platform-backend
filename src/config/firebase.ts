import admin from "firebase-admin";
// import serviceAccount from "../../firebase-service-account.json";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!);

if (process.env.NODE_ENV !== "test") {
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
console.log("Firebase initialized ✅");
}

export default admin;
