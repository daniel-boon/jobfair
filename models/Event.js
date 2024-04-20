const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  eventTitle: {
    type: String,
    required: [true, "please add a event title"],
  },
  eventDescription: {
    type: String,
    required: [true, "Please add a event description"],
  },
  jobs: {
    type: [String],
    required: [true, "Please add a jobs position"],
  },
  slot: {
    type: [{
      startTime: {
        type: String,
        required: [true, "Please add a start time for the slot"]
      },
      endTime: {
        type: String,
        required: [true, "Please add an end time for the slot"]
      },
      label: {
        type: String,
        required: [true, "Please add a label for the slot"]
      }
    }],  // Inline sub-schema for time slots
    required: [true, "Please add slots for interviews"],
  },
  companyID: {
    type: String,
    required: [true, "Please add a company ID"],
  },
});

module.exports = mongoose.model("Event", EventSchema);
