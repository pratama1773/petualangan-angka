import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NotebookText, Turtle, Rocket, Trash2 } from 'lucide-react'
import { getHistory, clearHistory } from '../utils/storage.js'
import Brand from './Brand.jsx'

export default function History() {
  const [history, setHistory] = useState(() => getHistory())

  function handleClear() {
    clearHistory()
    setHistory([])
  }

  return (
    <div className="anim-pop">
      <div className="topbar">
        <Brand />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 22 }}>Riwayat Bermain</h1>
        {history.length > 0 && (
          <button
            className="btn btn-ghost"
            style={{ padding: '8px 14px', fontSize: 13, gap: 6 }}
            onClick={handleClear}
          >
            <Trash2 size={15} strokeWidth={2.4} />
            Hapus Semua
          </button>
        )}
      </div>

      <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 16 }}>
        Riwayat ini hanya tersimpan selama aplikasi terbuka di perangkatmu, dan akan hilang otomatis saat ditutup.
      </p>

      {history.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <div
            className="icon-circle"
            style={{ width: 60, height: 60, margin: '0 auto', background: '#d9f1ff', color: 'var(--sky-dark)' }}
          >
            <NotebookText size={28} strokeWidth={2} />
          </div>
          <p style={{ color: 'var(--ink-soft)', marginTop: 12 }}>Belum ada riwayat. Yuk mulai bermain dulu!</p>
          <Link to="/" className="btn btn-sun" style={{ marginTop: 16, display: 'inline-flex' }}>
            Mulai Bermain
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {history.map((h) => {
            const isChallenge = h.mode === 'Mode Tantangan'
            return (
              <div key={h.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  className="icon-circle"
                  style={{
                    width: 46,
                    height: 46,
                    flexShrink: 0,
                    color: '#fff',
                    background: isChallenge ? 'var(--coral)' : 'var(--grass)',
                  }}
                >
                  {isChallenge ? <Rocket size={22} strokeWidth={2} /> : <Turtle size={22} strokeWidth={2} />}
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ fontFamily: 'var(--font-display)', fontSize: 15 }}>{h.mode}</strong>
                  <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
                    {h.difficulty} &middot; {h.date}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2 }}>
                    Benar {h.correct}/{h.total} ({h.accuracy}%)
                  </div>
                </div>
                <span className="pill pill-sun">{h.score}</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
