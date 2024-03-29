const signToken = require("../confic/signJWT");
const User = require("../models/userModal");
const cookieOptions = require("../confic/cookieOptions");

//register user
module.exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email });
    const newUser = await User.register(user, password);
    if (newUser) {
      const token = signToken(newUser._id);
      res.cookie("access_token", token, cookieOptions);
      res.status(201).json({
        mesBody: "user added successfully",
        isAuthenticated: true,
        user: newUser.username
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login user
module.exports.loginUser = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const token = signToken(req.user._id);
      res.cookie("access_token", token, cookieOptions);
      res.status(200).json({
        isAuthenticated: true,
        message: "login successfully",
        user: req.user.username
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//logout user
module.exports.logoutUser = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      isAuthenticated: false,
      user: "",
      message: "successfully logout"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//authenticated user
module.exports.authenticateUser = async (req, res) => {
  try {
    res.status(200).json({
      isAuthenticated: true,
      message: "login successfully",
      user: req.user.username
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
