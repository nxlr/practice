var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Create a collection called campgrounds, 
// And a model Campground to access collection methods.
module.exports = mongoose.model("campground", campgroundSchema); 