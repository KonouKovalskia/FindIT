import React, { useState } from 'react';
import { FilterOptions } from '../types';

interface FilterModalProps {
  currentFilters: FilterOptions;
  onApply: (filters: FilterOptions) => void;
  onClose: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  currentFilters,
  onApply,
  onClose,
}) => {
  const [category, setCategory] = useState(currentFilters.category || '');
  const [building, setBuilding] = useState(currentFilters.building || '');
  const [dateFrom, setDateFrom] = useState(currentFilters.dateFrom || '2025-10-01');
  const [dateTo, setDateTo] = useState(currentFilters.dateTo || '2025-10-25');

  const handleReset = () => {
    setCategory('');
    setBuilding('');
    setDateFrom('2025-10-01');
    setDateTo('2025-10-25');
  };

  const handleApply = () => {
    onApply({
      ...currentFilters,
      category,
      building,
      dateFrom,
      dateTo,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-[2px] transition-opacity">
      <div className="w-full max-w-[430px] bg-white rounded-t-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-250">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 rounded-full bg-slate-300"></div>
        </div>

        {/* Modal Header */}
        <div className="flex items-start justify-between px-5 pt-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-[#1E3A8A] tracking-tight">Filter Pencarian</h3>
            <p className="text-xs text-slate-500 mt-0.5">Sesuaikan kriteria pencarian barang</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Filter"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Filter Inputs Body */}
        <div className="overflow-y-auto px-5 py-4 flex flex-col gap-4 no-scrollbar">
          {/* Category Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-800">Kategori</label>
            <div className="relative flex items-center">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-11 px-3 pr-9 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 appearance-none focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] font-medium"
              >
                <option value="">Semua Kategori</option>
                <option value="elektronik">Elektronik & Gadget</option>
                <option value="identitas">Kartu Identitas & Dompet</option>
                <option value="kunci">Kunci & Kendaraan</option>
                <option value="barang_pribadi">Barang Pribadi & Aksesoris</option>
                <option value="buku">Buku & Dokumen</option>
                <option value="pakaian">Pakaian & Tas</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 pointer-events-none text-slate-500 text-[20px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Date Range Inputs */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-800">Rentang Tanggal</label>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-slate-500">Dari tanggal</span>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full h-11 px-2.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-slate-500">Sampai tanggal</span>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full h-11 px-2.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[14px] text-slate-400">info</span>
              <span>Rentang tanggal maksimal 30 hari terakhir</span>
            </p>
          </div>

          {/* Building / Location Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-800">Gedung / Lokasi Kampus</label>
            <div className="relative flex items-center">
              <select
                value={building}
                onChange={(e) => setBuilding(e.target.value)}
                className="w-full h-11 px-3 pr-9 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 appearance-none focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] font-medium"
              >
                <option value="">Semua Gedung</option>
                <option value="gku">GKU (Gedung Kuliah Umum)</option>
                <option value="tokong_nanas">Gedung Tokong Nanas (Gedung 10)</option>
                <option value="open_library">Open Library Telkom University</option>
                <option value="cacuk">Gedung Cacuk Sudarijanto (FTE)</option>
                <option value="tult">Telkom University Landmark Tower (TULT)</option>
                <option value="masjid">Masjid Syamsul 'Ulum</option>
                <option value="kantin">Kantin Terpadu & Student Center</option>
                <option value="asrama">Kawasan Asrama Kampus</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 pointer-events-none text-slate-500 text-[20px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 pt-3 pb-6 border-t border-slate-100 bg-white flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 h-11 rounded-lg border border-[#1E3A8A] text-[#1E3A8A] font-semibold text-sm hover:bg-blue-50 transition-colors active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">restart_alt</span>
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-[2] h-11 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">check</span>
            <span>Terapkan Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
};
