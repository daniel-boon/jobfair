// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const { getEventWithCompany } = require("../controllers/eventsCompanies");

const { protect } = require("../middleware/auth");

// Route that uses the controller function
router.get("/getEventsCompany/:eventId", protect, getEventWithCompany);

module.exports = router;
