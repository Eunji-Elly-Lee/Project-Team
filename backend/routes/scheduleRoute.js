const express = require("express");
const scheduleRouter = express.Router();
const {
  addSchedule,
  getSchedule,
  getAllSchedules,
  updateSchedule,
  deleteSchedule
} = require("../controllers/scheduleController");

scheduleRouter.post("/add", addSchedule);
scheduleRouter.get("/get", getSchedule);
scheduleRouter.get("/getAll", getAllSchedules);
scheduleRouter.put("/update", updateSchedule);
scheduleRouter.delete("/delete", deleteSchedule);

module.exports = scheduleRouter;
