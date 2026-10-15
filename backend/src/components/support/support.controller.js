const supportService = require('./support.service');
const supportPolicy = require('./support.policy');
const ApiResponse = require('../../utils/response');

class SupportController {
  async createTicket(req, res, next) {
    try {
      const userId = req.user ? req.user.id : null;
      const ticket = await supportService.createTicket(req.body, userId);
      return ApiResponse.created(res, ticket, 'Support ticket submitted successfully. We will contact you soon.');
    } catch (error) {
      next(error);
    }
  }

  async listTickets(req, res, next) {
    try {
      supportPolicy.canViewAllTickets(req.user);
      const tickets = await supportService.listTickets();
      return ApiResponse.success(res, tickets, 'Support tickets retrieved');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SupportController();
