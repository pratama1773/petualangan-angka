import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { DIFFICULTY } from '../utils/questionGenerator.js'

const MODE_INFO = {
  santai: {
    title: 'Mode Santai',
    emoji: '🐢',
    accent: 'grass',
    route: '/main/santai',
    desc: 'Jawab soal sebanyak mungkin. Benar dapat +1 poin, salah tidak mengurangi.',
  },
  tantangan: {
    title: 'Mode Tantangan',
    emoji: '🚀',
    accent: 'coral',
    route: '/main/tantangan',
    desc: 'Kamu punya 3 nyawa dan waktu terbatas di setiap soal. Semakin cepat benar, semakin besar poinmu!',
  },
}

export default function SetupGame() {
  const { mode } = useParams()
  const navigate = useNavigate()
  const [difficulty, setDifficulty] = useState('mudah')
  const info = MODE_INFO[mode] || MODE_INFO.santai

  function startGame() {
    navigate(info.route, { state: { difficulty } })
  }

  return (
    <div className="anim-pop">
      <div className="topbar">
        <Link to="/" className="brand">
          <span className="brand-badge">🔢</span>
          Petualangan Angka
        </Link>
      </div>

      <div className="card" style={{ textAlign: 'center', marginBottom: 18 }}>
        <div style={{ fontSize: 44 }}>{info.emoji}</div>
        <h1 style={{ fontSize: 24, margin: '8px 0 6px' }}>{info.title}</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 14 }}>{info.desc}</p>
      </div>

      <h3 style={{ marginBottom: 12, fontSize: 17 }}>Pilih tingkat kesulitan</h3>
      <div style={{ display: 'grid', gap: 12, marginBottom: 22 }}>
        {Object.values(DIFFICULTY).map((d) => (
          <button
            key={d.key}
            onClick={() => setDifficulty(d.key)}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              textAlign: 'left',
              border: `3px solid ${difficulty === d.key ? 'var(--grape)' : 'transparent'}`,
              background: difficulty === d.key ? '#f4efff' : '#fff',
            }}
          >
            <span style={{ fontSize: 28 }}>{d.emoji}</span>
            <span style={{ flex: 1 }}>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>{d.label}</strong>
              <br />
              <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                {d.operations.map((o) => opLabel(o)).join(', ')}
              </span>
            </span>
            {difficulty === d.key && <span style={{ fontSize: 20 }}>✅</span>}
          </button>
        ))}
      </div>

      <button className={`btn btn-block btn-${info.accent === 'grass' ? 'grass' : 'coral'}`} onClick={startGame}>
        Mulai Bermain 🎮
      </button>
    </div>
  )
}

function opLabel(op) {
  const map = { tambah: 'Tambah', kurang: 'Kurang', kali: 'Kali', bagi: 'Bagi' }
  return map[op] || op
}
