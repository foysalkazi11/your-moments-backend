const passport = require("passport");
const User = require("../models/userModal");
const JwtStrategy = require("passport-jwt").Strategy;

const cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};
const varify = async (payload, done) => {
  try {
    const user = await User.findOne({ _id: payload.sub });
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET
    },
    varify
  )
);
