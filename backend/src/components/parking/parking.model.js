const mongoose = require('mongoose');
const { VEHICLE_TYPES, AMENITIES, PARKING_STATUS } = require('../../config/constants');

const parkingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Parking name is required'],
      trim: true,
      index: true
    },
    city: {
      type: String,
      required: [true, 'City name is required'],
      default: 'Kolhapur',
      trim: true,
      index: true
    },
    landmark: {
      type: String,
      required: [true, 'Landmark description is required'],
      trim: true
    },
    address: {
      type: String,
      required: [true, 'Full address is required'],
      trim: true
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    },
    pricingPerHour: {
      car: { type: Number, default: 30 },
      two_wheeler: { type: Number, default: 15 }
    },
    vehicleTypes: [
      {
        type: String,
        enum: Object.values(VEHICLE_TYPES)
      }
    ],
    amenities: [
      {
        type: String,
        enum: Object.values(AMENITIES)
      }
    ],
    status: {
      type: String,
      enum: Object.values(PARKING_STATUS),
      default: PARKING_STATUS.AVAILABLE
    },
    totalSlots: {
      car: { type: Number, default: 50 },
      two_wheeler: { type: Number, default: 50 }
    },
    availableSlots: {
      car: { type: Number, default: 50 },
      two_wheeler: { type: Number, default: 50 }
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 1,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    image: {
      type: String,
      default: ''
    },
    images: [{ type: String }],
    operator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

parkingSchema.index({ location: '2dsphere' });
parkingSchema.index({ name: 'text', landmark: 'text', city: 'text' });

module.exports = mongoose.model('Parking', parkingSchema);
