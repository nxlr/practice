var express = require("express");
var app = express();
var request = require('request');
var bodyParser = require("body-parser");

var movies = [];
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.use(express.static("public"));

// ROUTES //
app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res) {

    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s="+ query +"&apikey=89b511e2";
    // Make request to API to fetch data.
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            // Parse String data as JSON Object
            var data = JSON.parse(body);
            // Gives you the poster of Avengers Infinity War Movie
            // res.redirect(data["Search"][0]["Poster"]);
            res.render("results", {data: data});
        }

    })
}); 

app.post("/addMovie", function(req, res){
    var newMovie = req.body.movie;
    movies.push(newMovie);
    res.redirect("/");
});

app.get("/:somePage", function(req, res) {
    var page = req.params.somePage;
    res.send("Welcome to the " + page.toUpperCase() + " page");
}); 

app.get("*", function(req, res) {
    res.send("This Page does not exist");
}); 

//Tell Express to listen to requests - Start SERVER
process.env.PORT = "3000"; //or 8080 etc
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Serving movie-search-app on port 3000.");
    // console.log(process.env.IP);
    
})