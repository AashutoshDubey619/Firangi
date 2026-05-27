const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.isOwner = async(req,res,next) =>{
       let {id} = req.params;

       let listing = await Listing.findById(id);

       if(!listing.owner.equals(res.locals.currUser._id)){
           req.flash("error" , "You don't have access permission to this item");
           return res.redirect(`/listings/${id}`);
       }

       next();
}

module.exports.isAuthor = async(req,res,next) =>{
    let {id,reviewId} = req.params;
    let review = await Review.findById(reviewId);

    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error" , "You dont have permission");
        return res.redirect(`/listings/${id}`);
    }

    next();
}
