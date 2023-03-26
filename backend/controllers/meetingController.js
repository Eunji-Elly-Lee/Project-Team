const Meeting = require("../models/meeting");

// POST add meeting
exports.addMeeting = async (req, res) => {
  const {
    projectId, meetingYear, meetingMonth, meetingDate, attendees
  } = req.body.meeting;

  try {
    // Create and save new meeting to DB
    const meeting = new Meeting({
      projectId,
      meetingYear,
      meetingMonth,
      meetingDate,
      attendees
    });

    await meeting.save();

    return res.status(201).json(meeting);
  } catch (error) {
    return console.log(error);
  }
};

// GET specific meeting by id
exports.getMeeting = async (req, res) => {
  const id = req.query.id;

  try {
    // Find the meeting by id
    const meeting = await Meeting.findById(id);

    if (meeting) {
      return res.status(200).json(meeting);
    } else {
      return res.status(204).json("Meeting not found");
    }
  } catch (error) {
    return console.log(error);
  }
};

// GET all meetings by project id
exports.getAllMeetings = async (req, res) => {
  const projectId = req.query.projectId;

  try {
    // Find all meetings of the specific project
    const meetings = await Meeting.find({ projectId: projectId });

    if (meetings) {
      return res.status(200).json(meetings);
    } else {
      return res.status(204).json("Meetings not found");
    }
  } catch (error) {
    return console.log(error);
  }
};

// PUT update meeting by id
exports.updateMeeting = async (req, res) => {
  const {
    _id, projectId, meetingYear, meetingMonth,
    meetingDate, attendees
  } = req.body.meeting;

  try {
    // Find and update the meeting's info
    const meeting = await Meeting.findByIdAndUpdate(
      _id,
      {        
        projectId: projectId,
        meetingYear: meetingYear,
        meetingMonth: meetingMonth,
        meetingDate: meetingDate,
        attendees: attendees
      },
      {
        // Option: return new data updated
        new: true
      }
    );

    return res.status(202).json(meeting);
  } catch (error) {
    return console.log(error);
  }
};

// DELETE meeting by id
exports.deleteMeeting = async (req, res) => {
  const id = req.query.id;

  try {
    // Find and delete the meeting data
    await Meeting.findByIdAndDelete(id);

    return res.status(202).json("Deleted successfully");
  } catch (error) {
    return console.log(error);
  }
};
