const express = require('express');
const router = express.Router();
const { createNote, getNotes, updateNote, deleteNote, toggleUpvoteNote } = require('../controllers/noteController');
const upload = require('../config/upload');
const protect = require('../middleware/auth');
const requireModerator = require('../middleware/checkRole');

router.post('/', protect, upload.single('file'), createNote);
router.get('/', getNotes);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, requireModerator, deleteNote);
router.post('/:id/upvote', protect, toggleUpvoteNote);

module.exports = router;