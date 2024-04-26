const Company = require("../models/Company");
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const { companyName, companyPhone, companyDescription, companyEmail, companyWebsite } = req.body;

    const company = await Company.create({
      companyName,
      companyPhone,
      companyDescription,
      companyEmail, 
      companyWebsite
    });
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};

//@desc Get all companies
//@route Get /api/v1/companies
//@access Public

exports.getCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find();
    res
      .status(200)
      .json({ success: true, count: companies.length, data: companies });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Get single company
//@route Get /api/v1/companies/:id
//@access Public
exports.getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) return res.status(400).json({ success: false });

    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Create a company
//@route POST /api/v1/companies
//@access Private
exports.createCompany = async (req, res, next) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Update single company
//@route PUT /api/v1/companies/:id
//@access Private
exports.updateCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!company) return res.status(400).json({ success: false });

    res.status(200).json({ success: true, data: company });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Delete single company
//@route DELETE /api/v1/companies/:id
//@access Private

exports.deleteCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(400).json({ success: false });

    res.status(200).json({ success: true, data: [] });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};


exports.getCompanyByPhone = async (req, res, next) => {
  try {
      const company = await Company.findOne({ companyPhone: req.params.phone });
      if (!company) {
          return res.status(404).json({ success: false, message: 'Company not found' });
      }
      res.status(200).json({ success: true, data: company });
  } catch (err) {
      res.status(400).json({ success: false, message: err.message });
  }
};

exports.getCompanyInfoByUserId = async (req, res, next) => {
  try {
      const userId = req.params.userId; // Correctly capture the userId from request parameters
      // console.log('user id', userId)
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
          // If no user is found, send an appropriate HTTP response
          return res.status(404).json({ success: false, message: 'User not found' });
      }

      // Use the user's phone number to find the related company
      const company = await Company.findOne({ companyPhone: user.telPhone });
      if (!company) {
          // If no company is found associated with the user's phone number
          return res.status(404).json({ success: false, message: 'No company found associated with this user\'s phone number.' });
      }

      // If a company is found, send it back in the response
      res.status(200).json({ success: true, data: company });
  } catch (error) {
      // Handle any other errors that occur
      res.status(500).json({ success: false, message: error.message });
  }
};


