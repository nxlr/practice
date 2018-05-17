var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "The French Alps",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTfSN4-S15OImFHh5DhoOgi1Gzpp4_68pekbuiKXj8lwBCQ2oz",
        description: "Nature, France, Alps, Haute Savoie, Mountain, Wood, Blah Blah Blah Blah Blah Blah "
    },
    {
        name: "The Austrian Alps",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHqVbdKHtZ48TPXZ2VOoFZCmtYKYnJG9rRnmn5k3UK0NX06h9S",
        description: "Austrian Alps !!! Blah Blah Blah Blah Blah Blah Blah Blah Blah "
    },
    {
        name: "The Swiss Alps",
        image: "https://www.publicdomainpictures.net/pictures/180000/velka/cows-on-swiss-alps.jpg",
        description: "Cows On Swiss Alps Blah Blah Blah Blah Blah Blah Blah Blah Blah "
    }
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds");
            // Add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        // Create a comment on each campground
                        Comment.create(
                            {
                                text: "Good places, would like to visit someday.",
                                author: "Bart"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created a new comment");
                                }
                            });
                    }
                });
            });
        }
    });   
}

module.exports = seedDB;