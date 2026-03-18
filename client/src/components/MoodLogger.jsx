function MoodLogger({ mood, onMoodSelect }) {
  return (
    <div className="card">
      <div className="card__title">
        <span className="card__title-icon" style={{ background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)' }}>
          {'\uD83C\uDF24\uFE0F'}
        </span>
        How are you feeling today?
      </div>
      <div className="mood">
        <button
          className={'mood__btn mood__btn--good' + (mood === 'good' ? ' active' : '')}
          onClick={() => onMoodSelect('good')}
        >
          <span className="mood__emoji">{'\uD83D\uDE0A'}</span>
          <span className="mood__label">Good</span>
        </button>
        <button
          className={'mood__btn mood__btn--low' + (mood === 'low' ? ' active' : '')}
          onClick={() => onMoodSelect('low')}
        >
          <span className="mood__emoji">{'\uD83D\uDE14'}</span>
          <span className="mood__label">Low</span>
        </button>
        <button
          className={'mood__btn mood__btn--struggling' + (mood === 'struggling' ? ' active' : '')}
          onClick={() => onMoodSelect('struggling')}
        >
          <span className="mood__emoji">{'\uD83E\uDD7A'}</span>
          <span className="mood__label">Struggling</span>
        </button>
      </div>
    </div>
  );
}

export default MoodLogger;