const Note = require('../models/Note');
const Answer = require('../models/Answer');
const User = require('../models/User');

const updateReputation = async (userId) => {
  const noteResult = await Note.aggregate([
    { $match: { uploadedBy: userId } },
    { $project: { upvoteCount: { $size: '$upvotes' } } },
    { $group: { _id: null, total: { $sum: '$upvoteCount' } } },
  ]);

  const answerResult = await Answer.aggregate([
    { $match: { answeredBy: userId } },
    { $project: { upvoteCount: { $size: '$upvotes' } } },
    { $group: { _id: null, total: { $sum: '$upvoteCount' } } },
  ]);

  const noteTotal = noteResult[0]?.total || 0;
  const answerTotal = answerResult[0]?.total || 0;
  const reputationScore = noteTotal + answerTotal;

  await User.findByIdAndUpdate(userId, { reputationScore });
};

module.exports = updateReputation;