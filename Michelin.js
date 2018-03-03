var request = require('request');
var cheerio = require('cheerio');

var obj = {table: []};
var json = JSON.stringify(obj);
function restaurants() {
for (var i = 0; i < 35; i++) {
var url = "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-0"+i;

request(url, function (error, response, html) {
  if (!error && response.statusCode == 200) {

    var $ = cheerio.load(html);
    $(".poi-search-result").find(".poi_card-display-title").each(function(index, element){
      var a = $(element);
      obj.table.push({name:a.text().trim()});
      //console.log(obj)
      json = JSON.stringify(obj);
      var fs = require('fs');
      fs.writeFile('restaurant.json', json, 'utf-8',(err) => {
          if (err) {
              console.error(err);
              return;
          };
      });
    });
  }
});
}
console.log(obj)


}

restaurants();
