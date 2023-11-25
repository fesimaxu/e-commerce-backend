require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
const swaggerUi = require("swagger-ui-express");
const { BaseRoute } = require("./src/utils/endpoints");
const errorHandling = require("./src/middleware/errorHandler");
const dbConfig = require("./src/config");
const specs = require("./swaggerConfig");

// initializing express server
const app = express();

// PORT
const PORT = process.env.PORT;

// middlewares
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// HTTP Request Headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// connection to routes
readdirSync("./src/routes").map((path) => {
  if (path !== "auth.js") {
    app.use(BaseRoute, require(`./src/routes/${path}`));
  }
  app.use(BaseRoute, require(`./src/routes/${path}`));
});

// base api
app.get(BaseRoute, (req, res) => {
  return req.user
    ? res.send(req.user)
    : res.send({
        message: "E-commerce Backend is Live!",
      });
});

// error handling
app.use(errorHandling);

// swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Database connection
dbConfig()
  .then(() => {
    console.log("Database Connected !");
  })
  .catch((e) => {
    console.log("failed to connect to database", e);
  });

  // server connection
app.listen(PORT, () => {
  console.log(`E-commerce backend running on PORT ${PORT}`);
});

module.exports = app;
