function JewelryCase({ puzzlePieces, completedJewels, jewelryCase, jewelEmojis }) {
  const currentProgress = puzzlePieces % 8;
  const pieceEmojis = [
    '\uD83D\uDD39', '\uD83D\uDD38', '\uD83D\uDD37', '\uD83D\uDD36',
    '\u2B50', '\uD83C\uDF1F', '\u2728', '\uD83D\uDCAB'
  ];

  return (
    <>
      <div className="card">
        <div className="card__title">
          <span className="card__title-icon" style={{ background: 'linear-gradient(135deg, #A78BFA, #F9A8D4)' }}>
            {'\uD83D\uDC8E'}
          </span>
          Current Puzzle
        </div>
        <div className="jewelry-case">
          <div className="jewelry-case__progress">
            <div className="jewelry-case__bar-container">
              <div
                className="jewelry-case__bar"
                style={{ width: (currentProgress / 8 * 100) + '%' }}
              />
            </div>
            <span className="jewelry-case__count">{currentProgress}/8 pieces</span>
          </div>

          <div className="jewelry-case__grid">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className={'puzzle-piece ' + (i < currentProgress ? 'puzzle-piece--filled' : 'puzzle-piece--empty')}
              >
                {i < currentProgress ? pieceEmojis[i] : ''}
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-light)' }}>
            {currentProgress === 0
              ? 'Complete daily priority tasks to collect puzzle pieces!'
              : currentProgress < 4
                ? 'Great start! Keep completing tasks to build your jewel.'
                : currentProgress < 7
                  ? 'More than halfway there! You are doing amazing!'
                  : 'Just one more piece to complete your jewel!'}
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card__title">
          <span className="card__title-icon" style={{ background: 'linear-gradient(135deg, #FCD34D, #F59E0B)' }}>
            {'\uD83D\uDC51'}
          </span>
          Jewelry Collection ({completedJewels})
        </div>

        {jewelryCase.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {jewelryCase.map((jewel, idx) => (
              <span key={idx} className="jewelry-item">
                {jewelEmojis[jewel.type] || '\uD83D\uDC8D'} {jewel.name}
              </span>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state__icon">{'\uD83D\uDC8D'}</div>
            <p className="empty-state__text">
              Your jewelry collection is empty.<br />
              Collect 8 puzzle pieces to craft your first jewel!
            </p>
          </div>
        )}
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '24px', marginBottom: '8px' }}>{'\uD83C\uDFC6'}</p>
        <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>
          Total Pieces: {puzzlePieces}
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-light)' }}>
          Jewels Completed: {completedJewels}
        </p>
      </div>
    </>
  );
}

export default JewelryCase;