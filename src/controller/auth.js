/* eslint-disable no-undef */
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
// eslint-disable-next-line no-undef
const dbName = `${process.env.DATABASE_NAME}`;

// user login controller
const loginUserController = async (req, res) => {
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
      seller_zip_code_prefix: Number(password),
    });

    if (!user) {
      sendErrorResponse(res, 404, "user not found");
    }

    const token = generateToken(user.seller_id);

    const userData = {
      ...user,
      token,
    };
    sendSuccessfulResponse(res, 200, userData);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  } finally {
    await client.close();
  }
};

const updateUserDetailsController = async (req, res) => {
  try {
    const { seller_id } = req.user;

    const { city, state } = req.body;

    // database connection
    await client.connect();
    const database = client.db(dbName);
    const users = database.collection("seller");

    const updateField = {};

    if (city !== undefined) {
      updateField.seller_city = city;
    }

    if (state !== undefined) {
      updateField.seller_state = state;
    }
    const updatedUser = await users.updateMany(
      { seller_id: seller_id },
      { $set: updateField }
    );

    if (!updatedUser || updatedUser.matchedCount === 0) {
      sendErrorResponse(res, 404, "user details failed to update");
    }

    const user = await users.findOne({ seller_id: seller_id });

    const updatedUserData = {
      city: user.seller_city,
      state: user.seller_state,
    };

    sendSuccessfulResponse(res, 200, updatedUserData);
  } catch (error) {
    sendErrorResponse(res, 500, error);
  } finally {
    await client.close();
  }
};

module.exports = {
  loginUserController,
  updateUserDetailsController,
};
