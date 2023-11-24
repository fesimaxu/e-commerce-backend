require("dotenv").config();
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const app = require("../app");

let mongoServer;
let client;

const connect = async () => {
  mongoServer = new MongoMemoryServer(`${process.env.DATABASE_URL}`);
  const mongoUri = await mongoServer.getUri();
  client = await MongoClient.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const close = async () => {
  await client.close();
  await mongoServer.stop();
};

const clear = async () => {
  const db = client.db();
  const collections = await db.collections();
  for (const collection of collections) {
    if (collection.collectionName === "seller") {
      await collection.deleteMany({});
    }
  }
};

const agent = request.agent(app);

beforeAll(async () => await connect());
afterEach(async () => await clear());
afterAll(async () => await close());

describe("User Login", () => {
  describe("POST", () => {
    test("successful login", async () => {
      const res = await agent.post("/api/v1/auth/login").send({
        "username": "example_username",
        "password": "example_password"
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeTruthy();
    });
  });
});
