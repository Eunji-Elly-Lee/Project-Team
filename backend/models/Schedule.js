const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  projectId: {
    type: String,
    required: true
  },
  fromYear: {
    type: Number,
    required: true
  },
  fromMonth: {
    type: Number,
    required: true
  },
  fromDate: {
    type: Number,
    required: true
  },
  toYear: {
    type: Number,
    required: true
  },
  toMonth: {
    type: Number,
    required: true
  },
  toDate: {
    type: Number,
    required: true
  },
  issue: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
