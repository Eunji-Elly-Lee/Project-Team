const Project = require("../models/project");

// POST add project
exports.addProject = async (req, res) => {
  const { title, contents, skills, github, link } = req.body.project;

  try {
    // Create and save new project to DB
    const project = new Project({
      title,
      contents,
      skills,
      github,
      link
    });

    await project.save();

    return res.status(201).json(project);
  } catch (error) {
    return console.log(error);
  }
};

// GET specific project by id
exports.getProject = async (req, res) => {
  const id = req.query.id;

  try {
    // Find the project by id
    const project = await Project.findById(id);

    if (project) {
      return res.status(200).json(project);
    } else {
      return res.status(204).json("Project not found");
    }
  } catch (error) {
    return console.log(error);
  }
};

// GET all projects
exports.getAllProjects = async (req, res) => {
  try {
    // Find all projects
    const projects = await Project.find();

    if (projects) {
      return res.status(200).json(projects);
    } else {
      return res.status(204).json("Projects not found");
    }
  } catch (error) {
    return console.log(error);
  }
};
