const colors = require("colors");
const mongoose = require("mongoose");

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI is not set. Skipping database connection.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB Connected 🔥");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
}

module.exports = connectDB;