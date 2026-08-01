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
} from 'lucide-react'
import { generateQuestion, DIFFICULTY } from '../utils/questionGenerator.js'
import { addHistoryEntry } from '../utils/storage.js'
import Brand from './Brand.jsx'
import { playCorrect, playWrong, playTimeout, playGameOver } from '../utils/sound.js'

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
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState(null)
  const [locked, setLocked] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const timeLeftRef = useRef(timeLeft)
  timeLeftRef.current = timeLeft

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion(difficulty))
    setSelected(null)
    setFeedback(null)
    setLocked(false)
    setTimeLeft(diffInfo.timeLimit)
  }, [difficulty, diffInfo.timeLimit])

  const handleTimeout = useCallback(() => {
    setLocked(true)
    setFeedback('waktu')
    setAnswered((n) => n + 1)
    setLives((l) => l - 1)
    playTimeout()
  }, [])

  function handleAnswer(opt) {
    if (locked) return
    setLocked(true)
    setSelected(opt)
    setAnswered((n) => n + 1)
    if (opt === question.answer) {
      const bonus = Math.round(timeLeftRef.current * (2 + (Object.keys(DIFFICULTY).indexOf(difficulty) + 1)))
      setScore((s) => s + BASE_POINTS + bonus)
      setCorrect((c) => c + 1)
      setFeedback('benar')
      playCorrect()
    } else {
      setFeedback('salah')
      setLives((l) => l - 1)
      playWrong()
    }
  }

  useEffect(() => {
    if (locked || gameOver) return
      playGameOver()
    if (timeLeft <= 0) {
      handleTimeout()
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [timeLeft, locked, gameOver, handleTimeout])

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
        <div style={{ height: 10, borderRadius: 999, background: '#eee', overflow: 'hidden' }}>
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
        className={`card ${feedback === 'salah' || feedback === 'waktu' ? 'anim-shake' : 'anim-wobble'}`}
        key={question.id}
        style={{ textAlign: 'center', marginBottom: 18, position: 'relative' }}
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
        <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginBottom: 10 }}>Berapakah hasilnya?</p>
        <h1 style={{ fontSize: 42, letterSpacing: 1 }}>
          {question.a} {question.symbol} {question.b}
        </h1>
        {feedback === 'waktu' && (
          <p style={{ marginTop: 10, fontSize: 14, color: 'var(--ink-soft)' }}>
            Jawaban yang benar: <strong>{question.answer}</strong>
          </p>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {question.options.map((opt) => {
          const isSelected = selected === opt
          const isAnswerOpt = opt === question.answer
          let variant = 'btn-sky'
          if (locked && isSelected && feedback === 'benar') variant = 'btn-grass'
          if (locked && isSelected && feedback === 'salah') variant = 'btn-coral'
          if (locked && !isSelected && feedback === 'salah' && isAnswerOpt) variant = 'btn-grass'
          return (
            <button
              key={opt}
              className={`btn ${variant}`}
              disabled={locked}
              onClick={() => handleAnswer(opt)}
              style={{ fontSize: 22, padding: '18px 10px' }}
            >
              {opt}
            </button>
          )
        })}
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