import React, { useState } from 'react';
import { ReportItem } from '../types';

interface DetailScreenProps {
  item: ReportItem;
  onBack: () => void;
  onOpenClaim: () => void;
  onOpenShare: () => void;
  onOpenPoster: () => void;
  onOpenDirections: (item: ReportItem) => void;
  onShowToast: (msg: string) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  item,
  onBack,
  onOpenClaim,
  onOpenShare,
  onOpenPoster,
  onOpenDirections,
  onShowToast,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const images = item.images && item.images.length > 0 ? item.images : [item.primaryImage];
  const totalSlides = images.length;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const copyShareLink = () => {
    const dummyUrl = `https://findit.telkomuniversity.ac.id/r/${item.id.toLowerCase()}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(dummyUrl).then(() => {
        onShowToast('Tautan laporan berhasil disalin ke papan klip!');
      });
    } else {
      onShowToast('Tautan laporan siap dibagikan!');
    }
  };

  const handleHelpdesk = () => {
    onShowToast('Menghubungkan ke Posko Layanan & Satpam Telkom University (WhatsApp)...');
  };

  const isFound = item.type === 'ditemukan';

  return (
    <div className="flex flex-col w-full pb-28 bg-[#F9F9FF]">
      {/* Photo Carousel Area */}
      <div className="relative w-full px-4 pt-2">
        <div className="relative w-full overflow-hidden rounded-2xl bg-slate-100 shadow-sm aspect-[4/3]">
          {/* Carousel image */}
          <img
            src={images[activeSlide]}
            alt={`${item.title} foto ${activeSlide + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Counter Badge */}
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[14px]">photo_camera</span>
            <span>
              {activeSlide + 1} / {totalSlides}
            </span>
          </div>

          {/* Prev/Next arrows if multiple photos */}
          {totalSlides > 1 && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Foto Sebelumnya"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur text-slate-800 flex items-center justify-center shadow-sm hover:bg-white active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Foto Berikutnya"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur text-slate-800 flex items-center justify-center shadow-sm hover:bg-white active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </>
          )}

          {/* Pagination dots */}
          {totalSlides > 1 && (
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/40 backdrop-blur-sm">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === activeSlide ? 'w-4 bg-white' : 'w-2 bg-white/60'
                  }`}
                  aria-label={`Lihat slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Badges Row */}
      <div className="px-4 pt-3 flex flex-wrap items-center gap-2">
        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-2xs ${
            isFound ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[15px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isFound ? 'check_circle' : 'error'}
          </span>
          <span>{isFound ? 'Ditemukan' : 'Hilang'}</span>
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E7EEFE] text-[#00236F] text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
          <span>Laporan Aktif</span>
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono ml-auto">
          <span className="material-symbols-outlined text-[13px]">tag</span>
          <span>#{item.id}</span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="px-4 pt-2 pb-1">
        <div className="flex items-center gap-1 text-[#1E3A8A] mb-1">
          <span
            className="material-symbols-outlined text-[16px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span className="text-xs font-bold tracking-wide">
            Terverifikasi oleh Sistem Kampus
          </span>
        </div>
        <h2 className="text-xl font-bold text-[#00236F] leading-snug">
          {item.title}
        </h2>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Quick Share Strip */}
      <div className="px-4 py-2">
        <div className="bg-[#F0F3FF] border border-blue-100 rounded-xl p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#DCE1FF] flex items-center justify-center text-[#00236F]">
              <span className="material-symbols-outlined text-[16px]">share</span>
            </div>
            <span className="text-xs font-bold text-slate-800">
              Bantu Pemilik Menemukan:
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={copyShareLink}
              className="px-2.5 py-1 rounded-lg bg-white text-[#00236F] hover:bg-slate-50 shadow-2xs text-xs font-bold flex items-center gap-1 border border-slate-200/80 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[14px]">link</span>
              <span>Salin Tautan</span>
            </button>
            <button
              type="button"
              onClick={onOpenPoster}
              className="px-2.5 py-1 rounded-lg bg-[#00236F] text-white hover:bg-[#1E3A8A] shadow-2xs text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
              <span>Poster &amp; QR</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rincian Penemuan */}
      <div className="px-4 pt-2 flex flex-col gap-2.5">
        <h3 className="text-base font-bold text-slate-900">Rincian Penemuan</h3>

        {/* Kategori */}
        <div className="bg-white rounded-xl p-3.5 shadow-2xs border border-slate-200/70 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E7EEFE] flex items-center justify-center text-[#00236F] shrink-0">
            <span className="material-symbols-outlined text-[20px]">category</span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              Kategori Barang
            </span>
            <span className="block text-sm text-slate-900 font-bold truncate mt-0.5">
              {item.categoryLabel}
            </span>
          </div>
        </div>

        {/* Gedung Kampus */}
        <div className="bg-white rounded-xl p-3.5 shadow-2xs border border-slate-200/70 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E7EEFE] flex items-center justify-center text-[#00236F] shrink-0">
            <span className="material-symbols-outlined text-[20px]">apartment</span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              Gedung Kampus
            </span>
            <span className="block text-sm text-slate-900 font-bold mt-0.5">
              {item.locationBuildingLabel}
            </span>
          </div>
        </div>

        {/* Detail Posisi */}
        <div className="bg-white rounded-xl p-3.5 shadow-2xs border border-slate-200/70 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center text-[#9D4300] shrink-0">
            <span className="material-symbols-outlined text-[20px]">pin_drop</span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              Detail Posisi Meja / Ruangan
            </span>
            <span className="block text-sm text-slate-900 font-medium mt-0.5">
              {item.locationDetail}
            </span>
          </div>
        </div>

        {/* Waktu Kejadian */}
        <div className="bg-white rounded-xl p-3.5 shadow-2xs border border-slate-200/70 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E7EEFE] flex items-center justify-center text-[#00236F] shrink-0">
            <span className="material-symbols-outlined text-[20px]">event_available</span>
          </div>
          <div className="min-w-0 flex-1">
            <span className="block text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
              Waktu Ditemukan
            </span>
            <span className="block text-sm text-slate-900 font-bold mt-0.5">
              {item.reportedAtDisplay}
            </span>
            <span className="block text-xs text-slate-400 mt-0.5">
              Dilaporkan 35 menit setelah diamankan
            </span>
          </div>
        </div>
      </div>

      {/* Mini Map Penemuan */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-3.5 shadow-2xs border border-slate-200/70 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#FD761A] text-[20px]">
                location_on
              </span>
              <h4 className="text-sm font-bold text-slate-900">Peta Lokasi Temuan</h4>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Lat {item.coordinates.lat}, Lng {item.coordinates.lng}
            </span>
          </div>

          {/* Static Map Image */}
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNiYpApEPwDuS2EOPVeTzWqFR_0MFCm4Byqb3Muq0PwKvBrDOPmsT9Yd-NXphQRw74zIYa7ndP01caruJREja1b1BZytsJ_KuhtdqTRAJpm2PFyRT8kr2pZ7GHLqjnye1dkMxNVe-ivN0u1oKe19kjdhs43r6eBB42RlbTmfqTq8tfIKfXx3qduBEFr_1U9zTbV3Rgs_HSNH18rKqGlqG1QQjxySDmsIw4TrXCYw8"
              alt="Peta Lokasi Kampus"
              className="w-full h-full object-cover"
            />
            {/* Center Tag Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
              <div className="px-2.5 py-1 rounded-lg bg-[#00236F] text-white text-[11px] font-bold flex items-center gap-1 shadow-md whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
                <span>Titik Temuan: Open Lib Lt. 2</span>
              </div>
              <span
                className="material-symbols-outlined text-[#FD761A] text-[28px] -mt-1 drop-shadow"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                location_on
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-slate-600 text-xs">
              <span className="material-symbols-outlined text-[16px]">navigation</span>
              <span>Area Perpustakaan Pusat Tel-U</span>
            </div>
            <button
              type="button"
              onClick={() => onOpenDirections(item)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#DCE1FF] text-[#00236F] font-bold text-xs hover:bg-[#B6C4FF] transition-colors"
            >
              <span>Petunjuk Arah</span>
              <span className="material-symbols-outlined text-[16px]">near_me</span>
            </button>
          </div>
        </div>
      </div>

      {/* Identitas Pelapor & Verifikasi */}
      <div className="px-4 pt-4">
        <div className="bg-white rounded-xl p-4 shadow-2xs border border-slate-200/70 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Identitas Pelapor Temuan
            </span>
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span>Skor Reputasi {item.reporter.reputationScore}%</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-[#00236F] text-white flex items-center justify-center shrink-0 ring-2 ring-blue-100">
              <img
                src={item.reporter.avatar}
                alt={item.reporter.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {item.reporter.name}
              </h4>
              <p className="text-xs text-slate-500 truncate mt-0.5">
                {item.reporter.major}
              </p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded bg-blue-50 text-[#00236F] text-[10px] font-bold border border-blue-200">
                Penemu Terverifikasi SSO
              </span>
            </div>
          </div>

          {/* Privacy Notice B9 */}
          <div className="bg-[#F0F3FF] border border-blue-100 rounded-xl p-3 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#1E3A8A] text-[18px] shrink-0 mt-0.5">
              verified_user
            </span>
            <div className="min-w-0 text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900 font-bold block mb-0.5">
                Privasi Terlindungi:
              </strong>
              Nomor kontak pelapor dilindungi sesuai protokol FindIt. Koordinasi fisik dilakukan via pos satpam atau verifikasi klaim resmi.
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] border-t border-slate-200 flex flex-col gap-2 max-w-[430px] mx-auto">
        {/* Primary CTA */}
        <button
          type="button"
          onClick={onOpenClaim}
          className="w-full h-12 rounded-xl bg-[#FD761A] hover:bg-[#EA580C] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            front_hand
          </span>
          <span>Ajukan Klaim Kepemilikan</span>
        </button>

        {/* Second Row Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleHelpdesk}
            className="h-10 rounded-xl bg-white border border-slate-200 text-[#1E3A8A] hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
          >
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">chat</span>
            <span>Tanya Helpdesk</span>
          </button>
          <button
            type="button"
            onClick={onOpenPoster}
            className="h-10 rounded-xl bg-white border border-slate-200 text-[#00236F] hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
            <span>Unduh Poster</span>
          </button>
        </div>
      </div>
    </div>
  );
};
