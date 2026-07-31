import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import {
  Rocket,
  Heart,
  CheckCircle2,
  XCircle,
  TimerOff,
  HeartCrack,
  RotateCcw,
  History as HistoryIcon,
  Home as HomeIcon,
  Check,
} from 'lucide-react'
import { generateQuestion, DIFFICULTY } from '../utils/questionGenerator.js'
import { addHistoryEntry } from '../utils/storage.js'
import Brand from './Brand.jsx'

const MAX_LIVES = 3
const BASE_POINTS = 10

export default function GameChallenge() {
  const location = useLocation()
  const navigate = useNavigate()
  const difficulty = location.state?.difficulty || 'mudah'
  const diffInfo = DIFFICULTY[difficulty]

  const [question, setQuestion] = useState(() => generateQuestion(difficulty))
  const [timeLeft, setTimeLeft] = useState(diffInfo.timeLimit)
  const [lives, setLives] = useState(MAX_LIVES)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [locked, setLocked] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const inputRef = useRef(null)

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion(difficulty))
    setInput('')
    setFeedback(null)
    setLocked(false)
    setTimeLeft(diffInfo.timeLimit)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [difficulty, diffInfo.timeLimit])

  const handleWrong = useCallback((isTimeout) => {
    setLocked(true)
    setFeedback(isTimeout ? 'waktu' : 'salah')
    setAnswered((n) => n + 1)
    setLives((l) => l - 1)
  }, [])

  function handleSubmit(e) {
    e?.preventDefault()
    if (locked || input === '') return
    const val = Number(input)
    setLocked(true)
    setAnswered((n) => n + 1)
    if (val === question.answer) {
      const bonus = Math.round(timeLeft * (2 + (Object.keys(DIFFICULTY).indexOf(difficulty) + 1)))
      setScore((s) => s + BASE_POINTS + bonus)
      setCorrect((c) => c + 1)
      setFeedback('benar')
    } else {
      setFeedback('salah')
      setLives((l) => l - 1)
    }
  }

  // Timer countdown
  useEffect(() => {
    if (locked || gameOver) return
    if (timeLeft <= 0) {
      handleWrong(true)
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, locked, gameOver, handleWrong])

  // Move to next question or end game after feedback shown
  useEffect(() => {
    if (!feedback) return
    if (lives <= 0) {
      const timer = setTimeout(() => setGameOver(true), 900)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => nextQuestion(), 800)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback])

  // Save history once game over is reached
  useEffect(() => {
    if (!gameOver) return
    addHistoryEntry({
      mode: 'Mode Tantangan',
      difficulty: diffInfo.label,
      score,
      correct,
      total: answered,
      accuracy: answered ? Math.round((correct / answered) * 100) : 0,
      date: new Date().toLocaleString('id-ID'),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  if (gameOver) {
    const accuracy = answered ? Math.round((correct / answered) * 100) : 0
    return (
      <div className="anim-pop" style={{ textAlign: 'center' }}>
        <div className="card">
          <div
            className="icon-circle"
            style={{ width: 64, height: 64, margin: '0 auto', background: '#ffe1e1', color: 'var(--coral-dark)' }}
          >
            <HeartCrack size={32} strokeWidth={2} />
          </div>
          <h1 style={{ fontSize: 24, margin: '12px 0 6px' }}>Permainan Berakhir</h1>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 18 }}>Nyawamu habis. Ini hasil tantanganmu:</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
            <StatPill label="Skor" value={score} accent="sun" />
            <StatPill label="Benar" value={correct} accent="grass" />
            <StatPill label="Dijawab" value={answered} accent="sky" />
            <StatPill label="Akurasi" value={`${accuracy}%`} accent="grape" />
          </div>
        </div>
        <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
          <button className="btn btn-coral" style={{ gap: 8 }} onClick={() => navigate('/mulai/tantangan')}>
            <RotateCcw size={18} strokeWidth={2.4} />
            Coba Lagi
          </button>
          <Link to="/riwayat" className="btn btn-ghost" style={{ gap: 8 }}>
            <HistoryIcon size={18} strokeWidth={2.4} />
            Lihat Riwayat
          </Link>
          <Link to="/" className="btn btn-ghost" style={{ gap: 8 }}>
            <HomeIcon size={18} strokeWidth={2.4} />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  const timePct = Math.max(0, Math.round((timeLeft / diffInfo.timeLimit) * 100))
  const timeDanger = timePct <= 30

  return (
    <div className="anim-pop">
      <div className="topbar">
        <Brand />
        <span className="pill pill-coral" style={{ gap: 6 }}>
          <Rocket size={15} strokeWidth={2.4} />
          {diffInfo.label}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <Heart
              key={i}
              size={22}
              strokeWidth={2}
              color="var(--coral)"
              fill={i < lives ? 'var(--coral)' : 'none'}
              opacity={i < lives ? 1 : 0.35}
            />
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <StatPill label="Skor" value={score} accent="sun" small />
      </div>

      <div className="card" style={{ padding: '6px 10px', marginBottom: 16 }}>
        <div
          style={{
            height: 10,
            borderRadius: 999,
            background: '#eee',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${timePct}%`,
              background: timeDanger ? 'var(--coral)' : 'var(--grass)',
              transition: 'width 1s linear, background 0.3s ease',
              borderRadius: 999,
            }}
          />
        </div>
      </div>

      <div
        className={`card ${feedback === 'salah' || feedback === 'waktu' ? 'anim-shake' : ''}`}
        key={question.id}
        style={{ marginBottom: 18, position: 'relative' }}
      >
        {feedback && (
          <div style={{ position: 'absolute', top: 14, right: 18 }}>
            {feedback === 'benar' ? (
              <CheckCircle2 size={26} color="var(--grass-dark)" strokeWidth={2.4} />
            ) : feedback === 'waktu' ? (
              <TimerOff size={26} color="var(--coral-dark)" strokeWidth={2.4} />
            ) : (
              <XCircle size={26} color="var(--coral-dark)" strokeWidth={2.4} />
            )}
          </div>
        )}
        <p style={{ color: 'var(--ink-soft)', fontSize: 13, textAlign: 'center', marginBottom: 12 }}>
          Soal susun — isi hasilnya ya!
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="susun">
            <div className="susun-row">{question.a}</div>
            <div className="susun-row">
              <span className="susun-op">{question.symbol}</span>
              {question.b}
            </div>
            <div className="susun-line" />
            <input
              ref={inputRef}
              className="susun-input"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              value={input}
              disabled={locked}
              placeholder="?"
              onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ''))}
            />
          </div>

          <button
            type="submit"
            className="btn btn-coral btn-block"
            style={{ marginTop: 20, gap: 8 }}
            disabled={locked || input === ''}
          >
            <Check size={18} strokeWidth={2.6} />
            Jawab
          </button>
        </form>

        {feedback === 'waktu' || feedback === 'salah' ? (
          <p style={{ textAlign: 'center', marginTop: 10, fontSize: 14, color: 'var(--ink-soft)' }}>
            Jawaban yang benar: <strong>{question.answer}</strong>
          </p>
        ) : null}
      </div>
    </div>
  )
}

function StatPill({ label, value, accent, small }) {
  return (
    <div
      className="card"
      style={{
        padding: small ? '8px 14px' : '12px 18px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: small ? 78 : 90,
      }}
    >
      <span style={{ fontSize: 11, color: 'var(--ink-soft)', fontWeight: 700 }}>{label}</span>
      <span className={`pill pill-${accent}`} style={{ marginTop: 4, fontSize: small ? 15 : 18, padding: '2px 12px' }}>
        {value}
      </span>
    </div>
  )
}
