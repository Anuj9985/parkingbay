class AuthPolicy {
  canRegister(role) {
    // Regular signup cannot create admin users directly
    return role !== 'admin';
  }
}

module.exports = new AuthPolicy();
