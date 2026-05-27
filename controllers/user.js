const Listing = require("../models/listing");
const Review = require("../models/review");
const User = require("../models/user");


module.exports.signupForm = (req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.registerUser = async(req,res,next)=>{
   try{
     let {username , email , password } = req.body;

    let newUser = new User({email , username});

    const registeredUser = await User.register(newUser, password );

    req.login(registeredUser , (err)=>{
        if(err){                                        // signup hone ke baad direct log in karne ke liye 
            return next(err);
        }
      
        req.flash("success" , `Welcome! ${username}`);
        res.redirect("/listings");
    })
   }
   catch(err){
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
        req.flash("error", "A user with the given email is already registered.");
    } else {
        req.flash("error" , err.message);
    }
    res.redirect("/signup");
   }
};



module.exports.loginForm = (req,res)=>{
    res.render("users/login.ejs");
};


module.exports.loginUser = async(req,res)=>{
     req.flash("success" , "Login Successfull !");

     let redirectUrl = res.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl);
};


module.exports.logoutUser = (req,res,next)=>{
    req.logOut((err)=>{
       if(err){
       return next(err);
       }
       req.flash("success" , "you are logged out !");
       res.redirect("/listings");
    })
};


module.exports.profile = async(req,res,next)=>{
    try{
        const myListings = await Listing.find({ owner: req.user._id });
        const myReviews = await Review.find({ author: req.user._id }).populate({
            path: '_id',
        });
        res.render("users/profile.ejs", { myListings, myReviews });
    }
    catch(err){
        next(err);
    }
};


module.exports.toggleWishlist = async(req, res, next)=>{
    try{
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        const idx = user.wishlist.indexOf(id);

        if(idx === -1){
            user.wishlist.push(id);
        } else {
            user.wishlist.splice(idx, 1);
        }

        await user.save();
        res.json({ wishlisted: idx === -1, count: user.wishlist.length });
    }
    catch(err){
        next(err);
    }
};


module.exports.showWishlist = async(req, res, next)=>{
    try{
        const user = await User.findById(req.user._id).populate("wishlist");
        res.render("users/wishlist.ejs", { wishlistItems: user.wishlist });
    }
    catch(err){
        next(err);
    }
};