var express = require("express");
var app = express();

app.set("view engine", "ejs")

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    var campgrounds = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8515/8365336428_abb241726d.jpg"},
        {name: "Granite Hill", image: "https://farm2.staticflickr.com/1075/1132747626_f7adec63dd.jpg"},
        {name: "Yellowstone Park", image: "https://pixabay.com/get/e830b9062ef5073ed1584d05fb1d4e97e07ee3d21cac104497f6c37ea2e5bdb1_340.jpg"}
    ]
    res.render("campgrounds", {campgrounds: campgrounds});
});

process.env.PORT = "3000";
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp-Clone Server started.");
});