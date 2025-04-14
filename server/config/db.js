const mongoose = require("mongoose");
require("dotenv").config(); // This will load environment variables from .env

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

module.exports = connectDB; // Export the connectDB function
