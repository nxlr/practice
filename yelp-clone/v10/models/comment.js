var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

// Create a collection called campgrounds, 
// And a model Campground to access collection methods.
module.exports = mongoose.model("Comment", commentSchema); 