require("dotenv").config();
const { MongoClient } = require("mongodb");
const { verifyToken } = require("../../services/helpers");
const { sendErrorResponse } = require("../../utils/response");

// Connection URL
const client = new MongoClient(`${process.env.DATABASE_URL}`);

// Database Name
const dbName = `${process.env.DATABASE_NAME}`;

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;

    if (!token) {
      return sendErrorResponse(
        res,
        401,
        "Invalid token!",
        "Unauthorized Access!"
      );
    }

    const jwtToken = token.split("Bearer ")[1];

    if (!jwtToken) {
      return sendErrorResponse(
        res,
        401,
        "Invalid token!",
        "Unauthorized Access!"
      );
    }
    const decode = verifyToken(jwtToken);

    const { expiresIn } = decode;

    if (Date.now() >= expiresIn * 1000) {
      return sendErrorResponse(
        res,
        401,
        "token time expired!",
        "Unauthorized Access!"
      );
    }

    const { id } = decode;

    // database connection
    await client.connect();
    const database = client.db(dbName);
    const users = database.collection("seller");

    // retrieving users details
    const user = await users.findOne({
      seller_id: id,
    });

    if (!user) {
      sendErrorResponse(res, 404, "user not found");
    }

    req.user = user;

    next()
  } catch (error) {
    sendErrorResponse(res, 500, error);
  } finally {
    await client.close();
  }
 
};


module.exports = isAuth;