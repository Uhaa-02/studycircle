const User = require('../models/User');

const requireModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'moderator') {
      return res.status(403).json({ message: 'Access denied: moderators only' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = requireModerator;