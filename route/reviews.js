const express = require("express");
const router = express.Router({ mergeParams: true });
const { CampGround, Review } = require("../models/campModel");
const { validateReview, isReviewAuthor } = require("../middleware/middleware");
const { wrapAsync } = require("../middleware/errorHandle");
const passport = require("passport");
const passportConfic = require("../confic/passportConfic");
const reviews = require("../controlers/review");

//creat review
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateReview,
  wrapAsync(reviews.createReview)
);

//get all review
router.get("/", wrapAsync(reviews.getAllReview));

//delete review
router.delete(
  "/:reviewId",
  passport.authenticate("jwt", { session: false }),
  isReviewAuthor,
  wrapAsync(reviews.deleteReview)
);

module.exports = router;
