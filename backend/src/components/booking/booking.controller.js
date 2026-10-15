const bookingService = require('./booking.service');
const bookingPolicy = require('./booking.policy');
const ApiResponse = require('../../utils/response');

class BookingController {
  async createBooking(req, res, next) {
    try {
      const booking = await bookingService.createBooking(req.user.id, req.body);
      return ApiResponse.created(res, booking, 'Parking spot booked successfully');
    } catch (error) {
      next(error);
    }
  }

  async getUserBookings(req, res, next) {
    try {
      const { bookings, pagination } = await bookingService.getUserBookings(req.user.id, req.query);
      return ApiResponse.paginated(res, bookings, pagination, 'My bookings fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  async getBookingById(req, res, next) {
    try {
      const booking = await bookingService.getBookingById(req.params.id);
      bookingPolicy.canAccessBooking(req.user, booking);
      return ApiResponse.success(res, booking, 'Booking details fetched');
    } catch (error) {
      next(error);
    }
  }

  async cancelBooking(req, res, next) {
    try {
      const existing = await bookingService.getBookingById(req.params.id);
      bookingPolicy.canAccessBooking(req.user, existing);
      const booking = await bookingService.cancelBooking(req.params.id, req.user.id);
      return ApiResponse.success(res, booking, 'Booking cancelled successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BookingController();
