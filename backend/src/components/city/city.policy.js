const { ForbiddenError } = require('../../utils/errors');
const { USER_ROLES } = require('../../config/constants');

class CityPolicy {
  canManageCity(user) {
    if (user.role === USER_ROLES.ADMIN) return true;
    throw new ForbiddenError('Only admins can modify city data');
  }
}

module.exports = new CityPolicy();
