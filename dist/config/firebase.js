"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// import serviceAccount from "../../firebase-service-account.json";
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
if (process.env.NODE_ENV !== "test") {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount),
    });
    console.log("Firebase initialized ✅");
}
exports.default = firebase_admin_1.default;
//# sourceMappingURL=firebase.js.map