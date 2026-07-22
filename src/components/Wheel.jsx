import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { playTick } from '../utils/audio.js'

export const COLORS = ['#3369e8', '#d50f25', '#eeb211', '#009925'] // wheelofnames-style palette

const SIZE = 1000 // internal canvas resolution

function segColor(i, total) {
  // Avoid same color on first & last adjacent segments
  let c = COLORS[i % COLORS.length]
  if (i === total - 1 && total % COLORS.length === 1) c = COLORS[1]
  return c
}

const Wheel = forwardRef(function Wheel({ names, soundOn, spinning, onSpinStart, onWinner }, ref) {
  const canvasRef = useRef(null)
  const angleRef = useRef(0)      // current rotation in radians
  const spinningRef = useRef(false)
  const rafRef = useRef(0)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const angle = angleRef.current
    const cx = SIZE / 2
    const cy = SIZE / 2
    const radius = SIZE / 2 - 14
    ctx.clearRect(0, 0, SIZE, SIZE)

    if (!names.length) {
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = '#e6e9f2'
      ctx.fill()
      ctx.fillStyle = '#8a93a6'
      ctx.font = '500 44px "Segoe UI", sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('Add names to start', cx, cy)
      return
    }

    const n = names.length
    const arc = (Math.PI * 2) / n

    for (let i = 0; i < n; i++) {
      const start = angle + i * arc
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, radius, start, start + arc)
      ctx.closePath()
      ctx.fillStyle = segColor(i, n)
      ctx.fill()

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(start + arc / 2)
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#ffffff'
      const maxLen = 18
      let label = names[i]
      if (label.length > maxLen) label = label.slice(0, maxLen - 1) + '…'
      const fontSize = Math.max(22, Math.min(52, 420 / Math.max(6, n) + 14))
      ctx.font = `600 ${fontSize}px "Segoe UI", sans-serif`
      ctx.shadowColor = 'rgba(0,0,0,.35)'
      ctx.shadowBlur = 4
      ctx.fillText(label, radius - 30, 0)
      ctx.restore()
    }

    ctx.beginPath()
    ctx.arc(cx, cy, radius, 0, Math.PI * 2)
    ctx.lineWidth = 8
    ctx.strokeStyle = '#ffffff'
    ctx.stroke()
  }, [names])

  const winnerIndex = useCallback(() => {
    const n = names.length
    const arc = (Math.PI * 2) / n
    // Pointer sits at angle 0 (3 o'clock, pointing left into the wheel)
    let a = (0 - angleRef.current) % (Math.PI * 2)
    if (a < 0) a += Math.PI * 2
    return Math.floor(a / arc) % n
  }, [names])

  const spin = useCallback(() => {
    if (spinningRef.current || names.length < 2) return
    spinningRef.current = true
    onSpinStart?.()

    const duration = 5000 + Math.random() * 1500 // 5–6.5s
    const totalRotation = Math.PI * 2 * (5 + Math.random() * 5) + Math.random() * Math.PI * 2
    const startAngle = angleRef.current
    const startTime = performance.now()
    let lastTickIndex = winnerIndex()

    const frame = (now) => {
      const t = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - t, 4) // ease-out quart
      angleRef.current = startAngle + totalRotation * eased
      draw()

      const idx = winnerIndex()
      if (idx !== lastTickIndex) {
        lastTickIndex = idx
        if (soundOn) playTick()
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame)
      } else {
        spinningRef.current = false
        onWinner?.(names[winnerIndex()])
      }
    }
    rafRef.current = requestAnimationFrame(frame)
  }, [names, soundOn, draw, winnerIndex, onSpinStart, onWinner])

  useImperativeHandle(ref, () => ({ spin }), [spin])

  useEffect(() => {
    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [draw])

  return (
    <div className="wheel-wrap">
      <canvas ref={canvasRef} width={SIZE} height={SIZE} />
      <div className="pointer" />
      <button className="hub" onClick={spin} disabled={spinning || names.length < 2} title="Spin the wheel">
        SPIN
      </button>
    </div>
  )
})

export default Wheel
