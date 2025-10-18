"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_service_account_json_1 = __importDefault(require("../../firebase-service-account.json"));
if (process.env.NODE_ENV !== "test") {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(firebase_service_account_json_1.default),
    });
    console.log("Firebase initialized ✅");
}
exports.default = firebase_admin_1.default;
//# sourceMappingURL=firebase.js.map