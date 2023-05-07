const { whitelist } = require("../confic/corsConfic");
const netlifyUrl = "https://your-moments.netlify.app";
const localUrl = "http://localhost:3000";
const allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", whitelist);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,x-nf-request-id,Authorization"
  );

  next();
};

module.exports = allowCrossDomain;
