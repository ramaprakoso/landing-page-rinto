# Landing Page PT. Manggala Arta Sejahtera

Landing page profesional dan modern untuk kontraktor sipil dengan spesialisasi:
1. **Pengaspalan Jalan Hotmix** (Perumahan, Pergudangan/Pabrik, Area Parkir, Lapangan).
2. **Pemasangan U-Ditch & Saluran Drainase Precast** (Kansteen K-350, Cover U-Ditch, Box Culvert, Steel Grating).
3. **Poles Beton & Floor Hardener** (Finish Trowel, Sika/Fosroc Hardener, Diamond Polishing High-Gloss, Lithium Densifier).

---

## 📁 Struktur Direktori & File

```text
landing-page-rinto/
│
├── index.html              # Struktur utama landing page (HTML5 semantik & Schema.org)
│
├── css/
│   └── style.css           # Desain sistem, warna, tipografi, dan tata letak responsif
│
├── js/
│   └── main.js             # Logika kalkulator interaktif RAB, filter galeri, tabs & modal
│
└── assets/
    └── images/             # Dokumentasi proyek & katalog produk kansteen
        ├── spesifikasi-kansteen.jpg    # Skematik dimensi resmi kansteen K-350
        ├── pengaspalan-roller.jpg      # Dokumentasi compactor roller di parkiran
        ├── pekerja-aspal-hotmix.jpg    # Dokumentasi tim gelar aspal hotmix
        ├── drainase-grating-plaza.jpg  # Saluran drainase grill besi di area plaza
        ├── aspal-kansteen-finish.jpg   # Hasil akhir jalan aspal dengan kansteen rapi
        ├── uditch-drainase-hero.jpg    # Pemasangan U-Ditch precast dengan excavator
        └── poles-beton-showcase.jpg    # Lantai gudang industri poles kilap glossy
```

---

## ⚙️ Panduan Pengubahan Data Cepat

### 1. Mengubah Nomor WhatsApp Bisnis
Jika ada pergantian nomor WhatsApp di kemudian hari:
- Buka `index.html`: Cari nomor `6282260840642` dan ganti dengan nomor baru Anda (gunakan format internasional tanpa tanda `+`, contoh: `628123456789`).
- Buka `js/main.js`: Cari nomor `6282260840642` pada fungsi pembuatan pesan WhatsApp di bagian kalkulator.

### 2. Mengubah Tarif / Harga Acuan pada Kalkulator RAB
Harga acuan estimasi tersimpan rapi di file `js/main.js` pada objek `pricingData` (mulai baris 105). Anda dapat menyesuaikan harga per satuan sesuai fluktuasi pasar:
```javascript
const pricingData = {
  aspal: {
    packages: [
      { id: "acwc-overlay", name: "Paket Gelar Hotmix AC-WC (Tebal 2-3 cm)", price: 85000 },
      ...
    ]
  },
  uditch: { ... },
  poles: { ... }
};
```

---

## ☁️ Panduan Deploy Gratis ke Cloudflare Pages

Website ini dibuat dengan arsitektur **Pure Static Web (HTML, CSS, JS)** tanpa backend rumit, sehingga dapat di-hosting secara gratis selamanya dan memiliki kecepatan load instan dengan SSL otomatis di Cloudflare Pages.

### Opsi 1: Drag & Drop (Paling Mudah, Tanpa Git)
1. Buka dashboard [Cloudflare](https://dash.cloudflare.com/) dan login/daftar akun gratis.
2. Pada menu kiri, pilih **Compute (Workers & Pages)** > **Create application** > tab **Pages**.
3. Pilih opsi **Upload assets**.
4. Beri nama proyek (misal: `manggala-arta-sejahtera`).
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
3. Masukkan domain yang Anda miliki (contoh: `manggalaartasejahtera.com`).
4. Ikuti instruksi DNS otomatis dari Cloudflare (SSL HTTPS aktif otomatis).

---

## 🛡️ Hak Cipta & Kepemilikan
&copy; 2026 PT. Manggala Arta Sejahtera. Hak cipta dilindungi undang-undang.
