const express = require('express');
const router = express.Router();

// We'll use this controller and middleware next
const loginController = require('../controllers/loginController');
const validateLogin = require('../middleware/validateLogin');

// POST /login
router.post('/', validateLogin, loginController);

module.exports = router;
