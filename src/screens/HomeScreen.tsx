import React, { useState, useMemo } from 'react';
import { ReportItem, FilterOptions } from '../types';

interface HomeScreenProps {
  reports: ReportItem[];
  onSelectReport: (report: ReportItem) => void;
  onOpenCreateReport: () => void;
  onOpenFilterModal: () => void;
  activeFilters: FilterOptions;
  onUpdateFilters: (filters: FilterOptions) => void;
  onShowToast: (msg: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  reports,
  onSelectReport,
  onOpenCreateReport,
  onOpenFilterModal,
  activeFilters,
  onUpdateFilters,
  onShowToast,
}) => {
  const [selectedCategoryPill, setSelectedCategoryPill] = useState<string>('all');

  // Counts for status tabs
  const countAll = reports.length;
  const countLost = reports.filter((r) => r.type === 'hilang').length;
  const countFound = reports.filter((r) => r.type === 'ditemukan').length;

  const categoryPills = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'elektronik', label: 'Elektronik' },
    { id: 'identitas', label: 'Kartu & Dompet' },
    { id: 'kunci', label: 'Kunci' },
    { id: 'barang_pribadi', label: 'Barang Pribadi' },
    { id: 'aksesoris', label: 'Aksesoris' },
  ];

  // Filtering
  const filteredReports = useMemo(() => {
    return reports.filter((item) => {
      // Search filter
      if (activeFilters.searchQuery.trim()) {
        const q = activeFilters.searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesLoc = item.locationBuildingLabel.toLowerCase().includes(q) || item.locationDetail.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesLoc) return false;
      }

      // Type filter
      if (activeFilters.type !== 'all' && item.type !== activeFilters.type) {
        return false;
      }

      // Category Pill / Filter
      if (selectedCategoryPill !== 'all' && item.category !== selectedCategoryPill) {
        return false;
      }

      // Modal Filter Category
      if (activeFilters.category && item.category !== activeFilters.category) {
        return false;
      }

      // Modal Filter Building
      if (activeFilters.building && item.locationBuilding !== activeFilters.building) {
        return false;
      }

      return true;
    });
  }, [reports, activeFilters, selectedCategoryPill]);

  const activeFilterCount =
    (activeFilters.category ? 1 : 0) +
    (activeFilters.building ? 1 : 0) +
    (activeFilters.type !== 'all' ? 1 : 0);

  return (
    <div className="flex flex-col w-full px-4 pb-24 pt-3">
      {/* Sapaan & Pulse Kampus */}
      <section className="flex flex-col gap-2 pt-1 pb-2">
        <div>
          <h1 className="text-xl font-bold text-[#00236F] tracking-tight">Halo, Faiz 👋</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Temukan atau laporkan barang di lingkungan Telkom University.
          </p>
        </div>

        {/* Live Campus Tracker Capsule */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50/70 border border-blue-100/60 shadow-2xs">
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-[#9D4300] shrink-0">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
          </div>
          <p className="text-xs text-slate-600 truncate">
            <span className="font-bold text-[#00236F]">GKU &amp; Tokong Nanas</span> paling aktif dilaporkan hari ini
          </p>
        </div>
      </section>

      {/* Search & Filter Controls */}
      <section className="flex flex-col gap-2.5 mt-2">
        <div className="flex items-center gap-2">
          {/* Search Input Container */}
          <div className="relative flex-1 flex items-center bg-white rounded-xl shadow-xs border border-slate-200">
            <span className="material-symbols-outlined absolute left-3 text-slate-400 text-[20px]">
              search
            </span>
            <input
              type="text"
              id="searchInput"
              value={activeFilters.searchQuery}
              onChange={(e) =>
                onUpdateFilters({ ...activeFilters, searchQuery: e.target.value })
              }
              placeholder="Cari barang (cth. KTM, Kunci, Jaket)..."
              className="w-full h-11 pl-10 pr-9 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            {activeFilters.searchQuery && (
              <button
                type="button"
                onClick={() => onUpdateFilters({ ...activeFilters, searchQuery: '' })}
                className="absolute right-2.5 w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:text-slate-900"
                aria-label="Hapus kata kunci"
              >
                <span className="material-symbols-outlined text-[14px]">close</span>
              </button>
            )}
          </div>

          {/* Filter Modal Trigger */}
          <button
            type="button"
            onClick={onOpenFilterModal}
            aria-label="Filter Laporan"
            className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-white border border-slate-200 text-[#00236F] shadow-xs active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[22px]">tune</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#FD761A] text-white text-[10px] font-bold rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Status Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => onUpdateFilters({ ...activeFilters, type: 'all' })}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all active:scale-95 ${
              activeFilters.type === 'all'
                ? 'bg-[#00236F] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>Semua</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                activeFilters.type === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {countAll}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateFilters({ ...activeFilters, type: 'hilang' })}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold shrink-0 transition-all active:scale-95 ${
              activeFilters.type === 'hilang'
                ? 'bg-[#DC2626] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
            <span>Hilang ({countLost})</span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateFilters({ ...activeFilters, type: 'ditemukan' })}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold shrink-0 transition-all active:scale-95 ${
              activeFilters.type === 'ditemukan'
                ? 'bg-[#16A34A] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
            <span>Ditemukan ({countFound})</span>
          </button>
        </div>

        {/* Quick Pill Category Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          {categoryPills.map((p) => {
            const isSelected = selectedCategoryPill === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedCategoryPill(p.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-[#E7EEFE] text-[#00236F] font-bold border border-blue-200'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Feed Header */}
      <div className="flex items-center justify-between mt-4 mb-2.5">
        <div className="flex items-center gap-1.5">
          <h2 className="text-base font-bold text-slate-900">Laporan Terkini</h2>
          <span className="flex h-2 w-2 rounded-full bg-[#FD761A] animate-pulse"></span>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">Update 2 mnt lalu</span>
      </div>

      {/* Cards List Feed */}
      <div className="flex flex-col gap-3.5">
        {filteredReports.map((item) => {
          const isFound = item.type === 'ditemukan';

          return (
            <article
              key={item.id}
              onClick={() => onSelectReport(item)}
              className="flex flex-col bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
            >
              {/* Media Container */}
              <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
                <img
                  src={item.primaryImage}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {/* Status Badge Floater */}
                <div
                  className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg shadow-sm text-xs font-bold ${
                    isFound
                      ? 'bg-[#DCFCE7] text-[#166534]'
                      : 'bg-[#FEE2E2] text-[#991B1B]'
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

                {/* Category Floater */}
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-lg bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-semibold shadow-xs">
                  {item.categoryLabel}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3.5 flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-[#00236F] leading-snug">
                    {item.title}
                  </h3>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded text-[11px] font-bold ${
                      item.isUrgent
                        ? 'bg-red-100 text-red-700'
                        : isFound
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.isUrgent ? 'Mendesak' : item.status === 'aktif' ? 'Aktif' : 'Diklaim'}
                  </span>
                </div>

                {/* Location & Time */}
                <div className="flex flex-col gap-1 text-slate-600 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#9D4300] text-[16px] shrink-0">
                      location_on
                    </span>
                    <span className="truncate font-medium">{item.locationBuildingLabel}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-slate-400 text-[16px] shrink-0">
                      schedule
                    </span>
                    <span>{item.reportedAtDisplay}</span>
                  </div>
                </div>

                {/* Storage note or quote note */}
                {item.description && (
                  <div className="p-2 rounded-lg bg-slate-50 text-slate-600 text-xs mt-1 border border-slate-100 line-clamp-2">
                    "{item.description}"
                  </div>
                )}

                {/* Card Action Row */}
                <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-slate-600 text-[11px] font-medium truncate max-w-[200px]">
                    {item.storageLocationNotice ? (
                      <>
                        <span className="material-symbols-outlined text-[15px] text-[#1E3A8A]">
                          verified_user
                        </span>
                        <span className="truncate">{item.storageLocationNotice}</span>
                      </>
                    ) : item.rewardNote ? (
                      <span className="text-orange-600 font-bold">{item.rewardNote}</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[15px] text-slate-400">
                          desk
                        </span>
                        <span className="truncate">{item.locationDetail}</span>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectReport(item);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#E2E8F8] text-[#00236F] font-bold text-xs hover:bg-[#00236F] hover:text-white transition-colors"
                  >
                    {isFound ? 'Klaim' : 'Detail'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {filteredReports.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
            <span className="material-symbols-outlined text-[36px] text-slate-400 mb-2">
              search_off
            </span>
            <p className="font-bold text-slate-800 text-sm">Tidak ada laporan yang cocok</p>
            <p className="text-xs text-slate-500 mt-1">
              Coba sesuaikan kata kunci pencarian atau reset filter.
            </p>
          </div>
        )}
      </div>

      {/* End of feed reminder */}
      <div className="flex flex-col items-center justify-center py-6 text-center gap-1 mt-2">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 mb-1">
          <span className="material-symbols-outlined text-[18px]">inventory_2</span>
        </div>
        <span className="text-xs font-bold text-slate-800">
          Semua laporan terkini sudah dimuat
        </span>
        <span className="text-[11px] text-slate-500 max-w-xs">
          Tidak menemukan barangmu? Buat laporan sekarang agar dibantu warga kampus.
        </span>
      </div>

      {/* Floating Action Button (+ Buat Laporan) */}
      <div className="fixed bottom-20 right-4 z-30">
        <button
          type="button"
          onClick={onOpenCreateReport}
          className="flex items-center gap-2 px-4 py-3 bg-[#FD761A] hover:bg-[#EA580C] text-white rounded-full shadow-lg active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          <span className="text-xs font-bold tracking-wide">Buat Laporan</span>
        </button>
      </div>
    </div>
  );
};
