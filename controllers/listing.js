const Listing = require("../Models/listing");


module.exports.index = async(req,res) =>{
  const { search } = req.query;
  let allLists;
  if(search){
    const regex = new RegExp(escapeRegex(search), 'i'); // case-insensitive
    allLists = await Listing.find({ title: regex });
  } else {
    allLists = await Listing.find({});
  }
  res.render("listings/index.ejs" , {allLists});
};

// Helper function to escape special characters in regex
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};


module.exports.createNewListing = async(req, res, next) => {
  try{
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    let { title, description, price, location, country } = req.body;

    const newListing = {
      title,
      description,
      image: {
        filename: req.file ? req.file.filename : "defaultimage",
        url: req.file ? req.file.path : "https://images.unsplash.com/photo-1750672951701-b9dcb289ea29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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