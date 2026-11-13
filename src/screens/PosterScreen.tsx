import React, { useState } from 'react';
import { ReportItem } from '../types';

interface PosterScreenProps {
  item: ReportItem;
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export const PosterScreen: React.FC<PosterScreenProps> = ({
  item,
  onBack,
  onShowToast,
}) => {
  const [format, setFormat] = useState<'a4' | 'story'>('a4');

  const handleDownload = () => {
    onShowToast(`Poster ${item.title} (${format.toUpperCase()}) resolusi tinggi HD berhasil diunduh!`);
  };

  const handlePrint = () => {
    onShowToast('Menyiapkan tata letak cetak dokumen A4...');
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const isFound = item.type === 'ditemukan';

  return (
    <div className="flex flex-col w-full px-4 pb-20 pt-2 bg-[#F9F9FF]">
      {/* Segmented Format Switcher */}
      <section className="w-full pt-2 pb-2">
        <div className="bg-[#E2E8F8] p-1 rounded-xl flex items-center shadow-inner">
          <button
            type="button"
            onClick={() => setFormat('a4')}
            className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              format === 'a4'
                ? 'bg-[#1E3A8A] text-white shadow-sm'
                : 'bg-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">description</span>
            <span>A4 (Cetak Fisik)</span>
          </button>
          <button
            type="button"
            onClick={() => setFormat('story')}
            className={`flex-1 py-2 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              format === 'story'
                ? 'bg-[#1E3A8A] text-white shadow-sm'
                : 'bg-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">smartphone</span>
            <span>Story (Medsos)</span>
          </button>
        </div>

        <div className="flex items-center gap-1 mt-1.5 px-1">
          <span className="material-symbols-outlined text-[#FD761A] text-[15px]">info</span>
          <p className="text-[11px] text-slate-500">
            {format === 'a4'
              ? 'Format A4 cocok untuk dicetak di mading fakultas / perpustakaan'
              : 'Format Story 9:16 ideal untuk WhatsApp Status & Instagram Story'}
          </p>
        </div>
      </section>

      {/* Visual Paper Mockup */}
      <section className="w-full py-2 flex justify-center">
        <article
          className={`w-full bg-white rounded-2xl shadow-xl p-4 flex flex-col transition-all duration-300 relative overflow-hidden border border-slate-200/80 ${
            format === 'a4' ? 'max-w-[360px] aspect-[1/1.414]' : 'max-w-[310px] aspect-[9/16]'
          }`}
        >
          {/* Telkom Campus Official Stamp Strip */}
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded bg-[#1E3A8A] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[14px]">school</span>
              </div>
              <span className="text-[11px] uppercase tracking-wider text-[#00236F] font-bold">
                TELKOM UNIVERSITY
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono font-medium">#{item.id}</span>
          </div>

          {/* Status Badge */}
          <div
            className={`w-full rounded-lg py-1.5 px-3 flex items-center justify-center gap-1.5 shadow-2xs font-bold text-xs uppercase tracking-wide ${
              isFound ? 'bg-[#DCFCE7] text-[#166534]' : 'bg-[#FEE2E2] text-[#991B1B]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isFound ? 'check_circle' : 'error'}
            </span>
            <span>{isFound ? 'Ditemukan' : 'Barang Hilang'}</span>
          </div>

          {/* Catchy Headline */}
          <div className="text-center pt-2 pb-1">
            <h2 className="text-sm font-extrabold text-[#00236F] tracking-tight uppercase">
              {isFound ? 'BARANG TEMUAN KAMPUS' : 'PENCARIAN BARANG HILANG'}
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              Apakah ini barang berharga milik Anda?
            </p>
          </div>

          {/* Photo Display Card */}
          <div
            className={`w-full bg-slate-100 rounded-xl overflow-hidden my-1 relative shadow-xs border border-slate-100 ${
              format === 'a4' ? 'h-40' : 'h-52'
            }`}
          >
            <img
              src={item.primaryImage}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">verified</span>
              <span>Foto Fisik Asli</span>
            </div>
          </div>

          {/* Item Meta Details */}
          <div className="w-full text-center px-1 my-1">
            <h3 className="text-sm font-bold text-slate-900 leading-tight">
              {item.title}
            </h3>
          </div>

          {/* Compact Spec Block */}
          <div className="w-full bg-[#F0F3FF] border border-blue-100 rounded-xl p-2.5 my-1 space-y-1.5">
            <div className="flex items-center text-left gap-2">
              <div className="w-6 h-6 rounded bg-[#DCE1FF] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#00236F] text-[13px]">
                  category
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                  Kategori
                </p>
                <p className="text-xs font-bold text-slate-900 truncate">
                  {item.categoryLabel}
                </p>
              </div>
            </div>

            <div className="flex items-center text-left gap-2">
              <div className="w-6 h-6 rounded bg-[#DCE1FF] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#00236F] text-[13px]">
                  location_on
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                  Gedung / Lokasi
                </p>
                <p className="text-xs font-bold text-slate-900 truncate">
                  {item.locationBuildingLabel}
                </p>
              </div>
            </div>

            <div className="flex items-center text-left gap-2">
              <div className="w-6 h-6 rounded bg-[#DCE1FF] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#00236F] text-[13px]">
                  calendar_today
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">
                  Waktu Penemuan
                </p>
                <p className="text-xs font-bold text-slate-900 truncate">
                  {item.reportedAtDisplay}
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="w-full flex items-center justify-between gap-2.5 bg-white p-2 rounded-xl border border-slate-200 mt-auto shadow-2xs">
            <div className="w-14 h-14 bg-slate-50 p-1 rounded-lg shrink-0 flex items-center justify-center border border-slate-100">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
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
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                Pindai untuk melihat laporan &amp; ajukan klaim
              </p>
              <p className="text-[10px] text-slate-500 truncate mt-0.5 font-mono">
                findit.telkomuniversity.ac.id/l/{item.id.toLowerCase()}
              </p>
            </div>
          </div>

          {/* Footer Signature */}
          <div className="w-full pt-2 flex items-center justify-between border-t border-slate-100 mt-1">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#FD761A] text-[15px]">
                travel_explore
              </span>
              <span className="text-[11px] font-bold text-[#00236F]">FindIt Campus</span>
            </div>
            <span className="text-[9px] text-slate-400 font-medium">Portal Resmi Telkom University</span>
          </div>
        </article>
      </section>

      {/* Privacy Notice Box */}
      <section className="w-full my-2">
        <div className="bg-[#E7EEFE] p-3.5 rounded-xl flex items-start gap-2.5 border border-blue-200">
          <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-[#00236F]">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-[#00236F]">Privasi Terlindungi</h4>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
              Sesuai aturan kampus, identitas pelapor dan nomor kontak tidak dicantumkan pada poster untuk mencegah penipuan &amp; kontak palsu.
            </p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="w-full pt-1 pb-4 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={handleDownload}
          className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] bg-[#FD761A] hover:bg-[#EA580C] text-white"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          <span>Unduh Poster (Format {format.toUpperCase()})</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs bg-white border border-[#00236F] text-[#00236F] hover:bg-blue-50 active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[18px]">print</span>
          <span>Cetak Poster Langsung</span>
        </button>
      </section>
    </div>
  );
};
