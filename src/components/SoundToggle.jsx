import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isMuted, toggleMuted } from '../utils/sound.js'

export default function SoundToggle() {
  const [muted, setMutedState] = useState(() => isMuted())

  function handleClick() {
    const next = toggleMuted()
    setMutedState(next)
  }

  return (
    <button
      onClick={handleClick}
      aria-label={muted ? 'Nyalakan suara' : 'Matikan suara'}
      className="icon-circle"
      style={{
        position: 'fixed',
        bottom: 18,
        right: 18,
        zIndex: 20,
        width: 46,
        height: 46,
        background: '#fff',
        color: 'var(--ink-soft)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      {muted ? <VolumeX size={19} strokeWidth={2.2} /> : <Volume2 size={19} strokeWidth={2.2} />}
    </button>
  )
}