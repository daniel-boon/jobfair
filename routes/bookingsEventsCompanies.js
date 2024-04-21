const express = require("express");
const router = express.Router();
const {
  getBookingDetailsByUser,
} = require("../controllers/bookingsEventsCompanies");

router.get(
  "/getBookingDetailsByUser/:userId",
  /* protect, authorize('user', 'admin'), */ getBookingDetailsByUser
);

module.exports = router;
