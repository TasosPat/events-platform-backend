"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fetchFirebaseUsers;
const firebase_1 = __importDefault(require("../../config/firebase"));
const data_1 = require("../data");
async function fetchFirebaseUsers() {
    const allUsers = [];
    let nextPageToken = undefined;
    do {
        const listUsersResult = await firebase_1.default.auth().listUsers(1000, nextPageToken);
        const usersPage = listUsersResult.users.map(fb => {
            const dbUser = data_1.dbUsers.find(u => u.email === fb.email);
            if (!dbUser)
                console.warn(`⚠️ Firebase user ${fb.email} not found in dbUsers`);
            return {
                uid: fb.uid,
                name: fb.displayName || dbUser?.name || 'No Name',
                email: fb.email || dbUser?.email || "no-email@example.com",
                role: dbUser?.role || 'user',
                description: dbUser?.description || '',
            };
        });
        allUsers.push(...usersPage);
        nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);
    return allUsers;
}
//# sourceMappingURL=fetchFirebaseUsers.js.map