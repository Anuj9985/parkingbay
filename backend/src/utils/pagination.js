const { PAGINATION } = require('../config/constants');

const getPaginationOptions = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || PAGINATION.DEFAULT_PAGE);
  const limit = Math.min(
    PAGINATION.MAX_LIMIT,
    Math.max(1, parseInt(query.limit, 10) || PAGINATION.DEFAULT_LIMIT)
  );
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

const formatPaginationMeta = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  return {
    totalItems: total,
    totalPages,
    currentPage: page,
    limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};

module.exports = {
  getPaginationOptions,
  formatPaginationMeta
};
