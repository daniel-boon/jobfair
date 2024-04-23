const express = require("express");
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyByPhone,
  getCompanyInfoByUserId
} = require("../controllers/companies");

const router = express.Router();

// Middleware to protect routes
const { protect } = require("../middleware/auth");

// GET all companies (Public access)
router.get("/getCompanies", getCompanies);

// GET a single company by ID (Public access)
router.get("/getCompany/:id", getCompany);

// POST a new company (Protected)
// router.post("/createCompany", protect, createCompany);
router.post("/createCompany", createCompany);
// PUT to update a company by ID (Protected)
// router.put("/updateCompany/:id", protect, updateCompany);
router.put("/updateCompany/:id", updateCompany);
// DELETE a company by ID (Protected)
// router.delete("/deleteCompany/:id", protect, deleteCompany);
router.delete("/deleteCompany/:id", deleteCompany);
router.get('/phone/:phone', getCompanyByPhone);
router.get('/getCompanyInfoByUserId/:userId', getCompanyInfoByUserId);
module.exports = router;
