const express = require("express");
const connectDB = require("./config/db"); // Import the DB connection
const dotenv = require("dotenv"); // Import dotenv to load the .env variables
const signupRoutes = require('./routes/signup');
// Load environment variables
dotenv.config();
console.log("Starting server");
// Initialize the app
const app = express();

// Connect to the database
console.log("Connecting to MongoDB");
connectDB();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Example route (we'll add actual routes later)
app.get("/", (req, res) => {
  res.send("Status 200 :) Server is running!");
});

app.use('/signup', signupRoutes);

// Set the server port
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT isn't set
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
