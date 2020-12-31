const mongoose = require("mongoose");
const { Schema } = mongoose;

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const capmSchema = new Schema({
  title: String,
  geometry: {
    type: pointSchema
  },
  image: {
    url: String,
    filename: String
  },
  price: Number,
  discription: String,
  location: String,
  date: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }]
});
const reviewSchema = new Schema({
  rating: Number,
  review: String,
  date: { type: Date, default: Date.now },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  camp: {
    type: Schema.Types.ObjectId,
    ref: "CampGround"
  }
});

capmSchema.post("findOneAndDelete", async function (camp) {
  await Review.deleteMany({ _id: { $in: camp.reviews } });
});

const Review = mongoose.model("Review", reviewSchema);

const CampGround = mongoose.model("CampGround", capmSchema);

module.exports = { CampGround, Review };
