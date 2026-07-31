import { useState, useCallback, useMemo } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { generateQuestion, DIFFICULTY } from '../utils/questionGenerator.js'
import { addHistoryEntry } from '../utils/storage.js'

export default function GameNormal() {
  const location = useLocation()
  const navigate = useNavigate()
  const difficulty = location.state?.difficulty || 'mudah'
  const diffInfo = DIFFICULTY[difficulty]

  const [question, setQuestion] = useState(() => generateQuestion(difficulty))
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [feedback, setFeedback] = useState(null) // 'benar' | 'salah'
  const [locked, setLocked] = useState(false)
  const [finished, setFinished] = useState(false)

  const accuracy = useMemo(
    () => (answered ? Math.round((correct / answered) * 100) : 0),
    [answered, correct]
  )

  const nextQuestion = useCallback(() => {
    setQuestion(generateQuestion(difficulty))
    setFeedback(null)
    setLocked(false)
  }, [difficulty])

  function handleAnswer(opt) {
    if (locked) return
    setLocked(true)
    const isCorrect = opt === question.answer
    setAnswered((n) => n + 1)
    if (isCorrect) {
      setScore((s) => s + 1)
      setCorrect((c) => c + 1)
      setFeedback('benar')
    } else {
      setFeedback('salah')
    }
    setTimeout(() => nextQuestion(), 700)
  }

  function endSession() {
    addHistoryEntry({
      mode: 'Mode Santai',
      difficulty: diffInfo.label,
      score,
      correct,
      total: answered,
      accuracy,
      date: new Date().toLocaleString('id-ID'),
    })
    setFinished(true)
  }

  if (finished) {
    return (
      <div className="anim-pop" style={{ textAlign: 'center' }}>
        <div className="card">
          <div style={{ fontSize: 54 }}>🎉</div>
          <h1 style={{ fontSize: 24, margin: '10px 0' }}>Kerja Bagus!</h1>
          <p style={{ color: 'var(--ink-soft)', marginBottom: 18 }}>Ini hasil latihanmu di Mode Santai</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
            <StatPill label="Skor" value={score} accent="sun" />
            <StatPill label="Benar" value={correct} accent="grass" />
            <StatPill label="Dijawab" value={answered} accent="sky" />
            <StatPill label="Akurasi" value={`${accuracy}%`} accent="grape" />
          </div>
        </div>
        <div style={{ display: 'grid', gap: 10, marginTop: 18 }}>
          <button className="btn btn-grass" onClick={() => navigate('/mulai/santai')}>
            Main Lagi 🔁
          </button>
          <Link to="/riwayat" className="btn btn-ghost">Lihat Riwayat 📖</Link>
          <Link to="/" className="btn btn-ghost">Kembali ke Beranda 🏠</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="anim-pop">
      <div className="topbar">
        <Link to="/" className="brand">
          <span className="brand-badge">🔢</span>
          Petualangan Angka
        </Link>
        <span className="pill pill-grass">🐢 {diffInfo.label}</span>
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <StatPill label="Skor" value={score} accent="sun" small />
        <StatPill label="Benar" value={correct} accent="grass" small />
        <StatPill label="Soal ke" value={answered + 1} accent="sky" small />
      </div>

      <div
        className={`card ${feedback === 'salah' ? 'anim-shake' : 'anim-wobble'}`}
        key={question.id}
        style={{ textAlign: 'center', marginBottom: 18, position: 'relative' }}
      >
        {feedback && (
          <div
            style={{
              position: 'absolute',
              top: 14,
              right: 18,
              fontSize: 26,
            }}
          >
            {feedback === 'benar' ? '✅' : '❌'}
          </div>
        )}
        <p style={{ color: 'var(--ink-soft)', fontSize: 14, marginBottom: 10 }}>Berapakah hasilnya?</p>
        <h1 style={{ fontSize: 42, letterSpacing: 1 }}>
          {question.a} {question.symbol} {question.b}
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {question.options.map((opt) => (
          <button
            key={opt}
            className="btn btn-sky"
            disabled={locked}
            onClick={() => handleAnswer(opt)}
            style={{ fontSize: 22, padding: '18px 10px' }}
          >
            {opt}
          </button>
        ))}
      </div>

      <button className="btn btn-ghost btn-block" style={{ marginTop: 22 }} onClick={endSession}>
        Selesai & Simpan Skor 🏁
      </button>
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
        flex: small ? '1 1 auto' : 'none',
      }}
    >
      <span style={{ fontSize: 11, color: 'var(--ink-soft)', fontWeight: 700 }}>{label}</span>
      <span
        className={`pill pill-${accent}`}
        style={{ marginTop: 4, fontSize: small ? 15 : 18, padding: '2px 12px' }}
      >
        {value}
      </span>
    </div>
  )
}
