import { CampusBuilding, ClaimItem, ReportItem } from './types';

export const INITIAL_BUILDINGS: CampusBuilding[] = [
  {
    id: 'open_library',
    name: 'Open Library Telkom University',
    code: 'LIB',
    coordinates: { lat: -6.9748, lng: 107.6302 },
    description: 'Gedung Cacuk Sudarijanto Lantai 2 & 3',
  },
  {
    id: 'gku',
    name: 'Gedung Kuliah Umum (GKU)',
    code: 'GKU',
    coordinates: { lat: -6.9732, lng: 107.6288 },
    description: 'Area perkuliahan terpadu dan lab komputasi dasar',
  },
  {
    id: 'tult',
    name: 'Telkom University Landmark Tower (TULT)',
    code: 'TULT',
    coordinates: { lat: -6.9764, lng: 107.6315 },
    description: 'Menara perkuliahan 19 lantai',
  },
  {
    id: 'tokong_nanas',
    name: 'Gedung Tokong Nanas (Gedung 10)',
    code: 'G10',
    coordinates: { lat: -6.9752, lng: 107.6294 },
    description: 'Gedung perkuliahan Fakultas Rekayasa Industri',
  },
  {
    id: 'cacuk',
    name: 'Gedung Cacuk Sudarijanto (FTE)',
    code: 'FTE',
    coordinates: { lat: -6.9745, lng: 107.6299 },
    description: 'Fakultas Teknik Elektro dan Lab Riset',
  },
  {
    id: 'masjid',
    name: "Masjid Syamsul 'Ulum",
    code: 'MSU',
    coordinates: { lat: -6.9725, lng: 107.631 },
    description: 'Masjid Pusat Kampus Tel-U',
  },
  {
    id: 'kantin',
    name: 'Kantin Terpadu & Student Center',
    code: 'SC',
    coordinates: { lat: -6.974, lng: 107.6308 },
    description: 'Pusat kuliner mahasiswa dan kegiatan ormawa',
  },
  {
    id: 'asrama',
    name: 'Kawasan Asrama Kampus',
    code: 'DORM',
    coordinates: { lat: -6.977, lng: 107.628 },
    description: 'Asrama Putra & Putri Tel-U',
  },
];

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'LAP-20251025-042',
    title: 'Tumbler Corkcicle Sage Green 16oz',
    type: 'ditemukan',
    status: 'aktif',
    category: 'barang_pribadi',
    categoryLabel: 'Barang Pribadi (Botol Minum, Jaket, Payung)',
    description:
      'Warna hijau sage doff, terdapat stiker siluet gunung kecil di bagian bawah, tutup warna perak masih sangat mulus tanpa lecet. Ditemukan tertinggal di atas meja baca lantai 2 dekat jendela barat.',
    locationBuilding: 'open_library',
    locationBuildingLabel: 'Open Library Telkom University',
    locationDetail: 'Lantai 2, Meja Diskusi area tenang dekat jendela barat',
    coordinates: { lat: -6.9748, lng: 107.6302 },
    eventDate: '2025-10-24T14:00',
    reportedAtDisplay: '24 Okt 2025, 14:00 WIB',
    daysRemaining: 12,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCEYlPIoms-zO9wQRR1eSG5EX4aeWFrjpjSaUt5UBdlYtjPiWbos69Nhb8IZ7chWAnOm4WwcFJrRPpbpffgOysqUaPhBYU1xF0E3TErH9dUXHbi3yl0ddMpKyfWjZcB3ft8qEsGrOy19Ibf84KXK5--5bA6YfTaVJEU_dUJc-t4wozhoRknVnlWlLAVIykYLNkAqgewLQptbtmzhRAUF3mMU7ILZSLwHjzb-2Ozr6s',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2MrxklblX97lU9f3pUdjroluPMBNuvxkBl6aZFRzRnm9UEhI3xr80xJ2C_OY3qkix27OeIRH3Bw283REQ6UXNrDPbkwuBYejy7MWdkGc67sGEJr3bQVmQ73ybvyTBT1xOTLCmT-WcK__Cj_7cqvJ_Ci9xUEQc_38NsJitKdZKsSSGcQNakVGNnWSlb-gPTEZeQxuvOy5lohihtst2d8c8n-o_qjbpkfjsWf1mN8A',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2CHdyctOy1rTnV87iit9XOZ8IBZlm7nQ0iDHb-mdmdeZ5LXC0S330F58Cay6QjkfIwBikrSCRgv-vBJ_OteBmbfNzVhLICVUddU3R6-AA0Rg5Bt8yFx2RvJ4eN66Rk2r2MZZ5mFR6HnXJSU9w2tKwsN23Rxg6xBza1aI5iE1KbyZrY5EQXdIgBk70jnpmUKXa2mhaaa0ooPkcEhjl6C54hvyFBGfn8t6vUa3eiC4',
    ],
    primaryImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCEYlPIoms-zO9wQRR1eSG5EX4aeWFrjpjSaUt5UBdlYtjPiWbos69Nhb8IZ7chWAnOm4WwcFJrRPpbpffgOysqUaPhBYU1xF0E3TErH9dUXHbi3yl0ddMpKyfWjZcB3ft8qEsGrOy19Ibf84KXK5--5bA6YfTaVJEU_dUJc-t4wozhoRknVnlWlLAVIykYLNkAqgewLQptbtmzhRAUF3mMU7ILZSLwHjzb-2Ozr6s',
    reporter: {
      name: 'Muhammad Faiz Ghiffari',
      nim: '103032400002',
      major: 'Mahasiswa S1 Teknologi Informasi Tel-U',
      reputationScore: 98,
      isVerifiedSSO: true,
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBE6iEUYzoeJtccMTA5M4CdmOkxAFtoXPMN2CSI7gfp9Yrma3qF-Jr6IdIfpbtVt6WKog42FtvscOFCQa9z6BPf07KTqhdmJmqV6dswXFTKeif-tQ4oTcplsBwwRBCIQmu6E6SS9DTRfH67MHN6saSVLKIevN-cAy9iF96fTtb_4T3NmInnBirsplHTwl4GgvsT5u9CyAg_NI1xEH8ISlg80Dd5v1hI3Ddh9lTRUP0',
      phone: '081234567890',
    },
    pendingClaimsCount: 1,
    timeline: [
      {
        title: 'Laporan Dibuat (oleh Anda)',
        time: '24 Okt 2025 • 14:35 WIB',
        statusType: 'default',
      },
      {
        title: 'Terverifikasi Sistem Kampus (Status Aktif)',
        time: '24 Okt 2025 • 14:36 WIB',
        statusType: 'active',
      },
      {
        title: 'Klaim Diajukan oleh Raka',
        time: '25 Okt 2025 • 09:12 WIB • Menunggu admin',
        statusType: 'claim',
      },
    ],
  },
  {
    id: 'LAP-20251025-038',
    title: 'Dompet Kulit Eiger Hitam',
    type: 'ditemukan',
    status: 'aktif',
    category: 'identitas',
    categoryLabel: 'Dompet & Identitas',
    description:
      'Dompet kulit lipat hitam merk Eiger asli. Berisi identitas penting dan kartu bank. Ditemukan di dekat kursi ruang kelas 302.',
    locationBuilding: 'tokong_nanas',
    locationBuildingLabel: 'Gedung Tokong Nanas (Gedung 10) Lt. 3, R. 302',
    locationDetail: 'Ruang 302 baris tengah dekat podium dosen',
    coordinates: { lat: -6.9752, lng: 107.6294 },
    eventDate: '2025-10-25T10:15',
    reportedAtDisplay: 'Hari ini, 10:15 WIB',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAvSf8RmrIDKDU3RoUhQaHiz1PGmBEshgc50FTfoRvHTcRykWMWF9UZ-JLrkZVjMy-L2KejbWh8XY3GSk_jMb36X-LHUGwk8PCX11-z2Oqjhj8VvPHEdNxZDqzIh9qlZBqXXnkPaBIRJh99K7sW7OlWmGiWkeOmO27rendsO9mygEPXQl-OCq94FooZZ_Xoxh3tQOqIIfW3fQ_w-wb5bK6bgNnrkmwawbcdbGDUa50',
    ],
    primaryImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAvSf8RmrIDKDU3RoUhQaHiz1PGmBEshgc50FTfoRvHTcRykWMWF9UZ-JLrkZVjMy-L2KejbWh8XY3GSk_jMb36X-LHUGwk8PCX11-z2Oqjhj8VvPHEdNxZDqzIh9qlZBqXXnkPaBIRJh99K7sW7OlWmGiWkeOmO27rendsO9mygEPXQl-OCq94FooZZ_Xoxh3tQOqIIfW3fQ_w-wb5bK6bgNnrkmwawbcdbGDUa50',
    storageLocationNotice: 'Disimpan di Pos Satpam GKU',
    reporter: {
      name: 'Satpam GKU Tel-U',
      nim: 'STF-0912',
      major: 'Direktorat Logistik & Keamanan Lingkungan',
      reputationScore: 99,
      isVerifiedSSO: true,
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBE6iEUYzoeJtccMTA5M4CdmOkxAFtoXPMN2CSI7gfp9Yrma3qF-Jr6IdIfpbtVt6WKog42FtvscOFCQa9z6BPf07KTqhdmJmqV6dswXFTKeif-tQ4oTcplsBwwRBCIQmu6E6SS9DTRfH67MHN6saSVLKIevN-cAy9iF96fTtb_4T3NmInnBirsplHTwl4GgvsT5u9CyAg_NI1xEH8ISlg80Dd5v1hI3Ddh9lTRUP0',
    },
  },
  {
    id: 'LAP-20251024-019',
    title: 'Kunci Motor Honda Vario + Lanyard Tel-U',
    type: 'hilang',
    status: 'diklaim',
    isUrgent: true,
    category: 'kunci',
    categoryLabel: 'Kunci & Kendaraan',
    description:
      'Kunci smartkey Honda Vario hitam beserta gantungan dompet STNK merah bertuliskan Telkom University & gantungan robot mini.',
    locationBuilding: 'cacuk',
    locationBuildingLabel: 'Parkiran Gedung Kuliah Umum (GKU)',
    locationDetail: 'Tertinggal di dekat gerbang parkir barat dekat pos barcode keluar',
    coordinates: { lat: -6.9745, lng: 107.6299 },
    eventDate: '2025-10-23T16:30',
    reportedAtDisplay: 'Kemarin, 16:30 WIB',
    rewardNote: 'Imbalan Terima Kasih',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDN9y-G5AhZl3zNT2Nw_e0mfnLs69gklyD8IAs8yZs7fXUuHc-Le5Dx_ti9bq6zVLdZvJAcwiHrERkk70Ogzc7C-1tgooqZunR4aOt2uRMWelE9_U8zNGjcefOIWs0dwLIPKmjjqKmfhiV6p0WlkRXIDKY5THXhrn6XuEe0twIES_y4_2whJsG9kD9bSqdZ5aSiY1E_fUXK2tuHOhvFURqGP8v8C4VQOwRFyQwqtLw',
    ],
    primaryImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDN9y-G5AhZl3zNT2Nw_e0mfnLs69gklyD8IAs8yZs7fXUuHc-Le5Dx_ti9bq6zVLdZvJAcwiHrERkk70Ogzc7C-1tgooqZunR4aOt2uRMWelE9_U8zNGjcefOIWs0dwLIPKmjjqKmfhiV6p0WlkRXIDKY5THXhrn6XuEe0twIES_y4_2whJsG9kD9bSqdZ5aSiY1E_fUXK2tuHOhvFURqGP8v8C4VQOwRFyQwqtLw',
    approvedClaimUser: {
      name: 'Faiz Ghiffari',
      nim: '1301213042',
    },
    reporter: {
      name: 'Harsya Wardhana',
      nim: '1301213099',
      major: 'Mahasiswa S1 Teknik Informatika',
      reputationScore: 94,
      isVerifiedSSO: true,
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBE6iEUYzoeJtccMTA5M4CdmOkxAFtoXPMN2CSI7gfp9Yrma3qF-Jr6IdIfpbtVt6WKog42FtvscOFCQa9z6BPf07KTqhdmJmqV6dswXFTKeif-tQ4oTcplsBwwRBCIQmu6E6SS9DTRfH67MHN6saSVLKIevN-cAy9iF96fTtb_4T3NmInnBirsplHTwl4GgvsT5u9CyAg_NI1xEH8ISlg80Dd5v1hI3Ddh9lTRUP0',
      phone: '081298765432',
    },
  },
  {
    id: 'LAP-20251023-011',
    title: 'Kalkulator Casio Classwiz fx-991EX',
    type: 'hilang',
    status: 'aktif',
    category: 'elektronik',
    categoryLabel: 'Elektronik & Gadget',
    description:
      'Kalkulator saintifik Casio Classwiz fx-991EX warna hitam dengan penutup motif karbon putih. Terdapat stiker inisial "HS" di belakang.',
    locationBuilding: 'cacuk',
    locationBuildingLabel: 'Gedung Cacuk Sudarijanto (FTE) Lab 204',
    locationDetail: 'Laboratorium Telekomunikasi Dasar Meja 14',
    coordinates: { lat: -6.9745, lng: 107.6299 },
    eventDate: '2025-10-23T11:20',
    reportedAtDisplay: '23 Okt 2025, 11:20 WIB',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD359eqOCmMWPUnvdCEPQdlaCSJsWHriCXgdAG3mhpbfPDi-i3uSbkGW2fcyJwgq0AIY2hCMcvspcAp7NW2zurEISYa7ocXjzfkGMJ4kReZyqXrWHccxdvaD_L-bvc6uZg6v0aL0zvVEZdheSzNpOHTDznipez2SVyaC2RN_2rvPdMtZEs_wyFEUc5mHbtPx-QDlCWxV7Iqgg700ZhcgZcMadNeuFpASeM8-9moUI0',
    ],
    primaryImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD359eqOCmMWPUnvdCEPQdlaCSJsWHriCXgdAG3mhpbfPDi-i3uSbkGW2fcyJwgq0AIY2hCMcvspcAp7NW2zurEISYa7ocXjzfkGMJ4kReZyqXrWHccxdvaD_L-bvc6uZg6v0aL0zvVEZdheSzNpOHTDznipez2SVyaC2RN_2rvPdMtZEs_wyFEUc5mHbtPx-QDlCWxV7Iqgg700ZhcgZcMadNeuFpASeM8-9moUI0',
    reporter: {
      name: 'Hafizh Shidqi',
      nim: '1102220045',
      major: 'Mahasiswa S1 Teknik Telekomunikasi',
      reputationScore: 92,
      isVerifiedSSO: true,
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBE6iEUYzoeJtccMTA5M4CdmOkxAFtoXPMN2CSI7gfp9Yrma3qF-Jr6IdIfpbtVt6WKog42FtvscOFCQa9z6BPf07KTqhdmJmqV6dswXFTKeif-tQ4oTcplsBwwRBCIQmu6E6SS9DTRfH67MHN6saSVLKIevN-cAy9iF96fTtb_4T3NmInnBirsplHTwl4GgvsT5u9CyAg_NI1xEH8ISlg80Dd5v1hI3Ddh9lTRUP0',
    },
  },
  {
    id: 'LAP-20250928-005',
    title: 'Earphone TWS Anker Soundcore R50i Putih',
    type: 'hilang',
    status: 'aktif',
    category: 'elektronik',
    categoryLabel: 'Elektronik & Gadget',
    description:
      'Tertinggal di laci meja baris ketiga seusai kuliah Kalkulus Lanjut. Kotak pengisi daya warna putih dengan sedikit goresan halus di sisi samping.',
    locationBuilding: 'gku',
    locationBuildingLabel: 'Gedung Kuliah Bersama (GKB) R.304',
    locationDetail: 'Meja baris 3 laci tengah',
    coordinates: { lat: -6.9732, lng: 107.6288 },
    eventDate: '2025-09-28T15:00',
    reportedAtDisplay: '28 Sep 2025',
    daysRemaining: 3,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAaF2SdOLD1HGYbOb2KI_ndH57IRoMpUGd1_cg8TrY5IuIbjNFiRaya4OIkZwYiFlJLsVlBVz04SWhG7iI1k6heOIakCKstsirO6DgHd4xmiLxunta0nfWOiWZW7xcme6Q_m4xKh23jW2bnN3LSQFk6ywsn2N5_GXmeN1lCeTpmJSBPsIhP59xtswU4v-GAPei8pth9dd1T87i3sVHlx83aWCWHvnd7p38MgO4nq-8',
    ],
    primaryImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAaF2SdOLD1HGYbOb2KI_ndH57IRoMpUGd1_cg8TrY5IuIbjNFiRaya4OIkZwYiFlJLsVlBVz04SWhG7iI1k6heOIakCKstsirO6DgHd4xmiLxunta0nfWOiWZW7xcme6Q_m4xKh23jW2bnN3LSQFk6ywsn2N5_GXmeN1lCeTpmJSBPsIhP59xtswU4v-GAPei8pth9dd1T87i3sVHlx83aWCWHvnd7p38MgO4nq-8',
    reporter: {
      name: 'Faiz Ghiffari',
      nim: '103032400002',
      major: 'Mahasiswa S1 Teknologi Informasi Tel-U',
      reputationScore: 98,
      isVerifiedSSO: true,
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBE6iEUYzoeJtccMTA5M4CdmOkxAFtoXPMN2CSI7gfp9Yrma3qF-Jr6IdIfpbtVt6WKog42FtvscOFCQa9z6BPf07KTqhdmJmqV6dswXFTKeif-tQ4oTcplsBwwRBCIQmu6E6SS9DTRfH67MHN6saSVLKIevN-cAy9iF96fTtb_4T3NmInnBirsplHTwl4GgvsT5u9CyAg_NI1xEH8ISlg80Dd5v1hI3Ddh9lTRUP0',
    },
  },
];

export const INITIAL_CLAIMS: ClaimItem[] = [
  {
    id: 'KLM-9421',
    reportId: 'LAP-20251024-088',
    itemTitle: 'Jaket Hoodie Navy Telkom University',
    category: 'Fashion',
    location: 'Open Library • Ditemukan 24 Okt 2025',
    eventDate: '24 Okt 2025',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCbRRMDnNW1lg56SPs02B_wUR0DGoBXUNtBxZ3joOmPVTjkJjNwNozZqMlj7Rz7qN29a1Tk1IuyO97h_nbuXj5JAR96imaZ7cCMlrRnaolmKX1t_NgYB6mqDEVyeg6stVCVMXesSrK6JQlMLKO9n-psUPVzzdePLo0GmxrsWLOWonecyUUUHNihVwY0OtZFsxKRgcVjuoKpzUCqRGwQCTLTelwruOB5XNQOULzLsIU',
    status: 'waiting',
    submittedCharacteristics:
      'Terdapat pin enamel logo HMTI di saku kiri depan dan sobekan kecil di ujung tali hoodie.',
    submittedAt: '25 Okt, 09:15 WIB',
    reviewTimeEst: 'Est. < 24 jam',
  },
  {
    id: 'KLM-9304',
    reportId: 'LAP-20251023-019',
    itemTitle: 'Kunci Motor Honda Vario 125 Hitam',
    category: 'Kunci',
    location: 'Parkiran Gedung Cacuk FTE • 23 Okt',
    eventDate: '23 Okt 2025',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaDm9r1eSSKlDHZpyCCEHH_Sxmh3-Vjr3sOzXE_u70-9dyfw3F1Q8wSdDup4SWlTDmUtTWJhcNleoe3Fa249hiy5XLXx-fTodmiu6Hb5E2FXWIjBQNPpuAmUfs41dw4zWsGyEQMMWCfHIE1a2_J_k64fLF_bKndGxAVUkY8h36o4tX0JgDsJX0aSs22UzR9kEtwYPMFZxxkrUj-YZJJ9kKCVXR8TaZOH0R4fvAHT0',
    status: 'approved',
    submittedCharacteristics:
      'Gantungan tali merah Tel-U ada coretan spidol huruf F di baliknya dan anak kunci cadangan kecil tersembunyi.',
    submittedAt: '23 Okt, 18:00 WIB',
    reviewedAt: '24 Okt, 11:20 WIB',
    pickupLocation: 'Pos Keamanan Gedung Cacuk (FTE) Lt. 1',
    contactNumber: '6281234567890',
  },
  {
    id: 'KLM-9118',
    reportId: 'LAP-20251020-003',
    itemTitle: 'Dompet Kulit Cokelat Baellerry',
    category: 'Dompet',
    location: 'Kantin GKU • Ditemukan 20 Okt 2025',
    eventDate: '20 Okt 2025',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBufAI4FX5Pt12xUzxYObTSsLJTuug9Z9__9eCsBz03_wTVFmH59Cr9fD700uZEYGc5lt9fHvdEYIK1tHoEzCJCrHOIlUWBeqBMAa6OSS8L_cU96gF3pZdsLn6MiEsIcSF8PCsDAM0cGfx74DMSaD2YM81v4pp9wxYPQmhJVYowe94brHXu2GWWIrx5OqO2vY-JdZle8HJlI9r9fjxKkAzlLoNsUFrBxOK7fMnMkps',
    status: 'rejected',
    submittedCharacteristics:
      'Dompet cokelat ada uang 50 ribuan dan foto keluarga di selipan kartu.',
    submittedAt: '20 Okt, 19:30 WIB',
    reviewedAt: '21 Okt, 16:00 WIB',
    rejectionReason:
      'Ciri khusus yang diajukan tidak sesuai dengan nomor seri kartu mahasiswa dan isi identitas yang diamankan oleh Satpam GKU.',
  },
];
