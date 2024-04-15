const express = require("express");
const {
  addBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookings");

const router = express.Router();

// Middleware to protect routes
const { protect } = require("../middleware/auth");

// POST a new booking (Protected)
router.post("/", protect, addBooking);

// GET all bookings (Public)
router.get("/", getBookings);

// GET a single booking by ID (Public)
router.get("/:id", getBooking);

// PUT to update a booking by ID (Protected)
router.put("/:id", protect, updateBooking);

// DELETE a booking by ID (Protected)
router.delete("/:id", protect, deleteBooking);

module.exports = router;
