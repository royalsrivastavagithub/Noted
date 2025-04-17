const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const noteController = require('../controllers/notesController'); // Import the note controller

// Create a new note
router.post('/add', authMiddleware, noteController.createNote);

// Get all notes of the logged-in user
router.get('/', authMiddleware, noteController.getNotes);

// Update a note by id
router.put('/update/:id', authMiddleware, noteController.updateNote);

// Delete a note by id
router.delete('/delete/:id', authMiddleware, noteController.deleteNote);

module.exports = router;
