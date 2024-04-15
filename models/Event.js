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
    type: String,
    required: [true, "Please add a jobs position"],
  },
  slot: {
    type: String,
    required: [true, "Please add slot for interview"],
  },
  companyID: {
    type: String,
    required: [true, "Please add a company ID"],
  },
});

module.exports = mongoose.model("Event", EventSchema);
