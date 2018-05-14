var express = require("express");

var app = express();

// ROUTES //

app.get("/", function(req, res) {
    res.send("Home Page.");
});

app.get("/cats", function(req, res) {
    res.send("Cats");
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
    console.log("Serving myapp on port 3000.");
    console.log(process.env.IP);
    
})