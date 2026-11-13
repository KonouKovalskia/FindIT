import React, { useState } from 'react';
import { ReportItem } from '../types';

interface ShareModalProps {
  item: ReportItem;
  onClose: () => void;
  onOpenPoster: () => void;
  onShowToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  item,
  onClose,
  onOpenPoster,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'link' | 'qr' | 'poster'>('qr');

  const shareUrl = `https://findit.telkomuniversity.ac.id/r/${item.id.toLowerCase()}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        onShowToast('Tautan laporan berhasil disalin ke papan klip!');
      });
    } else {
      onShowToast('Tautan laporan siap dibagikan!');
    }
  };

  const handleDownloadQR = () => {
    onShowToast('Kode QR dan poster berhasil diunduh!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl shadow-2xl flex flex-col p-5 pb-safe animate-in slide-in-from-bottom duration-300 max-h-[92vh] overflow-y-auto">
        {/* Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-3 shrink-0"></div>

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Bagikan Laporan</h3>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Bantu sebarkan informasi agar barang cepat kembali ke pemiliknya.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* 3 Action Tabs */}
        <div className="grid grid-cols-3 gap-2.5 my-4">
          <button
            type="button"
            onClick={handleCopyLink}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center gap-1.5 shadow-xs ${
              activeTab === 'link'
                ? 'border-[#1E3A8A] bg-blue-50/60 text-[#1E3A8A]'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
              <span className="material-symbols-outlined text-[20px]">link</span>
            </div>
            <span className="text-[12px] font-semibold tracking-tight">Salin Tautan</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('qr')}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all text-center gap-1.5 shadow-sm relative ${
              activeTab === 'qr'
                ? 'border-[#1E3A8A] bg-blue-50/60 text-[#1E3A8A]'
                : 'border-slate-200 bg-white text-slate-700'
            }`}
          >
            <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full bg-[#1E3A8A] text-white text-[9px] font-bold uppercase tracking-wider">
              Aktif
            </span>
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1E3A8A] shadow-xs">
              <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
            </div>
            <span className="text-[12px] font-bold tracking-tight">Kode QR</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenPoster();
            }}
            className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 bg-white hover:bg-orange-50/40 text-slate-700 hover:text-[#F97316] text-center gap-1.5 shadow-xs transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
              <span className="material-symbols-outlined text-[20px]">campaign</span>
            </div>
            <span className="text-[12px] font-semibold tracking-tight">Poster Digital</span>
          </button>
        </div>

        {/* QR Display Card */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 flex flex-col items-center text-center shadow-xs">
          <div className="bg-white p-3 rounded-xl shadow-xs border border-slate-100 mb-3">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 100 100">
              {/* Clean vector QR code */}
              <rect x="5" y="5" width="28" height="28" rx="2" className="text-[#1E3A8A]" />
              <rect x="11" y="11" width="16" height="16" fill="white" />
              <rect x="15" y="15" width="8" height="8" className="text-[#1E3A8A]" />

              <rect x="67" y="5" width="28" height="28" rx="2" className="text-[#1E3A8A]" />
              <rect x="73" y="11" width="16" height="16" fill="white" />
              <rect x="77" y="15" width="8" height="8" className="text-[#1E3A8A]" />

              <rect x="5" y="67" width="28" height="28" rx="2" className="text-[#1E3A8A]" />
              <rect x="11" y="73" width="16" height="16" fill="white" />
              <rect x="15" y="77" width="8" height="8" className="text-[#1E3A8A]" />

              <rect x="42" y="10" width="7" height="7" className="text-[#1E3A8A]" />
              <rect x="52" y="18" width="7" height="7" className="text-[#1E3A8A]" />
              <rect x="42" y="26" width="7" height="7" className="text-[#1E3A8A]" />
              <rect x="12" y="42" width="7" height="7" className="text-[#1E3A8A]" />
              <rect x="22" y="48" width="7" height="7" className="text-[#1E3A8A]" />
              <rect x="38" y="40" width="8" height="8" className="text-[#1E3A8A]" />
              <rect x="50" y="48" width="8" height="8" className="text-[#1E3A8A]" />
              <rect x="68" y="42" width="6" height="6" className="text-[#1E3A8A]" />
              <rect x="78" y="52" width="7" height="7" className="text-[#1E3A8A]" />
              <rect x="88" y="40" width="7" height="7" className="text-[#1E3A8A]" />
              <rect x="42" y="66" width="7" height="7" className="text-[#1E3A8A]" />
              <rect x="52" y="76" width="7" height="7" className="text-[#1E3A8A]" />
              <rect x="66" y="66" width="8" height="8" className="text-[#1E3A8A]" />
              <rect x="82" y="72" width="8" height="8" className="text-[#1E3A8A]" />
              <rect x="72" y="84" width="7" height="7" className="text-[#1E3A8A]" />
              <rect x="42" y="86" width="7" height="7" className="text-[#1E3A8A]" />
            </svg>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 mb-1.5 max-w-full">
            <span className="material-symbols-outlined text-slate-400 text-[14px] shrink-0">
              qr_code
            </span>
            <span className="font-semibold text-[11px] text-slate-800 truncate">
              #{item.id}
            </span>
            <span className="text-slate-300 text-[11px]">•</span>
            <span className="text-[11px] text-slate-500 truncate">
              findit.telkomuniversity.ac.id/r/{item.id.toLowerCase()}
            </span>
            <button
              type="button"
              onClick={handleCopyLink}
              title="Salin URL"
              className="text-[#1E3A8A] hover:text-blue-800 ml-1 shrink-0"
            >
              <span className="material-symbols-outlined text-[14px]">content_copy</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-500">
            Pindai kode QR menggunakan kamera ponsel untuk melihat detail barang.
          </p>
        </div>

        {/* Public Access Badge */}
        <div className="flex items-center gap-2 mt-3.5 px-3 py-2 rounded-xl bg-blue-50/70 border border-blue-100 text-slate-700">
          <span className="material-symbols-outlined text-[#1E3A8A] text-[18px] shrink-0">
            public
          </span>
          <p className="text-[12px] leading-snug font-medium text-slate-700">
            Siapa pun bisa membuka tautan ini tanpa login
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            type="button"
            onClick={handleDownloadQR}
            className="w-full h-11 rounded-xl bg-[#F97316] hover:bg-[#EA580C] active:scale-[0.99] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Unduh Kode QR & Poster</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm flex items-center justify-center transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
