// utils/stateStore.ts
import crypto from "crypto";

interface StateData {
  uid: string;
  eventId: number;
  expires: number;
}

// In-memory store
const tempStates = new Map<string, StateData>();

// Create a new state
export function createState(uid: string, eventId: number) {
  const state = crypto.randomUUID();
  tempStates.set(state, {
    uid,
    eventId,
    expires: Date.now() + 10 * 60 * 1000, // expires in 10 min
  });
  return state;
}

// Consume state (one-time use)
export function consumeState(state: string): StateData | null {
  const data = tempStates.get(state);
  if (!data || Date.now() > data.expires) return null;
  tempStates.delete(state); // remove after use
  return data;
}
