const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // No duplicate usernames
  },
  password: {
    type: String,
    required: true,
  },
  notes: [
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
