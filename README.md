# Petualangan Angka

Aplikasi permainan edukatif matematika interaktif yang ditujukan untuk siswa Sekolah Dasar (SD), dikembangkan menggunakan teknologi React dan Vite.

## Fitur Utama

### 1. Mode Permainan

* **Mode Santai**
  * Tidak terdapat batasan waktu maupun jumlah nyawa dalam permainan.
  * Sistem skor bersifat akumulatif: setiap jawaban yang benar akan mendapatkan +1 poin, sedangkan jawaban yang salah bernilai 0.
  * Soal disajikan dalam format pilihan ganda dengan 4 (empat) opsi jawaban.
  * Permainan dapat dihentikan kapan saja melalui tombol penyimpanan skor yang tersedia.

* **Mode Tantangan**
  * Dilengkapi dengan 3 (tiga) nyawa dan sistem pengatur waktu (*timer*) pada setiap soal.
  * Pemain akan kehilangan 1 (satu) nyawa apabila durasi waktu habis atau memberikan jawaban yang salah.
  * Sesi permainan akan berakhir secara otomatis ketika seluruh nyawa telah habis.
  * Kalkulasi skor akhir merupakan akumulasi dari poin dasar, bonus kecepatan dalam menjawab, serta total soal yang berhasil diselesaikan.
  * Format soal disusun secara vertikal, di mana input jawaban dilakukan melalui pengetikan angka secara langsung.

### 2. Sistem Generator Soal

Logika pembuatan soal yang terdapat pada direktori `src/utils/questionGenerator.js` diatur berdasarkan ketentuan berikut:
* **Pengurangan**: Angka pertama dipastikan selalu lebih besar atau sama dengan angka kedua guna menghindari hasil bernilai negatif.
* **Pembagian**: Disusun berdasarkan operasi perkalian terlebih dahulu untuk memastikan hasil akhir selalu berupa bilangan bulat.
* **Perkalian**: Batasan angka disesuaikan secara proporsional dengan tingkat kesulitan yang dipilih.
* Rentang nilai angka akan bertambah secara dinamis menyesuaikan dengan tingkat kesulitan permainan.

### 3. Tingkat Kesulitan

| Tingkat Kesulitan | Jenis Operasi | Rentang Angka | Alokasi Waktu per Soal (Mode Tantangan) |
| :--- | :--- | :--- | :--- |
| **Mudah** | Penjumlahan, Pengurangan | 1–10 | 20 detik |
| **Sedang** | Penjumlahan, Pengurangan, Perkalian | 5–50 (Perkalian: 2–10) | 15 detik |
| **Sulit** | Penjumlahan, Pengurangan, Perkalian, Pembagian | 10–100 (Perkalian/Pembagian: 2–12) | 12 detik |

### 4. Riwayat Sesi

* Sesi permainan yang telah diselesaikan akan dicatat dan ditampilkan pada halaman Riwayat.
* Sistem memanfaatkan `sessionStorage`, sehingga data riwayat akan terhapus secara otomatis saat *tab* browser atau aplikasi ditutup.
* Tersedia juga fitur untuk melakukan penghapusan data riwayat secara manual oleh pengguna.

---

## Panduan Instalasi dan Penggunaan

Sebelum memulai, pastikan perangkat Anda telah terinstal [Node.js](https://nodejs.org/) versi 18 atau versi yang lebih baru.

```bash
# 1. Menginstal seluruh dependensi yang dibutuhkan
npm install

# 2. Menjalankan aplikasi dalam mode pengembangan (development)
npm run dev

# 3. Membangun (build) aplikasi untuk lingkungan produksi
npm run build

# 4. Melakukan pratinjau (preview) hasil build secara lokal
npm run preview
```

---

## Struktur Direktori Proyek

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
```

---

## Catatan Teknis

* Aplikasi mengimplementasikan `HashRouter` dari pustaka `react-router-dom` guna memastikan kelancaran navigasi pada berbagai layanan *hosting* statis tanpa memerlukan konfigurasi server tambahan.
* Berkas produksi (*production bundle*) dirancang dalam ukuran yang sangat efisien (berkas JS ter-gzip ± 59 KB) untuk memastikan performa pemuatan yang ringan dan cepat, termasuk pada kondisi jaringan yang lambat.
* Antarmuka pengguna (UI) dirancang sepenuhnya responsif, memberikan kenyamanan penggunaan baik pada perangkat ponsel maupun tablet.
* Aplikasi menghormati preferensi aksesibilitas `prefers-reduced-motion` dari pengguna dengan cara meminimalisasi animasi jika fitur tersebut diaktifkan.
* Mengedepankan privasi pengguna; tidak ada data pribadi yang dikumpulkan maupun dikirimkan ke server eksternal mana pun. Seluruh proses permainan dieksekusi secara lokal di sisi klien (*browser*).