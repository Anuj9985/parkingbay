const reviewService = require('./review.service');
const ApiResponse = require('../../utils/response');

class ReviewController {
  async addReview(req, res, next) {
    try {
      const review = await reviewService.addReview(req.user.id, req.body);
      return ApiResponse.created(res, review, 'Review added successfully');
    } catch (error) {
      next(error);
    }
  }

  async getParkingReviews(req, res, next) {
    try {
      const { reviews, pagination } = await reviewService.getParkingReviews(req.query);
      return ApiResponse.paginated(res, reviews, pagination, 'Reviews retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReviewController();
