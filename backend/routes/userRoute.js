const express = require("express");
const userRouter = express.Router();
const {
  addUser,
  login,
  getUser,
  updateUser
} = require("../controllers/userController");

userRouter.post("/register", addUser);
userRouter.post("/login", login);
userRouter.get("/get", getUser);
userRouter.put("/update", updateUser);

module.exports = userRouter;
