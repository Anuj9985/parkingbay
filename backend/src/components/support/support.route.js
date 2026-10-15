const express = require('express');
const router = express.Router();
const supportController = require('./support.controller');
const { createTicketSchema } = require('./support.validator');
const validate = require('../../middlewares/validation.middleware');
const { authenticate, authorize } = require('../../middlewares/auth.middleware');
const { USER_ROLES } = require('../../config/constants');

// Public can submit tickets
router.post('/', validate(createTicketSchema, 'body'), supportController.createTicket);

// Admin can review tickets
router.get('/', authenticate, authorize(USER_ROLES.ADMIN), supportController.listTickets);

module.exports = router;
