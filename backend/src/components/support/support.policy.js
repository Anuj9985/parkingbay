const { ForbiddenError } = require('../../utils/errors');
const { USER_ROLES } = require('../../config/constants');

class SupportPolicy {
  canViewAllTickets(user) {
    if (user.role === USER_ROLES.ADMIN) return true;
    throw new ForbiddenError('Only admins can view all support tickets');
  }
}

module.exports = new SupportPolicy();
