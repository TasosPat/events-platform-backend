jest.mock('firebase-admin', () => ({
  auth: jest.fn().mockReturnThis(),
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
}));

  import request from "supertest";
  import db from "../db/db"
  import seed from "../db/seeds/seed"
  import app from "../app";
  import { testUsers, events, attendances } from "../db/data/"
  import admin from "firebase-admin";
  // import { getFakeToken, resetAuthMocks } from '../utils/testUtils'

let staffToken: string;
let userToken: string;

beforeAll(async () => {
  // resetAuthMocks();
  await seed(testUsers, events, attendances); // reseed DB with test data
  // staffToken = getFakeToken("staff");
  // userToken = getFakeToken("user");
});

afterAll(async () => {
  await db.end();
});

describe("Events routes", () => {
  it("GET /events should return all events", async () => {
    const res = await request(app).get("/api/events");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.upcoming)).toBe(true);
    expect(Array.isArray(res.body.past)).toBe(true);
  });

  it("GET /events/:id should return a single event", async () => {
    const res = await request(app).get("/api/events/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("event_id", 1);
  });

  it("POST /events should allow staff to create event", async () => {
    admin.auth().verifyIdToken = jest.fn().mockResolvedValueOnce({
      uid: '1',
      email: 'alice@test.com'
    });
    const res = await request(app)
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
    admin.auth().verifyIdToken = jest.fn().mockResolvedValueOnce({
      uid: '2',
      email: 'bob@test.com'
    });
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer fakeToken`)
      .send({ title: "Fail Event" });
    expect(res.status).toBe(403);
  });

  it("PATCH /events/:id should update event by staff", async () => {
    admin.auth().verifyIdToken = jest.fn().mockResolvedValueOnce({
      uid: '1',
      email: 'alice@test.com'
    });
    const res = await request(app)
      .patch("/api/events/1")
      .set("Authorization", `Bearer fakeToken`)
      .send({ title: "Updated Event" });
    expect(res.status).toBe(200);
    expect(res.body.event.title).toBe("Updated Event");
  });

  it("DELETE /events/:id should delete event by staff", async () => {
    admin.auth().verifyIdToken = jest.fn().mockResolvedValueOnce({
      uid: '1',
      email: 'alice@test.com'
    });
    const res = await request(app)
      .delete("/api/events/1")
      .set("Authorization", `Bearer fakeToken`);
    expect(res.status).toBe(200);
  });
});
