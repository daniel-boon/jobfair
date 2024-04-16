const Company = require("../models/Company");

exports.register = async (req, res, next) => {
  try {
    const { companyName, companyPhone, companyDescription, picture } = req.body;

    //create user
    const company = await Company.create({
      companyName,
      companyPhone,
      companyDescription,
      picture,
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
