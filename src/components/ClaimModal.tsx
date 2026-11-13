import React, { useState } from 'react';
import { ReportItem } from '../types';

interface ClaimModalProps {
  item: ReportItem;
  onClose: () => void;
  onSubmitClaim: (characteristics: string, photoName?: string) => void;
  onShowToast: (msg: string) => void;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({
  item,
  onClose,
  onSubmitClaim,
  onShowToast,
}) => {
  const [characteristics, setCharacteristics] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const charCount = characteristics.trim().length;
  const isSatisfied = charCount >= 20;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      onShowToast(`Foto bukti "${file.name}" berhasil dipilih!`);
    }
  };

  const handleSubmit = () => {
    if (!isSatisfied) {
      onShowToast('Harap isi ciri khusus barang minimal 20 karakter.');
      return;
    }
    onSubmitClaim(characteristics, uploadedFileName || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-[2px] transition-opacity duration-300">
      {/* Click outside to dismiss */}
      <div className="flex-1 w-full" onClick={onClose}></div>

      {/* Sheet Container */}
      <div className="w-full max-w-[430px] mx-auto max-h-[92vh] bg-white rounded-t-[24px] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Drag handle */}
        <div className="pt-3 pb-1 flex justify-center items-center shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-slate-300"></div>
        </div>

        {/* Modal Header */}
        <div className="px-5 pt-1 pb-3 flex items-start justify-between border-b border-slate-100 shrink-0">
          <div className="pr-2">
            <h2 className="text-[20px] leading-tight font-bold text-[#1E3A8A]">Ajukan Klaim</h2>
            <p className="text-[13px] text-slate-500 mt-0.5">
              Buktikan kepemilikan Anda untuk diverifikasi petugas kampus.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir klaim"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Scrollable Sheet Content */}
        <div className="p-5 overflow-y-auto space-y-4 no-scrollbar">
          {/* Summary Row */}
          <div className="p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-200 shrink-0 shadow-xs">
              <img
                src={item.primaryImage}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[13px] font-bold text-[#1E3A8A] truncate">
                  {item.title}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1">
                <span className="material-symbols-outlined text-[14px] text-slate-400">
                  apartment
                </span>
                <span className="truncate">{item.locationBuildingLabel}</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[11px] font-bold">
                <span
                  className="material-symbols-outlined text-[12px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span>Ditemukan</span>
              </span>
            </div>
          </div>

          {/* Ciri Khusus Textarea */}
          <div className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-slate-800" htmlFor="claim-feature">
              Ciri khusus barang <span className="text-rose-500">*</span>
            </label>
            <p className="text-[12px] text-slate-500 leading-snug">
              Tuliskan ciri atau detail yang tidak terlihat pada foto publik.
            </p>
            <textarea
              id="claim-feature"
              rows={3}
              value={characteristics}
              onChange={(e) => setCharacteristics(e.target.value)}
              placeholder="Contoh: ada stiker kucing kecil di bagian bawah, tutup ada goresan halus..."
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] text-[13px] text-slate-800 placeholder-slate-400 resize-none transition-all outline-none"
            />
            <div className="flex justify-end">
              <span
                className={`text-[11px] font-medium ${
                  isSatisfied ? 'text-[#16A34A]' : 'text-slate-400'
                }`}
              >
                {charCount}/20 minimal {isSatisfied ? '(memenuhi syarat)' : ''}
              </span>
            </div>
          </div>

          {/* Upload Proof */}
          <div className="space-y-1.5">
            <label className="block text-[13px] font-semibold text-slate-800">
              Bukti foto (opsional)
            </label>
            <label className="border-2 border-dashed border-slate-300 hover:border-[#1E3A8A] rounded-xl p-4 text-center bg-slate-50/50 hover:bg-slate-100/60 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1.5 block">
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-10 h-10 rounded-full bg-[#EFF6FF] text-[#1E3A8A] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
              </div>
              <p className="text-[12px] font-medium text-slate-700 leading-snug max-w-xs">
                {uploadedFileName
                  ? `Foto terpilih: ${uploadedFileName}`
                  : 'Unggah foto pendukung (nota pembelian, foto lama barang bersama Anda, dll.)'}
              </p>
              <span className="text-[11px] text-slate-400">Format JPG/PNG, maks. 2 MB</span>
            </label>
          </div>

          {/* Info Callout */}
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-3 flex items-start gap-2.5">
            <span
              className="material-symbols-outlined text-[#1E3A8A] text-[20px] shrink-0 mt-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield
            </span>
            <div className="text-[12px] leading-relaxed text-slate-700">
              <span className="font-bold text-[#1E3A8A] block mb-0.5">
                Klaim akan diverifikasi admin
              </span>
              Setelah klaim disetujui, tombol WhatsApp penemu akan terbuka untuk koordinasi serah terima (Aturan B1: maks. 3 klaim aktif).
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 bg-white border-t border-slate-100 flex flex-col gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full h-11 bg-[#F97316] hover:bg-[#EA580C] active:scale-[0.99] text-white font-bold text-[14px] rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Kirim Klaim</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-[#1E3A8A] hover:bg-slate-50 font-semibold text-[13px] rounded-lg transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};
