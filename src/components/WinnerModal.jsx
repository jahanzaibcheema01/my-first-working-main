export default function WinnerModal({ winner, onClose, onRemove }) {
  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal">
        <div className="label">We have a winner!</div>
        <div className="winner-name">{winner}</div>
        <div className="actions">
          <button className="btn" onClick={onRemove}>Remove winner</button>
          <button className="btn primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
