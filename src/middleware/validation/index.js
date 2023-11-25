const { check, validationResult } = require("express-validator");
const { sendErrorResponse } = require("../../utils/response");

const validateLogIn = [
  check("username").trim().not().isEmpty().withMessage("usernmae is missing!"),

  check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

const validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return sendErrorResponse(res, 400, { error: error[0].msg });
  }

  next();
};

module.exports = {
  validateLogIn,
  validate,
};
