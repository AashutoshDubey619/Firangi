const Listing = require("../Models/listing");


module.exports.index = async(req,res) =>{
         const allLists = await Listing.find({})
         res.render("listings/index.ejs" , {allLists});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};


module.exports.createNewListing = async(req, res) => {
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

  newListing.owner = req.user._id;

  await Listing.create(newListing);

  req.flash("success" , "New Listing created !");

  res.redirect("/listings");
  }
  catch(err){
    next(err);
  }
};



module.exports.showListing = async(req,res)=>{
     let {id} = req.params;
     let listing = await Listing.findById(id).populate({
      path : "reviews",
      populate : {                                // nested populate 
        path : "author",
      },
     })
     .populate("owner");

    if(!listing){
      req.flash("error" , "Listing you requested does not exist");
      res.redirect("/listings");
    }


     res.render("listings/show.ejs" , {listing});
};


module.exports.editListing = async(req,res)=>{
     let {id} = req.params;
     let listing = await Listing.findById(id);
     res.render("listings/edit" , {listing});
};


module.exports.updateListing = async (req,res)=>{
     let {id} = req.params;
       let {title,description,image,price,location,country} = req.body;

       let listing = await Listing.findById(id);

       if(!listing.owner.equals(res.locals.currUser._id)){
           req.flash("error" , "You don't have permission to edit");
           return res.redirect(`/listings/${id}`);
       }
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
};


module.exports.deleteListing = async (req,res)=>{
    let {id} = req.params;

    await Listing.findByIdAndDelete(id);
    
    req.flash("success" , "Listing deleted Successfully !");

    res.redirect("/listings");
};