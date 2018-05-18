var express = require("express");
var router = express.Router();
var Campground  = require("../models/campground");
var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id      : req.user._id,
        username: req.user.username 
    };
    var newCampground = {name: name, image: image, description: description, author: author};
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
router.get("/new", middleware.isLoggedIn, function(req, res){
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

// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground}); 
    });
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        } else{
            // redirect to edited page
            res.redirect("/campgrounds/" + req.params.id) // or use updatedCampground._id
        }
    });
});

// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            // redirect to edited page
            res.redirect("/campgrounds"); // or use updatedCampground._id
        }
    });
});

module.exports = router;