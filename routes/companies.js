const express = require("express");
const {
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanyByPhone,
  getCompanyInfoByUserId,
} = require("../controllers/companies");

const router = express.Router();

// Middleware to protect routes
const { protect } = require("../middleware/auth");

// GET all companies (Public access)
router.get("/getCompanies", protect, getCompanies);

// GET a single company by ID (Public access)
router.get("/getCompany/:id", protect, getCompany);

// POST a new company (Protected)
// router.post("/createCompany", protect, createCompany);
router.post("/createCompany", protect, createCompany);
// PUT to update a company by ID (Protected)
// router.put("/updateCompany/:id", protect, updateCompany);
router.put("/updateCompany/:id", protect, updateCompany);
// DELETE a company by ID (Protected)
// router.delete("/deleteCompany/:id", protect, deleteCompany);
router.delete("/deleteCompany/:id", protect, deleteCompany);
router.get("/phone/:phone", protect, getCompanyByPhone);
router.get("/getCompanyInfoByUserId/:userId", protect, getCompanyInfoByUserId);
module.exports = router;
