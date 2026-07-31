// Riwayat permainan disimpan dengan sessionStorage.
// sessionStorage otomatis terhapus ketika tab/browser ditutup,
// sesuai kebutuhan: riwayat hanya ada selama aplikasi terbuka.

const HISTORY_KEY = 'pa_riwayat_sesi'

export function getHistory() {
  try {
    const raw = sessionStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function addHistoryEntry(entry) {
  const history = getHistory()
  const updated = [{ ...entry, id: Date.now() }, ...history].slice(0, 50)
  try {
    sessionStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
  } catch {
    // storage penuh atau tidak tersedia — abaikan dengan aman
  }
  return updated
}

export function clearHistory() {
  try {
    sessionStorage.removeItem(HISTORY_KEY)
  } catch {
    // abaikan
  }
}
