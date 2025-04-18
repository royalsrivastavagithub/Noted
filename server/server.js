const express = require("express");
const connectDB = require("./config/db"); // Import the DB connection
const dotenv = require("dotenv"); // Import dotenv to load the .env variables
const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const notesRoutes = require('./routes/notes');

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

const formatUptime = () => {
  const totalSeconds = Math.floor(process.uptime());
  const days = Math.floor(totalSeconds / 86400);
  const hrs = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return `${days}d ${hrs}h ${mins}m ${secs}s`;
};

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Noted API 👋',
    status: 'OK',
    version: '1.0',
    uptime: formatUptime(),
  });
});


app.use('/signup', signupRoutes);
app.use('/login', loginRoutes);
app.use('/notes', notesRoutes);

// Set the server port
const PORT = process.env.PORT || 5000; // Default to 5000 if PORT isn't set
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
