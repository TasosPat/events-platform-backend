"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createState = createState;
exports.consumeState = consumeState;
// utils/stateStore.ts
const crypto_1 = __importDefault(require("crypto"));
// In-memory store
const tempStates = new Map();
// Create a new state
function createState(uid, eventId) {
    const state = crypto_1.default.randomUUID();
    tempStates.set(state, {
        uid,
        eventId,
        expires: Date.now() + 10 * 60 * 1000, // expires in 10 min
    });
    return state;
}
// Consume state (one-time use)
function consumeState(state) {
    const data = tempStates.get(state);
    if (!data || Date.now() > data.expires)
        return null;
    tempStates.delete(state); // remove after use
    return data;
}
//# sourceMappingURL=stateStore.js.map