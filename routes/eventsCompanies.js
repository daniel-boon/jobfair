// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const { getEventWithCompany } = require("../controllers/eventsCompanies");

// Route that uses the controller function
router.get("/getEventsCompany/:eventId", getEventWithCompany);

module.exports = router;
