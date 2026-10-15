const express = require('express');
const router = express.Router();
const reviewController = require('./review.controller');
const { createReviewSchema, reviewQuerySchema } = require('./review.validator');
const validate = require('../../middlewares/validation.middleware');
const { authenticate } = require('../../middlewares/auth.middleware');

router.get('/', validate(reviewQuerySchema, 'query'), reviewController.getParkingReviews);
router.post('/', authenticate, validate(createReviewSchema, 'body'), reviewController.addReview);

module.exports = router;
