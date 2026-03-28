const express=require("express");
const router=express.Router();
const wrapAsyc=require('../utils/wrapAsyc.js');
const {isLoggedIn,isOwner,validateListing}=require('../middleware.js');
const listingController=require("../controllers/listings.js")
const multer  = require('multer')
const{storage}=require("../cloudConfig.js");
const upload = multer({ storage })

router.route("/")
.get(wrapAsyc(listingController.index))
.post(isLoggedIn,validateListing,upload.single("listing[image]"),wrapAsyc(listingController.createListing))

router.get("/new",isLoggedIn,listingController.renderNewForm);

//Show route
router.route("/:id")
.get(isLoggedIn,wrapAsyc(listingController.showListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsyc(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsyc(listingController.deleteListing))

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsyc(listingController.renderEditForm));

module.exports=router;