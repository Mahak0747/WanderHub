const express=require("express");
const router=express.Router();
const wrapAsyc=require('../utils/wrapAsyc.js');
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require('../middleware.js');



router.get("/",wrapAsyc(async(req,res)=>{
  const allListings=await Listing.find({})
  res.render("listings/index",{allListings});
}));

router.get("/new",isLoggedIn,(req,res)=>{
  res.render("listings/new.ejs");
});

//Show route
router.get("/:id",isLoggedIn,wrapAsyc(async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
      req.flash("error","Listing you requested for does not exist.");
      return res.redirect("/listings");
    }
    res.render("listings/show",{listing});
}));

//Create route
router.post("/",isLoggedIn,validateListing,wrapAsyc(async(req,res)=>{
  let newListing=new Listing(req.body.listing); 
  newListing.owner=req.user._id;
  await newListing.save();
  req.flash("success","New Listing Created!");
  res.redirect("/listings"); 
}));

//Update route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsyc(async(req,res)=>{
  let {id}=req.params;
  let listing=await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for does not exist.");
    return res.redirect("/listings");
  }
  res.render("listings/edit",{listing});
}));

//Update route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsyc(async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  req.flash("success","Listing Updated!");
  res.redirect(`/listings/${id}`);
}));

//Delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsyc(async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success","Listing Deleted!");
  res.redirect("/listings");
}));

module.exports=router;