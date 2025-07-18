const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const Listing = require("./Models/listing");
const path = require("path");
const ejsMate = require("ejs-mate");
const Review = require("./Models/review");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const usersroute = require("./routes/userrouter.js");0
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const User = require("./Models/user.js");
const LocalStratergy = require("passport-local");





const MONGO_URL = "mongodb://127.0.0.1:27017/firangi";

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.engine('ejs' , ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main()
.then(()=>{
    console.log("Connection Successfull!");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
        await mongoose.connect(MONGO_URL);
}




const sessionOptions = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    
    cookie :{
        expires : Date.now() + 7 *24* 60 *60 *1000,  // expires after a week
        maxAge :  7 *24* 60 *60 *1000,
        httpOnly : true,
    }
};

app.listen("8080" , ()=>{
    console.log("Server is listening to port 8080");
})

app.get("/" , (req,res)=>{
    res.redirect("/listings");
})



app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();         // Important...nhi to isi middleware me stuck ho jayega 
});


// app.get("/demouser" , async(req,res)=>{
//     let fakeUser = new User({
//         email : "ass@gmail.com",
//         username : "Aashu",
//     });


//   const Reguser =  await User.register(fakeUser , "aashu12345");
//   res.send(Reguser);
// })





app.use("/listings" , listings);
app.use("/listings/:id/reviews" , reviews);
app.use("/" , usersroute);

// app.all("*" , (req,res,next)=>{      // agar koi route nhi mila to yaha aata 
//     next(new ExpressError(404,"Page not found !"));
// });



// error handler
app.use((err,req,res,next)=>{
    let {statusCode = 500 , message = "Something went Wrong !"} = err;
    res.status(statusCode).render("error.ejs" , {err});
    // res.status(statusCode).send(message);
}
);