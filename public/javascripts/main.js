console.log(campground);
console.log(campground.coordenates);
console.log(campground.coordenates);
let arr = campground.coordenates.split(',');
const lat = arr[0];
const long = arr[1];

//ESTAS SON ALGUNAS DIRECCIONES QUE ANOTË PARA ASEGURARME DE QUE ESTOY BIEN
//51.505, -0.09
//4.718592, -74.0425728
//4.723405456679005, -74.04079225593655
//4.710787153163944, -74.03223803137101





const map = L.map('map-template').setView([lat, long], 14);

const tilUrl = 'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';

L.tileLayer(tilUrl).addTo(map);

map.locate({ enableHighAccuracy: true });
map.on('locationfound', e => {
 /*    const coords = [e.latlng.lat, e.latlng.lng]
    const marketClient = L.marker(coords);
    marketClient.bindPopup('This is your position!');
    map.addLayer(marketClient); */
})

const marker = L.marker([lat, long]).bindPopup(campground.tittle);

marker.addTo(map)