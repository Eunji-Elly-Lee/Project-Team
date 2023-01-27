const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    // Remove spaces in email
    trim: true,
    unique: true,
    lowercase: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Boolean,
    // If ture, the user is admin
    default: false
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
