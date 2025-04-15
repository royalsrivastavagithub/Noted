const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');  // Importing controller
const validateSignup = require('../middleware/validateSignup');  // Importing validation middleware

// Define the POST route for user signup
router.post('/', validateSignup, signupController); // Use validation middleware, then call the controller

module.exports = router;
