// let myMap = L.map("map", {
//   center: [40.7, -113.95],
//   zoom: 4.5
// });

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(myMap);

let data = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

// d3.json(data).then(function(response) {

//   let markers = L.marker();

//   for (let i = 0; i < response.length; i++) {

//     let lat = response[i].
//   }
// })
d3.json(data).then(function(response) {
  createFeatures(response.features);
});

function createFeatures(earthquakeData) {

  // function onEachFeature(feature, layer) {

  //   let  = 
  //   for (let i = 0; i < response.length; i++) {
  //     let lat = response[i].geometery.coordinates[0];
  //     let lng = response[i].geometery.coordinates[1];
  //     let depth = response[i].geometery.coordinates[2];

  //   if (location) {


  //   }
  // }
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Time: 
    ${feature.properties.time}</p><hr><p>Magnitude: ${feature.properties.mag}</p>`);
  };

  function circleMarker(feature, location) {
    let options = {
      color: circleColor(feature.properties.mag),
      fillColor: circleColor(feature.properties.mag),
      fillOpacity: .75,
      radius: feature.properties.mag * 4
    };
    return L.marker(location, options);
  };

  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    layer : circleMarker
  });

  createMap(earthquakes);

  // for (let i = 0; i < response.length; i++) {
  //   let location = response[i].geometery.coordinates;

  //   if (location) {


  //   }
  // }
};

function circleColor(mag) {
  
}

// let data = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

// function createMap(earthquake) {
  
//   let geography = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     })

//     let baseMap = {
//       "Geography Map"
//     }




// }