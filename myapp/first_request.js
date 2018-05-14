var request = require('request');


// Make request to API to fetch data.
request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22hansi%2C%20in%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function(error, response, body){
    if(!error && response.statusCode == 200){
        // Parse String data as JSON Object
        var data = JSON.parse(body)
        // location
        console.log(data["query"]["results"]["channel"]["location"]);
        // 10 days data in Hansi
        console.log(data["query"]["results"]["channel"]["item"]["forecast"]);
    }

})