import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

const client = new MongoClient(process.env.MONGO_URI, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
 
async function getDB(dbName) {
  try {
    await client.connect();
    console.log("<===== Connected to MongoDB =====>");
    return client.db(dbName);
  } catch (err) {
    console.log(err)
  }
}

export async function getCollection(collectionName) {
  const db = await getDB('zeus-airline');
  if (db) return db.collection(collectionName);

  return null;
}
