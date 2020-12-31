const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign(
    {
      iss: "kazi",
      sub: id
      // exp: Math.floor(Date.now() / 1000) + 60 * 60
    },
    process.env.JWT_SECRET,
    { expiresIn: Date.now() + 1000 * 60 * 60 * 24 * 7 }
  );
};
//Date.now() + 1000 * 60 * 60 * 24 * 7

module.exports = signToken;
