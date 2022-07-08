const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require('./review');

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

const validateImages = (array) =>{
     return array.length < 6
}


const opts = { toJSON: { virtuals: true } };

const CampgroundSchema = new Schema({
  title: String,
  images: {
    type:[ImageSchema],
    validate : [validateImages, "Too much images!! You can upload 5 images max per campground."]
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
}, opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
  return `
  <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
  <p>${this.description.substring(0, 20)}...</p>
  `
});

CampgroundSchema.virtual('averageReview').get(function () {
  let sum = 0;
  for (let review of this.reviews) {
    sum += review.rating;
  }
  const averageReview = Math.round(sum / (this.reviews.length));
  return averageReview;
})

CampgroundSchema.pre('save', async function () {
  for (let image of this.images) {
    image.url = image.url.replace('/upload', '/upload/c_scale,h_424,w_636');
  }})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    })
  }
});

module.exports = mongoose.model('Campground', CampgroundSchema);