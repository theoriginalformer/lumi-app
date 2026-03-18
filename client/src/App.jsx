import { useState, useCallback } from 'react';
import './index.css';
import Dashboard from './components/Dashboard';
import JewelryCase from './components/JewelryCase';
import NegotiationModal from './components/NegotiationModal';
import CelebrationOverlay from './components/CelebrationOverlay';

const API_BASE = import.meta.env.PROD ? '' : 'http://localhost:3001';

const defaultTasks = [
  { id: '1', title: 'Morning stretches', description: 'Gentle 10-minute stretching routine', priority: 5, urgency: 4, importance: 5, category: 'health', completed: false },
  { id: '2', title: 'Take medication', description: 'PCOD medication with breakfast', priority: 5, urgency: 5, importance: 5, category: 'health', completed: false },
  { id: '3', title: 'Tidy bedroom', description: 'Make bed, organize nightstand', priority: 3, urgency: 2, importance: 4, category: 'household', completed: false },
  { id: '4', title: 'Review work emails', description: 'Check and respond to urgent emails', priority: 4, urgency: 4, importance: 3, category: 'work', completed: false },
  { id: '5', title: 'Meal prep lunch', description: 'Prepare a healthy PCOD-friendly lunch', priority: 4, urgency: 3, importance: 5, category: 'self-care', completed: false },
  { id: '6', title: 'Organize desk', description: 'Clear papers, wipe surfaces', priority: 2, urgency: 1, importance: 3, category: 'household', completed: false },
  { id: '7', title: 'Evening walk', description: '20-minute walk in the neighborhood', priority: 3, urgency: 2, importance: 4, category: 'health', completed: false },
  { id: '8', title: 'Journal entry', description: 'Write about today feelings and wins', priority: 3, urgency: 1, importance: 4, category: 'self-care', completed: false },
];

function App() {
  const [view, setView] = useState('home');
  const [mood, setMood] = useState(null);
  const [tasks, setTasks] = useState(defaultTasks);
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [negotiatedTasks, setNegotiatedTasks] = useState([]);
  const [lumiMessage, setLumiMessage] = useState(null);
  const [puzzlePieces, setPuzzlePieces] = useState(0);
  const [completedJewels, setCompletedJewels] = useState(0);
  const [jewelryCase, setJewelryCase] = useState([]);
  const [celebration, setCelebration] = useState(null);

  const jewelTypes = ['ring', 'necklace', 'bracelet', 'earring', 'brooch', 'tiara', 'pendant', 'anklet'];
  const jewelEmojis = { ring: '\uD83D\uDC8D', necklace: '\uD83D\uDCFF', bracelet: '\uD83D\uDCAB', earring: '\u2728', brooch: '\uD83C\uDF1F', tiara: '\uD83D\uDC51', pendant: '\uD83D\uDD2E', anklet: '\uD83C\uDF19' };

  const handleMoodSelect = useCallback((selectedMood) => {
    setMood(selectedMood);

    if (selectedMood === 'good') {
      setLumiMessage('You are doing great! Here is your full plan for today. You have got this! \uD83C\uDF1F');
      setNegotiatedTasks([]);
    } else {
      // Negotiate - get top 3 priority tasks
      const scored = tasks
        .filter(t => !t.completed)
        .map(t => ({ ...t, score: (t.urgency * 2) + (t.importance * 1.5) + t.priority }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      setNegotiatedTasks(scored);
      setLumiMessage(
        selectedMood === 'low'
          ? 'I notice you are feeling low today. Let us focus on just 3 things that matter most. You can always adjust the plan.'
          : 'I am here with you. On tough days, less is more. Here are 3 gentle priorities. You decide what feels right.'
      );
      setShowNegotiation(true);
    }
  }, [tasks]);

  const handleTaskComplete = useCallback((taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));

    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      const newPieces = puzzlePieces + 1;
      setPuzzlePieces(newPieces);

      if (newPieces % 8 === 0) {
        const jewelType = jewelTypes[completedJewels % jewelTypes.length];
        const newJewels = completedJewels + 1;
        setCompletedJewels(newJewels);
        setJewelryCase(prev => [...prev, {
          name: jewelType.charAt(0).toUpperCase() + jewelType.slice(1) + ' #' + newJewels,
          type: jewelType,
          completedAt: new Date().toISOString()
        }]);
        setCelebration({
          type: jewelType,
          emoji: jewelEmojis[jewelType],
          name: jewelType.charAt(0).toUpperCase() + jewelType.slice(1) + ' #' + newJewels
        });
      }
    }
  }, [tasks, puzzlePieces, completedJewels, jewelTypes, jewelEmojis]);

  const handleAcceptPlan = useCallback((acceptedTasks) => {
    setShowNegotiation(false);
    setLumiMessage('Your plan is set! Focus on these priorities and take it one step at a time. \uD83D\uDC9C');
  }, []);

  const handleOverridePlan = useCallback((overriddenTasks) => {
    setNegotiatedTasks(overriddenTasks);
    setShowNegotiation(false);
    setLumiMessage('Plan updated! You are in control. Do what feels right today. \u2728');
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__logo">
          <div className="header__icon">{'\u2728'}</div>
          <h1 className="header__title">Lumi</h1>
        </div>
        <p className="header__subtitle">Your gentle daily co-pilot</p>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <button
          className={'nav__btn' + (view === 'home' ? ' nav__btn--active' : '')}
          onClick={() => setView('home')}
        >
          <span className="nav__icon">{'\uD83C\uDFE0'}</span>
          <span className="nav__label">Home</span>
        </button>
        <button
          className={'nav__btn' + (view === 'jewelry' ? ' nav__btn--active' : '')}
          onClick={() => setView('jewelry')}
        >
          <span className="nav__icon">{'\uD83D\uDC8E'}</span>
          <span className="nav__label">Jewels</span>
        </button>
      </nav>

      {/* Views */}
      {view === 'home' && (
        <Dashboard
          mood={mood}
          tasks={tasks}
          negotiatedTasks={negotiatedTasks}
          lumiMessage={lumiMessage}
          puzzlePieces={puzzlePieces}
          onMoodSelect={handleMoodSelect}
          onTaskComplete={handleTaskComplete}
          onReviewPlan={() => setShowNegotiation(true)}
        />
      )}

      {view === 'jewelry' && (
        <JewelryCase
          puzzlePieces={puzzlePieces}
          completedJewels={completedJewels}
          jewelryCase={jewelryCase}
          jewelEmojis={jewelEmojis}
        />
      )}

      {/* Negotiation Modal */}
      {showNegotiation && (
        <NegotiationModal
          mood={mood}
          tasks={negotiatedTasks}
          allTasks={tasks}
          onAccept={handleAcceptPlan}
          onOverride={handleOverridePlan}
          onClose={() => setShowNegotiation(false)}
        />
      )}

      {/* Celebration */}
      {celebration && (
        <CelebrationOverlay
          celebration={celebration}
          onClose={() => setCelebration(null)}
        />
      )}
    </div>
  );
}

export default App;