const express = require("express");
const {
  register,
  login,
  getLoggedInUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
  testUpload,
  updateUserResume,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

// const multer = require('multer');

// Configure multer to store files in memory
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

//POST {{URL}}/api/v1/auth/register
router.post("/register", register);

//POST {{URL}}/api/v1/auth/login
router.post("/login", login);

//GET {{URL}}/api/v1/auth/getLoggedInUser
router.get("/getLoggedInUser", protect, getLoggedInUser);

// Route to update user's resume
router.patch("/resume/:userId", updateUserResume);

//GET {{URL}}/api/v1/auth/users
router.get("/users", getUsers);

router.route("/user/:id").delete(deleteUser).get(getUserById);

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.put("/user/:id", upload.any(), updateUser);

module.exports = router;
