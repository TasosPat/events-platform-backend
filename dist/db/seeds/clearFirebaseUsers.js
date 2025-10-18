"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = clearFirebaseUsers;
const firebase_1 = __importDefault(require("../../config/firebase"));
async function clearFirebaseUsers() {
    let nextPageToken = undefined;
    do {
        const listUsersResult = await firebase_1.default.auth().listUsers(1000, nextPageToken);
        const uids = listUsersResult.users.map(u => u.uid);
        if (uids.length) {
            await firebase_1.default.auth().deleteUsers(uids);
            console.log(`✅ Deleted ${uids.length} Firebase users`);
        }
        nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);
    console.log("🎉 All Firebase users cleared!");
}
if (require.main === module) {
    clearFirebaseUsers().catch(console.error);
}
//# sourceMappingURL=clearFirebaseUsers.js.map