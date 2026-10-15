const Favorite = require('./favorite.model');
const Parking = require('../parking/parking.model');
const { NotFoundError, ConflictError } = require('../../utils/errors');

class FavoriteService {
  async addFavorite(userId, parkingId) {
    const parking = await Parking.findById(parkingId);
    if (!parking || !parking.isActive) {
      throw new NotFoundError('Parking spot not found');
    }

    const existing = await Favorite.findOne({ user: userId, parking: parkingId });
    if (existing) {
      throw new ConflictError('Parking spot already added to favorites');
    }

    const favorite = await Favorite.create({ user: userId, parking: parkingId });
    return favorite;
  }

  async removeFavorite(userId, parkingId) {
    const deleted = await Favorite.findOneAndDelete({ user: userId, parking: parkingId });
    if (!deleted) {
      throw new NotFoundError('Favorite not found');
    }
    return { message: 'Removed from favorites' };
  }

  async getUserFavorites(userId) {
    const favorites = await Favorite.find({ user: userId })
      .populate('parking')
      .sort({ createdAt: -1 });
    return favorites.map((fav) => fav.parking).filter((p) => p && p.isActive);
  }
}

module.exports = new FavoriteService();
