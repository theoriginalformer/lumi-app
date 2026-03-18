const express = require('express');
const cors = require('cors');

// Load env vars in development
if (process.env.NODE_ENV !== 'production') {
  try { require('dotenv').config({ path: '../.env' }); } catch(e) {}
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/user');

app.use('/api/tasks', taskRoutes);
app.use('/api/user', userRoutes);
app.post('/api/mood', (req, res) => {
  const userRouter = require('./routes/user');
  // Forward to user mood endpoint
  const { mood, note } = req.body;
  res.json({
    mood,
    needsNegotiation: mood === 'low' || mood === 'struggling',
    message: mood === 'good'
      ? 'Glad you are feeling good today!'
      : 'I hear you. Let us adjust your plan to make today manageable.'
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Lumi API', version: '1.0.0' });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`[Lumi API] Running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;