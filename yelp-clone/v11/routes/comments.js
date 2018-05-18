var express = require("express");
var router = express.Router({mergeParams: true});
var Campground  = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){

        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
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

// EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err || !foundComment){
            req.flash("error", "Comment not found");
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        } 
    });
});

// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // find and update the correct campground
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else{
            // redirect to edited page
            res.redirect("/campgrounds/" + req.params.id); // or use updatedCampground._id
        }
    });
});

// DESTROY
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    // find and update the correct campground
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            // redirect to edited page
            res.redirect("/campgrounds/" + req.params.id); // or use updatedCampground._id
        }
    });
});

module.exports = router;