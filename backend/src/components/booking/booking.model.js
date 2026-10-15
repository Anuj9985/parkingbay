const mongoose = require('mongoose');
const { BOOKING_STATUS, PAYMENT_STATUS, VEHICLE_TYPES } = require('../../config/constants');

const bookingSchema = new mongoose.Schema(
  {
    bookingCode: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    parking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Parking',
      required: true,
      index: true
    },
    vehicleType: {
      type: String,
      enum: Object.values(VEHICLE_TYPES),
      required: true
    },
    vehicleNumber: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    totalHours: {
      type: Number,
      required: true
    },
    hourlyRate: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.CONFIRMED
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PAID
    },
    checkInTime: {
      type: Date
    },
    checkOutTime: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
