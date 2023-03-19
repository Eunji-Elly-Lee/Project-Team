const Schedule = require("../models/schedule");

// POST add schedule
exports.addSchedule = async (req, res) => {
  const {
    projectId, fromYear, fromMonth, fromDate,
    toYear, toMonth, toDate, issue, color
  } = req.body.schedule;

  try {
    // Create and save new schedule to DB
    const schedule = new Schedule({
      projectId,
      fromYear,
      fromMonth,
      fromDate,
      toYear,
      toMonth,
      toDate,
      issue,
      color
    });

    await schedule.save();

    return res.status(201).json(schedule);
  } catch (error) {
    return console.log(error);
  }
};

// GET specific schedule by id
exports.getSchedule = async (req, res) => {
  const id = req.query.id;

  try {
    // Find the schedule by id
    const schedule = await Schedule.findById(id);

    if (schedule) {
      return res.status(200).json(schedule);
    } else {
      return res.status(204).json("Schedule not found");
    }
  } catch (error) {
    return console.log(error);
  }
};

// GET all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    // Find all schedules
    const schedules = await Schedule.find();

    if (schedules) {
      return res.status(200).json(schedules);
    } else {
      return res.status(204).json("Schedules not found");
    }
  } catch (error) {
    return console.log(error);
  }
};

// PUT update schedule by id
exports.updateSchedule = async (req, res) => {
  const {
    _id, projectId, fromYear, fromMonth, fromDate,
    toYear, toMonth, toDate, issue, color
  } = req.body.schedule;

  try {
    // Find and update the schedule's info
    const schedule = await Schedule.findByIdAndUpdate(
      _id,
      {        
        projectId: projectId,
        fromYear: fromYear,
        fromMonth: fromMonth,
        fromDate: fromDate,
        toYear: toYear,
        toMonth: toMonth,
        toDate: toDate,
        issue: issue,
        color: color
      },
      {
        // Option: return new data updated
        new: true
      }
    );

    return res.status(202).json(schedule);
  } catch (error) {
    return console.log(error);
  }
};

// DELETE schedule by id
exports.deleteSchedule = async (req, res) => {
  const id = req.query.id;

  try {
    // Find and delete the schedule data
    await Schedule.findByIdAndDelete(id);

    return res.status(202).json("Deleted successfully");
  } catch (error) {
    return console.log(error);
  }
};
