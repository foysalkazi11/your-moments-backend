const express = require("express");
const router = express.Router({ mergeParams: true });
const { isAuthor, validateCampground } = require("../middleware/middleware");
const { wrapAsync } = require("../middleware/errorHandle");
const { CampGround } = require("../models/campModel");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportConfic = require("../confic/passportConfic");
const campgrounds = require("../controlers/campground");
const { storage } = require("../confic/cloudinary");
const multer = require("multer");
const upload = multer({ storage });
const fileUpload = require("express-fileupload");

// router.use(fileUpload());

//get all campground
router.get("/", wrapAsync(campgrounds.index));

//create campground
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  validateCampground,
  wrapAsync(campgrounds.createCampground)
);

//get single campground
router.get("/:id", wrapAsync(campgrounds.getSingleCampground));

//updata campground
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  upload.single("image"),
  validateCampground,
  wrapAsync(campgrounds.updateGround)
);

//delete camp
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  isAuthor,
  wrapAsync(campgrounds.deleteCampground)
);

module.exports = router;
