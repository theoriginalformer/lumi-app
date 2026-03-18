const express = require('express');
const router = express.Router();

// Demo user state
let demoUser = {
  name: 'Lumi User',
  mood: 'good',
  moodHistory: [],
  puzzlePieces: 0,
  completedJewels: 0,
  jewelryCase: []
};

const jewelTypes = ['ring', 'necklace', 'bracelet', 'earring', 'brooch', 'tiara', 'pendant', 'anklet'];

// GET /api/user/puzzle - Get puzzle progress
router.get('/puzzle', (req, res) => {
  res.json({
    puzzlePieces: demoUser.puzzlePieces,
    piecesNeeded: 8,
    completedJewels: demoUser.completedJewels,
    jewelryCase: demoUser.jewelryCase,
    currentProgress: demoUser.puzzlePieces % 8,
    nextJewelType: jewelTypes[demoUser.completedJewels % jewelTypes.length]
  });
});

// POST /api/user/puzzle/add - Add a puzzle piece
router.post('/puzzle/add', (req, res) => {
  demoUser.puzzlePieces += 1;

  // Check if we completed a jewel (8 pieces)
  if (demoUser.puzzlePieces % 8 === 0) {
    const jewelType = jewelTypes[demoUser.completedJewels % jewelTypes.length];
    demoUser.completedJewels += 1;
    demoUser.jewelryCase.push({
      name: `${jewelType.charAt(0).toUpperCase() + jewelType.slice(1)} #${demoUser.completedJewels}`,
      type: jewelType,
      completedAt: new Date().toISOString()
    });

    return res.json({
      puzzlePieces: demoUser.puzzlePieces,
      currentProgress: 0,
      completedJewels: demoUser.completedJewels,
      jewelryCase: demoUser.jewelryCase,
      newJewelCompleted: true,
      jewelType,
      message: `Congratulations! You completed a beautiful ${jewelType}!`
    });
  }

  res.json({
    puzzlePieces: demoUser.puzzlePieces,
    currentProgress: demoUser.puzzlePieces % 8,
    completedJewels: demoUser.completedJewels,
    newJewelCompleted: false,
    message: `Piece collected! ${8 - (demoUser.puzzlePieces % 8)} more to complete your next jewel.`
  });
});

// POST /api/mood - Log mood
router.post('/mood', (req, res) => {
  const { mood, note } = req.body;
  demoUser.mood = mood;
  demoUser.moodHistory.push({ mood, date: new Date().toISOString(), note });

  res.json({
    mood,
    needsNegotiation: mood === 'low' || mood === 'struggling',
    message: mood === 'good'
      ? 'Glad you are feeling good today!'
      : 'I hear you. Let us adjust your plan to make today manageable.'
  });
});

// GET /api/user - Get user profile
router.get('/', (req, res) => {
  res.json(demoUser);
});

// POST /api/user/reset - Reset demo state
router.post('/reset', (req, res) => {
  demoUser = {
    name: 'Lumi User',
    mood: 'good',
    moodHistory: [],
    puzzlePieces: 0,
    completedJewels: 0,
    jewelryCase: []
  };
  res.json({ message: 'Demo state reset', user: demoUser });
});

module.exports = router;