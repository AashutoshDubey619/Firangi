const mongoose = require("mongoose");
const Review = require("./review");


const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "defaultimage", // optional
    },
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1750672951701-b9dcb289ea29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1750672951701-b9dcb289ea29?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews : [
    {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Review",
    },
  ],
});


// ye middleware hai ...jaise hi delete listing hoga uske baad ye run hoga aur us listing ke pure reviews delete kar dega 
listingSchema.post("findOneAndDelete" , async(listing)=>{

  if(listing){
    await Review.deleteMany({ _id : { $in : listing.reviews}})
  }
});






const Listing = mongoose.model("Listing" , listingSchema);


module.exports = Listing;