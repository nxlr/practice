var express = require("express");
var router = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment = require("../models/comment");

// COMMENTS NEW
router.get("/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){

        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

// COMMENTS CREATE
router.post("/", isLoggedIn, function(req, res){
    // lookup campgrpund using id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    // add username and id to comment
                    comment.author.username = req.user.username;
                    comment.author.id = req.user._id;
                    // save comment
                    comment.save();
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to campground show page
                    res.redirect("/campgrounds/" + campground._id);
                }
            });        
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