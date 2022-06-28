const mongoose = require('mongoose');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers')
const cities = require('./cities');
const images = require('./images');
// const { cloudinary } = require('../cloudinary');


mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    // await cloudinary.api.delete_all_resources(function (error,result){console.log(error,result)});
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const longitude = cities[random1000].longitude;
        const latitude = cities[random1000].latitude;
        const camp = new Campground({
            author: '610da0614b4c0c47bc1bbd94',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [longitude, latitude]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: `${sample(images).url}`,
                    filename: `${sample(images).filename}`
                },
                {
                    url: `${sample(images).url}`,
                    filename: `${sample(images).filename}`
                },
                {
                    url: `${sample(images).url}`,
                    filename: `${sample(images).filename}`
                },
            ],
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, quae autem eos aperiam maiores voluptate optio, aut modi voluptatem asperiores ab excepturi odit nesciunt? Earum nobis laborum molestiae sunt quibusdam.",
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})





