const { CampGround } = require("../models/campModel");
const { cloudinary } = require("../confic/cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });

module.exports.index = async (req, res) => {
  const campGround = await CampGround.find({}).sort({ date: -1 });
  res.json(campGround);
};

module.exports.createCampground = async (req, res) => {
  const geoCoding = await geocoder
    .forwardGeocode({
      query: req.body.location,
      limit: 1
    })
    .send();

  if (!req.file) {
    return res.status(401).json("plese upload image");
  }

  const userId = req.user._id;
  const campGround = new CampGround(req.body);
  campGround.geometry = geoCoding.body.features[0].geometry;
  campGround.image.url = req.file.path;
  campGround.image.filename = req.file.filename;
  campGround.author = userId;
  await campGround.save();

  res
    .status(200)
    .json({ message: "campground successfully added", createCamp: true });
};

module.exports.getSingleCampground = async (req, res) => {
  const { id } = req.params;
  const campGround = await CampGround.findById(id).populate("author");
  res.json(campGround);
};

module.exports.updateGround = async (req, res) => {
  const { id } = req.params;
  const { location } = req.body;

  const updateGround = await CampGround.findById(id);
  let geometry = updateGround.geometry;
  if (location !== updateGround.location) {
    const geoCoding = await geocoder
      .forwardGeocode({
        query: req.body.location,
        limit: 1
      })
      .send();
    geometry = geoCoding.body.features[0].geometry;
  }

  if (req.file) {
    await cloudinary.uploader.destroy(updateGround.image.filename);
    const data = {
      ...req.body,
      geometry,
      image: {
        url: req.file.path,
        filename: req.file.filename
      }
    };
    await CampGround.findByIdAndUpdate(id, data, {
      new: true
    });
    return res.status(200).json({ updated: true });
  }

  await CampGround.findByIdAndUpdate(
    id,
    { ...req.body, geometry },
    {
      new: true
    }
  );
  res.status(200).json({ updated: true });
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  const deleteGround = await CampGround.findById(id);
  await cloudinary.uploader.destroy(deleteGround.image.filename);
  await CampGround.findByIdAndDelete(id);
  res.status(200).json({ deleteGround: true });
};
