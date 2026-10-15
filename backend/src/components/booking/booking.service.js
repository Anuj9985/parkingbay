const Booking = require('./booking.model');
const Parking = require('../parking/parking.model');
const { NotFoundError, BadRequestError } = require('../../utils/errors');
const { generateBookingCode } = require('../../utils/helpers');
const { getPaginationOptions, formatPaginationMeta } = require('../../utils/pagination');
const { BOOKING_STATUS, PARKING_STATUS } = require('../../config/constants');

class BookingService {
  async createBooking(userId, bookingData) {
    const { parkingId, vehicleType, vehicleNumber, startTime, endTime } = bookingData;

    const parking = await Parking.findById(parkingId);
    if (!parking || !parking.isActive) {
      throw new NotFoundError('Parking spot not found');
    }

    // Check slot availability
    const available = parking.availableSlots[vehicleType] || 0;
    if (available <= 0 || parking.status === PARKING_STATUS.FULL) {
      throw new BadRequestError(`No available slots for ${vehicleType} at this location`);
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    const totalHours = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60)));
    const hourlyRate = parking.pricingPerHour[vehicleType] || 30;
    const totalAmount = totalHours * hourlyRate;

    const bookingCode = generateBookingCode();

    const booking = await Booking.create({
      bookingCode,
      user: userId,
      parking: parkingId,
      vehicleType,
      vehicleNumber,
      startTime: start,
      endTime: end,
      totalHours,
      hourlyRate,
      totalAmount,
      status: BOOKING_STATUS.CONFIRMED
    });

    // Decrement available slots
    parking.availableSlots[vehicleType] -= 1;
    const totalAvailable =
      (parking.availableSlots.car || 0) + (parking.availableSlots.two_wheeler || 0);

    if (totalAvailable <= 0) {
      parking.status = PARKING_STATUS.FULL;
    } else if (totalAvailable <= 10) {
      parking.status = PARKING_STATUS.LIMITED;
    }
    await parking.save();

    return booking;
  }

  async getUserBookings(userId, query) {
    const { page, limit, skip } = getPaginationOptions(query);
    const filter = { user: userId };

    if (query.status) {
      filter.status = query.status;
    }

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .populate('parking', 'name address city landmark image pricingPerHour')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Booking.countDocuments(filter)
    ]);

    return {
      bookings,
      pagination: formatPaginationMeta(total, page, limit)
    };
  }

  async getBookingById(bookingId) {
    const booking = await Booking.findById(bookingId).populate(
      'parking',
      'name address city landmark image pricingPerHour location'
    );
    if (!booking) {
      throw new NotFoundError('Booking not found');
    }
    return booking;
  }

  async cancelBooking(bookingId, userId) {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    if (booking.status === BOOKING_STATUS.CANCELLED) {
      throw new BadRequestError('Booking is already cancelled');
    }

    if (booking.status === BOOKING_STATUS.COMPLETED) {
      throw new BadRequestError('Completed bookings cannot be cancelled');
    }

    booking.status = BOOKING_STATUS.CANCELLED;
    await booking.save();

    // Restore slot in parking
    const parking = await Parking.findById(booking.parking);
    if (parking) {
      parking.availableSlots[booking.vehicleType] =
        (parking.availableSlots[booking.vehicleType] || 0) + 1;
      if (parking.status === PARKING_STATUS.FULL) {
        parking.status = PARKING_STATUS.AVAILABLE;
      }
      await parking.save();
    }

    return booking;
  }
}

module.exports = new BookingService();
