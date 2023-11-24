const sendErrorResponse = require("../utils/response")

// Error Handlig
const errorHandler = (err, req, res, next) => {
    sendErrorResponse(res, 500, err);
    next()
  };


module.exports  = errorHandler;