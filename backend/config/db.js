const colors = require("colors");
const mongoose = require("mongoose");
const dns = require("dns");

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI is not set. Skipping database connection.");
    return;
  }
dns.setServers(["1.1.1.1"]);
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