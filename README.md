# E-COMMERCE APP BACKEND

Backend for the e-commerce web app.

## 🔧 Tech Stack

- NodeJS
- ExpressJS
- MongoDB Driver
- Input Validation: Express validator
- Documentation: implemented with swagger docs
- Test: Jest Supertest and mongoDB Memory server

## 📝 Requirements

This project requires nodeJS version >= 14 and npm package manager.

## 📁 Project Configuration

The project is divided into:

- Controller: found in `src/controller` folder. Coordinates the interaction between the UI and the backend services.
- Middlewares: found in `src/middlewares` folder. Logic to process incoming HTTP requests and perform tasks such as authentication, validation, etc.
- Model: found in `src/model` directory. Database Schema of the events app.
- Routes: found in `src/routes` directory. URL endpoints and their corresponding method/action.


## 💻 Running Locally

1. Clone this repository by running:
   ```bash
   git clone https://github.com/fesimaxu/e-commerce-backend
   cd e-commerec-backend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Using the `.env.example` template, create a `.env` file and fill in the values for each environment variables.
   ```bash
   cp .env.example .env 
   ```
4. Start the server in dev mode:
   ```bash
   npm run dev 
   ```

## 🗃️ Database SetUp

This project uses MongoDB Driver for the database. Database Schema can be found in the Documentation section.
**NOTE**: You need to setup a using Brazilian E-Commerce Public Dataset by Olist , the default database name is: `localhost/config`. DB schemas are automatically synced

### Installing MONGODB DRIVER

- Linux
  ```bash
  sudo apt update
  sudo apt install mongodb
  ```


## 🌐 Endpoints

- POST `/api/v1/auth/login` -> User login
- GET `/api/v1/order_items` -> Get Order items
- PATCH `/api/v1/account` -> Update user info
- DELETE `/api/v1/order_items/{id}` -> Delete an order item


## 📩 Requests

- Accepts JSON only.
- Request body should **only** contain the specified values and follow the database schema.
- Example request:
  ```json
  {
    "username": "seller_id",
    "password": "seller_zip_code_prefix"
  }
  ```

## 📂 Response

Returns JSON.

## ⚠️ Response Status

- 200 - OK: User or resource has been successfully updated.
- 201 - Created: User or resource has been successfully created.
- 400 - Bad Request:
  - Request body has more than the specified attribute.
  - Invalid content-Type.
- 403 - Unauthorized: A user is not authenticated
- 404 - User or Resource Not Found.
- 500 - Internal Server Error.

## 💻 Testing

Tests can be carried out locally by running:

```bash
npm run test
```

Alternatively, online API testing tools such as Postman can be used to test the endpoints.

## 📄 License

This project uses the MIT License as found in [LICENSE](/LICENSE)

## 📖 Documentation

Documentation can be found [SWAGGERDOCS](http://localhost:3050/api-docs)

## 🔗 Links

[Server URL]()

[Database Schema]()

## 🤝 The DEVELOPER

Built by Igwe Uchenna Felix
[AUTHORS](/AUTHORS)

