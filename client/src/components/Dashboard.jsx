import MoodLogger from './MoodLogger';
import TaskList from './TaskList';

function Dashboard({ mood, tasks, negotiatedTasks, lumiMessage, puzzlePieces, onMoodSelect, onTaskComplete, onReviewPlan }) {
  return (
    <>
      <MoodLogger mood={mood} onMoodSelect={onMoodSelect} />

      {lumiMessage && (
        <div className="lumi-msg">
          <div className="lumi-msg__avatar">{'\u2728'}</div>
          <p className="lumi-msg__text">{lumiMessage}</p>
        </div>
      )}

      {mood && (mood === 'low' || mood === 'struggling') && negotiatedTasks.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '12px 0 4px' }}>
          <button
            className="btn btn--secondary"
            style={{ flex: 'none', padding: '8px 16px', fontSize: '12px' }}
            onClick={onReviewPlan}
          >
            {'\uD83D\uDD04'} Review Plan
          </button>
        </div>
      )}

      {mood && (
        <TaskList
          tasks={tasks}
          negotiatedTasks={negotiatedTasks}
          mood={mood}
          onTaskComplete={onTaskComplete}
        />
      )}

      {mood && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="card__title" style={{ justifyContent: 'center' }}>
            <span className="card__title-icon" style={{ background: 'linear-gradient(135deg, #A78BFA, #F9A8D4)' }}>
              {'\uD83D\uDC8E'}
            </span>
            Puzzle Progress
          </div>
          <div className="jewelry-case__progress">
            <div className="jewelry-case__bar-container">
              <div
                className="jewelry-case__bar"
                style={{ width: ((puzzlePieces % 8) / 8 * 100) + '%' }}
              />
            </div>
            <span className="jewelry-case__count">{puzzlePieces % 8}/8</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>
            Complete tasks to collect puzzle pieces and build beautiful jewelry!
          </p>
        </div>
      )}

      {!mood && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state__icon">{'\uD83C\uDF1F'}</div>
            <p className="empty-state__text">
              Good morning! Start by telling Lumi how you are feeling today.
              <br />Your plan will adapt to your energy level.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;