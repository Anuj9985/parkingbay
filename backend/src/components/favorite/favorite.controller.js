const favoriteService = require('./favorite.service');
const ApiResponse = require('../../utils/response');

class FavoriteController {
  async addFavorite(req, res, next) {
    try {
      const favorite = await favoriteService.addFavorite(req.user.id, req.body.parkingId);
      return ApiResponse.created(res, favorite, 'Added to favorites');
    } catch (error) {
      next(error);
    }
  }

  async removeFavorite(req, res, next) {
    try {
      const result = await favoriteService.removeFavorite(req.user.id, req.params.parkingId);
      return ApiResponse.success(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }

  async getUserFavorites(req, res, next) {
    try {
      const favorites = await favoriteService.getUserFavorites(req.user.id);
      return ApiResponse.success(res, favorites, 'Favorites retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FavoriteController();
