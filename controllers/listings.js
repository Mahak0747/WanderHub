const Listing=require("../models/listing.js");
const axios = require("axios");

module.exports.index = async (req, res) => {
  let { search } = req.query;
  let allListings;
  if (search) {
    allListings = await Listing.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ]
    });
  } else {
    allListings = await Listing.find({});
  }
  res.render("listings/index", { allListings });
};
module.exports.renderNewForm=(req,res)=>{
  res.render("listings/new.ejs");
}
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
      req.flash("error","Listing you requested for does not exist.");
      return res.redirect("/listings");
    }
    res.render("listings/show",{listing});
}
module.exports.createListing=async(req,res)=>{
  let url=req.file.path;
  let filename=req.file.filename;
  
  const newListing=new Listing(req.body.listing); 
  newListing.owner=req.user._id;
  newListing.image={url,filename};

  const response = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: {
      q: newListing.location,
      format: "json",
      limit: 1
    },
    headers: {
      "User-Agent": "wanderhub-app (mahak.goswami2050@gmail.com)"
    }
  });
  if (response.data.length > 0) {
    newListing.geo = {
      lat: parseFloat(response.data[0].lat),
      lng: parseFloat(response.data[0].lon)
    };
  } else {
    newListing.geo = { lat: 28.6139, lng: 77.2090 }; // fallback
  }

  await newListing.save();
  req.flash("success","New Listing Created!");
  res.redirect("/listings"); 
}
module.exports.renderEditForm=async(req,res)=>{
  let {id}=req.params;
  let listing=await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for does not exist.");
    return res.redirect("/listings");
  }
  let ogImageUrl=listing.image.url;
  ogImageUrl=ogImageUrl.replace("/upload","/upload/w_250")
  res.render("listings/edit",{listing,ogImageUrl});
}

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  Object.assign(listing, req.body.listing);

  if (req.body.listing.location) {
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: req.body.listing.location,
          format: "json",
          limit: 1
        },
        headers: {
          "User-Agent": "wanderhub-app (mahak.goswami2050@gmail.com)"
        }
      });
      if (response.data.length > 0) {
        listing.geo = {
          lat: parseFloat(response.data[0].lat),
          lng: parseFloat(response.data[0].lon)
        };
      }
    } catch (err) {
      console.log("Geocoding failed:", err.message);
      // optional fallback
      listing.geo = listing.geo || { lat: 28.6139, lng: 77.2090 };
    }
  }

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }

  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};
module.exports.deleteListing=async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted!");
  res.redirect("/listings");
}