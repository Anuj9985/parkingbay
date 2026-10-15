class ApiResponse {
  static success(res, data = null, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  }

  static created(res, data = null, message = 'Resource created successfully') {
    return this.success(res, data, message, 201);
  }

  static paginated(res, data, pagination, message = 'Data fetched successfully') {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination
    });
  }

  static error(res, message = 'Internal Server Error', statusCode = 500, details = null) {
    const responsePayload = {
      success: false,
      message
    };
    if (details) responsePayload.errors = details;
    return res.status(statusCode).json(responsePayload);
  }
}

module.exports = ApiResponse;
