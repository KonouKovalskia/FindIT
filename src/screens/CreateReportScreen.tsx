import React, { useState } from 'react';
import { ReportItem } from '../types';

interface CreateReportScreenProps {
  onBack: () => void;
  onSubmitReport: (newReport: ReportItem) => void;
  onShowToast: (msg: string) => void;
}

export const CreateReportScreen: React.FC<CreateReportScreenProps> = ({
  onBack,
  onSubmitReport,
  onShowToast,
}) => {
  const [reportType, setReportType] = useState<'hilang' | 'ditemukan'>('ditemukan');
  const [title, setTitle] = useState('Tumbler Corkcicle Canteen Sage Green 16oz');
  const [category, setCategory] = useState('barang_pribadi');
  const [description, setDescription] = useState(
    'Warna hijau sage doff, terdapat stiker siluet gunung kecil di bagian bawah, tutup warna perak masih sangat mulus tanpa lecet.'
  );
  const [dateTime, setDateTime] = useState('2025-10-25T14:30');
  const [building, setBuilding] = useState('open_library');
  const [locationDetail, setLocationDetail] = useState(
    'Lantai 2, Meja Diskusi area tenang dekat jendela barat'
  );
  const [coordinates, setCoordinates] = useState({ lat: -6.9748, lng: 107.6302 });
  const [isAiDetecting, setIsAiDetecting] = useState(false);
  const [aiFilled, setAiFilled] = useState(true);

  // Photos state (initial 2 mock photos matching screenshot)
  const [photos, setPhotos] = useState<Array<{ url: string; size: string; isPrimary: boolean }>>([
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEYlPIoms-zO9wQRR1eSG5EX4aeWFrjpjSaUt5UBdlYtjPiWbos69Nhb8IZ7chWAnOm4WwcFJrRPpbpffgOysqUaPhBYU1xF0E3TErH9dUXHbi3yl0ddMpKyfWjZcB3ft8qEsGrOy19Ibf84KXK5--5bA6YfTaVJEU_dUJc-t4wozhoRknVnlWlLAVIykYLNkAqgewLQptbtmzhRAUF3mMU7ILZSLwHjzb-2Ozr6s',
      size: '1.2 MB',
      isPrimary: true,
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2MrxklblX97lU9f3pUdjroluPMBNuvxkBl6aZFRzRnm9UEhI3xr80xJ2C_OY3qkix27OeIRH3Bw283REQ6UXNrDPbkwuBYejy7MWdkGc67sGEJr3bQVmQ73ybvyTBT1xOTLCmT-WcK__Cj_7cqvJ_Ci9xUEQc_38NsJitKdZKsSSGcQNakVGNnWSlb-gPTEZeQxuvOy5lohihtst2d8c8n-o_qjbpkfjsWf1mN8A',
      size: '840 KB',
      isPrimary: false,
    },
  ]);

  const handleRemovePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    if (updated.length > 0 && !updated.some((p) => p.isPrimary)) {
      updated[0].isPrimary = true;
    }
    setPhotos(updated);
    onShowToast('Foto berhasil dihapus.');
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (photos.length >= 3) {
      onShowToast('Maksimal 3 foto per laporan.');
      return;
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newUrl = URL.createObjectURL(file);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setPhotos([...photos, { url: newUrl, size: sizeMB, isPrimary: photos.length === 0 }]);
      onShowToast(`Foto "${file.name}" berhasil diunggah.`);
      triggerAiScan();
    }
  };

  const triggerAiScan = () => {
    setIsAiDetecting(true);
    setTimeout(() => {
      setIsAiDetecting(false);
      setAiFilled(true);
      onShowToast('AI Gemini mendeteksi objek: Corkcicle Sage Green Tumbler.');
    }, 1200);
  };

  const handleSetMyLocation = () => {
    setCoordinates({ lat: -6.9748, lng: 107.6302 });
    onShowToast('Koordinat GPS disesuaikan ke Open Library Telkom University.');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      onShowToast('Mohon masukkan nama barang.');
      return;
    }
    if (!description.trim()) {
      onShowToast('Mohon masukkan deskripsi barang.');
      return;
    }

    const buildingLabelMap: Record<string, string> = {
      open_library: 'Open Library Telkom University',
      gku: 'Gedung Kuliah Umum (GKU)',
      tult: 'Telkom University Landmark Tower (TULT)',
      tokong_nanas: 'Gedung Tokong Nanas (Gedung 10)',
      cacuk: 'Gedung Cacuk Sudarijanto (FTE)',
      masjid: "Masjid Syamsul 'Ulum",
      kantin: 'Kantin Terpadu & Student Center',
      asrama: 'Kawasan Asrama Kampus',
    };

    const categoryLabelMap: Record<string, string> = {
      barang_pribadi: 'Barang Pribadi (Botol Minum, Jaket, Payung)',
      elektronik: 'Elektronik (Laptop, HP, Charger, Kalkulator)',
      identitas: 'Kartu & Dompet (KTM, KTP, Dompet)',
      kunci: 'Kunci & Kendaraan (Kunci Motor, Lanyard)',
      buku: 'Buku & Alat Tulis',
      lainnya: 'Lain-lain',
    };

    const newReport: ReportItem = {
      id: `LAP-${Date.now().toString().slice(-8)}`,
      title,
      type: reportType,
      status: 'aktif',
      category,
      categoryLabel: categoryLabelMap[category] || 'Barang Pribadi',
      description,
      locationBuilding: building,
      locationBuildingLabel: buildingLabelMap[building] || 'Telkom University',
      locationDetail,
      coordinates,
      eventDate: dateTime,
      reportedAtDisplay: 'Baru saja',
      daysRemaining: 30,
      images: photos.map((p) => p.url),
      primaryImage:
        photos[0]?.url ||
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
    };

    onSubmitReport(newReport);
  };

  return (
    <div className="flex-1 px-4 py-4 space-y-5 bg-white pb-24">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Section: Foto Barang & Upload */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1">
                <span>Foto Barang</span>
                <span className="text-rose-500 font-bold">*</span>
              </label>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Unggah 1-3 foto (JPG/PNG, maks 2 MB)
              </p>
            </div>
            <span className="text-xs font-bold px-2 py-0.5 bg-blue-100 text-[#1E3A8A] rounded-md border border-blue-200">
              {photos.length} / 3 Foto
            </span>
          </div>

          {/* Thumbnail Gallery + Upload Slot */}
          <div className="grid grid-cols-3 gap-2.5">
            {photos.map((photo, idx) => (
              <div
                key={idx}
                className={`relative group aspect-square rounded-xl overflow-hidden border-2 bg-slate-100 shadow-xs ${
                  photo.isPrimary ? 'border-emerald-500' : 'border-slate-200'
                }`}
              >
                <img
                  src={photo.url}
                  alt={`Foto barang ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {photo.isPrimary && (
                  <div className="absolute top-1 left-1 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                    Foto Utama
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/60 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] transition shadow-xs"
                  title="Hapus foto"
                >
                  <span className="material-symbols-outlined text-[12px]">close</span>
                </button>
                <div className="absolute bottom-0 inset-x-0 bg-black/50 backdrop-blur-[2px] text-[9px] text-white py-0.5 text-center font-medium">
                  {photo.size}
                </div>
              </div>
            ))}

            {photos.length < 3 && (
              <label className="aspect-square border-2 border-dashed border-slate-300 hover:border-[#1E3A8A] hover:bg-blue-50/50 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:text-[#1E3A8A] transition cursor-pointer bg-white group">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleAddPhoto}
                  className="hidden"
                />
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center mb-1 text-slate-500 group-hover:text-[#1E3A8A] transition">
                  <span className="material-symbols-outlined text-[18px]">add</span>
                </div>
                <span className="text-[11px] font-semibold">+ Tambah</span>
                <span className="text-[9px] text-slate-400">
                  {3 - photos.length} slot tersisa
                </span>
              </label>
            )}
          </div>

          {/* Status Deteksi AI Row */}
          <div className="bg-blue-50/80 border border-blue-200 rounded-xl px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`material-symbols-outlined text-[16px] text-[#1E3A8A] ${
                  isAiDetecting ? 'animate-spin' : ''
                }`}
              >
                {isAiDetecting ? 'progress_activity' : 'auto_awesome'}
              </span>
              <span className="text-xs font-bold text-[#1E3A8A] tracking-tight">
                {isAiDetecting ? 'Menganalisis foto dengan AI...' : 'Mendeteksi barang dengan AI...'}
              </span>
            </div>

            <button
              type="button"
              onClick={triggerAiScan}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[12px]">check</span>
              <span>{aiFilled ? '3 Kolom Terisi' : 'Deteksi AI'}</span>
            </button>
          </div>

          {/* Banner Info Privasi B9 */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-2.5 rounded-r-xl flex items-start gap-2 text-amber-800 text-xs">
            <span className="material-symbols-outlined text-amber-500 text-[18px] shrink-0">
              warning
            </span>
            <p className="leading-relaxed text-[11px]">
              <strong className="font-bold">Perlindungan Data (B9):</strong> Pastikan foto tidak menampilkan data sensitif (NIK/KTM/Nomor Kartu Bank) secara terbuka sebelum dikirim.
            </p>
          </div>
        </section>

        {/* Section: Jenis Laporan */}
        <section className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Jenis Laporan <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setReportType('hilang')}
              className={`py-2 px-3 rounded-lg text-center font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                reportType === 'hilang'
                  ? 'bg-white text-[#DC2626] shadow-sm border border-red-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                error
              </span>
              <span>Hilang</span>
            </button>

            <button
              type="button"
              onClick={() => setReportType('ditemukan')}
              className={`py-2 px-3 rounded-lg text-center font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                reportType === 'ditemukan'
                  ? 'bg-white text-[#16A34A] shadow-sm border border-emerald-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span>Ditemukan</span>
            </button>
          </div>
        </section>

        {/* Section: Informasi Barang */}
        <section className="space-y-3.5">
          {/* Nama Barang */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800" htmlFor="nama_barang">
                Nama Barang <span className="text-rose-500">*</span>
              </label>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-amber-500 text-[11px]">auto_awesome</span>
                <span>Terisi otomatis oleh AI</span>
              </span>
            </div>
            <div className="relative">
              <input
                id="nama_barang"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-blue-50/20 border border-blue-300 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-xl text-xs font-semibold text-slate-900 transition outline-none"
              />
              <span className="absolute right-3 top-3 text-slate-400">
                <span className="material-symbols-outlined text-[16px]">edit</span>
              </span>
            </div>
          </div>

          {/* Dropdown Kategori */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800" htmlFor="kategori">
                Kategori Barang <span className="text-rose-500">*</span>
              </label>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-amber-500 text-[11px]">auto_awesome</span>
                <span>Terisi otomatis oleh AI</span>
              </span>
            </div>
            <div className="relative">
              <select
                id="kategori"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-blue-50/20 border border-blue-300 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-xl text-xs font-semibold text-slate-900 appearance-none transition outline-none"
              >
                <option value="barang_pribadi">Barang Pribadi (Botol Minum, Jaket, Payung)</option>
                <option value="elektronik">Elektronik (Laptop, HP, Charger, Kalkulator)</option>
                <option value="identitas">Kartu & Dompet (KTM, KTP, Dompet)</option>
                <option value="kunci">Kunci & Kendaraan (Kunci Motor, Lanyard)</option>
                <option value="buku">Buku & Alat Tulis</option>
                <option value="lainnya">Lain-lain</option>
              </select>
              <div className="pointer-events-none absolute right-3.5 top-3 text-slate-500 text-xs">
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800" htmlFor="deskripsi">
                Deskripsi Barang <span className="text-rose-500">*</span>
              </label>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-amber-500 text-[11px]">auto_awesome</span>
                <span>Terisi otomatis oleh AI</span>
              </span>
            </div>
            <textarea
              id="deskripsi"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-blue-50/20 border border-blue-300 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-xl text-xs text-slate-900 leading-relaxed transition outline-none resize-none"
            />
            <p className="text-[10px] text-slate-400 text-right">Dapat disesuaikan secara manual</p>
          </div>
        </section>

        {/* Section: Waktu & Lokasi Kejadian */}
        <section className="space-y-3.5 pt-3 border-t border-slate-200">
          {/* Waktu Kejadian */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800 flex items-center justify-between" htmlFor="waktu_kejadian">
              <span>
                Waktu Kejadian <span className="text-rose-500">*</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                Maks. 30 hari ke belakang (B3)
              </span>
            </label>
            <div className="relative">
              <input
                id="waktu_kejadian"
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-xl text-xs text-slate-800 font-medium outline-none"
              />
            </div>
          </div>

          {/* Gedung Kampus */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800" htmlFor="gedung">
              Gedung / Kawasan Kampus <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                id="gedung"
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-300 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-xl text-xs font-semibold text-slate-800 appearance-none outline-none"
              >
                <option value="open_library">Open Library Telkom University</option>
                <option value="gku">Gedung Kuliah Umum (GKU)</option>
                <option value="tult">Telkom University Landmark Tower (TULT)</option>
                <option value="tokong_nanas">Gedung Tokong Nanas (Gedung 10)</option>
                <option value="cacuk">Gedung Cacuk Sudarijanto (FTE)</option>
                <option value="masjid">Masjid Syamsul 'Ulum</option>
                <option value="kantin">Kantin Terpadu & Student Center</option>
                <option value="asrama">Kawasan Asrama Kampus</option>
              </select>
              <div className="pointer-events-none absolute right-3.5 top-3 text-slate-500 text-xs">
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </div>
            </div>
          </div>

          {/* Detail Lokasi */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-800" htmlFor="detail_lokasi">
              Detail Lokasi Spesifik <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                id="detail_lokasi"
                type="text"
                value={locationDetail}
                onChange={(e) => setLocationDetail(e.target.value)}
                placeholder="cth. Meja Diskusi 04 Lantai 2, dekat rak buku sains"
                className="w-full px-3.5 py-2.5 border border-slate-300 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] rounded-xl text-xs text-slate-900 font-medium outline-none"
              />
              <span className="absolute right-3.5 top-3 text-[#1E3A8A]">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
              </span>
            </div>
          </div>

          {/* Peta Kecil dengan Penanda Draggable */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">Titik Koordinat pada Peta</label>
              <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>Lat: {coordinates.lat}, Lng: {coordinates.lng}</span>
              </span>
            </div>

            {/* Simulated Leaflet Map Canvas */}
            <div className="relative h-44 rounded-xl overflow-hidden border border-slate-300 shadow-inner group">
              <div className="absolute inset-0 bg-[#E5ECE9]">
                {/* SVG Schematic Roads & Buildings */}
                <svg className="w-full h-full object-cover opacity-85" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <rect width="400" height="200" fill="#f1f5f9" />
                  <path d="M-10,40 Q150,60 410,20" fill="none" stroke="#cbd5e1" strokeWidth="18" />
                  <path d="M120,-10 L160,210" fill="none" stroke="#cbd5e1" strokeWidth="22" />
                  <path d="M-20,150 L420,130" fill="none" stroke="#e2e8f8" strokeWidth="12" />
                  <path d="M260,-20 L240,220" fill="none" stroke="#cbd5e1" strokeWidth="16" />

                  {/* Campus Buildings */}
                  <rect x="30" y="70" width="70" height="50" rx="6" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="2" />
                  <text x="65" y="98" fill="#1e3a8a" fontSize="8" fontWeight="bold" textAnchor="middle">Gedung GKU</text>

                  <rect x="180" y="60" width="90" height="60" rx="6" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="2" />
                  <text x="225" y="95" fill="#166534" fontSize="8" fontWeight="bold" textAnchor="middle">Open Library Tel-U</text>

                  <rect x="290" y="80" width="60" height="50" rx="6" fill="#fee2e2" stroke="#fecaca" strokeWidth="2" />
                  <text x="320" y="108" fill="#991b1b" fontSize="8" fontWeight="bold" textAnchor="middle">TULT</text>

                  <path d="M30,140 Q70,130 90,160 Q80,190 40,185 Z" fill="#bae6fd" opacity="0.7" />
                </svg>
              </div>

              {/* Center Draggable Marker Pin */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex flex-col items-center -translate-y-4">
                  <div className="bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-md mb-1 flex items-center gap-1.5 whitespace-nowrap animate-bounce">
                    <span className="material-symbols-outlined text-[12px] text-amber-300">open_with</span>
                    <span>Titik Penemuan</span>
                  </div>
                  <div className="relative w-8 h-8 flex items-center justify-center drop-shadow-md">
                    <span
                      className="material-symbols-outlined text-3xl text-[#16A34A]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      location_on
                    </span>
                  </div>
                  <div className="w-3 h-1 bg-black/30 rounded-full blur-[1px] -mt-1"></div>
                </div>
              </div>

              {/* Bottom Map Hint Bar */}
              <div className="absolute bottom-2 inset-x-2 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-slate-200 flex items-center justify-between text-xs text-slate-700 shadow-xs">
                <span className="flex items-center gap-1 font-semibold text-[11px] text-slate-800">
                  <span className="material-symbols-outlined text-[#1E3A8A] text-[14px]">touch_app</span>
                  <span>Geser penanda ke titik yang tepat</span>
                </span>
                <button
                  type="button"
                  onClick={handleSetMyLocation}
                  className="text-[11px] font-bold text-[#1E3A8A] hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[12px]">my_location</span>
                  <span>Lokasi Saya</span>
                </button>
              </div>

              {/* Zoom Buttons */}
              <div className="absolute top-2 right-2 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => onShowToast('Perbesar tampilan peta')}
                  className="w-7 h-7 bg-white rounded-lg shadow-xs text-slate-700 flex items-center justify-center text-xs font-bold hover:bg-slate-50 border border-slate-200"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Perkecil tampilan peta')}
                  className="w-7 h-7 bg-white rounded-lg shadow-xs text-slate-700 flex items-center justify-center text-xs font-bold hover:bg-slate-50 border border-slate-200"
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="pt-2 space-y-2.5">
          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-[#F97316] hover:bg-[#EA580C] active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Kirim Laporan</span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full py-3 px-4 bg-transparent hover:bg-blue-50/50 active:scale-[0.99] text-[#1E3A8A] border-2 border-[#1E3A8A] font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
            <span>Batal</span>
          </button>

          <p className="text-center text-[11px] text-slate-500 pt-1 leading-snug">
            Laporan akan langsung berstatus <strong className="text-emerald-700 font-bold">Aktif</strong> dan muncul pada Peta &amp; Beranda kampus.
          </p>
        </section>
      </form>
    </div>
  );
};
