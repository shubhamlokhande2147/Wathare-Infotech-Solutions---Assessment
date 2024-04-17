// server.js
const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello from here");
});

app.get("/data", (req, res) => {
  try {
    // Read data from the JSON file
    const rawData = fs.readFileSync("sampleData.json");
    const jsonData = JSON.parse(rawData);
    res.json(jsonData);
  } catch (error) {
    console.error("Error reading data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
