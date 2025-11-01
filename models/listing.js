const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage"
    },
    url: {
      type: String,
      default: "https://5.imimg.com/data5/ANDROID/Default/2021/10/AN/OY/YI/58559426/product-jpeg-500x500.jpg",
      set: v => v === "" ? "https://5.imimg.com/data5/ANDROID/Default/2021/10/AN/OY/YI/58559426/product-jpeg-500x500.jpg" : v
    }
  },
  price: Number,
  location: String,
  country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;