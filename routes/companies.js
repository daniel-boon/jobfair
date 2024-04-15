const express = require("express");
const {
  register,
  getCompanies,
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/companies");

const router = express.Router();

// Middleware to protect routes
const { protect } = require("../middleware/auth");

// POST to register a company (assuming no need for authentication)
router.post("/register", register);

// GET all companies (Public access)
router.get("/", getCompanies);

// GET a single company by ID (Public access)
router.get("/:id", getCompany);

// POST a new company (Protected)
router.post("/", protect, createCompany);

// PUT to update a company by ID (Protected)
router.put("/:id", protect, updateCompany);

// DELETE a company by ID (Protected)
router.delete("/:id", protect, deleteCompany);

module.exports = router;
