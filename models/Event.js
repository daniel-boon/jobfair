const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: [true, "Please add an event title"],
  },
  eventDescription: {
    type: String,
    required: [true, "Please add an event description"],
  },
  jobs: {
    type: [String],
    required: [true, "Please add jobs positions"],
  },
  slot: {
    type: [
      {
        date: {
          type: String, // Making this optional for this function, remove if not needed
        },
        startTime: {
          type: String,
          required: [true, "Please add a start time for the slot"],
        },
        endTime: {
          type: String,
          required: [true, "Please add an end time for the slot"],
        },
        label: {
          type: String,
          required: [true, "Please add a label for the slot"],
        },
      },
    ],
    required: [true, "Please add slots for interviews"],
  },
  companyID: {
    type: mongoose.Schema.Types.ObjectId, // Use ObjectId for referencing another document
    required: [true, "Please add a company ID"],
    ref: 'Company' // Assuming you have a Company model
  },
});

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;
