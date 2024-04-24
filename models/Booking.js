const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId, // Assuming userID is stored as an ObjectId
    required: [true, "Please add a user ID"],
    ref: 'User' // Reference to the User model
  },
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add an event ID"],
    ref: 'Event' // Reference to the Event model
  },
  slotID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please add a slot ID"],
    ref: 'Event.slot' // Assuming you want to reference a specific slot in the event
  },
  jobPosition: {
    type: String,
    required: [true, "Please add a job position"],
  }
});

module.exports = mongoose.model("Booking", BookingSchema);
