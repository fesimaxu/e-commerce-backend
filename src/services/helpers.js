require("dotenv").config();
const jwt = require("jsonwebtoken");


const generateToken = (id) => {
    return jwt.sign({ id }, `${process.env.JWT_SECERET_KEY}`, {
      expiresIn: "24h"
    });
  };
  
const verifyToken = (jwtToken) => {
    return jwt.verify(jwtToken, `${process.env.JWT_SECERET_KEY}`);
  };
  

  module.exports = {
    generateToken,
    verifyToken
  }