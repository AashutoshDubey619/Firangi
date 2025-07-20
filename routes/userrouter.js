const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const flash = require("connect-flash");
const e = require("connect-flash");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware");


router.get("/signup" , (req,res)=>{
    res.render("users/signup.ejs");
})


router.post("/signup" , async(req,res)=>{
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
})


router.get("/login" , (req,res)=>{
    res.render("users/login.ejs");
});


router.post("/login" , saveRedirectUrl ,passport.authenticate('local' , {failureRedirect : "/login" , failureFlash : true}), async(req,res)=>{
     req.flash("success" , "Login Successfull !");

     let redirectUrl = res.locals.redirectUrl || "/listings";
     res.redirect(redirectUrl);
})


router.get("/logout" , (req,res,next)=>{
    req.logOut((err)=>{
       if(err){
       return next(err);
       }
       req.flash("success" , "you are logged out !");
       res.redirect("/listings");
    })
})


module.exports = router;