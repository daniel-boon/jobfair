const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyID: {
    type: String,
    required: [true, "please add a companyID"],
  },
  companyName: {
    type: String,
    required: [true, "please add a company name"],
  },
  companyPhone: {
    type: String,
    required: [true, "Please add a company phone number"],
  },
  companyDescription: {
    type: String,
    required: [true, "Please add a company description "],
  },
  picture: {
    type: Buffer,
    required: false,
  },
});

module.exports = mongoose.model("Company", CompanySchema);
