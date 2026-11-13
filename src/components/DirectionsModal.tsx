import React from 'react';
import { ReportItem } from '../types';

interface DirectionsModalProps {
  item: ReportItem;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  item,
  onClose,
  onShowToast,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-[2px] transition-opacity">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-250">
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-slate-300"></div>
        </div>

        <div className="px-5 pt-2 pb-3 border-b border-slate-100 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#1E3A8A]">Petunjuk Arah Kampus</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Rute menuju titik temu di lingkungan Telkom University
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          {/* Destination target card */}
          <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">pin_drop</span>
            </div>
            <div>
              <p className="font-bold text-sm text-[#1E3A8A]">{item.locationBuildingLabel}</p>
              <p className="text-slate-600 mt-0.5">{item.locationDetail}</p>
              <span className="inline-block mt-1 font-mono text-[10px] text-slate-500">
                Koordinat: {item.coordinates.lat}, {item.coordinates.lng}
              </span>
            </div>
          </div>

          {/* Navigation Steps */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 text-[13px]">Rute Pejalan Kaki (± 4 menit)</h4>

            <div className="relative pl-6 pb-4 border-l-2 border-blue-200">
              <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-[#1E3A8A] ring-4 ring-blue-100"></div>
              <p className="font-semibold text-slate-800 text-xs">Titik Awal: Gerbang Utama / Posko Satpam</p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Berjalan lurus melewati Bundaran Telkom University ke arah Boulevard Utama.
              </p>
            </div>

            <div className="relative pl-6 pb-4 border-l-2 border-blue-200">
              <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-blue-500"></div>
              <p className="font-semibold text-slate-800 text-xs">Melewati Area Danau Galau</p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Belok kanan menuju Gedung Cacuk Sudarijanto (Fakultas Teknik Elektro).
              </p>
            </div>

            <div className="relative pl-6">
              <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-[#16A34A] ring-4 ring-emerald-100"></div>
              <p className="font-semibold text-emerald-800 text-xs">Tiba di Lokasi: {item.locationBuildingLabel}</p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                Gunakan lift atau tangga ke lantai terkait. Tanyakan pada petugas posko jika barang telah diamankan.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-white">
          <button
            type="button"
            onClick={() => {
              onShowToast('Navigasi langsung telah dibuka di aplikasi kompas kampus!');
              onClose();
            }}
            className="w-full h-11 bg-[#1E3A8A] text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-blue-900 transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">navigation</span>
            <span>Mulai Navigasi Berjalan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
