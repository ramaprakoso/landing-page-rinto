# Landing Page PT Manggala Artajaya Sejahtera

Landing page profesional dan modern untuk kontraktor sipil dengan spesialisasi:
1. **Pengaspalan Jalan Hotmix** (Perumahan, Pergudangan/Pabrik, Area Parkir, Lapangan).
2. **Pemasangan U-Ditch & Saluran Drainase Precast** (Kansteen K-350, Cover U-Ditch, Box Culvert, Steel Grating).
3. **Poles Beton & Floor Hardener** (Finish Trowel, Sika/Fosroc Hardener, Diamond Polishing High-Gloss, Lithium Densifier).

---

## 📁 Struktur Direktori & File

```text
landing-page-rinto/
│
├── index.html              # Beranda umum (3 layanan, HTML5 semantik & Schema.org)
├── pengaspalan/index.html  # Halaman layanan Pengaspalan Hotmix
├── uditch/index.html       # Halaman layanan Pemasangan U-Ditch
├── poles-beton/index.html  # Halaman layanan Poles Beton
├── robots.txt              # Aturan crawler mesin pencari
├── sitemap.xml             # Daftar URL untuk mesin pencari (update <lastmod> bila konten berubah)
│
├── css/
│   └── style.css           # Desain sistem, warna, tipografi, dan tata letak responsif
│
├── js/
│   └── main.js             # Navbar, kalkulator estimasi biaya, filter galeri, FAQ & modal
│
└── assets/
    └── images/             # Dokumentasi proyek
        ├── pengaspalan-roller.jpg      # Compactor roller di area parkir (hero beranda)
        ├── pekerja-aspal-hotmix.jpg    # Tim gelar aspal hotmix (hero halaman pengaspalan)
        ├── uditch-drainase-hero.jpg    # Ilustrasi pemasangan U-Ditch precast (hero halaman U-Ditch)
        ├── drainase-grating-plaza.jpg  # Saluran drainase grill besi di area plaza
        ├── poles-beton-grinding.jpg    # Proses grinding poles beton (hero halaman poles)
        ├── poles-beton-densifier.jpg   # Aplikasi cairan densifier
        ├── poles-beton-gudang.jpg      # Pengerjaan lantai gudang
        ├── poles-beton-showcase.jpg    # Lantai gudang industri poles kilap
        ├── spesifikasi-kansteen.jpg    # (tidak dipakai) skematik kansteen K-350
        └── aspal-kansteen-finish.jpg   # (tidak dipakai) jalan aspal dengan kansteen
```

> Keempat halaman memakai template yang sama. Perubahan pada bagian bersama (FAQ, galeri, area layanan, footer) perlu diterapkan di keempat file `index.html`.

---

## ⚙️ Panduan Pengubahan Data Cepat

### 1. Mengubah Nomor WhatsApp Bisnis
Jika ada pergantian nomor WhatsApp di kemudian hari:
- Cari nomor `6282260840642` di keempat file HTML (`index.html`, `pengaspalan/`, `uditch/`, `poles-beton/`) dan ganti dengan nomor baru (format internasional tanpa tanda `+`, contoh: `628123456789`). Termasuk `"telephone"` pada Schema.org (format `+62...`) dan nomor yang tampil di top bar, menu mobile & footer (format `+62 8xx-xxxx-xxxx`).
- Buka `js/main.js`: Cari nomor `6282260840642` pada fungsi pembuatan pesan WhatsApp di bagian kalkulator.

### 2. Mengubah Tarif / Harga Acuan pada Kalkulator Estimasi
Harga acuan tersimpan di `js/main.js` pada objek `pricingData` (fungsi `initCalculator`). Rumus per layanan:

| Layanan | Rumus | Pengaturan |
|---|---|---|
| Pengaspalan | `price` × tebal (cm) × luas (m²) | `priceUnit: "m² / cm"`, `defaultThickness: 7` |
| U-Ditch | `price` per buah × jumlah buah (panjang ÷ 1,2 m, dibulatkan ke atas) | `priceUnit: "buah"`, `pieceLength: 1.2` |
| Poles Beton | `price` × luas (m²) | — |

```javascript
const pricingData = {
  aspal: {
    priceUnit: "m² / cm",
    defaultThickness: 7,
    packages: [
      { id: "aspal-terpasang", name: "Jasa Pengaspalan Terpasang", price: 125000 }
    ]
  },
  uditch: {
    priceUnit: "buah",
    pieceLength: 1.2,
    packages: [
      { id: "uditch-30", name: "Pasang U-Ditch 30 x 30 x 120 cm (Mutu K-350)", price: 250000 },
      ...
    ]
  },
  poles: {
    packages: [
      { id: "poles-terpasang", name: "Jasa Poles Beton Terpasang", price: 160000 }
    ]
  }
};
```

Hasil kalkulator ditampilkan sebagai rentang: harga dasar sampai harga dasar × 1,25.

Setelah mengubah harga, sesuaikan juga:
- Teks awal ringkasan kalkulator di HTML (`#summaryUnitPrice`, `#totalPriceOutput`, dll.).
- FAQ "Bagaimana harga di kalkulator estimasi dihitung?" di keempat halaman.

### 3. Mengisi Slot Foto (Kotak Oranye Bergaris)
Foto yang perlu diganti foto proyek asli ditandai kotak oranye bergaris bertuliskan nama file. **Cukup simpan foto dengan nama file tersebut di `assets/images/`.** Foto langsung tampil menggantikan kotaknya, tanpa perlu mengedit HTML (diatur oleh `initPhotoSlots()` di `js/main.js`).

| Nama file | Tampil di |
|---|---|
| `foto-hero-beranda.jpg` | Hero Beranda: tim & alat berat di lokasi proyek |
| `foto-hero-uditch.jpg` | Hero halaman U-Ditch: proses pemasangan U-Ditch |
| `foto-hero-poles.jpg` | Hero halaman Poles Beton: proses grinding |
| `foto-layanan-uditch.jpg` | Bagian Layanan (semua halaman): pemasangan / hasil U-Ditch |
| `foto-layanan-poles.jpg` | Bagian Layanan (semua halaman): hasil poles lantai gudang |

Format: JPG, posisi horizontal, terang, lebar minimal 1600 px. Kompres dulu (misal lewat squoosh.app) supaya ukurannya di bawah ±400 KB.

### 4. Mengisi Bagian "Dipercaya Klien"
Bagian `#klien` masih berisi placeholder bergaris oranye (`.is-placeholder` / `.placeholder-text`). Isi dengan data asli di keempat file HTML:
- **Angka:** proyek selesai, m² area diaspal, tahun pengalaman, jumlah klien perusahaan.
- **Logo klien:** ganti tiap `<div class="logo-slot ...">` dengan `<img>` logo.
- **Testimoni:** isi kutipan, nama, dan jabatan/perusahaan, dengan izin klien.
- **Legalitas:** NIB, NPWP, SBU/sertifikat.

Setelah diisi, hapus class `is-placeholder` / `placeholder-text` supaya garis oranyenya hilang.

---

## ☁️ Panduan Deploy Gratis ke Cloudflare Pages

Website ini dibuat dengan arsitektur **Pure Static Web (HTML, CSS, JS)** tanpa backend rumit, sehingga dapat di-hosting secara gratis selamanya dan memiliki kecepatan load instan dengan SSL otomatis di Cloudflare Pages.

### Opsi 1: Drag & Drop (Paling Mudah, Tanpa Git)
1. Buka dashboard [Cloudflare](https://dash.cloudflare.com/) dan login/daftar akun gratis.
2. Pada menu kiri, pilih **Compute (Workers & Pages)** > **Create application** > tab **Pages**.
3. Pilih opsi **Upload assets**.
4. Beri nama proyek (misal: `manggala-artajaya-sejahtera`).
5. Drag & drop seluruh folder `landing-page-rinto` ke area upload Cloudflare.
6. Klik **Deploy Site**. Website Anda akan langsung aktif dengan domain bawaan `*.pages.dev`.

### Opsi 2: Integrasi Otomatis via GitHub
1. Push repository ini ke akun GitHub Anda.
2. Di Cloudflare Pages, pilih **Connect to Git** dan pilih repositori ini.
3. Kosongkan build command (karena murni static HTML).
4. Klik **Save and Deploy**. Setiap ada pembaruan kode di GitHub, Cloudflare akan otomatis mengupdate websitenya.

### Menghubungkan Domain Kustom Sendiri
1. Masuk ke halaman proyek Cloudflare Pages Anda.
2. Klik tab **Custom Domains** > **Set up a custom domain**.
3. Masukkan domain yang Anda miliki (contoh: `manggalaartajayasejahtera.com`).
4. Ikuti instruksi DNS otomatis dari Cloudflare (SSL HTTPS aktif otomatis).

---

## 🛡️ Hak Cipta & Kepemilikan
&copy; 2026 PT Manggala Artajaya Sejahtera. Hak cipta dilindungi undang-undang.
