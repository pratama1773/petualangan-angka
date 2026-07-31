import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { Turtle, Rocket, Sprout, Star, Flame, CheckCircle2, Play } from 'lucide-react'
import { DIFFICULTY } from '../utils/questionGenerator.js'
import Brand from './Brand.jsx'

const MODE_INFO = {
  santai: {
    title: 'Mode Santai',
    icon: <Turtle size={34} strokeWidth={2} />,
    accent: 'grass',
    route: '/main/santai',
    desc: 'Jawab soal sebanyak mungkin. Benar dapat +1 poin, salah tidak mengurangi.',
  },
  tantangan: {
    title: 'Mode Tantangan',
    icon: <Rocket size={34} strokeWidth={2} />,
    accent: 'coral',
    route: '/main/tantangan',
    desc: 'Kamu punya 3 nyawa dan waktu terbatas di setiap soal. Semakin cepat benar, semakin besar poinmu!',
  },
}

const DIFF_ICON = {
  mudah: <Sprout size={24} strokeWidth={2} />,
  sedang: <Star size={24} strokeWidth={2} />,
  sulit: <Flame size={24} strokeWidth={2} />,
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
        <Brand />
      </div>

      <div className="card" style={{ textAlign: 'center', marginBottom: 18 }}>
        <div
          className="icon-circle"
          style={{
            width: 64,
            height: 64,
            margin: '0 auto',
            color: '#fff',
            background: `var(--${info.accent})`,
            boxShadow: `0 5px 0 var(--${info.accent}-dark)`,
          }}
        >
          {info.icon}
        </div>
        <h1 style={{ fontSize: 24, margin: '12px 0 6px' }}>{info.title}</h1>
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
            <div
              className="icon-circle"
              style={{ width: 42, height: 42, background: '#ece1ff', color: 'var(--grape-dark)' }}
            >
              {DIFF_ICON[d.key]}
            </div>
            <span style={{ flex: 1 }}>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>{d.label}</strong>
              <br />
              <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>
                {d.operations.map((o) => opLabel(o)).join(', ')}
              </span>
            </span>
            {difficulty === d.key && <CheckCircle2 size={22} color="var(--grape)" strokeWidth={2.2} />}
          </button>
        ))}
      </div>

      <button
        className={`btn btn-block btn-${info.accent === 'grass' ? 'grass' : 'coral'}`}
        onClick={startGame}
        style={{ gap: 10 }}
      >
        <Play size={19} strokeWidth={2.4} fill="currentColor" />
        Mulai Bermain
      </button>
    </div>
  )
}

function opLabel(op) {
  const map = { tambah: 'Tambah', kurang: 'Kurang', kali: 'Kali', bagi: 'Bagi' }
  return map[op] || op
}
