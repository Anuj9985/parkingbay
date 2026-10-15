const SupportTicket = require('./support.model');

class SupportService {
  async createTicket(ticketData, userId = null) {
    return await SupportTicket.create({
      ...ticketData,
      user: userId
    });
  }

  async listTickets() {
    return await SupportTicket.find().sort({ createdAt: -1 });
  }
}

module.exports = new SupportService();
