const Note = require('../models/Note');
const User = require('../models/User');

// Create a new note
const createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
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

module.exports = { createNote, getNotes };