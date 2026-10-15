const express = require('express');
const router = express.Router();

const authRoutes = require('../components/auth/auth.route');
const userRoutes = require('../components/user/user.route');
const parkingRoutes = require('../components/parking/parking.route');
const bookingRoutes = require('../components/booking/booking.route');
const favoriteRoutes = require('../components/favorite/favorite.route');
const reviewRoutes = require('../components/review/review.route');
const cityRoutes = require('../components/city/city.route');
const supportRoutes = require('../components/support/support.route');

// API Health Check
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Component Routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/parkings', parkingRoutes);
router.use('/bookings', bookingRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/reviews', reviewRoutes);
router.use('/cities', cityRoutes);
router.use('/support', supportRoutes);

module.exports = router;
