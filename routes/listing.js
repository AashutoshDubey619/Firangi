const express = require("express");
const router = express.Router();
const {listingSchema , reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError");
const Listing = require("../Models/listing");
const flash = require("connect-flash");
const wrapAsync = require("../utils/wrapAsync.js");

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


router.get("/" , async (req,res)=>{
  const allLists = await Listing.find({})
   res.render("listings/index.ejs" , {allLists});
});

// create 

router.get("/new" , (req,res)=>{
    res.render("listings/new.ejs");
})


router.post("/", validateListing, async(req, res) => {
  try{
     let { title, description, image, price, location, country } = req.body;

  const newListing = {
    title,
    description,
    image: {
      filename: "listingimage",
      url: image,
    },
    price,
    location,
    country,
  };

  await Listing.create(newListing);

  req.flash("success" , "New Listing created !");

  res.redirect("/listings");
  }
  catch(err){
    next(err);
  }
});



// Read 

router.get("/:id" , wrapAsync(async(req,res)=>{
     let {id} = req.params;
    let listing = await Listing.findById(id).populate("reviews");

    if(!listing){
      req.flash("error" , "Listing you requested does not exist");
      res.redirect("/listings");
    }


     res.render("listings/show.ejs" , {listing});
})
)


// Edit

router.get("/:id/edit" , async(req,res)=>{
     let {id} = req.params;
     let listing = await Listing.findById(id);
     res.render("listings/edit" , {listing});
})

// Update

router.put("/:id" , async (req,res)=>{
     let {id} = req.params;
       let {title,description,image,price,location,country} = req.body;

      await Listing.findByIdAndUpdate(id, {
            title,
            description,
            image: {
              filename: "listingimage",
              url: image
            },
            price,
            location,
            country
});


     req.flash("success" , "Listing Updated !");
     res.redirect(`/listings/${id}`);
})


// Delete 

router.delete("/:id" ,async (req,res)=>{
    let {id} = req.params;

    await Listing.findByIdAndDelete(id);
    
    req.flash("success" , "Listing deleted Successfully !");

    res.redirect("/listings");
})


module.exports = router;