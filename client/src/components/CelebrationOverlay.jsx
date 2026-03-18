function CelebrationOverlay({ celebration, onClose }) {
  return (
    <div className="celebration" onClick={onClose}>
      <div className="celebration__content" onClick={e => e.stopPropagation()}>
        <div className="celebration__jewel">{celebration.emoji}</div>
        <h2 className="celebration__title">New Jewel Crafted!</h2>
        <p className="celebration__text">
          You completed {celebration.name}!<br />
          Every small step counts. You are amazing.
        </p>
        <button className="celebration__btn" onClick={onClose}>
          {'\u2728'} View Collection
        </button>
      </div>
    </div>
  );
}

export default CelebrationOverlay;