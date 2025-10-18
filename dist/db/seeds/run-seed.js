"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seed_1 = __importDefault(require("./seed"));
const db_1 = __importDefault(require("../db"));
const events_1 = require("../data/events");
const dbUsers_1 = require("../data/dbUsers");
const attendances_1 = require("../data/attendances");
const runSeed = async () => {
    try {
        await (0, seed_1.default)(dbUsers_1.dbUsers, events_1.events, attendances_1.attendances);
        await db_1.default.end(); // Close the database connection
        console.log('✅ Database seeding complete');
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
    }
};
runSeed();
//# sourceMappingURL=run-seed.js.map