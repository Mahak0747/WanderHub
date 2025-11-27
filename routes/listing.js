const express=require("express");
const router=express.Router();
const wrapAsyc=require('../utils/wrapAsyc.js');
const ExpressError=require('../utils/ExpressError.js');
const {listingSchema}=require('../schema.js');
const Listing=require("../models/listing.js");


const validateListing=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if(error){
    throw new ExpressError(400,error);
  }
  else{
    next();
  }
};


router.get("/",wrapAsyc(async(req,res)=>{
  const allListings=await Listing.find({})
  res.render("listings/index",{allListings});
}));

router.get("/new",(req,res)=>{
  res.render("listings/new.ejs");
});

//show route
router.get("/:id",wrapAsyc(async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id).populate("reviews");
    res.render("listings/show",{listing});
}));

//create route
router.post("/",validateListing,wrapAsyc(async(req,res)=>{
  let newListing=new Listing(req.body.listing); 
  await newListing.save();
  res.redirect("/listings"); 
}));

router.get("/:id/edit",wrapAsyc(async(req,res)=>{
  let {id}=req.params;
  let listing=await Listing.findById(id);
  res.render("listings/edit",{listing});
}));

//update route
router.put("/:id",validateListing,wrapAsyc(async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
}));

router.delete("/:id",wrapAsyc(async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));
module.exports=router;