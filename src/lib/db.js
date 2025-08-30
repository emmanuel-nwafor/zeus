import { MongoClient, ServerApiVersion } from "mongodb";

// Singleton MongoClient instance
let client;
let clientPromise;

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error("MONGO_URI is not defined"); // Remove .env.local reference
}

console.log("Loading MONGO_URI:", process.env.MONGO_URI); // Debug log

// Initialize MongoClient only once
if (!client) {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect().catch((err) => {
    console.error("MongoDB initial connection error:", err.message, err.stack);
    throw err;
  });
}

async function getDB(dbName) {
  try {
    await clientPromise;
    console.log("<===== Connected to MongoDB =====>");
    return client.db(dbName);
  } catch (err) {
    console.error("MongoDB connection error:", err.message, err.stack);
    throw err;
  }
}

export async function getCollection(collectionName) {
  try {
    const db = await getDB("zeus-airline");
    return db.collection(collectionName);
  } catch (err) {
    console.error("Error getting collection:", err.message, err.stack);
    return null;
  }
}