import React, { useState } from 'react';
import { ReportItem } from '../types';

interface MapScreenProps {
  reports: ReportItem[];
  onSelectReport: (report: ReportItem) => void;
  onOpenDirections: (report: ReportItem) => void;
  onShowToast: (msg: string) => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({
  reports,
  onSelectReport,
  onOpenDirections,
  onShowToast,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'hilang' | 'ditemukan'>('all');
  const [selectedReportId, setSelectedReportId] = useState<string>(
    reports[0]?.id || 'LAP-20251025-042'
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('Open Library Telkom University');
  const [mapLayer, setMapLayer] = useState<'schematic' | 'satellite'>('schematic');

  const selectedReport =
    reports.find((r) => r.id === selectedReportId) || reports[0];

  const handleRecenter = () => {
    setZoomLevel(1);
    setSearchQuery('Kampus Utama Telkom University');
    onShowToast('Peta dipusatkan kembali ke lokasi Anda di Kampus Tel-U.');
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.15, 1.45));
    onShowToast('Memperbesar peta');
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.15, 0.85));
    onShowToast('Memperkecil peta');
  };

  const toggleLayer = () => {
    setMapLayer((prev) => (prev === 'schematic' ? 'satellite' : 'schematic'));
    onShowToast(`Beralih ke mode peta ${mapLayer === 'schematic' ? 'Satelit' : 'Skematik'}`);
  };

  return (
    <div className="flex flex-col w-full relative select-none pb-20">
      {/* Map Interactive Canvas */}
      <div className="relative w-full h-[640px] overflow-hidden bg-slate-200">
        {/* Background Map Graphic Layer */}
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-300 ease-out ${
            mapLayer === 'satellite' ? 'contrast-[1.1] brightness-[0.95]' : ''
          }`}
          style={{
            transform: `scale(${zoomLevel})`,
            backgroundImage:
              mapLayer === 'satellite'
                ? "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNiYpApEPwDuS2EOPVeTzWqFR_0MFCm4Byqb3Muq0PwKvBrDOPmsT9Yd-NXphQRw74zIYa7ndP01caruJREja1b1BZytsJ_KuhtdqTRAJpm2PFyRT8kr2pZ7GHLqjnye1dkMxNVe-ivN0u1oKe19kjdhs43r6eBB42RlbTmfqTq8tfIKfXx3qduBEFr_1U9zTbV3Rgs_HSNH18rKqGlqG1QQjxySDmsIw4TrXCYw8')"
                : "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDobRpXVUXFzW-uiplPasHQy6Xr9xiWl3TT1_Qd8OdIaiGggwl_ZI9CgIAiDukYq1CCC_caz9bnQy7fdzk518h-4N00yU6ZWVNkiiYY3M6RLFkdAhh_d5w_okxbVYLi9Py_myws5MyZ5htUuU4faWvNdHWxsnKZZft4gqiQQC00cpqmStqfDVRk9-4Iek6pGnkqw7KkyV_Sgm4WgznrEn4V_vuQ_CNY2yKBHsadTYk')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Schematic SVG Overlay (Roads, Buildings, Lake) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-45 mix-blend-multiply"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="campus-grid" width="44" height="44" patternUnits="userSpaceOnUse">
                <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#1e3a8a" strokeOpacity="0.1" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#campus-grid)" />
            {/* Roads */}
            <path d="M -20,240 Q 180,260 420,230" fill="none" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" />
            <path d="M 190,-10 L 190,680" fill="none" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />
            <path d="M 90,140 Q 240,170 380,420" fill="none" stroke="#dce2f3" strokeWidth="10" strokeLinecap="round" />
          </svg>
        </div>

        {/* Building Labels Floating Callouts */}
        <div className="absolute top-[135px] left-[16px] px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm shadow-sm pointer-events-none border border-slate-200/60 z-10">
          <span className="text-[10px] font-bold text-[#1E3A8A]">GKU (Gedung Kuliah Umum)</span>
        </div>
        <div className="absolute top-[280px] right-[20px] px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm shadow-sm pointer-events-none border border-slate-200/60 z-10">
          <span className="text-[10px] font-bold text-[#1E3A8A]">Open Library Tel-U</span>
        </div>
        <div className="absolute bottom-[230px] left-[24px] px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-sm shadow-sm pointer-events-none border border-slate-200/60 z-10">
          <span className="text-[10px] font-bold text-[#1E3A8A]">Gedung Tokong Nanas (TULT)</span>
        </div>
        <div className="absolute top-[80px] right-[40px] px-2 py-0.5 rounded-md bg-white/80 backdrop-blur-sm shadow-xs pointer-events-none border border-slate-200/60 z-10">
          <span className="text-[9px] font-semibold text-slate-600">Landmark Tower</span>
        </div>

        {/* Top Controls: Search Bar & Campus Chips */}
        <div className="absolute top-3 inset-x-0 px-4 flex flex-col gap-2 z-20">
          {/* Search Bar + Recenter */}
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center bg-white shadow-md rounded-xl h-11 px-3 gap-2 border border-slate-100">
              <span className="material-symbols-outlined text-[#1E3A8A] text-[20px]">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari lokasi gedung di Tel-U..."
                className="w-full bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="w-5 h-5 flex items-center justify-center text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* Recenter Button */}
            <button
              type="button"
              onClick={handleRecenter}
              aria-label="Pusatkan Lokasi Saya"
              className="w-11 h-11 bg-white text-[#1E3A8A] hover:bg-slate-50 shadow-md rounded-xl flex items-center justify-center transition-all active:scale-95 border border-slate-100"
            >
              <span className="material-symbols-outlined text-[22px]">my_location</span>
            </button>
          </div>

          {/* Campus Switcher Chip */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 backdrop-blur-md shadow-sm rounded-full text-slate-800 border border-slate-200/60">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping"></span>
              <span className="w-2 h-2 rounded-full bg-[#16A34A] -ml-3.5"></span>
              <span className="text-xs font-semibold truncate max-w-[210px]">
                Kampus Utama Tel-U Bandung
              </span>
              <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
            </div>

            <div className="px-2.5 py-1 bg-white/90 backdrop-blur-md shadow-sm rounded-full text-[#1E3A8A] text-[11px] font-bold flex items-center gap-1 border border-slate-200/60">
              <span className="material-symbols-outlined text-[14px]">sensors</span>
              <span>42 Titik</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-sm text-xs font-bold whitespace-nowrap transition-transform active:scale-95 ${
                filterType === 'all'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">layers</span>
              <span>Semua (42)</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterType('hilang')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-sm text-xs font-bold whitespace-nowrap transition-transform active:scale-95 ${
                filterType === 'hilang'
                  ? 'bg-[#DC2626] text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
              <span>Hilang (14)</span>
            </button>

            <button
              type="button"
              onClick={() => setFilterType('ditemukan')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full shadow-sm text-xs font-bold whitespace-nowrap transition-transform active:scale-95 ${
                filterType === 'ditemukan'
                  ? 'bg-[#16A34A] text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
              <span>Ditemukan (28)</span>
            </button>
          </div>
        </div>

        {/* MAP PINS */}
        {/* Pin 1: Open Library (Tumbler Corkcicle) */}
        {(filterType === 'all' || filterType === 'ditemukan') && (
          <div
            onClick={() => setSelectedReportId('LAP-20251025-042')}
            className="absolute top-[248px] right-[72px] z-10 flex flex-col items-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
          >
            <div className="relative flex items-center justify-center">
              {selectedReportId === 'LAP-20251025-042' && (
                <span className="absolute w-12 h-12 rounded-full bg-[#16a34a]/30 animate-ping"></span>
              )}
              <div className="relative w-11 h-11 rounded-full p-[2.5px] bg-[#16a34a] shadow-lg flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEYlPIoms-zO9wQRR1eSG5EX4aeWFrjpjSaUt5UBdlYtjPiWbos69Nhb8IZ7chWAnOm4WwcFJrRPpbpffgOysqUaPhBYU1xF0E3TErH9dUXHbi3yl0ddMpKyfWjZcB3ft8qEsGrOy19Ibf84KXK5--5bA6YfTaVJEU_dUJc-t4wozhoRknVnlWlLAVIykYLNkAqgewLQptbtmzhRAUF3mMU7ILZSLwHjzb-2Ozr6s"
                  alt="Tumbler"
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#16a34a] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-1 px-2 py-0.5 rounded-full bg-[#16a34a] text-white shadow-md text-[10px] flex items-center gap-0.5 font-bold">
              <span>Ditemukan</span>
            </div>
          </div>
        )}

        {/* Pin 2: GKU (Kunci Motor Honda Vario) */}
        {(filterType === 'all' || filterType === 'hilang') && (
          <div
            onClick={() => setSelectedReportId('LAP-20251024-019')}
            className="absolute top-[182px] left-[52px] z-10 flex flex-col items-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
          >
            <div className="relative flex items-center justify-center">
              {selectedReportId === 'LAP-20251024-019' && (
                <span className="absolute w-12 h-12 rounded-full bg-rose-500/30 animate-ping"></span>
              )}
              <div className="relative w-10 h-10 rounded-full p-[2.5px] bg-[#DC2626] shadow-lg flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN9y-G5AhZl3zNT2Nw_e0mfnLs69gklyD8IAs8yZs7fXUuHc-Le5Dx_ti9bq6zVLdZvJAcwiHrERkk70Ogzc7C-1tgooqZunR4aOt2uRMWelE9_U8zNGjcefOIWs0dwLIPKmjjqKmfhiV6p0WlkRXIDKY5THXhrn6XuEe0twIES_y4_2whJsG9kD9bSqdZ5aSiY1E_fUXK2tuHOhvFURqGP8v8C4VQOwRFyQwqtLw"
                  alt="Kunci"
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#DC2626] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[10px]">priority_high</span>
                </div>
              </div>
            </div>
            <div className="mt-1 px-1.5 py-0.5 rounded bg-[#DC2626] text-white shadow-md text-[10px] font-bold">
              <span>Hilang</span>
            </div>
          </div>
        )}

        {/* Pin 3: TULT (Dompet Eiger) */}
        {(filterType === 'all' || filterType === 'ditemukan') && (
          <div
            onClick={() => setSelectedReportId('LAP-20251025-038')}
            className="absolute bottom-[280px] left-[118px] z-10 flex flex-col items-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
          >
            <div className="relative flex items-center justify-center">
              {selectedReportId === 'LAP-20251025-038' && (
                <span className="absolute w-12 h-12 rounded-full bg-[#16a34a]/30 animate-ping"></span>
              )}
              <div className="relative w-10 h-10 rounded-full p-[2.5px] bg-[#16a34a] shadow-lg flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvSf8RmrIDKDU3RoUhQaHiz1PGmBEshgc50FTfoRvHTcRykWMWF9UZ-JLrkZVjMy-L2KejbWh8XY3GSk_jMb36X-LHUGwk8PCX11-z2Oqjhj8VvPHEdNxZDqzIh9qlZBqXXnkPaBIRJh99K7sW7OlWmGiWkeOmO27rendsO9mygEPXQl-OCq94FooZZ_Xoxh3tQOqIIfW3fQ_w-wb5bK6bgNnrkmwawbcdbGDUa50"
                  alt="Dompet"
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#16a34a] text-white flex items-center justify-center shadow-xs">
                  <span className="material-symbols-outlined text-[10px]">check</span>
                </div>
              </div>
            </div>
            <div className="mt-1 px-1.5 py-0.5 rounded bg-[#16a34a] text-white shadow-md text-[10px] font-bold">
              <span>Ditemukan</span>
            </div>
          </div>
        )}

        {/* Cluster Markers */}
        <div
          onClick={() => onShowToast('Cluster 5 barang di area GKU')}
          className="absolute top-[108px] left-[150px] z-10 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
        >
          <div className="w-10 h-10 rounded-full bg-[#00236F] text-white shadow-xl flex items-center justify-center p-0.5 shadow-blue-900/30">
            <div className="w-full h-full rounded-full bg-[#1E3A8A] flex items-center justify-center font-bold text-sm">
              5
            </div>
          </div>
        </div>

        <div
          onClick={() => onShowToast('Cluster 3 barang di sekitar Danau Galau & Library')}
          className="absolute top-[340px] right-[40px] z-10 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
        >
          <div className="w-9 h-9 rounded-full bg-[#00236F] text-white shadow-xl flex items-center justify-center p-0.5 shadow-blue-900/30">
            <div className="w-full h-full rounded-full bg-[#1E3A8A] flex items-center justify-center font-bold text-xs">
              3
            </div>
          </div>
        </div>

        <div
          onClick={() => onShowToast('Cluster 4 barang di Gedung Damar & FTE')}
          className="absolute bottom-[350px] right-[130px] z-10 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
        >
          <div className="w-9 h-9 rounded-full bg-[#00236F] text-white shadow-xl flex items-center justify-center p-0.5 shadow-blue-900/30">
            <div className="w-full h-full rounded-full bg-[#1E3A8A] flex items-center justify-center font-bold text-xs">
              4
            </div>
          </div>
        </div>

        {/* Floating Legend Card (Left Bottom) */}
        <div className="absolute bottom-[206px] left-4 z-20 bg-white/95 backdrop-blur-md rounded-xl shadow-md p-2.5 flex flex-col gap-1.5 border border-slate-200/80">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Keterangan
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
            <span className="text-xs font-medium text-slate-800">Ditemukan (28)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]"></span>
            <span className="text-xs font-medium text-slate-800">Hilang (14)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A]"></span>
            <span className="text-xs font-medium text-slate-800">Grup / Cluster</span>
          </div>
        </div>

        {/* Floating Map Zoom & Layer Buttons (Right Bottom) */}
        <div className="absolute bottom-[206px] right-4 z-20 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-9 h-9 rounded-xl bg-white text-[#00236F] shadow-md flex items-center justify-center hover:bg-slate-50 border border-slate-200/80 transition-colors"
            title="Perbesar Peta"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-9 h-9 rounded-xl bg-white text-[#00236F] shadow-md flex items-center justify-center hover:bg-slate-50 border border-slate-200/80 transition-colors"
            title="Perkecil Peta"
          >
            <span className="material-symbols-outlined text-[20px]">remove</span>
          </button>
          <button
            type="button"
            onClick={toggleLayer}
            className="w-9 h-9 rounded-xl bg-white text-[#00236F] shadow-md flex items-center justify-center hover:bg-slate-50 border border-slate-200/80 transition-colors"
            title="Ganti Lapisan Peta"
          >
            <span className="material-symbols-outlined text-[20px]">layers</span>
          </button>
        </div>

        {/* Selected Report Floating Bottom Drawer Card */}
        {selectedReport && (
          <div className="absolute inset-x-4 bottom-3 z-30">
            <div className="bg-white rounded-2xl shadow-xl p-3.5 flex flex-col gap-2.5 border border-slate-200">
              {/* Drag Handle Indicator */}
              <div className="w-10 h-1 rounded-full bg-slate-300 mx-auto"></div>

              <div className="flex items-start gap-3">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 shadow-xs border border-slate-100">
                  <img
                    src={selectedReport.primaryImage}
                    alt={selectedReport.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-white text-[10px] font-bold flex items-center gap-0.5 shadow-xs ${
                      selectedReport.type === 'ditemukan' ? 'bg-[#16A34A]' : 'bg-[#DC2626]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[10px]">
                      {selectedReport.type === 'ditemukan' ? 'check_circle' : 'error'}
                    </span>
                    <span>{selectedReport.type === 'ditemukan' ? 'Ditemukan' : 'Hilang'}</span>
                  </div>
                </div>

                {/* Metadata & Title */}
                <div className="flex-1 min-w-0 flex flex-col justify-between h-20">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                        Terverifikasi Kampus
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">schedule</span>
                        <span>14:00 WIB</span>
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-[#00236F] truncate mt-0.5">
                      {selectedReport.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1 text-slate-600">
                    <span className="material-symbols-outlined text-[16px] text-[#FD761A] shrink-0">
                      location_on
                    </span>
                    <span className="text-xs truncate font-medium">
                      {selectedReport.locationDetail || selectedReport.locationBuildingLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => onOpenDirections(selectedReport)}
                  className="flex items-center justify-center gap-1 px-3.5 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#00236F] font-bold text-xs transition-colors shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  <span>Rute</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectReport(selectedReport)}
                  className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-xl bg-[#FD761A] hover:bg-[#EA580C] text-white font-bold text-xs shadow-md transition-all active:scale-[0.98]"
                >
                  <span>Lihat Detail Laporan</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
