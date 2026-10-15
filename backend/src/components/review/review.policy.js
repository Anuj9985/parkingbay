class ReviewPolicy {
  canCreate(user) {
    return Boolean(user && user.id);
  }
}

module.exports = new ReviewPolicy();
