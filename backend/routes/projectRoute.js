const express = require("express");
const projectRouter = express.Router();
const {
  addProject,
  getProject,
  getAllProjects
} = require("../controllers/projectController");

projectRouter.post("/add", addProject);
projectRouter.get("/get", getProject);
projectRouter.get("/getAll", getAllProjects);

module.exports = projectRouter;
