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
router.post("/addBooking", protect, addBooking);

// GET all bookings (Public)
router.get("/getBookings", getBookings);

// GET a single booking by ID (Public)
router.get("/getBooking/:id", getBooking);

// PUT to update a booking by ID (Protected)
router.put("/updateBooking/:id", protect, updateBooking);

// DELETE a booking by ID (Protected)
router.delete("/deleteBooking/:id", protect, deleteBooking);

module.exports = router;
