# Petualangan Angka[cite: 1]

Game latihan berhitung interaktif untuk anak SD yang dibangun dengan React dan Vite.[cite: 1]

## Fitur Utama[cite: 1]

### 1. Dua Mode Permainan[cite: 1]

* **Mode Santai**[cite: 1]
  * Tanpa batasan waktu maupun nyawa.[cite: 1]
  * Skor akumulatif: setiap jawaban benar bernilai +1 poin, jawaban salah bernilai 0.[cite: 1]
  * Soal ditampilkan dalam bentuk pilihan ganda (4 opsi).[cite: 1]
  * Dapat dihentikan kapan saja menggunakan tombol penyimpanan skor.[cite: 1]

* **Mode Tantangan**[cite: 1]
  * Dilengkapi 3 nyawa dan pengatur waktu (*timer*) per soal.[cite: 1]
  * Kehilangan 1 nyawa jika waktu habis atau jawaban salah.[cite: 1]
  * Permainan berakhir secara otomatis saat nyawa habis.[cite: 1]
  * Perhitungan skor menggabungkan poin dasar, bonus kecepatan menjawab, serta total soal yang diselesaikan.[cite: 1]
  * Format soal disusun secara vertikal dengan input jawaban berupa pengetikan angka langsung.[cite: 1]

### 2. Generator Soal[cite: 1]

Logika pembuatan soal pada `src/utils/questionGenerator.js` diatur dengan ketentuan:[cite: 1]
* **Pengurangan**: Angka pertama dipastikan selalu lebih besar atau sama dengan angka kedua untuk menghindari hasil negatif.[cite: 1]
* **Pembagian**: Disusun berdasarkan operasi perkalian terlebih dahulu guna memastikan hasil akhir berupa bilangan bulat.[cite: 1]
* **Perkalian**: Batasan angka disesuaikan dengan tingkat kesulitan agar tetap proporsional.[cite: 1]
* Rentang nilai angka bertambah secara dinamis sesuai tingkat kesulitan.[cite: 1]

### 3. Tingkat Kesulitan[cite: 1]

| Level | Operasi | Rentang Angka | Waktu per Soal (Mode Tantangan) |[cite: 1]
|---|---|---|---|[cite: 1]
| Mudah | Penjumlahan, Pengurangan | 1–10 | 20 detik |[cite: 1]
| Sedang | Penjumlahan, Pengurangan, Perkalian | 5–50 (Perkalian: 2–10) | 15 detik |[cite: 1]
| Sulit | Penjumlahan, Pengurangan, Perkalian, Pembagian | 10–100 (Perkalian/Pembagian: 2–12) | 12 detik |[cite: 1]

### 4. Riwayat Sesi[cite: 1]

* Sesi permainan yang telah diselesaikan dicatat pada halaman Riwayat.[cite: 1]
* Memanfaatkan `sessionStorage` sehingga data riwayat otomatis terhapus saat tab atau aplikasi ditutup.[cite: 1]
* Tersedia fitur penghapusan riwayat secara manual.[cite: 1]

## Instalasi dan Menjalankan Proyek[cite: 1]

Pastikan [Node.js](https://nodejs.org/) versi 18 atau yang lebih baru telah terinstal pada sistem Anda.[cite: 1]

```bash
# 1. Install dependencies
npm install

# 2. Jalankan mode pengembangan
npm run dev

# 3. Build aplikasi untuk produksi
npm run build

# 4. Pratinjau hasil build secara lokal
npm run preview
```[cite: 1]

## Struktur Proyek[cite: 1]

```text
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
```[cite: 1]

## Catatan Teknis[cite: 1]

- Menggunakan `HashRouter` dari `react-router-dom` sehingga navigasi tetap berfungsi normal di hosting statis manapun tanpa konfigurasi server tambahan.[cite: 1]
- Bundle produksi berukuran kecil (JS ter-gzip ± 59 KB) agar tetap ringan dan cepat dimuat, termasuk di koneksi lambat.[cite: 1]
- Tampilan sepenuhnya responsif — nyaman digunakan di ponsel maupun tablet.[cite: 1]
- Menghormati preferensi `prefers-reduced-motion` pengguna untuk mengurangi animasi bila diperlukan.[cite: 1]
- Tidak ada data pribadi yang dikumpulkan atau dikirim ke server mana pun; seluruh permainan berjalan di sisi klien (browser).[cite: 1]