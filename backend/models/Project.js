const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  contents: {
    type: String,
    required: true
  },
  skills: {
    type: String,
    required: true
  },
  github: {
    type: String
  },
  link: {
    type: String
  }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
