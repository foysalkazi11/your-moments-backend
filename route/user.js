const express = require("express");
const router = express.Router();
const User = require("../models/userModal");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportConfic = require("../confic/passportConfic");
const users = require("../controlers/user");
const {
  userValidationResult,
  validateName,
  validateEmail,
  validatePassword
} = require("../validation/userValidation");

passport.use(new LocalStrategy(User.authenticate()));

//register user
router.post(
  "/register",
  validateName,
  validateEmail,
  validatePassword,
  userValidationResult,
  users.registerUser
);

//login user
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  users.loginUser
);

//logout user
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  users.logoutUser
);

//autherticated user
router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  users.authenticateUser
);
module.exports = router;
