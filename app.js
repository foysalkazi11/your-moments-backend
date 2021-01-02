if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoDB = require("./confic/mongoConnect");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const allowCrossDomain = require("./middleware/allowCrssDomain");

// const fileUpload = require("express-fileupload");
const app = express();

// mongodb connection
mongoDB();

// app.use(fileUpload());
// app.use(cors());
app.use(allowCrossDomain);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

// app.all('/*', allowCrossDomain);

app.use("/campground", require("./route/campground"));
app.use("/campground/:id/review", require("./route/reviews"));
app.use("/user", require("./route/user"));

app.get("/", (req, res) => {
  res.send("hello from express app");
});

//error sending meddelware
app.use((err, req, res, next) => {
  const { status = 5000, message = "something went wrong" } = err;
  res.status(status).json(message);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Express app start at port 5000");
});
