const request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
const restaurants = [];

function getLafourchette(restaurant) {
  const configuration = {
    'uri': 'https://m.lafourchette.com/api/restaurant-prediction?name='+restaurant
  }

  return new Promise((resolve, reject) => {
    request(configuration, (err, response, body) => {
      if (err) {
        return reject(err);
      }else{
        var $ = cheerio.load(body);
        var a = $("span.s").first().text()
        console.log("ID:"+a)
      }
    })
  });
}


getLafourchette('le courot')
.then(result => console.log(result))
.catch(err => console.error(err));

fs.readFile('restaurant.json', 'utf8', function readFileCallback(err, data){
  if (err){
    console.log(err);
  } else {
    obj = JSON.parse(data);
    for( var i in obj.table ) {
      restaurants.push(obj.table[i].name);
    }

  }});

  //const restaurants = ['le courot', 'yannick aleno', ..., 'xxxxx'];
  /*const requests = restaurants.map(restaurant => getLafourchette(restaurant));


  Promise.all(requests)
  .then(function display (results) {
    console.log(results);
  })
  .catch(error => console.log(error));*/
