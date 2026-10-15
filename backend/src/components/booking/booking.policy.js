const { ForbiddenError } = require('../../utils/errors');
const { USER_ROLES } = require('../../config/constants');

class BookingPolicy {
  canAccessBooking(user, booking) {
    if (user.role === USER_ROLES.ADMIN) return true;
    if (booking.user.toString() === user.id) return true;
    throw new ForbiddenError('You can only access your own bookings');
  }
}

module.exports = new BookingPolicy();
