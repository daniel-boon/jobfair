const express = require("express");
const {
  register,
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

const router = express.Router();

// Middleware to protect routes
const { protect } = require("../middleware/auth");

// Register an event (assuming this means creating an event, might need protection)
router.post("/register", protect, register);

// Get all events (Public access)
router.get("/", getEvents);

// Get a single event by ID (Public access)
router.get("/:id", getEvent);

// Create a new event (Protected)
router.post("/", protect, createEvent);

// Update an event by ID (Protected)
router.put("/:id", protect, updateEvent);

// Delete an event by ID (Protected)
router.delete("/:id", protect, deleteEvent);

module.exports = router;
