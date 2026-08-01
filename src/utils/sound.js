// Mesin efek suara ringan berbasis Web Audio API.
// Tidak memakai file audio (nol kilobyte tambahan di bundle),
// semua nada dibuat langsung lewat oscillator — aman untuk koneksi lambat.

let ctx = null
let muted = sessionStorage.getItem('pa_muted') === '1'

function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

export function isMuted() {
  return muted
}

export function setMuted(value) {
  muted = value
  try {
    sessionStorage.setItem('pa_muted', value ? '1' : '0')
  } catch {
    // abaikan jika storage tidak tersedia
  }
}

export function toggleMuted() {
  setMuted(!muted)
  return muted
}

function tone(freq, start, duration, { type = 'sine', peak = 0.18 } = {}) {
  const c = getCtx()
  if (!c || muted) return
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  const t0 = c.currentTime + start
  gain.gain.setValueAtTime(0, t0)
  gain.gain.linearRampToValueAtTime(peak, t0 + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration)
  osc.connect(gain)
  gain.connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.02)
}

export function playCorrect() {
  tone(587.33, 0, 0.12, { type: 'triangle' })
  tone(880, 0.08, 0.18, { type: 'triangle' })
}

export function playWrong() {
  tone(220, 0, 0.16, { type: 'sawtooth', peak: 0.13 })
  tone(174.6, 0.09, 0.2, { type: 'sawtooth', peak: 0.11 })
}

export function playTimeout() {
  tone(392, 0, 0.1, { type: 'square', peak: 0.1 })
  tone(392, 0.14, 0.12, { type: 'square', peak: 0.1 })
}

export function playGameOver() {
  tone(392, 0, 0.18, { type: 'sawtooth', peak: 0.14 })
  tone(329.63, 0.16, 0.18, { type: 'sawtooth', peak: 0.13 })
  tone(261.63, 0.32, 0.3, { type: 'sawtooth', peak: 0.12 })
}

export function playFinish() {
  tone(523.25, 0, 0.12, { type: 'triangle' })
  tone(659.25, 0.1, 0.12, { type: 'triangle' })
  tone(783.99, 0.2, 0.28, { type: 'triangle' })
}

export function playClick() {
  tone(660, 0, 0.06, { type: 'sine', peak: 0.08 })
}