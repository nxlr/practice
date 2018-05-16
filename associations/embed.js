var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");


// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "ron@hogwarts.edu",
//     name: "Ron Weasley",

// });

// newUser.posts.push({
//     title: "I hate Hermione's Cat",
//     content: "She tries to eat my rat."
// })

// newUser.save(function(err, user){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });


// var newPost = new Post({
//     title: "I have a Pug",
//     content: "He is cute as hell."
// });

// newPost.save(function(err, post){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Ron Weasley"}, function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
}); 