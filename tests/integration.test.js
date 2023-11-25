require("dotenv").config();
const { MongoClient } = require("mongodb");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const app = require("../app");
const agent = request.agent(app);

const client = new MongoClient(`${process.env.DATABASE_URL}`);

// Database Name
const dbName = `${process.env.DATABASE_NAME}`;

let mongod;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await MongoClient.connect(uri);
});
afterAll(async () => {
  await client.close();
  await mongod.stop();
});
afterEach(async () => {
  await client.connect();
  const database = client.db(dbName);

  for (const key in database) {
    const collection = database[key];
  }
});

describe("User Login", () => {
  describe("POST user login", () => {
    test("successful login", async () => {
      const res = await agent
        .post("/api/v1/auth/login")
        .set("content-type", "application/json")
        .send({
          username: "3442f8959a84dea7ee197c632cb2df15",
          password: 13023,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeTruthy();
    });
  });

  describe("GET all orders", () => {
    it("should return 200 and all orders", async () => {
      const res = await agent
        .post("/api/v1/auth/login")
        .set("content-type", "application/json")
        .send({
          username: "3442f8959a84dea7ee197c632cb2df15",
          password: 13023,
        });

      const isExistingUser = res.body.data;

      const response = await agent
        .get("/api/v1/order_items")
        .set("Authorization", `Bearer ${isExistingUser.token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  });

  describe("UPDATE a seller detail", () => {
    it("should return 200 and the updated seller details", async () => {
      const res = await agent
        .post("/api/v1/auth/login")
        .set("content-type", "application/json")
        .send({
          username: "3442f8959a84dea7ee197c632cb2df15",
          password: 13023,
        });

      const isExistingUser = res.body.data;

      const response = await agent
        .patch(`/api/v1/account`)
        .set("Authorization", `Bearer ${isExistingUser.token}`)
        .send({ city: "aba" });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("data");
    });
  });

  describe("DELETE an order", () => {

    it("should return 200 and the deleted order", async () => {
      const res = await agent
        .post("/api/v1/auth/login")
        .set("content-type", "application/json")
        .send({
          username: "3442f8959a84dea7ee197c632cb2df15",
          password: 13023,
        });

      const isExistingUser = res.body.data;

      // Note - To test this endpoint you need to always pass in the order_id of the item to delete
      const response = await agent
        .delete(`/api/v1/order_items/00010242fe8c5a6d1ba2dd792cb16214`)
        .set("Authorization", `Bearer ${isExistingUser.token}`);

      expect(response.statusCode).toBe(200);
    });
  });
});
