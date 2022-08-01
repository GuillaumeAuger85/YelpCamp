if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
  }
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';

const mongoose = require('mongoose');
const User = require('../models/user');
const { usernames, sillyUsernames } = require('./users/usernames');
const { positiveReviews, negativeReviews } = require('./reviews/reviews');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { places, descriptors, characters } = require('./campgrounds/seedHelpers')
const cities = require('./campgrounds/cities');
const imgs = require('./campgrounds/images');
// const { cloudinary } = require('../../cloudinary');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const express = require("express");

mongoose.connect(dbUrl);
// mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
    console.log('Database connected');
});
const app = express();

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const sample = array => array[Math.floor(Math.random() * array.length)];

let hostIds = [];
let Ids = [];
let reviewId = [];


function getReviews(array) {
    let reviewIdArr = [];
    const rand = Math.floor(Math.random() * 16);
    for (let i = 0; i < rand + 1; i++) {
        reviewIdArr[i] = sample(array)
    }
    // console.log(reviewIdArr)
    return reviewIdArr
}

const seedHostUserDB = async () => {
    await User.deleteMany({});
    for (let username of usernames) {
        const rand = Math.floor(Math.random() * 1000);
        const password = `${sample(characters)}${username}${rand}`
        const user = new User({
            email: `${username}@gmail.com`,
            username: `${username}`,
            host: true
        });
        await User.register(user, password);
    }
    const hostUsers = await User.find({ host: true });
    // console.log(hostUsers)
    let n = 0;
    for (let hostUsr of hostUsers) {
        hostIds[n] = `${hostUsr._id}`;
        n += 1;
    }
    // console.log(hostIds)
    return hostIds
}

const seedReviewUserDB = async () => {
    for (let sillyUsername of sillyUsernames) {
        const rand = Math.floor(Math.random() * 1000);
        const password = `${sample(characters)}${sillyUsername}${rand}`
        const user = new User({
            email: `${sillyUsername}@gmail.com`,
            username: `${sillyUsername}`,
            host: false
        });
        await User.register(user, password);
    }
    const users = await User.find({ host: false });
    // console.log(users)
    let num = 0;
    for (let usr of users) {
        Ids[num] = `${usr._id}`;
        num += 1;
    }
    // console.log(Ids)
    return Ids
}


const seedReviewDB = async () => {
    await Review.deleteMany({});
    for (let id of Ids) {
        for (let i = 0; i < 3; i++) {
            const Rating = Math.floor(Math.random() * 6);
            const review = new Review({
                body: (Rating < 3 ? sample(negativeReviews) : sample(positiveReviews)),
                rating: Rating,
                author: id
            });
            await review.save();
        }
    }
    const reviews = await Review.find();
    let number = 0;
    for (let rvw of reviews) {
        reviewId[number] = `${rvw._id}`;
        number += 1;
    }
    // console.log(reviewId)
}

const seedCampDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const randImg = imgs[Math.floor(Math.random() * imgs.length)];
        const randImg1 = imgs[Math.floor(Math.random() * imgs.length)];
        const randImg2 = imgs[Math.floor(Math.random() * imgs.length)];
        const price = Math.floor(Math.random() * 20) + 10;
        const longitude = cities[random1000].longitude;
        const latitude = cities[random1000].latitude;
        const camp = new Campground({
            author: sample(hostIds),
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: "Point",
                coordinates: [longitude, latitude]
            },
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: randImg.url,
                    filename: randImg.filename
                },
                {
                    url: randImg1.url,
                    filename: randImg.filename
                },
                {
                    url: randImg2.url,
                    filename: randImg.filename
                },
            ],
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, quae autem eos aperiam maiores voluptate optio, aut modi voluptatem asperiores ab excepturi odit nesciunt? Earum nobis laborum molestiae sunt quibusdam.",
            price,
            reviews: getReviews(reviewId)
        })
        await camp.save();
    }
}


const seedDB = async () => {
    // await cloudinary.api.delete_all_resources(function (error,result){console.log(error,result)});
    await seedHostUserDB();
    await seedReviewUserDB();
    await seedReviewDB();
    await seedCampDB();
}


seedDB().then(() => {
    mongoose.connection.close();
})




