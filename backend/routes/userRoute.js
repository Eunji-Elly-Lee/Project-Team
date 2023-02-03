const express = require("express");
const userRouter = express.Router();
const {
  addUser,
  login,
  getUser
} = require("../controllers/userController");

userRouter.post("/register", addUser);
userRouter.post("/login", login);
userRouter.get("/user", getUser);

module.exports = userRouter;
