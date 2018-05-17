var express = require("express");
var router = express.Router();
var Campground  = require("../models/campground");

// INDEX ROUTE
router.get("/", function(req,res){
    // Get all campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE 
router.post("/", function(req, res){
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

// NEW
router.get("/new", isLoggedIn, function(req, res){
    res.render("campgrounds/new");  
});

// SHOW
router.get("/:id", function(req, res){
    // find the campground with the id and render show page
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

module.exports = router;