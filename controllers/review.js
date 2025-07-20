const Listing = require("../Models/listing");
const Review = require("../Models/review");


module.exports.createReview = async (req,res)=>{
      try{
        let listing = await Listing.findById(req.params.id);

        let newReview = new Review(req.body.review);

        newReview.author = req.user._id;

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
};


module.exports.deleteReview = async(req,res)=>{
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
};