const express = require("express");
const router = express.Router();
const {
  getBookingDetailsByUser,
  getBookingDetailsForAdmin
} = require("../controllers/bookingsEventsCompanies");

router.get(
  "/getBookingDetailsByUser/:userId",
  /* protect, authorize('user', 'admin'), */ getBookingDetailsByUser
);

router.get(
  "/getBookingDetailsForAdmin/:userId",
  /* protect, authorize('user', 'admin'), */ getBookingDetailsForAdmin
);
module.exports = router;
