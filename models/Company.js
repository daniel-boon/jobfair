const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
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
  companyEmail: {
    type: String,
    required: false,
  },
  companyWebsite: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Company", CompanySchema);
