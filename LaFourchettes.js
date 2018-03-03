const request = require('request');
var fs = require('fs');
const restaurants = [];
var obj1 = { table1: [] };

fs.readFile('restaurant.json', 'utf8', function readFileCallback(err, data) {
  if (err) {
    console.error(err);
  } else {
    obj = JSON.parse(data);
    for (var i in obj.table) {
      getLafourchetteID(obj.table[i].name)
    }

  }
});

function getLafourchetteID(restaurant) {
  restaurant = restaurant.replace(/é|è|ê/g, "e");
  var url = "https://m.lafourchette.com/api/restaurant-prediction?name=" + restaurant

  request(url, (err, response, html) => {
    if (err) {
      console.error(err);
      return;
    } else {
      if (response.statusCode == 400) {
        console.log('NOT FOUND');
        return;
      }
      else {
        objet = JSON.parse(html)
        if (objet[0] != null) {
          var id = objet[0].id;
          obj1.table1.push({name:restaurant,id:id,promo:""})
          json = JSON.stringify(obj1);
          var fs = require('fs');
          fs.writeFile('restaurantID_Promo.json', json, 'utf-8',(err) => {
              if (err) {
                  console.error(err);
                  return;
              };
          });
      }
    }
    }
  })
}

function getLafourchettePromo(id) {
  var url = "https://m.lafourchette.com/api/restaurant/" + id + "/sale-type";

  request(url, (err, response, html) => {
    if (err) {
      console.log(err);
    } else {

      var json = JSON.parse(html);


      json.forEach(element => {
        if (element.is_special_offer) {
          var promo = []
          promo.push(element);

        }
      });
    }
  });
}

/*restaurants.forEach(restaurant => {
getLafourchetteID(restaurant)
//getLafourchettePromo(id);
})*/

//getLafourchetteID('Agapé')
