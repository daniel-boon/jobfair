const express = require("express");
const router = express.Router();

// Import the controller function
const { getAllDetailsByCompanyID } = require("../controllers/adminCompany");
const { protect } = require("../middleware/auth");
// Route to get all bookings, event, and user details by company ID
router.get(
  "/getAllDetailsByCompanyID/:companyID",
  protect,
  /* protect, authorize('admin'), */ getAllDetailsByCompanyID
);

module.exports = router;
