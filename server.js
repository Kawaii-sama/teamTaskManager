require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API Running");
});

console.log("Server file is running");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});