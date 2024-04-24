const Event = require("../models/Event");
const User = require("../models/User"); // ensure path is correct
const Company = require("../models/Company"); // ensure path is correct

exports.register = async (req, res, next) => {
  try {
    const { eventTitle, eventDescription, jobs, slot, companyID } = req.body;

    const event = await Event.create({
      eventTitle,
      eventDescription,
      jobs,
      slot,
      companyID,
    });
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};

//@desc Get all events
//@route Get /api/v1/events
//@access Public
exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Get single events
//@route Get /api/v1/events/:id
//@access Public
exports.getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!Event) return res.status(400).json({ success: false });

    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Update single Event
//@route PUT /api/v1/events/:id
//@access Private
exports.updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!Event) return res.status(400).json({ success: false });

    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Delete single Event
//@route DELETE /api/v1/events/:ids
//@access Private
exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!Event) res.status(400).json({ success: false });
    res.status(200).json({ success: true, data: [] });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Create a Event
//@route POST /api/v1/events
//@access Private
// Function to create an event based on the provided payload and schema
exports.createEvent = async (req, res) => {
  try {
    // Destructuring the request body to ensure all required fields are present
    const { eventTitle, eventDescription, jobs, slot, companyID } = req.body;

    // Validate the presence of all required fields
    if (!eventTitle || !eventDescription || !jobs || !slot || !companyID) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields in the request"
      });
    }

    // Creating the event using the Event model
    const event = await Event.create({
      eventTitle,
      eventDescription,
      jobs,
      slot,
      companyID
    });

    // Sending a success response back
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (err) {
    console.error("Error creating the event:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while creating event"
    });
  }
};



// @desc Get all events for a company based on user ID
// @route GET /api/v1/users/:userId/events
// @access Private (usually should be private if sensitive data involved)
exports.getEventsByUserId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const company = await Company.findOne({ companyPhone: user.telPhone });
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found for this user" });
    }

    const events = await Event.find({ companyID: company._id });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
