const Booking = require("../models/Booking");

// @desc Add a booking
// @route POST /api/v1/bookings
// @access Private
exports.addBooking = async (req, res, next) => {
  try {
    const { userID, eventID } = req.body;
    const booking = await Booking.create({
      userID,
      eventID,
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};

// @desc Get all bookings
// @route GET /api/v1/bookings
// @access Public
exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res
      .status(200)
      .json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Get single booking
// @route GET /api/v1/bookings/:id
// @access Public
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res
        .status(404)
        .json({ success: false, error: "No booking found" });

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Update a booking
// @route PUT /api/v1/bookings/:id
// @access Private
exports.updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!booking)
      return res
        .status(404)
        .json({ success: false, error: "No booking found to update" });

    res.status(200).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc Delete a booking
// @route DELETE /api/v1/bookings/:id
// @access Private
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking)
      return res
        .status(404)
        .json({ success: false, error: "No booking found to delete" });

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};
