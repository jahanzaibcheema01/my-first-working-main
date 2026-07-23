export const MIN_PLAYERS = 4
export const MAX_PLAYERS = 10

export default function EntriesPanel({ names, onChange }) {
  const updateName = (i, value) => {
    const arr = [...names]
    arr[i] = value
    onChange(arr)
  }

  const addPlayer = () => {
    if (names.length >= MAX_PLAYERS) return
    onChange([...names, `Player ${names.length + 1}`])
  }

  const removePlayer = (i) => {
    if (names.length <= MIN_PLAYERS) return
    onChange(names.filter((_, j) => j !== i))
  }

  const shuffle = () => {
    const arr = [...names]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    onChange(arr)
  }

  const sort = () => {
    onChange([...names].sort((a, b) => a.localeCompare(b)))
  }

  const reset = () => {
    if (window.confirm('Reset players to defaults?')) {
      onChange(Array.from({ length: MIN_PLAYERS }, (_, i) => `Player ${i + 1}`))
    }
  }

  return (
    <div className="panel">
      <h2>Players</h2>
      <p className="hint">
        {MIN_PLAYERS} to {MAX_PLAYERS} players. The wheel updates as you type.
      </p>
      <div className="player-list">
        {names.map((name, i) => (
          <div className="player-row" key={i}>
            <span className="player-num">{i + 1}</span>
            <input
              type="text"
              value={name}
              maxLength={24}
              onChange={(e) => updateName(i, e.target.value)}
              placeholder={`Player ${i + 1}`}
              spellCheck={false}
            />
            <button
              className="btn remove"
              onClick={() => removePlayer(i)}
              disabled={names.length <= MIN_PLAYERS}
              title={names.length <= MIN_PLAYERS ? `Minimum ${MIN_PLAYERS} players` : 'Remove player'}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        className="btn add-player"
        onClick={addPlayer}
        disabled={names.length >= MAX_PLAYERS}
      >
        {names.length >= MAX_PLAYERS ? `Maximum ${MAX_PLAYERS} players` : '➕ Add player'}
      </button>
      <div className="count">
        {names.length} / {MAX_PLAYERS} players
      </div>
      <div className="panel-row">
        <button className="btn" onClick={shuffle}>🔀 Shuffle</button>
        <button className="btn" onClick={sort}>↕ Sort</button>
        <button className="btn" onClick={reset}>↺ Reset</button>
      </div>
    </div>
  )
}
