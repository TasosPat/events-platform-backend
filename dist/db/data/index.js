"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendances = exports.events = exports.testUsers = exports.dbUsers = void 0;
const dbUsers_1 = require("./dbUsers");
Object.defineProperty(exports, "dbUsers", { enumerable: true, get: function () { return dbUsers_1.dbUsers; } });
const events_1 = require("./events");
Object.defineProperty(exports, "events", { enumerable: true, get: function () { return events_1.events; } });
const attendances_1 = require("./attendances");
Object.defineProperty(exports, "attendances", { enumerable: true, get: function () { return attendances_1.attendances; } });
const testUsers_1 = __importDefault(require("./testUsers"));
exports.testUsers = testUsers_1.default;
//# sourceMappingURL=index.js.map