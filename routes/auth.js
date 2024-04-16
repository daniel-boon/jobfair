const express = require("express");
const {
  register,
  login,
  getLoggedInUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

//POST {{URL}}/api/v1/auth/register
router.post("/register", register);

//POST {{URL}}/api/v1/auth/login
router.post("/login", login);

//GET {{URL}}/api/v1/auth/getLoggedInUser
router.get("/getLoggedInUser", protect, getLoggedInUser);

//GET {{URL}}/api/v1/auth/users
router.get("/users", getUsers);

router.route("/user/:id").put(updateUser).delete(deleteUser);

module.exports = router;
