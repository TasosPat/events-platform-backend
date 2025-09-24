import { Router } from "express";
import { events } from "../models/Event";

const router = Router();

// GET all events
router.get("/", (req, res) => {
  res.json(events);
});

// GET single event by ID
router.get("/:id", (req, res) => {
  const event = events.find(e => e.id === Number(req.params.id));
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(event);
});

export default router;
