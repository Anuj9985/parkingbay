class FavoritePolicy {
  canManage(user) {
    return Boolean(user && user.id);
  }
}

module.exports = new FavoritePolicy();
