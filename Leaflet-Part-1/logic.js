let myMap = L.map("map", {
  center: [40.7, -113.95],
  zoom: 4.5
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap)

let earthquakes = L.layerGroup().addTo(myMap);

let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function(data) {

  function circleSize (mag) {
    return mag * 4;
  };

  function circleColor(depth) {
    if (depth > 60)
      return "red";
    if (depth >= 30)
      return "orangered";
    if (depth >= 15)
      return "orange";
    if (depth >= 5)
      return "yellow";
    else
      return "green";
  };

L.geoJSON(data, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: circleSize(feature.properties.mag),
      fillColor: circleColor(feature.geometry.coordinates[2]),
      fillOpacity: .75,
      stroke: true,
      weight: .1
    });
  },
  onEachFeature: function (feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Time: 
      ${new Date(feature.properties.time)}`);
    }
  }).addTo(earthquakes);

earthquakes.addTo(myMap);

let legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  let depths = [-10, 5, 15, 30, 60];

  let legendInfo = "<h3 style='text-align: center'>Depth</h3>" +
    "<div class=\"labels\">" +
      "<div class=\"min\">" + depths[0] + "</div>" +
      "<div class=\"max\">" + depths[depths.length - 1] + "</div>" +
    "</div>";
  div.innerHTML += legendInfo;

  for (i = 0; i < depths.length; i++) {
    div.innerHTML +=
      '<li style="background:' + circleColor(depths[i] + 1) + '"></li>' +
        depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
  };
  return div;
  };
legend.addTo(myMap)
});