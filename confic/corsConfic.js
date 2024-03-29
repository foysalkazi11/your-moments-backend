var whitelist = [
  "http://localhost:3000",
  "https://your-moments.netlify.app",
  "https://musing-sammet-263c2f.netlify.app"
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

module.exports = { corsOptions, whitelist };
