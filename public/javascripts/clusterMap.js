





/* const map = L.map('map').setView([28.2521, 83.9774], 18);

const tilUrl = 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

L.tileLayer(tilUrl).addTo(map);

map.locate({ enableHighAccuracy: true });
map.on('locationfound', e => {

})

const marker = L.marker([28.2521, 83.9774]).bindPopup('Hey there!');

marker.addTo(map)
 */














 const map = L.map('map').setView([-41.51285, 173.53274], 5)
const osm = L.tileLayer('https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
).addTo(map) 









/* var markers = [
    ["7C6B07", -40.99497, 174.50808],
    ["7C6B38", -41.30269, 173.63696],
    ["C820B6", -41.51285, 173.53274],
  ];
  for (var i = 0; i < markers.length; i++) {
    marker = new L.marker([markers[i][1], markers[i][2]])
      .bindPopup(markers[i][0])
      .addTo(map);
  } */

var markers = [
    ["7C6B07", -40.99497, 174.50808],
    ["7C6B38", -41.30269, 173.63696],
    ["C820B6", -41.51285, 173.53274],
  ];
  for (var i = 0; i < markers.length; i++) {
    marker = new L.marker([markers[i][1], markers[i][2]])
      .bindPopup(markers[i][0])
      .addTo(map);
  }


/* import * as L from 'leaflet';
import 'leaflet.markercluster';

// Compile & run = OK
 myClusterGroup = L.markerClusterGroup(); */

 function getRandomLatLng(map) {
    var bounds = map.getBounds(),
        southWest = bounds.getSouthWest(),
        northEast = bounds.getNorthEast(),
        lngSpan = northEast.lng - southWest.lng,
        latSpan = northEast.lat - southWest.lat;

    return new L.LatLng(
            southWest.lat + latSpan * Math.random(),
            southWest.lng + lngSpan * Math.random());
}




markers.addLayer(L.marker(getRandomLatLng(map)));
map.addLayer(markers);