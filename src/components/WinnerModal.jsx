export default function WinnerModal({ winner, onClose, onRemove, canRemove = true }) {
  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="label">We have a winner!</div>
        <div className="winner-name">{winner}</div>
        <div className="actions">
          <button
            className="btn"
            onClick={onRemove}
            disabled={!canRemove}
            title={canRemove ? 'Remove this player from the wheel' : 'Minimum 4 players — cannot remove'}
          >
            Remove winner
          </button>
          <button className="btn primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
