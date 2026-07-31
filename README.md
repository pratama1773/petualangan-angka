# Petualangan Angka

Game latihan berhitung interaktif untuk anak SD yang dibangun dengan React dan Vite.

## Fitur Utama

### 1. Dua Mode Permainan

* **Mode Santai**
  * Tanpa batasan waktu maupun nyawa.
  * Skor akumulatif: setiap jawaban benar bernilai +1 poin, jawaban salah bernilai 0.
  * Soal ditampilkan dalam bentuk pilihan ganda (4 opsi).
  * Dapat dihentikan kapan saja menggunakan tombol penyimpanan skor.

* **Mode Tantangan**
  * Dilengkapi 3 nyawa dan pengatur waktu (*timer*) per soal.
  * Kehilangan 1 nyawa jika waktu habis atau jawaban salah.
  * Permainan berakhir secara otomatis saat nyawa habis.
  * Perhitungan skor menggabungkan poin dasar, bonus kecepatan menjawab, serta total soal yang diselesaikan.
  * Format soal disusun secara vertikal dengan input jawaban berupa pengetikan angka langsung.

### 2. Generator Soal

Logika pembuatan soal pada `src/utils/questionGenerator.js` diatur dengan ketentuan:
* **Pengurangan**: Angka pertama dipastikan selalu lebih besar atau sama dengan angka kedua untuk menghindari hasil negatif.
* **Pembagian**: Disusun berdasarkan operasi perkalian terlebih dahulu guna memastikan hasil akhir berupa bilangan bulat.
* **Perkalian**: Batasan angka disesuaikan dengan tingkat kesulitan agar tetap proporsional.
* Rentang nilai angka bertambah secara dinamis sesuai tingkat kesulitan.

### 3. Tingkat Kesulitan

| Level | Operasi | Rentang Angka | Waktu per Soal (Mode Tantangan) |
|---|---|---|---|
| Mudah | Penjumlahan, Pengurangan | 1–10 | 20 detik |
| Sedang | Penjumlahan, Pengurangan, Perkalian | 5–50 (Perkalian: 2–10) | 15 detik |
| Sulit | Penjumlahan, Pengurangan, Perkalian, Pembagian | 10–100 (Perkalian/Pembagian: 2–12) | 12 detik |

### 4. Riwayat Sesi

* Sesi permainan yang telah diselesaikan dicatat pada halaman Riwayat.
* Memanfaatkan `sessionStorage` sehingga data riwayat otomatis terhapus saat tab atau aplikasi ditutup.
* Tersedia fitur penghapusan riwayat secara manual.

## Instalasi dan Menjalankan Proyek

Pastikan [Node.js](https://nodejs.org/) versi 18 atau yang lebih baru telah terinstal pada sistem Anda.

```bash
# 1. Install dependencies
npm install

# 2. Jalankan mode pengembangan
npm run dev

# 3. Build aplikasi untuk produksi
npm run build

# 4. Pratinjau hasil build secara lokal
npm run preview


## Struktur Proyek
```
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BackgroundClouds.jsx
│   │   ├── Home.jsx
│   │   ├── SetupGame.jsx
│   │   ├── GameNormal.jsx
│   │   ├── GameChallenge.jsx
│   │   └── History.jsx
│   ├── utils/
│   │   ├── questionGenerator.js
│   │   └── storage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── netlify.toml
└── package.json
```

## Catatan Teknis

- Menggunakan `HashRouter` dari `react-router-dom` sehingga navigasi tetap berfungsi normal di hosting statis manapun tanpa konfigurasi server tambahan.
- Bundle produksi berukuran kecil (JS ter-gzip ± 59 KB) agar tetap ringan dan cepat dimuat, termasuk di koneksi lambat.
- Tampilan sepenuhnya responsif — nyaman digunakan di ponsel maupun tablet.
- Menghormati preferensi `prefers-reduced-motion` pengguna untuk mengurangi animasi bila diperlukan.
- Tidak ada data pribadi yang dikumpulkan atau dikirim ke server mana pun; seluruh permainan berjalan di sisi klien (browser).