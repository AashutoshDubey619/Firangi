const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const flash = require("connect-flash");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware");
const userController = require("../controllers/user");




router
    .route("/signup")
    .get( userController.signupForm)
    .post(userController.registerUser);


router
    .route("/login")
    .get( userController.loginForm)
    .post( saveRedirectUrl ,passport.authenticate('local' , {failureRedirect : "/login" , failureFlash : true}), userController.loginUser);


router.get("/logout" , userController.logoutUser);


module.exports = router;