const express = require("express");
// const router = express.Router();         // isse listing ki id nhi aa payegi ...parent route ka parameter access karne ke liye
const router = express.Router({mergeParams : true});
const {listingSchema , reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../Models/listing");
const Review = require("../Models/review.js");
const flash = require("connect-flash");



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
router.post("/" ,validateReview, async (req,res)=>{
      try{
        let listing = await Listing.findById(req.params.id);

        let newReview = new Review(req.body.review);

        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();

        console.log("new review saved !");

        req.flash("success" , "Review added successfully !");
        res.redirect(`/listings/${listing._id}`);
      }
      catch(err){
        next();
      }   
})



//delete
// $pull operator : The $pull operator removes from an existing array all instances of a value or values that a match a specified condition.

router.delete("/:reviewId" ,async(req,res)=>{
         try{
              let { id, reviewId } = req.params;
               await Listing.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
               await Review.findByIdAndDelete(reviewId);

               req.flash("success" , "Review deleted successfully !");
               res.redirect(`/listings/${id}`);
         }
        catch(err){
          next(err);
        }
})


module.exports = router;