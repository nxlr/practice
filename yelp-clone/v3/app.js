var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds"),
    Comment     = require("./models/comment");


mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();


app.get("/", function(req,res){
    res.render("landing");
});

// INDEX ROUTE
app.get("/campgrounds", function(req,res){
    // Get all campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE ROUTE
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // Create a new campground and save to database.
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect defaults to a get request for campgrounds page.
            res.redirect("/campgrounds"); 
        }
    });
});

// NEW ROUTE
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");  
});

// SHOW ROUTE
app.get("/campgrounds/:id", function(req, res){
    // find the campground with the id and render show page
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

process.env.PORT = "3000";
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp-Clone Server started.");
});