const User = require("../models/user");
const bcrypt = require("bcryptjs");

// POST register user
exports.addUser = async (req, res) => {
  const { username, email, password } = req.body.user;

  try {
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
  } catch (error) {
    return console.log(error);
  }
};

// POST login
exports.login = async (req, res) => {
  const { email, password } = req.body.user;

  try {
    // Find user
    const user = await User.findOne({ email: email });

    if (user) {
      // Password validation
      const validPassword = await bcrypt.compare(password, user.password);

      if (validPassword) {
        return res.status(200).json(user);
      } else {
        return res.status(203).json("Invalid password!");
      }
    } else {
      return res.status(203).json("Invalid email!");
    }
  } catch (error) {
    return console.log(error);
  }
};

// GET specific user by email
exports.getUser = async (req, res) => {
  const email = req.query.email;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(204).json("User Not Found!");
    }
  } catch (error) {
    return console.log(error);
  }
};
