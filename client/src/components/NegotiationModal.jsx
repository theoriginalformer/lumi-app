import { useState } from 'react';

function NegotiationModal({ mood, tasks, allTasks, onAccept, onOverride, onClose }) {
  const [editingIdx, setEditingIdx] = useState(null);
  const [editedTasks, setEditedTasks] = useState([...tasks]);
  const [showAllTasks, setShowAllTasks] = useState(false);

  const handleEditTitle = (idx, newTitle) => {
    const updated = [...editedTasks];
    updated[idx] = { ...updated[idx], title: newTitle };
    setEditedTasks(updated);
  };

  const handleSwapTask = (idx, newTask) => {
    const updated = [...editedTasks];
    updated[idx] = { ...newTask };
    setEditedTasks(updated);
    setShowAllTasks(false);
    setEditingIdx(null);
  };

  const availableTasks = allTasks.filter(
    t => !t.completed && !editedTasks.find(et => et.id === t.id)
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <div className="modal__icon">
            {mood === 'struggling' ? '\uD83E\uDD17' : '\uD83D\uDCAC'}
          </div>
          <h2 className="modal__title">
            {mood === 'struggling' ? 'Gentle Plan' : 'Your Priorities'}
          </h2>
        </div>

        <p className="modal__subtitle">
          {mood === 'struggling'
            ? 'I picked 3 tasks that are most important. You can swap any of them or edit the details. You are in control.'
            : 'Here are your top 3 priorities for today. Feel free to adjust them to what works for you.'}
        </p>

        <div className="modal__tasks">
          {editedTasks.map((task, idx) => (
            <div key={task.id} className="modal__task">
              <span className="modal__task-num">{idx + 1}</span>
              <div className="modal__task-content">
                {editingIdx === idx ? (
                  <input
                    className="modal__edit-input"
                    value={task.title}
                    onChange={e => handleEditTitle(idx, e.target.value)}
                    onBlur={() => setEditingIdx(null)}
                    onKeyDown={e => e.key === 'Enter' && setEditingIdx(null)}
                    autoFocus
                  />
                ) : (
                  <>
                    <div className="modal__task-title">{task.title}</div>
                    <div className="modal__task-desc">{task.description}</div>
                  </>
                )}
              </div>
              <button
                className="modal__task-edit"
                onClick={() => setEditingIdx(editingIdx === idx ? null : idx)}
                title="Edit task"
              >
                {'\u270F\uFE0F'}
              </button>
              {availableTasks.length > 0 && (
                <button
                  className="modal__task-edit"
                  onClick={() => {
                    setEditingIdx(idx);
                    setShowAllTasks(true);
                  }}
                  title="Swap task"
                >
                  {'\uD83D\uDD04'}
                </button>
              )}
            </div>
          ))}
        </div>

        {showAllTasks && editingIdx !== null && (
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-light)', marginBottom: '8px', textTransform: 'uppercase' }}>
              Swap with:
            </p>
            {availableTasks.map(task => (
              <div
                key={task.id}
                className="modal__task"
                style={{ cursor: 'pointer', marginBottom: '6px' }}
                onClick={() => handleSwapTask(editingIdx, task)}
              >
                <div className="modal__task-content">
                  <div className="modal__task-title">{task.title}</div>
                  <div className="modal__task-desc">{task.description}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="modal__actions">
          <button className="btn btn--secondary" onClick={() => onOverride(editedTasks)}>
            {'\u270F\uFE0F'} Override
          </button>
          <button className="btn btn--primary" onClick={() => onAccept(editedTasks)}>
            {'\u2705'} Accept Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default NegotiationModal;