const Note = require('../models/Note');
const User = require('../models/User');
const updateReputation = require('../utils/updateReputation');
// Create a new note
const createNote = async (req, res) => {
  try {
    const noteData = {
      ...req.body,
      uploadedBy: req.userId,
      fileUrl: req.file ? req.file.path : req.body.fileUrl,
    };
    const note = await Note.create(noteData);
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get notes, with optional filtering by subject/semester/tag
const getNotes = async (req, res) => {
  try {
    const { subject, semester, tag } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (semester) filter.semester = semester;
    if (tag) filter.tags = tag;

    const notes = await Note.find(filter).populate('uploadedBy', 'name branch');
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const toggleUpvoteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    const userId = req.userId;
    const hasUpvoted = note.upvotes.some((id) => id.toString() === userId);

    if (hasUpvoted) {
      note.upvotes.pull(userId);
    } else {
      note.upvotes.push(userId);
    }

    await note.save();
    await updateReputation(note.uploadedBy);

    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote, toggleUpvoteNote };