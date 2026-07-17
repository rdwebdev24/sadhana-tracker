const path = require("path");
const colors = require("colors");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db.js");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const sadhanaRoutes = require("./routes/sadhanaRoutes");
const reflectionRoutes = require("./routes/reflectionRoutes");
const DailyReflection = require("./model/DailyReflection.js");

const dns = require('node:dns/promises');
dns.setServers(["1.1.1.1"]);


connectDB();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

console.log(express.static(path.join(__dirname, "frontend")),"aaa")

app.use("/api/sadhana", sadhanaRoutes);
app.use("/api/reflections", reflectionRoutes);


app.get("/", (req, res) => {
   res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT} 🔥`);
});
