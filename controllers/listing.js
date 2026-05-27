const Listing = require("../models/listing");

// Helper function to escape special characters in regex
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// Valid categories list (shared with model)
const CATEGORIES = ['Trending', 'Rooms', 'Beach', 'Mountains', 'Cottages', 'City View', 'Pool Villas', 'Nature Stay', 'Camps', 'Meals', 'Parking', 'Pet-Friendly', 'Luxury', 'Near Airport'];

module.exports.index = async(req,res) =>{
  const { search, category, page: pageQuery } = req.query;

  // Build filter object
  let filter = {};

  // Search across title, location, and country
  if(search){
    const regex = new RegExp(escapeRegex(search), 'i');
    filter.$or = [
      { title: regex },
      { location: regex },
      { country: regex },
    ];
  }

  // Category filter
  if(category && CATEGORIES.includes(category)){
    filter.category = category;
  }

  // Pagination
  const page = parseInt(pageQuery) || 1;
  const limit = 12;
  const skip = (page - 1) * limit;

  const totalListings = await Listing.countDocuments(filter);
  const totalPages = Math.ceil(totalListings / limit);

  const allLists = await Listing.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ _id: -1 }); // newest first

  res.render("listings/index.ejs", {
    allLists,
    search: search || "",
    category: category || "",
    currentPage: page,
    totalPages,
  });
};


module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs", { categories: CATEGORIES });
};


module.exports.createNewListing = async(req, res, next) => {
  try{
    let { title, description, price, location, country, category } = req.body;

    const newListing = {
      title,
      description,
      image: {
        filename: req.file ? req.file.filename : "defaultimage",
        url: req.file ? req.file.path : (req.body.imageLink || "https://images.unsplash.com/photo-1750672951701-b9dcb289ea29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
      },
      price,
      location,
      country,
      category: category || "Rooms",
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
      return res.redirect("/listings");
    }


     res.render("listings/show.ejs" , {listing});
};


module.exports.editListing = async(req,res)=>{
     let {id} = req.params;
     let listing = await Listing.findById(id);
     if(!listing){
       req.flash("error" , "Listing you requested does not exist");
       return res.redirect("/listings");
     }
     res.render("listings/edit" , {listing, categories: CATEGORIES});
};


module.exports.updateListing = async (req,res)=>{
     let {id} = req.params;
       let {title,description,price,location,country,category} = req.body;

       let updateData = {
            title,
            description,
            price,
            location,
            country,
            category: category || "Rooms",
       };

       if (typeof req.file !== "undefined") {
          let url = req.file.path;
          let filename = req.file.filename;
          updateData.image = { url, filename };
       } else if (req.body.imageLink) {
          updateData.image = { url: req.body.imageLink, filename: "defaultimage" };
       }

      await Listing.findByIdAndUpdate(id, updateData);


     req.flash("success" , "Listing Updated !");
     res.redirect(`/listings/${id}`);
};


module.exports.deleteListing = async (req,res)=>{
    let {id} = req.params;

    await Listing.findByIdAndDelete(id);
    
    req.flash("success" , "Listing deleted Successfully !");

    res.redirect("/listings");
};