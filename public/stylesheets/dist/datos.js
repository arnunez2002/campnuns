
const data = {
    type: "FeatureCollection",
    features: []
};




for (var i = 0; i <  campgrounds.length; i++) {
/* console.log([campgrounds[i].coordenates])
 */
const coordenadas = [campgrounds[i].coordenates];

const coor= coordenadas[0].split(',')
const corLat = parseFloat(coor[0]);
const corLong = parseFloat(coor[1]);



    data.features.push({
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [corLong , corLat],
        },
        properties: {
            price: campgrounds[i].price,
            location: campgrounds[i].location,
            title: campgrounds[i].tittle,
            image: campgrounds[i].images[0],
        },
    })

    console.log(campgrounds[i])

console.log(corLat, corLong)
}



