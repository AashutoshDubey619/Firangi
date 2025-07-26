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
const multer = require("multer");
const {storage} = require("../cloudconfig.js");
const upload = multer({storage});

const validateListing = (req,res,next) =>{
  // Remove image field from req.body before validation since image is uploaded as file
  const { image, ...bodyWithoutImage } = req.body;
  let {error} = listingSchema.validate(bodyWithoutImage);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400,errMsg);
  }
   else{
    next();
   } 
};



router
    .route("/")
    .get(listingController.index)       // homepage
    .post(
       isLoggedIn,
       validateListing,
       listingController.createNewListing
    );


    // new 
    router.get("/new" , isLoggedIn , listingController.renderNewForm);


router
    .route("/:id")
    .get( listingController.showListing)        // read
    .put( isLoggedIn, isOwner, listingController.updateListing)      // update
    .delete(isLoggedIn , isOwner,listingController.deleteListing);      // Delete 

// create 


// Edit

router.get("/:id/edit" ,isLoggedIn , isOwner,listingController.editListing);



module.exports = router;