const express = require("express");
const router = express.Router();
const {
  getBookingDetailsByUser,
  getBookingDetailsForAdmin,
} = require("../controllers/bookingsEventsCompanies");

const { protect } = require("../middleware/auth");

router.get(
  "/getBookingDetailsByUser/:userId",
  protect,
  /* protect, authorize('user', 'admin'), */ getBookingDetailsByUser
);

router.get(
  "/getBookingDetailsForAdmin/:userId",
  protect,
  /* protect, authorize('user', 'admin'), */ getBookingDetailsForAdmin
);
module.exports = router;
