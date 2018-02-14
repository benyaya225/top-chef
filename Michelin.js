var request = require('request');
var cheerio = require('cheerio');


function restaurants(nbPage) {
  var url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-0"+nbPage;

  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {

      var $ = cheerio.load(html);
      $(".poi-search-result").find(".poi_card-display-title").each(function(index, element){
        var a = $(element);
        console.log(a.text().trim())
      });
    }
  });
}

var result;
for (var i = 0; i < 35; i++) {
  restaurants(i);
}
