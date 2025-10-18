"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.mock('firebase-admin', () => ({
    auth: jest.fn().mockReturnThis(),
    initializeApp: jest.fn(),
    credential: {
        cert: jest.fn(),
    },
}));
const supertest_1 = __importDefault(require("supertest"));
const db_1 = __importDefault(require("../db/db"));
const seed_1 = __importDefault(require("../db/seeds/seed"));
const app_1 = __importDefault(require("../app"));
const data_1 = require("../db/data/");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// import { getFakeToken, resetAuthMocks } from '../utils/testUtils'
let staffToken;
let userToken;
beforeAll(async () => {
    // resetAuthMocks();
    await (0, seed_1.default)(data_1.testUsers, data_1.events, data_1.attendances); // reseed DB with test data
    // staffToken = getFakeToken("staff");
    // userToken = getFakeToken("user");
});
afterAll(async () => {
    await db_1.default.end();
});
describe("Events routes", () => {
    it("GET /events should return all events", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get("/api/events");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.upcoming)).toBe(true);
        expect(Array.isArray(res.body.past)).toBe(true);
    });
    it("GET /events/:id should return a single event", async () => {
        const res = await (0, supertest_1.default)(app_1.default).get("/api/events/1");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("event_id", 1);
    });
    it("POST /events should allow staff to create event", async () => {
        firebase_admin_1.default.auth().verifyIdToken = jest.fn().mockResolvedValueOnce({
            uid: '1',
            email: 'alice@test.com'
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/events")
            .set("Authorization", `Bearer fakeToken`)
            .send({
            title: "Test Event",
            description: "Test Description",
            date: "2025-10-15",
            location: "Test Location",
            start_time: "10:00:00",
            end_time: "12:00:00",
        });
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("title", "Test Event");
    });
    it("POST /events should block normal users", async () => {
        firebase_admin_1.default.auth().verifyIdToken = jest.fn().mockResolvedValueOnce({
            uid: '2',
            email: 'bob@test.com'
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/events")
            .set("Authorization", `Bearer fakeToken`)
            .send({ title: "Fail Event" });
        expect(res.status).toBe(403);
    });
    it("PATCH /events/:id should update event by staff", async () => {
        firebase_admin_1.default.auth().verifyIdToken = jest.fn().mockResolvedValueOnce({
            uid: '1',
            email: 'alice@test.com'
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .patch("/api/events/1")
            .set("Authorization", `Bearer fakeToken`)
            .send({ title: "Updated Event" });
        expect(res.status).toBe(200);
        expect(res.body.event.title).toBe("Updated Event");
    });
    it("DELETE /events/:id should delete event by staff", async () => {
        firebase_admin_1.default.auth().verifyIdToken = jest.fn().mockResolvedValueOnce({
            uid: '1',
            email: 'alice@test.com'
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .delete("/api/events/1")
            .set("Authorization", `Bearer fakeToken`);
        expect(res.status).toBe(200);
    });
});
//# sourceMappingURL=events.test.js.map