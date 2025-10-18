interface StateData {
    uid: string;
    eventId: number;
    expires: number;
}
export declare function createState(uid: string, eventId: number): `${string}-${string}-${string}-${string}-${string}`;
export declare function consumeState(state: string): StateData | null;
export {};
//# sourceMappingURL=stateStore.d.ts.map