import { useCallback, useEffect, useRef, useState } from 'react'
import Wheel from './components/Wheel.jsx'
import EntriesPanel, { MIN_PLAYERS, MAX_PLAYERS } from './components/EntriesPanel.jsx'
import ResultsPanel from './components/ResultsPanel.jsx'
import WinnerModal from './components/WinnerModal.jsx'
import Confetti from './components/Confetti.jsx'
import Logo from './components/Logo.jsx'
import { playFanfare } from './utils/audio.js'

const DEFAULT_NAMES = ['Ali', 'Beatriz', 'Charles', 'Diya', 'Eric', 'Fatima', 'Gabriel', 'Hanna']
const STORAGE_KEY = 'spin-the-wheel-names'

function clampPlayers(arr) {
  const clamped = arr.slice(0, MAX_PLAYERS)
  while (clamped.length < MIN_PLAYERS) clamped.push(`Player ${clamped.length + 1}`)
  return clamped
}

function loadNames() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const arr = JSON.parse(saved)
      if (Array.isArray(arr) && arr.length) return clampPlayers(arr)
    }
  } catch { /* ignore */ }
  return DEFAULT_NAMES
}

export default function App() {
  const [names, setNames] = useState(loadNames)
  const [results, setResults] = useState([])
  const [winner, setWinner] = useState(null)
  const [spinning, setSpinning] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const wheelRef = useRef(null)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(names)) } catch { /* ignore */ }
  }, [names])

  const spin = useCallback(() => {
    wheelRef.current?.spin()
  }, [])

  const handleWinner = useCallback((name) => {
    setWinner(name)
    setResults((prev) => [...prev, name])
    if (soundOn) playFanfare()
  }, [soundOn])

  const removeWinner = useCallback(() => {
    setNames((prev) => {
      if (prev.length <= MIN_PLAYERS) return prev
      const idx = prev.indexOf(winner)
      if (idx === -1) return prev
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)]
    })
    setWinner(null)
  }, [winner])

  // Spacebar / Enter spins (when not typing in the textarea)
  useEffect(() => {
    const onKey = (e) => {
      if ((e.code === 'Space' || e.code === 'Enter') && document.activeElement?.tagName !== 'TEXTAREA') {
        if (winner !== null) {
          setWinner(null)
        } else {
          e.preventDefault()
          spin()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [winner, spin])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <>
      <header>
        <span className="logo"><Logo size={38} /></span>
        <h1>Spin the Wheel</h1>
        <span className="tagline">Enter names, spin, and pick a random winner</span>
      </header>

      <div className="layout">
        <div className="wheel-area">
          <Wheel
            ref={wheelRef}
            names={names}
            soundOn={soundOn}
            spinning={spinning}
            onSpinStart={() => setSpinning(true)}
            onWinner={(name) => { setSpinning(false); handleWinner(name) }}
          />
          <div className="wheel-buttons">
            <button className="btn primary" onClick={spin} disabled={spinning || names.length < 2}>
              🎲 Spin
            </button>
            <button className="btn" onClick={() => setSoundOn((s) => !s)}>
              {soundOn ? '🔊 Sound on' : '🔇 Sound off'}
            </button>
            <button className="btn" onClick={toggleFullscreen}>⛶ Fullscreen</button>
          </div>
        </div>

        <div className="side">
          <EntriesPanel names={names} onChange={setNames} />
          <ResultsPanel results={results} />
        </div>
      </div>

      {winner !== null && (
        <>
          <WinnerModal
            winner={winner}
            onClose={() => setWinner(null)}
            onRemove={removeWinner}
            canRemove={names.length > MIN_PLAYERS}
          />
          <Confetti />
        </>
      )}
    </>
  )
}
