import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getHistory, clearHistory } from '../utils/storage.js'

export default function History() {
  const [history, setHistory] = useState(() => getHistory())

  function handleClear() {
    clearHistory()
    setHistory([])
  }

  return (
    <div className="anim-pop">
      <div className="topbar">
        <Link to="/" className="brand">
          <span className="brand-badge">🔢</span>
          Petualangan Angka
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h1 style={{ fontSize: 22 }}>📖 Riwayat Bermain</h1>
        {history.length > 0 && (
          <button className="btn btn-ghost" style={{ padding: '8px 14px', fontSize: 13 }} onClick={handleClear}>
            Hapus Semua
          </button>
        )}
      </div>

      <p style={{ fontSize: 13, color: 'var(--ink-soft)', marginBottom: 16 }}>
        Riwayat ini hanya tersimpan selama aplikasi terbuka di perangkatmu, dan akan hilang otomatis saat ditutup.
      </p>

      {history.length === 0 ? (
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 44 }}>🗒️</div>
          <p style={{ color: 'var(--ink-soft)', marginTop: 8 }}>Belum ada riwayat. Yuk mulai bermain dulu!</p>
          <Link to="/" className="btn btn-sun" style={{ marginTop: 16, display: 'inline-flex' }}>
            Mulai Bermain
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {history.map((h) => (
            <div key={h.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: 30 }}>{h.mode === 'Mode Tantangan' ? '🚀' : '🐢'}</div>
              <div style={{ flex: 1 }}>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: 15 }}>{h.mode}</strong>
                <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>
                  {h.difficulty} • {h.date}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2 }}>
                  Benar {h.correct}/{h.total} ({h.accuracy}%)
                </div>
              </div>
              <span className="pill pill-sun">⭐ {h.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
