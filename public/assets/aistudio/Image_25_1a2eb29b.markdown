---
name: FindIt Campus
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#444651'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#003211'
  on-tertiary: '#ffffff'
  tertiary-container: '#004b1d'
  on-tertiary-container: '#44c365'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#7ffc97'
  tertiary-fixed-dim: '#62df7d'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005320'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  display:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  display-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

Sistem desain ini dibangun untuk portal layanan penemuan dan kehilangan barang di lingkungan kampus Telkom University. Pendekatan visual mengedepankan gaya **Corporate / Modern** yang bersih, berstruktur jelas, dan berorientasi pada kecepatan pemrosesan informasi (high legibility under stress). Antarmuka memadukan identitas kelembagaan yang tepercaya melalui rona navy pekat dengan dorongan aksi cepat lewat sentuhan oranye cerah.

Prinsip desain:
- **Tepercaya & Resmi**: Mengurangi kepanikan mahasiswa saat kehilangan barang dengan struktur yang stabil, tenang, dan tertata rapi.
- **Transparan & Akurat**: Menampilkan status verifikasi dan kepemilikan barang secara eksplisit lewat indikator semantik instan.
- **Fokus & Efisien**: Form pelaporan dan penelusuran barang dirancang tanpa friksi kognitif dengan kontras visual tegas.

## Colors

Palet warna menggunakan fondasi kontras tinggi dengan hierarki fungsional yang ketat:

- **Primary (`#1E3A8A`)**: Navy pekat digunakan untuk elemen struktural utama seperti top navigation bar, header sesi, link navigasi, outline tombol sekunder, serta teks judul berbobot tinggi.
- **Secondary / Accent (`#F97316`)**: Oranye cerah dialokasikan khusus untuk tindakan utama (Primary CTA) seperti "Laporkan Barang Hilang", "Klaim Barang", dan submit utama.
- **Semantic Statuses**:
  - *Hilang (Lost)*: `#DC2626` (Danger Red) untuk penanda kegentingan dan kartu barang hilang.
  - *Ditemukan (Found)*: `#16A34A` (Success Green) untuk barang yang telah diamankan di posko/penemu.
  - *Menunggu Verifikasi / Diklaim (Pending/Claimed)*: `#EAB308` (Warning Amber) untuk proses pencocokan bukti.
  - *Selesai / Ditutup / Kedaluwarsa (Archived/Closed)*: `#9CA3AF` (Neutral Muted Gray) untuk kasus tuntas.
- **Surfaces & Neutrals**:
  - Latar kanvas: `#F3F4F6` (Gray 100).
  - Latar kartu/kontainer: `#FFFFFF` (Pure White).
  - Garis batas (Borders): `#E5E7EB` (Gray 200).
  - Teks utama: `#111827` (Gray 900).
  - Teks sekunder: `#6B7280` (Gray 500).

## Typography

Tipografi dibangun sekeliling **Inter** untuk mempertahankan kejernihan data teknis (seperti lokasi gedung, nomor seri, tanggal, dan waktu penemuan). 

- **Skala Hirarki**: Judul menggunakan bobot bold (700) dan semi-bold (600) untuk memandu pandangan mata dengan cepat di antara grid laporan.
- **Teks Tubuh (Body)**: Menggunakan ukuran standar 14px dan 16px dengan spasi baris 1.4-1.5× guna keterbacaan deskripsi barang dan kronologi kejadian.
- **Label & Badge**: Memanfaatkan ukuran 11px-12px dengan ketebalan medium hingga semi-bold untuk label status, lokasi ruangan, dan tagging kategori barang.

## Layout & Spacing

Sistem tata letak mengikuti basis grid 8px untuk ritme vertikal dan horizontal yang konsisten:

- **Desktop (≥ 1024px)**: Grid 12 kolom fluida dengan margin luar `32px` (2rem) dan gutter kolom `24px` (1.5rem). Kontainer maksimal dibatasi pada lebar `1280px` di tengah kanvas.
- **Tablet (768px - 1023px)**: Grid 8 kolom dengan margin `24px` dan gutter `16px`. Filter pencarian beralih ke drawer samping atau panel lipat horizontal.
- **Ponsel (< 768px)**: Grid 4 kolom dengan margin `16px` (1rem) dan gutter `16px`. Grid kartu barang ditata menjadi 1 kolom vertikal agar foto dan detail lokasi terbaca optimal.
- **Spasi Internal**: Ruang bernapas antar-komponen memanfaatkan skala `space-sm` (8px) untuk grup elemen terkait, `space-md` (16px) untuk padding standar kartu dan formulir, serta `space-xl` (32px) untuk pemisah antar-seksi.

## Elevation & Depth

Kedalaman visual menggunakan kombinasi garis batas tipis yang tegas (*crisp border*) dengan bayangan lingkungan (*ambient soft shadows*). Pendekatan ini menjaga antarmuka tetap bersih tanpa kesan kotor atau berlebihan:

- **Tingkat 0 (Permukaan Kanvas)**: Warna datar `#F3F4F6` tanpa bayangan.
- **Tingkat 1 (Kartu & Panel Standar)**: Latar `#FFFFFF`, border halus `1px solid #E5E7EB`, dan bayangan `0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px 0 rgba(0, 0, 0, 0.04)`.
- **Tingkat 2 (Hover Kartu, Filter Popover, Dropdown)**: `0 4px 6px -1px rgba(30, 58, 138, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)`. Tinta bayangan diberi rona navy halus untuk menyatu dengan warna primer.
- **Tingkat 3 (Modal Klaim & Drawer Verifikasi)**: `0 20px 25px -5px rgba(17, 24, 39, 0.12), 0 10px 10px -5px rgba(17, 24, 39, 0.04)`. Latar belakang redup (*scrim*) menggunakan `#0F172A` dengan transparansi 50%.

## Shapes

Sistem menggunakan radius konsisten **8px (`0.5rem`)** pada seluruh elemen interaktif utama:

- **Kontainer & Kartu**: Memakai `roundedness: 2` (8px) untuk memberikan siluet modern tanpa terlihat kekanak-kanakan.
- **Tombol & Bidang Input**: Memakai 8px untuk keseragaman bidang ketuk.
- **Badge Status & Tag**: Memakai `rounded-full` (9999px) khusus untuk pil status agar kontras bentuknya dapat langsung membedakan teks informasi statis dengan penanda status dinamis.
- **Pratinjau Foto Bukti**: Sudut foto terpotong 8px mengikuti wadah pembungkusnya.

## Components

Semua teks salinan antarmuka menggunakan Bahasa Indonesia formal dan lugas.

### Tombol (Buttons)
- **Tombol Utama (CTA Primer)**: Latar belakang oranye `#F97316`, teks putih tebal, radius 8px, padding vertikal 10px, padding horizontal 18px. Hover: `#EA580C`. Digunakan untuk aksi "Laporkan Barang", "Ajukan Klaim", dan "Kirim Laporan".
- **Tombol Sekunder**: Latar belakang putih dengan border `1.5px solid #1E3A8A`, teks `#1E3A8A`. Hover: latar `#EFF6FF`. Digunakan untuk aksi "Lihat Detail", "Batal", atau "Unduh Bukti".
- **Tombol Teks / Ghost**: Tanpa border, warna `#1E3A8A` atau `#6B7280`. Digunakan untuk paginasi dan navigasi ringan.

### Lencana Status (Status Badges)
Badge selalu memadukan ikon semantik dan label teks dengan latar belakang bersaturasi lembut:
- **Hilang**: Latar `#FEE2E2`, border `#FECACA`, teks `#DC2626`, ikon `AlertCircle`. Teks: "Hilang".
- **Ditemukan**: Latar `#DCFCE7`, border `#BBF7D0`, teks `#16A34A`, ikon `CheckCircle2`. Teks: "Ditemukan".
- **Dalam Proses / Diklaim**: Latar `#FEF9C3`, border `#FEF08A`, teks `#A16207`, ikon `Clock`. Teks: "Menunggu Verifikasi" atau "Sedang Diklaim".
- **Selesai / Kedaluwarsa**: Latar `#F3F4F6`, border `#E5E7EB`, teks `#6B7280`, ikon `Archive`. Teks: "Selesai" atau "Ditutup".

### Kartu Barang (Item Cards)
- Struktur vertikal: Foto rasio 16:9 di bagian atas dengan badge status mengambang di sudut kiri atas.
- Badan kartu: Judul nama barang (misal: "KTM Telkom University"), tanggal dan waktu penemuan, lokasi spesifik (misal: "Gedung Tokong Nanas Lt. 3"), dan tombol aksi di bagian bawah.
- Border `1px solid #E5E7EB`, radius 8px, transisi halus pada hover (`translateY(-2px)` disertai penguatan bayangan).

### Bidang Formulir (Input Fields)
- Latar `#FFFFFF`, tinggi 42px, radius 8px, border `1px solid #D1D5DB`.
- Status fokus: Ring luar 2px dengan warna `#1E3A8A` dan border aktif `#1E3A8A`.
- Label field diletakkan di atas input dengan bobot semi-bold (`label-lg`), teks `#374151`.
- Pesan kesalahan (error): Teks merah `#DC2626` ukuran 12px di bawah input dengan border input `#DC2626`.

### Filter & Kategori (Chips)
- Pil seleksi untuk lokasi gedung (misal: "Gedung Cacuk", "Gedung Damar", "Open Library") dan jenis barang ("Elektronik", "Identitas/KTM", "Kunci", "Aksesoris").
- Status default: Latar `#FFFFFF`, garis `#D1D5DB`, teks `#4B5563`.
- Status terpilih: Latar `#1E3A8A`, garis `#1E3A8A`, teks `#FFFFFF`.