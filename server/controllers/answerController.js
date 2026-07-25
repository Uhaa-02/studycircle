const Answer = require('../models/Answer');
const User = require('../models/User');
const Doubt = require('../models/Doubt');
const updateReputation = require('../utils/updateReputation');

const createAnswer = async (req, res) => {
  try {
    const answer = await Answer.create(req.body);
    res.status(201).json(answer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all answers for a specific doubt
const getAnswersForDoubt = async (req, res) => {
  try {
    const answers = await Answer.find({ doubtId: req.params.doubtId }).populate('answeredBy', 'name branch');
    res.json(answers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    res.json(answer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    res.json({ message: 'Answer deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Toggle upvote on an answer
const toggleUpvoteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });

    const userId = req.userId;
    const hasUpvoted = answer.upvotes.some((id) => id.toString() === userId);

    if (hasUpvoted) {
      answer.upvotes.pull(userId);
    } else {
      answer.upvotes.push(userId);
    }

    await answer.save();
    await updateReputation(answer.answeredBy);

    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createAnswer, getAnswersForDoubt, updateAnswer, deleteAnswer, toggleUpvoteAnswer };