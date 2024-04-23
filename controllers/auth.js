const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    const { name, emailAddress, password, telPhone, role } =
      req.body;

    //create user
    const user = await User.create({
      name,
      emailAddress,
      password,
      telPhone,
      role
    });

    //Create token
    // const token = user.getSignedJwtToken();
    res.status(200).json({success: true, user});
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};

//Login users
exports.login = async (req, res, next) => {
  try {
    const { emailAddress, password } = req.body;

    //Validate emailAddress & password
    if (!emailAddress || !password) {
      return res.status(400).json({
        success: false,
        msg: "Please provide an emailAddress and password",
      });
    }
    //check for user
    const user = await User.findOne({ emailAddress }).select("+password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    //Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid credentials" });
    }

    //Create token
    //const token = user.getSignedJwtToken();
    //res.status(200).json({success : true,token});
    sendTokenResponse(user, 200, res);
  } catch (err) {
    return res.status(401).json({
      success: false,
      msg: "Cannot convert emailAddress or password to string",
    });
  }
};

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  //Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

//get current loggen in user
//route POST /api/v1/auth/me
//access private
exports.getLoggedInUser = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    data: user,
  });
  console.log('get logged in', user)
};

//Get all users
exports.getUsers = async (req, res, next) => {
  try {
    const jobs = await User.find();
    res.status(200).json({ success: true, count: jobs.length, data: jobs });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// Get one user by user ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }

    // Base64 encode the picture and resume if they exist
    const pictureBase64 = user.picture ? user.picture.toString("base64") : null;
    const resumeBase64 = user.resume ? user.resume.toString("base64") : null;

    // Add the encoded fields to the user data to be returned
    const userData = {
      ...user.toObject(),
      picture: pictureBase64,
      resume: resumeBase64,
    };

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: "Error fetching user",
    });
    console.error(err.stack);
  }
};

exports.updateUser = async (req, res, next) => {
  console.log(req)
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Update user fields
    user.name = req.body.name || user.name;
    user.emailAddress = req.body.emailAddress || user.emailAddress;
    user.telPhone = req.body.telPhone || user.telPhone;
    user.role = req.body.role || user.role;

    // Handle picture update
    if (req.files) {
      req.files.forEach((file) => {
        if (file.mimetype.startsWith("image/")) {
          user.picture = file.buffer;
        }
      });
    }

    // Update resume with new job experiences
    if (req.body.resume) {
      // Assuming resume is sent as an array of job experiences
      if (Array.isArray(req.body.resume)) {
        user.resume = [...user.resume, ...req.body.resume];
      } else {
        user.resume.push(req.body.resume);  // if it's a single job experience object
      }
    }

    await user.save();  // Save the updated document

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(400).json({ success: false });
  }
};


exports.deleteUser = async (req, res, next) => {
  // res.status(200).json({success: true, msg: 'Delete hospitals ' + req.params.id});
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc Log user out / clear cookie
//@route GET/api/v1/auth/logout
//@access Private
exports.logout = async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
};

exports.updateUserResume = async (req, res) => {
  try {
    const { userId } = req.params;
    const resumeUpdates = req.body;

    // Find the user by ID and update the resume field
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { resume: resumeUpdates } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser.resume });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating resume",
      error: error.toString(),
    });
  }
};
