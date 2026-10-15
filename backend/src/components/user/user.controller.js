const userService = require('./user.service');
const userPolicy = require('./user.policy');
const ApiResponse = require('../../utils/response');

class UserController {
  async getProfile(req, res, next) {
    try {
      const user = await userService.getProfile(req.user.id);
      return ApiResponse.success(res, user, 'Profile fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      userPolicy.canAccessProfile(req.user, req.user.id);
      const user = await userService.updateProfile(req.user.id, req.body);
      return ApiResponse.success(res, user, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const result = await userService.changePassword(
        req.user.id,
        req.body.currentPassword,
        req.body.newPassword
      );
      return ApiResponse.success(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }

  async listUsers(req, res, next) {
    try {
      userPolicy.canManageUsers(req.user);
      const { users, pagination } = await userService.listUsers(req.query);
      return ApiResponse.paginated(res, users, pagination, 'Users list retrieved');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
