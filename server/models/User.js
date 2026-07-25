const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  branch: { type: String },
  semester: { type: Number },
  reputationScore: { type: Number, default: 0 },
  role: { type: String, enum: ['student', 'moderator'], default: 'student' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);