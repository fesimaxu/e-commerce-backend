const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "E-Commerce API Endpoint Documentation",
      version: "1.0.0",
      description:
        "Documentation for the API endpoint of the E-commerce Web App",
    },
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsdoc(options);