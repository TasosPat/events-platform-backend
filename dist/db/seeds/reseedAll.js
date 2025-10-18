"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seedFirebaseUsers_1 = __importDefault(require("./seedFirebaseUsers"));
const fetchFirebaseUsers_1 = __importDefault(require("./fetchFirebaseUsers"));
const clearFirebaseUsers_1 = __importDefault(require("./clearFirebaseUsers"));
const seed_1 = __importDefault(require("./seed"));
const data_1 = require("../data");
async function reseedAll() {
    try {
        // 1. Clear Firebase
        console.log('Deleting Firebase users...');
        await (0, clearFirebaseUsers_1.default)();
        // 2. Seed Firebase
        console.log('Seeding Firebase users...');
        await (0, seedFirebaseUsers_1.default)();
        // 3. Fetch Firebase users
        const firebaseUsers = await (0, fetchFirebaseUsers_1.default)();
        // 4. Seed local DB
        console.log('Seeding local DB...');
        await (0, seed_1.default)(firebaseUsers, data_1.events, data_1.attendances);
        console.log('Full reseed complete!');
    }
    catch (err) {
        console.error('❌ Error during reseed:', err);
    }
}
if (require.main === module) {
    reseedAll();
}
//# sourceMappingURL=reseedAll.js.map