const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, branch, semester } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      passwordHash,
      branch,
      semester,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      branch: user.branch,
      semester: user.semester,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      branch: user.branch,
      semester: user.semester,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { signup, login };