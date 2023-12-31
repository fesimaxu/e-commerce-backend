const sendSuccessfulResponse = (
    res,
    statusCode,
    data,
    message
  ) =>
    res.status(statusCode).json({
      message: message,
      status: statusCode,
      data: data,
      success: true,
    });
  
  const sendErrorResponse = (
    res,
    statusCode,
    data,
    message
  ) => {
    if (data.code === 11000) {
      const field = Object.keys(data.keyPattern)[0];
      const value = data.keyValue[field];
      const message = `Duplicate key error: ${field} with value ${value} already exists.`;
  
      return res.status(statusCode).json({
        message: message,
        status: statusCode,
        data: data,
        error: true,
      });
    } else {
      // Handle other errors
      return res.status(statusCode).json({
        message: message,
        status: statusCode,
        data: data,
        error: true,
      });
    }
  };
  
  module.exports = {
    sendSuccessfulResponse,
    sendErrorResponse
  }