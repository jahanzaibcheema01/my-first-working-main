import { useEffect, useState } from 'react'

export default function EntriesPanel({ names, onChange }) {
  const [text, setText] = useState(names.join('\n'))

  // Keep textarea in sync when names change from outside (shuffle, sort, remove winner)
  useEffect(() => {
    setText((prev) => {
      const parsed = prev.split('\n').map((s) => s.trim()).filter(Boolean)
      return JSON.stringify(parsed) === JSON.stringify(names) ? prev : names.join('\n')
    })
  }, [names])

  const handleInput = (e) => {
    setText(e.target.value)
    onChange(e.target.value.split('\n').map((s) => s.trim()).filter(Boolean))
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

  const clear = () => {
    if (!names.length || window.confirm('Clear all entries?')) onChange([])
  }

  return (
    <div className="panel">
      <h2>Entries</h2>
      <p className="hint">One name per line. The wheel updates as you type.</p>
      <textarea value={text} onChange={handleInput} spellCheck={false} />
      <div className="count">
        {names.length} {names.length === 1 ? 'entry' : 'entries'}
      </div>
      <div className="panel-row">
        <button className="btn" onClick={shuffle}>🔀 Shuffle</button>
        <button className="btn" onClick={sort}>↕ Sort</button>
        <button className="btn" onClick={clear}>🗑 Clear</button>
      </div>
    </div>
  )
}
