require("dotenv").config();
const { MongoClient } = require("mongodb");
const {
  sendErrorResponse,
  sendSuccessfulResponse,
} = require("../utils/response");
const { generateToken } = require("../services/helpers");

// Connection URL
const client = new MongoClient(`${process.env.DATABASE_URL}`);

// Database Name
const dbName = `${process.env.DATABASE_NAME}`;

// user login controller
const loginUserController = async (req, res, next) => {
  try {
    // user input details
    const { username, password } = req.body;

    // database connection
    await client.connect();
    const database = client.db(dbName);
    const users = database.collection("seller");

    // retrieving users details
    const user = await users.findOne({
      seller_id: username,
      seller_zip_code_prefix: password,
    });

    if (!user) {
      sendErrorResponse(res, 404, "user not found");
    }

    const token = generateToken(user.seller_id);

    const userData = {
      ...user, 
      token
    }
    sendSuccessfulResponse(res, 200, userData);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  } finally {
    await client.close();
  }
};

module.exports = {
  loginUserController,
};
