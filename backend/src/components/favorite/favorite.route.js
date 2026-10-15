const express = require('express');
const router = express.Router();
const favoriteController = require('./favorite.controller');
const { addFavoriteSchema } = require('./favorite.validator');
const validate = require('../../middlewares/validation.middleware');
const { authenticate } = require('../../middlewares/auth.middleware');

router.use(authenticate);

router.get('/', favoriteController.getUserFavorites);
router.post('/', validate(addFavoriteSchema, 'body'), favoriteController.addFavorite);
router.delete('/:parkingId', favoriteController.removeFavorite);

module.exports = router;
