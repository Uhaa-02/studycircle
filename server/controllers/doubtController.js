const Doubt = require('../models/Doubt');
const User = require('../models/User');

const createDoubt = async (req, res) => {
  try {
    const doubt = await Doubt.create(req.body);
    res.status(201).json(doubt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getDoubts = async (req, res) => {
  try {
    const { tag } = req.query;
    const filter = {};
    if (tag) filter.tags = tag;

    const doubts = await Doubt.find(filter).populate('postedBy', 'name branch');
    res.json(doubts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateDoubt = async (req, res) => {
  try {
    const doubt = await Doubt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doubt) return res.status(404).json({ message: 'Doubt not found' });
    res.json(doubt);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteDoubt = async (req, res) => {
  try {
    const doubt = await Doubt.findByIdAndDelete(req.params.id);
    if (!doubt) return res.status(404).json({ message: 'Doubt not found' });
    res.json({ message: 'Doubt deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createDoubt, getDoubts, updateDoubt, deleteDoubt };