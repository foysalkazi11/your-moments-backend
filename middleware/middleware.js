const Joi = require("joi");
const { CampGround, Review } = require("../models/campModel");
const { appError } = require("./errorHandle");

const isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campGround = await CampGround.findById(id).populate("author");
  if (campGround.author.username !== req.user.username) {
    return res.status(401).json("You do not have permission ! login first");
  } else {
    next();
  }
};
const isReviewAuthor = async (req, res, next) => {
  const { reviewId } = req.params;
  const review = await Review.findById(reviewId).populate("author");

  if (review.author.username !== req.user.username) {
    return res.status(401).json("You do not have permission to do that !");
  } else {
    next();
  }
};

const validateCampground = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),

    image: {
      url: Joi.string().required(),
      filename: Joi.string().required()
    },
    discription: Joi.string().required(),
    location: Joi.string().required()
  }).required();

  const result = schema.validate(req.body);

  if (result.error) {
    throw new appError(result.error.message, 400);
  } else {
    next();
  }
};
const validateReview = (req, res, next) => {
  const schema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    review: Joi.string().required()
  }).required();

  const result = schema.validate(req.body.data);

  if (result.error) {
    throw new appError(result.error.message, 400);
  } else {
    next();
  }
};

module.exports = {
  isAuthor,
  validateCampground,
  validateReview,
  isReviewAuthor
};
