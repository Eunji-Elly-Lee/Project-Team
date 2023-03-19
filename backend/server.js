const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
dotenv.config();

// Import routes
const userRoute = require("./routes/userRoute");
const emailRoute = require("./routes/emailRoute");
const projectRoute = require("./routes/projectRoute");
const scheduleRoute = require("./routes/scheduleRoute");

// Database connection
const connection = require("./database/db");
connection();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/emails", emailRoute);
app.use("/api/projects", projectRoute);
app.use("/api/schedules", scheduleRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
