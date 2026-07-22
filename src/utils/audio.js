// Sounds generated with WebAudio — no audio files needed.
let audioCtx = null

function getAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return audioCtx
}

export function playTick() {
  try {
    const ac = getAudio()
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.type = 'square'
    osc.frequency.value = 900
    gain.gain.setValueAtTime(0.06, ac.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.05)
    osc.connect(gain).connect(ac.destination)
    osc.start()
    osc.stop(ac.currentTime + 0.05)
  } catch { /* ignore */ }
}

export function playFanfare() {
  try {
    const ac = getAudio()
    const notes = [523.25, 659.25, 783.99, 1046.5] // C5 E5 G5 C6
    notes.forEach((f, i) => {
      const osc = ac.createOscillator()
      const gain = ac.createGain()
      osc.type = 'triangle'
      osc.frequency.value = f
      const t0 = ac.currentTime + i * 0.12
      gain.gain.setValueAtTime(0.12, t0)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.35)
      osc.connect(gain).connect(ac.destination)
      osc.start(t0)
      osc.stop(t0 + 0.35)
    })
  } catch { /* ignore */ }
}
