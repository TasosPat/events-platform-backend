"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = seedFirebaseUsers;
const firebase_1 = __importDefault(require("../../config/firebase"));
const firebaseUsers_1 = __importDefault(require("../data/firebaseUsers"));
async function seedFirebaseUsers() {
    for (const user of firebaseUsers_1.default) {
        try {
            const existing = await firebase_1.default.auth().getUserByEmail(user.email).catch(() => null);
            if (existing) {
                console.log(`ℹ️ User ${user.email} already exists, skipping creation.`);
                continue;
            }
            await firebase_1.default.auth().createUser({
                email: user.email,
                password: user.password,
                displayName: user.displayName,
            });
            console.log(`✅ Created Firebase user: ${user.email}`);
        }
        catch (err) {
            console.error(`❌ Error creating user ${user.email}:`, err.message);
        }
    }
}
if (require.main === module) {
    seedFirebaseUsers().catch(console.error);
}
//# sourceMappingURL=seedFirebaseUsers.js.map