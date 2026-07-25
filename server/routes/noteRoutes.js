const express = require('express');
const router = express.Router();
const { createNote, getNotes, updateNote, deleteNote } = require('../controllers/noteController');
const upload = require('../config/upload');
const protect = require('../middleware/auth');
const requireModerator = require('../middleware/checkRole');

router.post('/', protect, upload.single('file'), createNote);
router.get('/', getNotes);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, requireModerator, deleteNote);

module.exports = router;