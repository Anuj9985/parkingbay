const Review = require('./review.model');
const Parking = require('../parking/parking.model');
const { NotFoundError, ConflictError } = require('../../utils/errors');
const { getPaginationOptions, formatPaginationMeta } = require('../../utils/pagination');

class ReviewService {
  async addReview(userId, data) {
    const { parkingId, rating, comment } = data;

    const parking = await Parking.findById(parkingId);
    if (!parking || !parking.isActive) {
      throw new NotFoundError('Parking spot not found');
    }

    const existing = await Review.findOne({ user: userId, parking: parkingId });
    if (existing) {
      throw new ConflictError('You have already submitted a review for this parking spot');
    }

    const review = await Review.create({
      user: userId,
      parking: parkingId,
      rating,
      comment
    });

    // Recalculate average rating for parking
    const stats = await Review.aggregate([
      { $match: { parking: parking._id } },
      {
        $group: {
          _id: '$parking',
          avgRating: { $avg: '$rating' },
          total: { $sum: 1 }
        }
      }
    ]);

    if (stats.length > 0) {
      parking.rating = Math.round(stats[0].avgRating * 10) / 10;
      parking.totalReviews = stats[0].total;
      await parking.save();
    }

    return review;
  }

  async getParkingReviews(query) {
    const { page, limit, skip } = getPaginationOptions(query);
    const filter = { parking: query.parkingId };

    const [reviews, total] = await Promise.all([
      Review.find(filter)
        .populate('user', 'name avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Review.countDocuments(filter)
    ]);

    return {
      reviews,
      pagination: formatPaginationMeta(total, page, limit)
    };
  }
}

module.exports = new ReviewService();
