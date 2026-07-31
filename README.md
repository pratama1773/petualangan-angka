# 🔢 Petualangan Angka

Game latihan berhitung interaktif untuk anak SD, dibangun dengan **React + Vite** agar ringan, cepat, dan mudah di-deploy ke Netlify.

## ✨ Fitur

### 1. Dua Mode Permainan

**🐢 Mode Santai**
- Tidak ada batasan waktu maupun nyawa.
- Skor murni akumulatif: setiap jawaban **benar = +1 poin**, jawaban **salah = 0** (tidak mengurangi skor).
- Soal ditampilkan dalam bentuk pilihan ganda (4 opsi).
- Bisa berhenti kapan saja dengan tombol **"Selesai & Simpan Skor"**.

**🚀 Mode Tantangan**
- Ada **3 nyawa** ❤️❤️❤️ dan **timer per soal** (lama waktu tergantung level kesulitan).
- Setiap kali waktu habis atau jawaban salah → **kehilangan 1 nyawa**.
- Saat nyawa habis → permainan otomatis berakhir (**Game Over**).
- Skor dihitung dari **poin dasar + bonus kecepatan** (semakin cepat menjawab benar, semakin besar bonusnya) serta jumlah soal yang berhasil diselesaikan.
- Soal ditampilkan dalam **format susun ke bawah** (seperti berhitung di buku tulis), dijawab dengan mengetik angka.

### 2. Generator Soal yang Aman untuk Anak SD

Semua soal dibuat otomatis dengan aturan pengaman di `src/utils/questionGenerator.js`:
- **Pengurangan**: angka pertama selalu ≥ angka kedua, sehingga hasil **tidak pernah negatif**.
- **Pembagian**: dibentuk dari perkalian terlebih dahulu, sehingga hasilnya **selalu bilangan bulat**.
- **Perkalian**: dibatasi sesuai level (misalnya 1–5 untuk Mudah, 2–12 untuk Sulit) agar angka tidak terlalu besar untuk anak SD.
- Rentang angka bertambah sesuai level kesulitan yang dipilih.

### 3. Tiga Level Kesulitan

| Level | Operasi | Rentang Angka | Waktu per Soal (Mode Tantangan) |
|---|---|---|---|
| 🌱 Mudah | Tambah, Kurang | 1–10 | 20 detik |
| ⭐ Sedang | Tambah, Kurang, Kali | 5–50 (kali: 2–10) | 15 detik |
| 🚀 Sulit | Tambah, Kurang, Kali, Bagi | 10–100 (kali/bagi: 2–12) | 12 detik |

### 4. Riwayat Sesi (Tanpa Penyimpanan Permanen)

- Setiap sesi permainan yang selesai dicatat di halaman **Riwayat**.
- Riwayat memakai `sessionStorage`, sehingga **otomatis terhapus saat tab/aplikasi ditutup** — tidak ada data yang tersimpan permanen di perangkat.
- Tersedia tombol untuk menghapus riwayat secara manual kapan saja.

## 🛠️ Instalasi & Menjalankan Secara Lokal

Pastikan sudah menginstal [Node.js](https://nodejs.org/) (versi 18 ke atas).

```bash
# 1. Install dependencies
npm install

# 2. Jalankan mode pengembangan
npm run dev

# 3. Build untuk produksi
npm run build

# 4. Melihat hasil build secara lokal
npm run preview
```

Aplikasi akan berjalan di `http://localhost:5173` saat `npm run dev`.

## 📁 Struktur Proyek

```
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BackgroundClouds.jsx   # dekorasi latar belakang
│   │   ├── Home.jsx               # halaman pilih mode
│   │   ├── SetupGame.jsx          # halaman pilih tingkat kesulitan
│   │   ├── GameNormal.jsx         # Mode Santai
│   │   ├── GameChallenge.jsx      # Mode Tantangan (timer & nyawa)
│   │   └── History.jsx            # halaman riwayat sesi
│   ├── utils/
│   │   ├── questionGenerator.js   # logika pembuatan soal + aturan pengaman
│   │   └── storage.js             # penyimpanan riwayat berbasis sessionStorage
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                  # design system (warna, tipografi, animasi)
├── index.html
├── vite.config.js
├── netlify.toml
└── package.json
```

## 🚀 Deploy ke Netlify

### Opsi A — Lewat Git (disarankan)

1. Push proyek ini ke repository GitHub/GitLab/Bitbucket kamu:
   ```bash
   git init
   git add .
   git commit -m "Inisialisasi Petualangan Angka"
   git branch -M main
   git remote add origin <url-repository-kamu>
   git push -u origin main
   ```
2. Buka [Netlify](https://app.netlify.com/) → **Add new site → Import an existing project**.
3. Pilih repository yang baru saja di-push.
4. Netlify akan otomatis mendeteksi pengaturan build dari `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Klik **Deploy site**. Selesai! 🎉

### Opsi B — Netlify CLI

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

## 📱 Catatan Teknis

- Menggunakan `HashRouter` dari `react-router-dom` sehingga navigasi tetap berfungsi normal di hosting statis manapun tanpa konfigurasi server tambahan.
- Bundle produksi berukuran kecil (JS ter-gzip ± 59 KB) agar tetap ringan dan cepat dimuat, termasuk di koneksi lambat.
- Tampilan sepenuhnya responsif — nyaman digunakan di ponsel maupun tablet.
- Menghormati preferensi `prefers-reduced-motion` pengguna untuk mengurangi animasi bila diperlukan.
- Tidak ada data pribadi yang dikumpulkan atau dikirim ke server mana pun; seluruh permainan berjalan di sisi klien (browser).

## 🎨 Desain

Palet warna cerah bergaya "taman bermain" (langit biru, kuning matahari, hijau rumput, jingga koral, ungu anggur) dipadukan dengan tipografi bulat dan ramah (*Baloo 2* untuk judul, *Nunito* untuk teks) supaya terasa hangat dan menyenangkan tanpa terlihat berantakan atau membingungkan bagi anak-anak.

---

Selamat berlatih berhitung! 🧮✨
