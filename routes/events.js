const express = require("express");
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const router = express.Router();

// Middleware to protect routes
const { protect } = require("../middleware/auth");

// Get all events (Public access)
router.get("/getEvents", getEvents);

// Get a single event by ID (Public access)
router.get("/getEvent/:id", getEvent);

// Create a new event (Protected)
router.post("/createEvent", protect, createEvent);

// Update an event by ID (Protected)
router.put("/updateEvent/:id", protect, updateEvent);

// Delete an event by ID (Protected)
router.delete("/deleteEvent/:id", protect, deleteEvent);

module.exports = router;
