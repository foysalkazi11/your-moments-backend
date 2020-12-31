const { CampGround, Review } = require("../models/campModel");

module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const singleGround = await CampGround.findById(id);
  const review = new Review(data);
  singleGround.reviews.push(review);
  review.camp = singleGround;
  review.author = req.user._id;
  await singleGround.save();
  await review.save();
  const reviews = await Review.find({ camp: id })
    .sort({ date: -1 })
    .populate("author");
  res.json(reviews);
};

module.exports.getAllReview = async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.find({ camp: id })
    .sort({ date: -1 })
    .populate("author");
  res.json(reviews);
};

module.exports.deleteReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  await CampGround.findByIdAndUpdate(reviewId, {
    $pull: { reviews: id }
  });
  await Review.findByIdAndDelete(reviewId);
  const reviews = await Review.find({ camp: id })
    .sort({ date: -1 })
    .populate("author");
  res.json(reviews);
};
