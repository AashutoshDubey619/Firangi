const Listing = require("../Models/listing");
const Review = require("../Models/review");
const User = require("../Models/user");


module.exports.signupForm = (req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.registerUser = async(req,res)=>{
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
    req.flash("error" , err.message);
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