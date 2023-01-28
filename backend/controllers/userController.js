const User = require("../models/user");
const bcrypt = require("bcryptjs");

// POST register user
exports.addUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user exists
    const existUser = await User.findOne({ email: email });

    if (existUser) {
      return res.status(400).json({ message: "The email is already registered!" });
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create and save new user to DB
      const user = new User({
        username,
        email,
        password: hashedPassword
      });

      await user.save();

      return res.status(201).json(user);
    }
  } catch (error) {
    return console.log(error);
  }
};

// POST login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email: email });

    if (user) {
      // Password validation
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        return res.status(200).json(user);
      } else {
        return res.status(400).json("Invalid password!")
      }
    } else {
      return res.status(404).json({ message: "Invalid email!" });
    }
  } catch (error) {
    return console.log(error);
  }
};