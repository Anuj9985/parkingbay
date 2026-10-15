const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const { updateUserSchema, changePasswordSchema, userQuerySchema } = require('./user.validator');
const validate = require('../../middlewares/validation.middleware');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { USER_ROLES } = require('../../config/constants');

router.use(authenticate);

router.get('/profile', userController.getProfile);
router.patch('/profile', validate(updateUserSchema, 'body'), userController.updateProfile);
router.patch('/change-password', validate(changePasswordSchema, 'body'), userController.changePassword);

// Admin-only route
router.get('/', authorize(USER_ROLES.ADMIN), validate(userQuerySchema, 'query'), userController.listUsers);

module.exports = router;
