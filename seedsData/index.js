const { cities } = require("./cities");
const { descriptors, places } = require("./name");
const { CampGround } = require("../models/campModel");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log("connected"));

const seedData = async () => {
  const res = await CampGround.deleteMany({});

  for (let index = 0; index < 10; index++) {
    const random1000 = Math.floor(Math.random() * 1000) + 1;
    const price = Math.floor(Math.random() * 30) + 10;
    const capm = new CampGround({
      author: "5fd841ca6063182f8418bda4",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${descriptors[Math.floor(Math.random() * descriptors.length)]} ${
        places[Math.floor(Math.random() * places.length)]
      } `,
      image: {
        url:
          "https://res.cloudinary.com/dohebhbdr/image/upload/v1608480740/YelpCamp/thxmpwopnr1zlo3tpdo4.jpg",
        filename: "YelpCamp/thxmpwopnr1zlo3tpdo4"
      },
      discription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, laboriosam.",
      price
    });
    await capm.save();
  }
};
seedData();
