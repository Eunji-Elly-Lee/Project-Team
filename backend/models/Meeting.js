const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true
  },
  meetingYear: {
    type: Number,
    required: true
  },
  meetingMonth: {
    type: Number,
    required: true
  },
  meetingDate: {
    type: Number,
    required: true
  },
  attendees: {
    type: String,
    required: true
  }
});

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
