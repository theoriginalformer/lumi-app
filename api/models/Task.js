const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: { type: String, default: 'default-user' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  priority: { type: Number, default: 3, min: 1, max: 5 },
  urgency: { type: Number, default: 3, min: 1, max: 5 },
  importance: { type: Number, default: 3, min: 1, max: 5 },
  category: {
    type: String,
    enum: ['health', 'household', 'work', 'self-care', 'social', 'other'],
    default: 'other'
  },
  completed: { type: Boolean, default: false },
  isNegotiated: { type: Boolean, default: false },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema);