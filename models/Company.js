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
});

module.exports = mongoose.model("Company", CompanySchema);
