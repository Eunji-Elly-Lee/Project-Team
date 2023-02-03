const express = require("express");
const emailRouter = express.Router();
const {
  sendCodeEmail
} = require("../controllers/emailController");

emailRouter.post("/codeEmail", sendCodeEmail);

module.exports = emailRouter;
