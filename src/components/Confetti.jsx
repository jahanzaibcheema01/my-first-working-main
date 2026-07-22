import { useEffect, useRef } from 'react'
import { COLORS } from './Wheel.jsx'

export default function Confetti() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const pieces = Array.from({ length: 160 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.5,
      w: 6 + Math.random() * 8,
      h: 8 + Math.random() * 10,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vy: 2 + Math.random() * 3,
      vx: -1.5 + Math.random() * 3,
      rot: Math.random() * Math.PI * 2,
      vr: -0.15 + Math.random() * 0.3,
    }))

    let raf = 0
    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = 0
      for (const p of pieces) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.05
        p.rot += p.vr
        if (p.y < canvas.height + 30) alive++
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }
      if (alive > 0) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} className="confetti-canvas" />
}
