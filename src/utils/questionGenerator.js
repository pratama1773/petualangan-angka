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
    mulRange: [1, 5],
    divQuotientRange: [1, 5],
    divDivisorRange: [1, 5],
    operations: ['tambah', 'kurang'],
    timeLimit: 20,
  },
  sedang: {
    key: 'sedang',
    label: 'Sedang',
    emoji: '⭐',
    addRange: [5, 50],
    subRange: [5, 50],
    mulRange: [2, 10],
    divQuotientRange: [2, 10],
    divDivisorRange: [2, 10],
    operations: ['tambah', 'kurang', 'kali'],
    timeLimit: 15,
  },
  sulit: {
    key: 'sulit',
    label: 'Sulit',
    emoji: '🚀',
    addRange: [10, 100],
    subRange: [10, 100],
    mulRange: [2, 12],
    divQuotientRange: [2, 12],
    divDivisorRange: [2, 12],
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

  while (set.size < 4) {
    const delta = randInt(-spread, spread) || randInt(1, spread)
    let candidate = answer + delta
    if (candidate < 0) candidate = answer + Math.abs(delta)
    if (candidate === answer) candidate = answer + spread + set.size
    set.add(candidate)
  }

  return shuffle(Array.from(set))
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
