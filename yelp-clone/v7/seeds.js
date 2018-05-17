var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "The French Alps",
        image: "https://c.pxhere.com/photos/3b/4a/man_resting_person_cliff_edge_french_alps_rock_nature-1386700.jpg!d",
        description: "Nature, France, Alps, Haute Savoie, Mountain, Wood, Blah Blah Blah Blah Blah Blah "
    },
    {
        name: "The Austrian Alps",
        image: "https://c1.staticflickr.com/2/1537/24216258061_0f0eb20629_b.jpg",
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