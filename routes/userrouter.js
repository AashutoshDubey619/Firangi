const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const flash = require("connect-flash");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware");
const userController = require("../controllers/user");


router.get("/signup" , userController.signupForm);


router.post("/signup" ,userController.registerUser);


router.get("/login" , userController.loginForm);


router.post("/login" , saveRedirectUrl ,passport.authenticate('local' , {failureRedirect : "/login" , failureFlash : true}), userController.loginUser);


router.get("/logout" , userController.logoutUser);


module.exports = router;