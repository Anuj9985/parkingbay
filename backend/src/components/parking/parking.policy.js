const { ForbiddenError } = require('../../utils/errors');
const { USER_ROLES } = require('../../config/constants');

class ParkingPolicy {
  canManageParking(user, parking = null) {
    if (user.role === USER_ROLES.ADMIN) return true;
    if (user.role === USER_ROLES.OPERATOR) {
      if (!parking) return true;
      if (parking.operator && parking.operator.toString() === user.id) return true;
    }
    throw new ForbiddenError('You do not have permission to manage this parking spot');
  }
}

module.exports = new ParkingPolicy();
