const express=require("express");
const router=express.Router({ mergeParams: true });
const wrapAsyc=require('../utils/wrapAsyc.js');
const {isLoggedIn,validateReview,isReviewAuthor}=require('../middleware.js');
const reviewController=require("../controllers/reviews.js")


router.post("/",isLoggedIn,validateReview,wrapAsyc(reviewController.createReview));

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsyc(reviewController.deleteReview));

module.exports=router;