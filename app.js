const express = require("express");
const app = express();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const dotenv = require('dotenv');

// Models and Routes
const Listing = require("./Models/listing");
const Review = require("./Models/review");
const User = require("./Models/user.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const usersroute = require("./routes/userrouter.js");

// Load environment variables
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

// Database Connection
const dbUrl = process.env.ATLASDB_URL;

main()
    .then(() => {
        console.log("Connection Successful!");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

// App Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));

// Session Store
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,  // Time in seconds
});

store.on("error", (err) => {
    console.log("Error in session store", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

// Session & Flash Middleware (IMPORTANT ORDER)
app.use(session(sessionOptions));
app.use(flash());

// Passport.js Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Variables for Templates
app.use((req, res, next) => {
    console.log("Middleware: req.user =", req.user);
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user || null;
    console.log("Middleware: res.locals.currUser =", res.locals.currUser);
    next();
});

// Routes
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", usersroute);

// Root Redirect
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// Error Handler Middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Something went Wrong!";
    res.status(statusCode).render("error.ejs", { err });
});

// Server Listener
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
