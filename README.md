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
  * Soal disajikan dalam format pilihan ganda dengan 4 (empat) opsi jawaban, dengan indikator tambahan berupa progress bar waktu dan jumlah nyawa yang tersisa.

### 2. Sistem Generator Soal

Logika pembuatan soal yang terdapat pada direktori `src/utils/questionGenerator.js` diatur berdasarkan ketentuan berikut:
* **Pengurangan**: Angka pertama dipastikan selalu lebih besar atau sama dengan angka kedua guna menghindari hasil bernilai negatif.
* **Pembagian**: Disusun berdasarkan operasi perkalian terlebih dahulu untuk memastikan hasil akhir selalu berupa bilangan bulat.
* **Perkalian**: Faktor pengali diambil dari rentang tersendiri yang lebih kecil dan terpisah dari rentang penjumlahan/pengurangan, agar hasil kali tetap masuk akal untuk anak SD sekalipun rentang angka penjumlahan/pengurangan pada tingkat tersebut sudah besar.
* Seluruh operasi (penjumlahan, pengurangan, perkalian, pembagian) tersedia di setiap tingkat kesulitan; yang membedakan antar tingkat adalah rentang nilai angka yang digunakan.

### 3. Tingkat Kesulitan

| Tingkat Kesulitan | Jenis Operasi | Rentang Angka (Penjumlahan/Pengurangan) | Rentang Angka (Perkalian/Pembagian) | Alokasi Waktu per Soal (Mode Tantangan) |
| :--- | :--- | :--- | :--- | :--- |
| **Mudah** | Penjumlahan, Pengurangan, Perkalian, Pembagian | 1–50 | 1–5 | 20 detik |
| **Sedang** | Penjumlahan, Pengurangan, Perkalian, Pembagian | 60–150 | 2–10 | 15 detik |
| **Sulit** | Penjumlahan, Pengurangan, Perkalian, Pembagian | 500–1000 | 2–12 | 12 detik |

### 4. Riwayat Sesi

* Sesi permainan yang telah diselesaikan akan dicatat dan ditampilkan pada halaman Riwayat.
* Sistem memanfaatkan `sessionStorage`, sehingga data riwayat akan terhapus secara otomatis saat *tab* browser atau aplikasi ditutup.
* Tersedia juga fitur untuk melakukan penghapusan data riwayat secara manual oleh pengguna.

### 5. Efek Suara

* Setiap jawaban benar, jawaban salah, waktu habis, dan akhir sesi permainan disertai efek suara yang dihasilkan secara langsung melalui Web Audio API (`src/utils/sound.js`), tanpa menggunakan berkas audio eksternal.
* Tersedia tombol pengatur suara (aktif/nonaktif) yang dapat diakses di seluruh halaman, dengan status preferensi disimpan pada `sessionStorage`.

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

## Struktur Direktori Proyek

```text
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── BackgroundClouds.jsx
│   │   ├── Brand.jsx
│   │   ├── SoundToggle.jsx
│   │   ├── Home.jsx
│   │   ├── SetupGame.jsx
│   │   ├── GameNormal.jsx
│   │   ├── GameChallenge.jsx
│   │   └── History.jsx
│   ├── utils/
│   │   ├── questionGenerator.js
│   │   ├── storage.js
│   │   └── sound.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── netlify.toml
└── package.json
```

## Catatan Teknis

* Aplikasi mengimplementasikan `HashRouter` dari pustaka `react-router-dom` guna memastikan kelancaran navigasi pada berbagai layanan *hosting* statis tanpa memerlukan konfigurasi server tambahan.
* Elemen ikon pada antarmuka menggunakan pustaka `lucide-react`, satu set ikon garis yang konsisten dan diimpor sesuai kebutuhan (*tree-shaken*).
* Berkas produksi (*production bundle*) dirancang dalam ukuran yang sangat efisien (berkas JS ter-gzip di kisaran 60 KB) untuk memastikan performa pemuatan yang ringan dan cepat, termasuk pada kondisi jaringan yang lambat.
* Antarmuka pengguna (UI) dirancang sepenuhnya responsif, memberikan kenyamanan penggunaan baik pada perangkat ponsel maupun tablet.
* Aplikasi menghormati preferensi aksesibilitas `prefers-reduced-motion` dari pengguna dengan cara meminimalisasi animasi jika fitur tersebut diaktifkan.
* Mengedepankan privasi pengguna; tidak ada data pribadi yang dikumpulkan maupun dikirimkan ke server eksternal mana pun. Seluruh proses permainan, termasuk riwayat sesi dan efek suara, dieksekusi secara lokal di sisi klien (*browser*).
