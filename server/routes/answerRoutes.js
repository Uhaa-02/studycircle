const express = require('express');
const router = express.Router();
const { createAnswer, getAnswersForDoubt, updateAnswer, deleteAnswer, toggleUpvoteAnswer } = require('../controllers/answerController');
const protect = require('../middleware/auth');

router.post('/', protect, createAnswer);
router.get('/doubt/:doubtId', getAnswersForDoubt);
router.put('/:id', protect, updateAnswer);
router.delete('/:id', protect, deleteAnswer);
router.post('/:id/upvote', protect, toggleUpvoteAnswer);

module.exports = router;