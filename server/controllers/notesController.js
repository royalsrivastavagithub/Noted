const User = require("../models/user"); // Import the User model
const { encrypt, decrypt } = require("../utils/encryption");

// Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate the input
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    // Find the user by the ID from the JWT token (attached via middleware)
    const userId = req.user.userId; // Assuming user info was added to req by JWT middleware

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the new note to the user's notes array
    const encryptedTitle = encrypt(title);
    const encryptedContent = encrypt(content);
    user.notes.push({ title: encryptedTitle, content: encryptedContent });

    // Save the user with the new note
    await user.save();

    res
      .status(201)
      .json({ message: "Note created successfully", note: { title, content } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all notes of the logged-in user
const getNotes = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming user info was added to req by JWT middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const decryptedNotes = user.notes.map((note) => ({
      _id: note._id,
      title: decrypt(note.title),
      content: decrypt(note.content),
    }));

    res.status(200).json({ notes: decryptedNotes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a note by ID
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const userId = req.user.userId; // Assuming user info was added to req by JWT middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the note by ID and update it
    const noteIndex = user.notes.findIndex(
      (note) => note._id.toString() === id
    );

    if (noteIndex === -1) {
      return res.status(404).json({ error: "Note not found" });
    }

    const encryptedTitle = encrypt(title);
    const encryptedContent = encrypt(content);
    user.notes[noteIndex] = {
      ...user.notes[noteIndex]._doc,
      title: encryptedTitle,
      content: encryptedContent,
    };

    // Save the updated user
    await user.save();

    res.status(200).json({
      message: "Note updated successfully",
      note: user.notes[noteIndex],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a note by ID
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user.userId; // Assuming user info was added to req by JWT middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the note index and remove it
    const noteIndex = user.notes.findIndex(
      (note) => note._id.toString() === id
    );

    if (noteIndex === -1) {
      return res.status(404).json({ error: "Note not found" });
    }

    user.notes.splice(noteIndex, 1); // Remove the note

    // Save the updated user
    await user.save();

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote };
