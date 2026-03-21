const mongoose = require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const User=require("./user.js");

const listingSchema = new Schema({
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
  country: String,
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref:"Review"
    }
  ],
  owner:{
      type: Schema.Types.ObjectId,
      ref:"User"
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id:{$in: listing.reviews}})
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;