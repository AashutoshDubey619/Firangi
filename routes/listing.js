const express = require("express");
const router = express.Router();
const {listingSchema , reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../Models/listing");
const flash = require("connect-flash");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn} = require("../middleware.js");
const {isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");


const validateListing = (req,res,next) =>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
   else{
    next();
   } 
};


router.get("/" , listingController.index);

// create 

router.get("/new" , isLoggedIn , listingController.renderNewForm);


router.post("/", isLoggedIn,validateListing, listingController.createNewListing);



// Read 

router.get("/:id" , listingController.showListing);


// Edit

router.get("/:id/edit" ,isLoggedIn , isOwner,listingController.editListing);

// Update

router.put("/:id" , isLoggedIn, isOwner, listingController.updateListing);


// Delete 

router.delete("/:id" ,isLoggedIn , isOwner,listingController.deleteListing);


module.exports = router;