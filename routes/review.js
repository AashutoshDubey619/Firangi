const express = require("express");
// const router = express.Router();         // isse listing ki id nhi aa payegi ...parent route ka parameter access karne ke liye
const router = express.Router({mergeParams : true});
const {listingSchema , reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../Models/listing");
const Review = require("../Models/review.js");
const flash = require("connect-flash");
const {isLoggedIn} = require("../middleware.js");
const {isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

const validateReview = (req,res,next) =>{
 let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
   else{
    next();
   } 
}



// Reviews

// create
router.post("/" , isLoggedIn, validateReview, reviewController.createReview);

//delete
// $pull operator : The $pull operator removes from an existing array all instances of a value or values that a match a specified condition.

router.delete("/:reviewId" ,isLoggedIn , isAuthor,reviewController.deleteReview);


module.exports = router;