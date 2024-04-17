const User = require("../models/User");

exports.register = async (req, res, next) => {
  try {
    const { name, emailAddress, password, telPhone, picture, role, resume } =
      req.body;

    //create user
    const user = await User.create({
      name,
      emailAddress,
      password,
      telPhone,
      picture,
      role,
      resume,
    });

    //Create token
    // const token = user.getSignedJwtToken();
    // res.status(200).json({success: true, token});
    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({ success: false });
    console.log(err.stack);
  }
};

//Login users
exports.login = async (req, res, next) => {
  const { emailAddress, password } = req.body;

  //validate email&password has been entered
  if (!emailAddress || !password) {
    return res.status(400).json({
      success: false,
      msg: "Please provide an email and password",
    });
  }

  //Check for user
  const user = await User.findOne({ emailAddress }).select("+password");

  if (!user) {
    return res.status(400).json({
      success: false,
      msg: "Invalid credentials",
    });
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      msg: "Invalid credentials",
    });
  }

  //Create token
  // const token = user.getSignedJwtToken();

  // res.status(200).json({
  //     success: true,
  //     token
  // });
  sendTokenResponse(user, 200, res);
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
              msg: 'User not found'
          });
      }

      // Base64 encode the picture and resume if they exist
      const pictureBase64 = user.picture ? user.picture.toString('base64') : null;
      const resumeBase64 = user.resume ? user.resume.toString('base64') : null;

      // Add the encoded fields to the user data to be returned
      const userData = {
        ...user.toObject(),
        picture: pictureBase64,
        resume: resumeBase64
      };

      res.status(200).json({
          success: true,
          data: userData
      });
  } catch (err) {
      res.status(400).json({
          success: false,
          msg: 'Error fetching user'
      });
      console.error(err.stack);
  }
};


exports.updateUser = async (req, res, next) => {
  try {
    const updateData = { ...req.body };

    if (req.files) {
      req.files.forEach(file => {
        if (file.mimetype.startsWith('image/') && !updateData.picture) {
          // Assuming the first image file encountered is the picture
          updateData.picture = file.buffer;
        } else if (file.mimetype === 'application/pdf' && !updateData.resume) {
          // Assuming the first PDF file encountered is the resume
          updateData.resume = file.buffer;
        }
      });
    }

    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ success: false, msg: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error('Error updating user:', err);
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

