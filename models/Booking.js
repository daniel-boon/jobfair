const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: [true, "please add a user ID"],
  },
  eventID: {
    type: String,
    required: [true, "Please add a event ID"],
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
