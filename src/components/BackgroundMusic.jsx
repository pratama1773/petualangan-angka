import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { isMuted, subscribeMuted } from '../utils/sound.js'

const MUSIC_SRC = '/audio/Skyarrow Bridge _Pokémon Black and White).mp3'

// Volume di halaman Beranda dibuat lebih terdengar, sedangkan di halaman
// lain (pilih kesulitan, saat bermain, riwayat) diperkecil supaya tidak
// mengalahkan efek suara jawaban maupun konsentrasi anak saat mengerjakan soal.
const VOLUME_BERANDA = 0.45
const VOLUME_HALAMAN_LAIN = 0.14
const FADE_DURATION = 500

function fadeVolumeTo(audio, target, duration = FADE_DURATION) {
  if (!audio) return
  const start = audio.volume
  const startTime = performance.now()
  function step(now) {
    const t = Math.min(1, (now - startTime) / duration)
    audio.volume = start + (target - start) * t
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function BackgroundMusic() {
  const location = useLocation()
  const audioRef = useRef(null)
  const targetVolumeRef = useRef(VOLUME_BERANDA)

  useEffect(() => {
    targetVolumeRef.current = location.pathname === '/' ? VOLUME_BERANDA : VOLUME_HALAMAN_LAIN
    if (!isMuted()) {
      fadeVolumeTo(audioRef.current, targetVolumeRef.current)
    }
  }, [location.pathname])

  useEffect(() => {
    return subscribeMuted((muted) => {
      fadeVolumeTo(audioRef.current, muted ? 0 : targetVolumeRef.current)
    })
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0
    audio.muted = true
    audio.play().catch(() => {})

    function handleFirstInteraction() {
      audio.muted = false
      audio.play().catch(() => {})
      if (!isMuted()) {
        fadeVolumeTo(audio, targetVolumeRef.current)
      }
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }

    window.addEventListener('pointerdown', handleFirstInteraction)
    window.addEventListener('keydown', handleFirstInteraction)
    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [])

  return <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
}