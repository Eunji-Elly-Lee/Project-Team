const express = require("express");
const meetingRouter = express.Router();
const {
  addMeeting,
  getMeeting,
  getAllMeetings,
  updateMeeting,
  deleteMeeting
} = require("../controllers/meetingController");

meetingRouter.post("/add", addMeeting);
meetingRouter.get("/get", getMeeting);
meetingRouter.get("/getAll", getAllMeetings);
meetingRouter.put("/update", updateMeeting);
meetingRouter.delete("/delete", deleteMeeting);

module.exports = meetingRouter;
