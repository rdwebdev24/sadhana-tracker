const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const colors = require("colors");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db.js");

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



app.use("/api/sadhana", sadhanaRoutes);
app.use("/api/reflections", reflectionRoutes);


app.get("/", (req, res) => {
  res.send({ status: 200, msg: "success" });
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT} 🔥`);
});
