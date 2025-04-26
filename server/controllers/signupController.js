const User = require('../models/user');
const bcrypt = require('bcryptjs');

const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username:username,
      password: hashedPassword,
      notes:[]
    });

    // Save to database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ error: 'Something went wrong, please try again' });
  }
};

module.exports = signup;
