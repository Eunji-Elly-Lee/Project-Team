const express = require("express");
const projectRouter = express.Router();
const {
  addProject,
  getProject,
  getAllProjects,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

projectRouter.post("/add", addProject);
projectRouter.get("/get", getProject);
projectRouter.get("/getAll", getAllProjects);
projectRouter.put("/update", updateProject);
projectRouter.delete("/delete", deleteProject);

module.exports = projectRouter;
