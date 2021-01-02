const { whitelist } = require("../confic/corsConfic");
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://your-moments.netlify.app");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );

  next();
};

module.exports = allowCrossDomain;
