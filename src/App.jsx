import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import SetupGame from './components/SetupGame.jsx'
import GameNormal from './components/GameNormal.jsx'
import GameChallenge from './components/GameChallenge.jsx'
import History from './components/History.jsx'
import BackgroundClouds from './components/BackgroundClouds.jsx'
import SoundToggle from './components/SoundToggle.jsx'


export default function App() {
  return (
    <>
      <BackgroundClouds />
      <SoundToggle />
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mulai/:mode" element={<SetupGame />} />
          <Route path="/main/santai" element={<GameNormal />} />
          <Route path="/main/tantangan" element={<GameChallenge />} />
          <Route path="/riwayat" element={<History />} />
        </Routes>
        <p className="footer-note">Dibuat untuk teman-teman kecil yang suka berhitung</p>
      </div>
    </>
  )
}
