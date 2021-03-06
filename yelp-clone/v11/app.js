var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    User        = require("./models/user"),
    Comment     = require("./models/comment");

// REQUIRING ROUTES
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require('./routes/index');

mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Seed the databse
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "My fingers are gonna break",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser  = req.user;
    res.locals.error  = req.flash("error");
    res.locals.success  = req.flash("success");
    next();
});

app.use("/",authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

//process.env.PORT = "3000";
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp-Clone Server started.");
});

