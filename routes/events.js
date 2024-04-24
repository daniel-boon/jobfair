const express = require("express");
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByUserId
} = require("../controllers/events");

const router = express.Router();

// Middleware to protect routes
const { protect } = require("../middleware/auth");

// Get all events (Public access)
router.get("/getEvents", getEvents);

// Get a single event by ID (Public access)
router.get("/getEvent/:id", getEvent);

// Create a new event (Protected)
// router.post("/createEvent", protect, createEvent);
router.post("/createEvent", createEvent);

// Update an event by ID (Protected)
// router.put("/updateEvent/:id", protect, updateEvent);
router.put("/updateEvent/:id", updateEvent);
// Delete an event by ID (Protected)
// router.delete("/deleteEvent/:id", protect, deleteEvent);
router.delete("/deleteEvent/:id", deleteEvent);

router.get('/users/:userId', getEventsByUserId); // New route
module.exports = router;
