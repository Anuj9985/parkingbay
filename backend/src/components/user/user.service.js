const User = require('./user.model');
const { NotFoundError, BadRequestError } = require('../../utils/errors');
const { getPaginationOptions, formatPaginationMeta } = require('../../utils/pagination');

class UserService {
  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async updateProfile(userId, updateData) {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true
    });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select('+password');
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new BadRequestError('Current password does not match');
    }

    user.password = newPassword;
    await user.save();
    return { message: 'Password updated successfully' };
  }

  async listUsers(query) {
    const { page, limit, skip } = getPaginationOptions(query);
    const filter = {};

    if (query.role) filter.role = query.role;
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { email: { $regex: query.search, $options: 'i' } }
      ];
    }

    const [users, total] = await Promise.all([
      User.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }),
      User.countDocuments(filter)
    ]);

    return {
      users,
      pagination: formatPaginationMeta(total, page, limit)
    };
  }
}

module.exports = new UserService();
