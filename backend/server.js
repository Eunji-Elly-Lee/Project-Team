const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();

// Database connection
const connection = require("./database/db");
connection();

// Middleware
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
