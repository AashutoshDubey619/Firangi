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
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const User = require("./Models/user.js");
const LocalStratergy = require("passport-local");
const multer = require("multer");
const upload = multer({dest : "uploads/"});

if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


// const MONGO_URL = "mongodb://127.0.0.1:27017/firangi";
const dbUrl = process.env.ATLASDB_URL;

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
        await mongoose.connect(dbUrl);
}


const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto :{
        secret : process.env.SECRET,
    },
    touchAfter : 24*3600,                                    // Interval (in seconds) between session updates.
});


store.on("error", (err) => {
    console.log("Error in session store", err);
});


const sessionOptions = {
    store,
    secret : process.env.SECRET,
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
    res.locals.currUser = req.user;
    next();         // Important...nhi to isi middleware me stuck ho jayega 
});






app.use("/listings" , listings);
app.use("/listings/:id/reviews" , reviews);
app.use("/" , usersroute);





// error handler
app.use((err,req,res,next)=>{
    let {statusCode = 500 , message = "Something went Wrong !"} = err;
    res.status(statusCode).render("error.ejs" , {err});
    // res.status(statusCode).send(message);
}
);