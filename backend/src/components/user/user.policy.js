const { ForbiddenError } = require('../../utils/errors');
const { USER_ROLES } = require('../../config/constants');

class UserPolicy {
  canAccessProfile(currentUser, targetUserId) {
    if (currentUser.role === USER_ROLES.ADMIN) return true;
    if (currentUser.id === targetUserId.toString()) return true;
    throw new ForbiddenError('You can only view or manage your own profile');
  }

  canManageUsers(currentUser) {
    if (currentUser.role === USER_ROLES.ADMIN) return true;
    throw new ForbiddenError('Only administrators can manage users list');
  }
}

module.exports = new UserPolicy();
