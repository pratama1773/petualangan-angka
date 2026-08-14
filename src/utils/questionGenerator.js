// Generator soal matematika yang aman untuk anak SD.
// Aturan pengaman:
// - Pengurangan: angka pertama selalu >= angka kedua (tidak ada hasil negatif)
// - Pembagian: dibentuk dari perkalian terlebih dahulu, sehingga hasil selalu bulat
// - Perkalian: dibatasi sesuai level agar angka tidak terlalu besar
// - Semua angka dan hasil dibatasi ke rentang yang wajar untuk anak SD

export const DIFFICULTY = {
  mudah: {
    key: 'mudah',
    label: 'Mudah',
    emoji: '🌱',
    addRange: [1, 10],
    subRange: [1, 10],
    mulRange: [1, 10],
    
    operations: ['tambah', 'kurang', 'kali'],
    timeLimit: 20,
  },
  sedang: {
    key: 'sedang',
    label: 'Sedang',
    emoji: '⭐',
    addRange: [1, 100],
    subRange: [1, 100],
    mulRange: [1, 100],
    divQuotientRange: [1, 10],
    divDivisorRange: [1, 10],
    operations: ['tambah', 'kurang', 'kali', 'bagi'],
    timeLimit: 15,
  },
  sulit: {
    key: 'sulit',
    label: 'Sulit',
    emoji: '🚀',
    addRange: [10, 1000],
    subRange: [10, 1000],
    mulRange: [10, 100],
    divQuotientRange: [1, 100],
    divDivisorRange: [1, 100],
    operations: ['tambah', 'kurang', 'kali', 'bagi'],
    timeLimit: 12,
  },
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const OP_SYMBOL = {
  tambah: '+',
  kurang: '−',
  kali: '×',
  bagi: '÷',
}

/**
 * Menghasilkan satu soal berdasarkan level kesulitan.
 * Selalu memastikan soal masuk akal untuk anak SD (tidak ada hasil negatif,
 * pembagian selalu bulat, perkalian tidak terlalu besar).
 */
export function generateQuestion(difficultyKey, opsOverride) {
  const diff = DIFFICULTY[difficultyKey] || DIFFICULTY.mudah
  const opsPool = opsOverride && opsOverride.length ? opsOverride : diff.operations
  const op = opsPool[randInt(0, opsPool.length - 1)]

  let a, b, answer

  switch (op) {
    case 'tambah': {
      a = randInt(diff.addRange[0], diff.addRange[1])
      b = randInt(diff.addRange[0], diff.addRange[1])
      answer = a + b
      break
    }
    case 'kurang': {
      // a selalu lebih besar atau sama dengan b, sehingga hasil tidak pernah negatif
      const x = randInt(diff.subRange[0], diff.subRange[1])
      const y = randInt(diff.subRange[0], diff.subRange[1])
      a = Math.max(x, y)
      b = Math.min(x, y)
      answer = a - b
      break
    }
    case 'kali': {
      a = randInt(diff.mulRange[0], diff.mulRange[1])
      b = randInt(diff.mulRange[0], diff.mulRange[1])
      answer = a * b
      break
    }
    case 'bagi': {
      // a dibentuk dari divisor × quotient, sehingga hasil bagi selalu bilangan bulat
      const divisor = randInt(diff.divDivisorRange[0], diff.divDivisorRange[1])
      const quotient = randInt(diff.divQuotientRange[0], diff.divQuotientRange[1])
      a = divisor * quotient
      b = divisor
      answer = quotient
      break
    }
    default: {
      a = randInt(1, 10)
      b = randInt(1, 10)
      answer = a + b
    }
  }

  // Tiga opsi pengecoh dihasilkan di sekitar jawaban benar, tetap tidak negatif dan tidak terlalu jauh
  const options = buildOptions(answer, op)

  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    a,
    b,
    op,
    symbol: OP_SYMBOL[op],
    answer,
    options,
    difficulty: difficultyKey,
    timeLimit: diff.timeLimit,
  }
}

function buildOptions(answer, op) {
  const set = new Set([answer])
  const spread = op === 'kali' || op === 'bagi' ? Math.max(2, Math.round(answer * 0.2)) : Math.max(2, Math.round(answer * 0.15) || 2)

  // Percobaan acak dibatasi maksimal 30 kali — pada rentang angka kecil
  // (misalnya jawaban bernilai 0), kombinasi acak yang tersedia bisa sangat
  // terbatas, sehingga loop tanpa batas atas berpotensi tidak pernah selesai.
  let attempts = 0
  while (set.size < 4 && attempts < 30) {
    attempts++
    const delta = randInt(-spread, spread) || randInt(1, spread)
    let candidate = answer + delta
    if (candidate < 0) candidate = answer + Math.abs(delta)
    if (candidate < 0 || candidate === answer) continue
    set.add(candidate)
  }

  // Jaring pengaman: jika hasil acak di atas belum cukup mengisi 4 opsi
  // (kasus jawaban kecil seperti 0 atau 1), sisanya dilengkapi secara
  // berurutan dari angka terdekat, sehingga fungsi ini dijamin selalu berhenti.
  let offset = 1
  while (set.size < 4) {
    const up = answer + offset
    const down = answer - offset
    if (!set.has(up)) set.add(up)
    if (set.size < 4 && down >= 0 && !set.has(down)) set.add(down)
    offset++
  }

  return shuffle(Array.from(set)).slice(0, 4)
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Menghasilkan satu paket soal (dipakai untuk generate di awal sesi).
 */
export function generateQuestionSet(difficultyKey, count) {
  return Array.from({ length: count }, () => generateQuestion(difficultyKey))
}