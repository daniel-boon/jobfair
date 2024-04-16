const Event = require("../models/Event");

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
exports.createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
