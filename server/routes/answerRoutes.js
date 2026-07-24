const express = require('express');
const router = express.Router();
const { createAnswer, getAnswersForDoubt, updateAnswer, deleteAnswer } = require('../controllers/answerController');

router.post('/', createAnswer);
router.get('/doubt/:doubtId', getAnswersForDoubt);
router.put('/:id', updateAnswer);
router.delete('/:id', deleteAnswer);

module.exports = router;