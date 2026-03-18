const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, default: 'Lumi User' },
  mood: {
    type: String,
    enum: ['good', 'low', 'struggling'],
    default: 'good'
  },
  moodHistory: [{
    mood: String,
    date: { type: Date, default: Date.now },
    note: String
  }],
  puzzlePieces: { type: Number, default: 0 },
  completedJewels: { type: Number, default: 0 },
  jewelryCase: [{
    name: String,
    completedAt: { type: Date, default: Date.now },
    type: {
      type: String,
      enum: ['ring', 'necklace', 'bracelet', 'earring', 'brooch', 'tiara', 'pendant', 'anklet'],
      default: 'ring'
    }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);