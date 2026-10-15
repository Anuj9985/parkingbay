const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../user/user.model');
const RefreshToken = require('./auth.model');
const env = require('../../config/environment');
const { UnauthorizedError, ConflictError, BadRequestError } = require('../../utils/errors');

class AuthService {
  generateAccessToken(user) {
    return jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );
  }

  async generateRefreshToken(userId) {
    const token = crypto.randomBytes(40).toString('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    await RefreshToken.create({
      user: userId,
      token,
      expiresAt
    });

    return token;
  }

  async register(userData) {
    const existingUser = await User.findOne({ email: userData.email.toLowerCase() });
    if (existingUser) {
      throw new ConflictError('A user with this email already exists');
    }

    const user = await User.create(userData);
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        defaultVehicleType: user.defaultVehicleType
      },
      accessToken,
      refreshToken
    };
  }

  async login(email, password) {
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      throw new UnauthorizedError('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Your account has been deactivated. Please contact support.');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        defaultVehicleType: user.defaultVehicleType
      },
      accessToken,
      refreshToken
    };
  }

  async refreshToken(token) {
    const storedToken = await RefreshToken.findOne({ token, isRevoked: false });
    if (!storedToken || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }

    const user = await User.findById(storedToken.user);
    if (!user || !user.isActive) {
      throw new UnauthorizedError('User account not found or deactivated');
    }

    const accessToken = this.generateAccessToken(user);
    return { accessToken };
  }

  async logout(token) {
    if (token) {
      await RefreshToken.findOneAndUpdate({ token }, { isRevoked: true });
    }
    return { message: 'Logged out successfully' };
  }
}

module.exports = new AuthService();
