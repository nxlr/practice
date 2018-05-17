var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: String,
});

// Create a collection called campgrounds, 
// And a model Campground to access collection methods.
module.exports = mongoose.model("Comment", commentSchema); 