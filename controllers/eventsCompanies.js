const Company = require("../models/Company");
const Event = require("../models/Event");

exports.getEventWithCompany = async (req, res) => {
  try {
    // Fetch the event by ID
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Fetch the company using the companyID from the event
    const company = await Company.findById(event.companyID);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Respond with both event details and company picture in base64 if exists
    res.status(200).json({
      event: {
        title: event.eventTitle,
        description: event.eventDescription,
        jobs: event.jobs,
        slots: event.slot,
      },
      companyPicture: company.picture
        ? `data:image/jpeg;base64,${company.picture.toString("base64")}`
        : null,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
