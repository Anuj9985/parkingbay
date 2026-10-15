const mongoose = require('mongoose');

const landmarkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  coordinates: {
    type: [Number], // [lng, lat]
    required: true
  }
});

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    tagline: {
      type: String,
      default: 'Easy Parking. Happier Journeys.'
    },
    heroImage: {
      type: String,
      default: ''
    },
    about: {
      type: String,
      trim: true
    },
    centerCoordinates: {
      type: [Number], // [lng, lat]
      required: true
    },
    landmarks: [landmarkSchema],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('City', citySchema);
