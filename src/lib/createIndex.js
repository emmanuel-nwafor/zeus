import { getCollection } from "./db"; // Adjust path to your db.js

async function createUserIndex() {
  try {
    const usersCollection = await getCollection("users");
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    console.log("Unique index on email created successfully");
  } catch (error) {
    console.error("Error creating index:", error);
  }
}

createUserIndex();