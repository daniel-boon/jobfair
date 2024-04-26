const Booking = require("../models/Booking");
const User = require("../models/User");
const Event = require("../models/Event");
// @desc Add a booking
// @route POST /api/v1/bookings
// @access Private
// exports.addBooking = async (req, res, next) => {
//   try {
//     const { userID, eventID } = req.body;

//     // Fetch user to check their role
//     const user = await User.findById(userID);
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     if (user.role === "user") {
//       // Count user's existing bookings if they are not an admin
//       const bookingCount = await Booking.countDocuments({ userID });
//       if (bookingCount >= 3) {
//         return res.status(400).json({
//           success: false,
//           message: "User cannot book more than 3 times",
//         });
//       }
//     }

//     // Create booking
//     const booking = await Booking.create({ userID, eventID });
//     res.status(201).json({ success: true, data: booking });
//   } catch (err) {
//     console.error(err); // Log the full error
//     res.status(500).json({
//       success: false,
//       message: err.message || "An error occurred while creating the booking",
//     });
//   }
// };
// @desc Add a booking
// @route POST /api/v1/bookings
// @access Private
// exports.addBooking = async (req, res, next) => {
//   try {
//     const { userID, eventID, slotID, jobPosition } = req.body;

//     // Fetch user to check their role
//     const user = await User.findById(userID);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     if (user.role === "user") {
//       // Count user's existing bookings if they are not an admin
//       const bookingCount = await Booking.countDocuments({ userID });
//       if (bookingCount >= 3) {
//         return res.status(400).json({
//           success: false,
//           message: "User cannot book more than 3 times",
//         });
//       }
//     }

//     // Validate that the event and slot exist
//     const event = await Event.findById(eventID);
//     if (!event) {
//       return res.status(404).json({ success: false, message: "Event not found" });
//     }

//     // Check if the slot is part of the event
//     const slot = event.slot.id(slotID); // Using Mongoose's id method to find subdocument
//     if (!slot) {
//       return res.status(404).json({ success: false, message: "Slot not found in this event" });
//     }

//     // Validate that the job position is part of the event
//     if (!event.jobs.includes(jobPosition)) {
//       return res.status(400).json({
//         success: false,
//         message: "Job position not valid for this event",
//       });
//     }

//     // Check if the slot is already booked
//     const existingBooking = await Booking.findOne({ eventID, slotID });
//     if (existingBooking) {
//       return res.status(400).json({
//         success: false,
//         message: "This slot is already booked",
//       });
//     }

//     // Create booking
//     const booking = await Booking.create({
//       userID,
//       eventID,
//       slotID,
//       jobPosition
//     });

//     res.status(201).json({ success: true, data: booking });
//   } catch (err) {
//     console.error(err); // Log the full error
//     res.status(500).json({
//       success: false,
//       message: err.message || "An error occurred while creating the booking",
//     });
//   }
// };
exports.addBooking = async (req, res, next) => {
  console.log(req.body)
  console.log('test')
  try {
    const { userID, eventID, slotID, jobPosition } = req.body;

    // Fetch user to check their role
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Restrict booking to a maximum of three for non-admin users
    if (user.role === "user") {
      const bookingCount = await Booking.countDocuments({ userID });
      if (bookingCount >= 3) {
        return res.status(400).json({
          success: false,
          message: "User cannot book more than 3 times"
        });
      }
    }

    // Validate that the event and the specified slot exist
    const event = await Event.findById(eventID).lean(); // Use lean() for faster reads when no modifications are needed
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    const slot = event.slot.find(s => s._id.toString() === slotID); // Find the slot directly in the array
    if (!slot) {
      return res.status(404).json({ success: false, message: "Slot not found in this event" });
    }

    // Ensure the job position is valid for the event
    if (!event.jobs.includes(jobPosition)) {
      return res.status(400).json({
        success: false,
        message: "Job position not valid for this event"
      });
    }

    // Check for existing bookings in the same slot to prevent double booking
    const existingBooking = await Booking.findOne({ eventID, slotID });
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "This slot is already booked"
      });
    }

    // Create the booking
    const booking = await Booking.create({
      userID,
      eventID,
      slotID,
      jobPosition
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    console.error(err); // Log the full error
    res.status(500).json({
      success: false,
      message: err.message || "An error occurred while creating the booking"
    });
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
