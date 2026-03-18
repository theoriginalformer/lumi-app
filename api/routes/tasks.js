const express = require('express');
const router = express.Router();

// Demo tasks for when MongoDB is not connected
const demoTasks = [
  { id: '1', title: 'Morning stretches', description: 'Gentle 10-minute stretching routine', priority: 5, urgency: 4, importance: 5, category: 'health', completed: false },
  { id: '2', title: 'Take medication', description: 'PCOD medication with breakfast', priority: 5, urgency: 5, importance: 5, category: 'health', completed: false },
  { id: '3', title: 'Tidy bedroom', description: 'Make bed, organize nightstand', priority: 3, urgency: 2, importance: 4, category: 'household', completed: false },
  { id: '4', title: 'Review work emails', description: 'Check and respond to urgent emails', priority: 4, urgency: 4, importance: 3, category: 'work', completed: false },
  { id: '5', title: 'Meal prep lunch', description: 'Prepare a healthy PCOD-friendly lunch', priority: 4, urgency: 3, importance: 5, category: 'self-care', completed: false },
  { id: '6', title: 'Organize desk', description: 'Clear papers, wipe surfaces', priority: 2, urgency: 1, importance: 3, category: 'household', completed: false },
  { id: '7', title: 'Evening walk', description: '20-minute walk in the neighborhood', priority: 3, urgency: 2, importance: 4, category: 'health', completed: false },
  { id: '8', title: 'Journal entry', description: 'Write about today feelings and wins', priority: 3, urgency: 1, importance: 4, category: 'self-care', completed: false }
];

// Negotiation logic: filter and rank tasks based on mood
function negotiateTasks(tasks, mood) {
  const scored = tasks
    .filter(t => !t.completed)
    .map(t => ({
      ...t,
      score: (t.urgency * 2) + (t.importance * 1.5) + (t.priority)
    }))
    .sort((a, b) => b.score - a.score);

  if (mood === 'good') return scored;
  // For low/struggling: return top 3 priority tasks
  return scored.slice(0, 3);
}

// GET /api/tasks - Get all tasks
router.get('/', (req, res) => {
  res.json({ tasks: demoTasks });
});

// POST /api/tasks/negotiate - Negotiate task plan based on mood
router.post('/negotiate', (req, res) => {
  const { mood, tasks } = req.body;
  const taskList = tasks || demoTasks;
  const negotiated = negotiateTasks(taskList, mood || 'good');

  res.json({
    mood,
    negotiated,
    allTasks: taskList,
    message: mood === 'good'
      ? 'You are doing great! Here is your full plan.'
      : 'Let us focus on what matters most today. Here are your top priorities.'
  });
});

// POST /api/tasks/complete - Complete a task and award puzzle piece
router.post('/complete', (req, res) => {
  const { taskId } = req.body;

  res.json({
    taskId,
    completed: true,
    puzzlePieceAwarded: true,
    message: 'Amazing work! You earned a puzzle piece!'
  });
});

// POST /api/tasks/override - Override negotiated plan
router.post('/override', (req, res) => {
  const { tasks } = req.body;

  res.json({
    tasks,
    overridden: true,
    message: 'Your plan has been updated. You are in control!'
  });
});

module.exports = router;