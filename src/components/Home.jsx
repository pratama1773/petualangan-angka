import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="anim-pop">
      <div className="topbar">
        <Link to="/" className="brand">
          <span className="brand-badge">🔢</span>
          Petualangan Angka
        </Link>
        <Link to="/riwayat" className="btn btn-ghost" style={{ padding: '10px 16px', fontSize: 15 }}>
          📖 Riwayat
        </Link>
      </div>

      <div style={{ textAlign: 'center', margin: '10px 0 26px' }}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Ayo Berhitung! 🎉</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: 16 }}>
          Pilih cara bermain yang kamu suka
        </p>
      </div>

      <div style={{ display: 'grid', gap: 18 }}>
        <ModeCard
          to="/mulai/santai"
          emoji="🐢"
          title="Mode Santai"
          desc="Kerjakan soal sebanyak-banyaknya tanpa buru-buru. Cocok untuk berlatih pelan-pelan."
          accent="grass"
          tags={['Tanpa waktu', 'Tanpa nyawa']}
        />
        <ModeCard
          to="/mulai/tantangan"
          emoji="🚀"
          title="Mode Tantangan"
          desc="Balapan dengan waktu dan jaga 3 nyawamu! Soal disusun ke bawah seperti di buku tulis."
          accent="coral"
          tags={['Pakai waktu', '3 nyawa']}
        />
      </div>

      <div className="card anim-float" style={{ marginTop: 22, display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ fontSize: 34 }}>💡</div>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
          Kamu bisa memilih tingkat kesulitan <strong>Mudah</strong>, <strong>Sedang</strong>, atau{' '}
          <strong>Sulit</strong> sebelum mulai bermain, di kedua mode.
        </p>
      </div>
    </div>
  )
}

function ModeCard({ to, emoji, title, desc, accent, tags }) {
  return (
    <Link
      to={to}
      className="card"
      style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        border: `3px solid transparent`,
        transition: 'transform 0.12s ease, border-color 0.12s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
    >
      <div
        style={{
          fontSize: 40,
          width: 68,
          height: 68,
          flexShrink: 0,
          borderRadius: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `var(--${accent === 'grass' ? 'grass' : 'coral'})`,
          boxShadow: `0 5px 0 var(--${accent}-dark)`,
        }}
      >
        {emoji}
      </div>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 20, marginBottom: 4 }}>{title}</h2>
        <p style={{ fontSize: 14, color: 'var(--ink-soft)', marginBottom: 8 }}>{desc}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tags.map((t) => (
            <span key={t} className={`pill pill-${accent === 'grass' ? 'grass' : 'coral'}`}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{ fontSize: 22, color: 'var(--ink-soft)' }}>›</div>
    </Link>
  )
}
