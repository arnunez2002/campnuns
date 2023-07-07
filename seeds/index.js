const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62d9afabe5e242e4c094dca2',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            coordenates: `${cities[random1000].latitude}, ${cities[random1000].longitude}`,
            tittle: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui doloribus rerum saepe et quisquam deserunt delectus ipsam, modi quod provident ea commodi a nulla, recusandae laboriosam quae eaque ullam sunt.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dcwt59fom/image/upload/v1658713644/YelpCamp/ksfxr6jbvi9epmtqnext.jpg',
                    filename: 'YelpCamp/ksfxr6jbvi9epmtqnext'
                },
                {
                    url: 'https://res.cloudinary.com/dcwt59fom/image/upload/v1658713644/YelpCamp/b2eazjusonj9vygr9jmq.jpg',
                    filename: 'YelpCamp/b2eazjusonj9vygr9jmq'
                }
            ]
        })
        console.log(camp);
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})