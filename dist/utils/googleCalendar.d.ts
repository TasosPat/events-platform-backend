export declare const oauth2Client: import("google-auth-library").OAuth2Client;
export declare const SCOPES: string[];
export declare function getAuthUrl(state: string): string;
export declare function getTokens(code: string): Promise<import("google-auth-library").Credentials>;
export declare function addEventToCalendar(event: any): Promise<import("googleapis").calendar_v3.Schema$Event>;
//# sourceMappingURL=googleCalendar.d.ts.map