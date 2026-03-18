import { useState } from 'react';

function TaskList({ tasks, negotiatedTasks, onTaskComplete, mood }) {
  const [justCompleted, setJustCompleted] = useState(null);

  const displayTasks = (mood === 'low' || mood === 'struggling') && negotiatedTasks.length > 0
    ? negotiatedTasks
    : tasks;

  const handleComplete = (taskId) => {
    setJustCompleted(taskId);
    onTaskComplete(taskId);
    setTimeout(() => setJustCompleted(null), 600);
  };

  const categoryIcons = {
    health: '\uD83D\uDC9A',
    household: '\uD83C\uDFE0',
    work: '\uD83D\uDCBC',
    'self-care': '\uD83E\uDDF4',
    social: '\uD83D\uDC65',
    other: '\uD83D\uDCCC'
  };

  return (
    <div className="card">
      <div className="card__title">
        <span className="card__title-icon" style={{ background: 'linear-gradient(135deg, #C4B5FD, #A78BFA)' }}>
          {'\u2705'}
        </span>
        {(mood === 'low' || mood === 'struggling') && negotiatedTasks.length > 0
          ? 'Today\'s Priorities'
          : 'Today\'s Tasks'}
      </div>
      <div className="task-list">
        {displayTasks.map((task, index) => (
          <div
            key={task.id}
            className={
              'task-item' +
              (task.completed ? ' task-item--completed' : '') +
              (justCompleted === task.id ? ' task-item--just-completed' : '')
            }
          >
            <button
              className="task-item__check"
              onClick={() => handleComplete(task.id)}
            >
              {task.completed ? '\u2713' : ''}
            </button>
            <div className="task-item__content">
              <div className="task-item__title">
                {categoryIcons[task.category] || '\uD83D\uDCCC'} {task.title}
              </div>
              <div className="task-item__desc">{task.description}</div>
            </div>
            <span className={'task-item__badge task-item__badge--' + task.category}>
              {task.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;