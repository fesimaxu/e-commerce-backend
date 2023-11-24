require("dotenv").config();
const { MongoClient }  = require('mongodb');

// Connection URL
const client = new MongoClient(`${process.env.DATABASE_URL}`);

// Database Name
const dbName = `${process.env.DATABASE_NAME}`;

// Database config
const dbConfig = async () =>{

  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  
  await client.close()
}


module.exports = dbConfig;