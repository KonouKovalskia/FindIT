import React, { useState } from 'react';
import { ClaimItem, ReportItem } from '../types';

interface MyReportsScreenProps {
  reports: ReportItem[];
  claims: ClaimItem[];
  activeSubTab: 'laporan' | 'klaim';
  onChangeSubTab: (tab: 'laporan' | 'klaim') => void;
  onSelectReport: (report: ReportItem) => void;
  onOpenCreateReport: () => void;
  onShowToast: (msg: string) => void;
  onCancelClaim: (claimId: string) => void;
  onConfirmHandover: (reportId: string) => void;
  onExtendReport: (reportId: string) => void;
}

export const MyReportsScreen: React.FC<MyReportsScreenProps> = ({
  reports,
  claims,
  activeSubTab,
  onChangeSubTab,
  onSelectReport,
  onOpenCreateReport,
  onShowToast,
  onCancelClaim,
  onConfirmHandover,
  onExtendReport,
}) => {
  // Filter for Laporan Saya
  const [reportStatusFilter, setReportStatusFilter] = useState<'aktif' | 'diklaim' | 'selesai' | 'arsip'>('aktif');
  // Filter for Klaim Saya
  const [claimStatusFilter, setClaimStatusFilter] = useState<'all' | 'waiting' | 'approved' | 'rejected'>('all');
  // Expanded timeline toggle state
  const [expandedTimelines, setExpandedTimelines] = useState<Record<string, boolean>>({
    'LAP-20251025-042': true,
  });

  const toggleTimeline = (reportId: string) => {
    setExpandedTimelines((prev) => ({
      ...prev,
      [reportId]: !prev[reportId],
    }));
  };

  const myReports = reports;

  const filteredReports = myReports.filter((r) => {
    if (reportStatusFilter === 'aktif') return r.status === 'aktif';
    if (reportStatusFilter === 'diklaim') return r.status === 'diklaim';
    if (reportStatusFilter === 'selesai') return r.status === 'selesai';
    if (reportStatusFilter === 'arsip') return r.status === 'arsip';
    return true;
  });

  const filteredClaims = claims.filter((c) => {
    if (claimStatusFilter === 'all') return true;
    return c.status === claimStatusFilter;
  });

  const activeClaimsCount = claims.filter((c) => c.status === 'waiting').length;

  return (
    <div className="flex flex-col w-full pb-24 pt-2">
      {/* Sub-Header Title & Info */}
      <section className="px-4 pt-2 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#00236F] tracking-tight">
              {activeSubTab === 'laporan' ? 'Laporan Saya' : 'Klaim Saya'}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {activeSubTab === 'laporan'
                ? 'Kelola laporan barang hilang & temuan Anda'
                : 'Pantau status verifikasi dan kepemilikan barang temuan Anda'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#E7EEFE] flex items-center justify-center text-[#00236F] shadow-xs">
            <span className="material-symbols-outlined text-[22px]">
              {activeSubTab === 'laporan' ? 'inventory_2' : 'verified_user'}
            </span>
          </div>
        </div>

        {/* Toggle Sub-Tipe (Segmented Pill) */}
        <div className="mt-3 p-1 bg-[#E2E8F8] rounded-xl flex items-center shadow-inner">
          <button
            type="button"
            onClick={() => onChangeSubTab('laporan')}
            className={`flex-1 py-2 px-3 rounded-lg text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'laporan'
                ? 'bg-white text-[#00236F] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">folder_shared</span>
            <span>Laporan Saya</span>
            <span className="px-1.5 py-0.2 bg-blue-100 text-[#00236F] rounded-full text-[10px]">
              {myReports.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onChangeSubTab('klaim')}
            className={`flex-1 py-2 px-3 rounded-lg text-center text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'klaim'
                ? 'bg-[#1E3A8A] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              fact_check
            </span>
            <span>Klaim Saya</span>
            <span className="px-1.5 py-0.2 bg-[#FD761A] text-white rounded-full text-[10px]">
              {claims.length}
            </span>
          </button>
        </div>

        {/* Status Chips Row for Laporan */}
        {activeSubTab === 'laporan' && (
          <div className="mt-3 -mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setReportStatusFilter('aktif')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                reportStatusFilter === 'aktif'
                  ? 'bg-[#00236F] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">check_circle</span>
              <span>Aktif</span>
              <span className="w-4 h-4 rounded-full bg-white/20 text-white text-[10px] flex items-center justify-center ml-0.5">
                {myReports.filter((r) => r.status === 'aktif').length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setReportStatusFilter('diklaim')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                reportStatusFilter === 'diklaim'
                  ? 'bg-[#00236F] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px] text-[#FD761A]">handshake</span>
              <span>Diklaim</span>
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] flex items-center justify-center ml-0.5">
                {myReports.filter((r) => r.status === 'diklaim').length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setReportStatusFilter('selesai')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                reportStatusFilter === 'selesai'
                  ? 'bg-[#00236F] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px] text-emerald-600">task_alt</span>
              <span>Selesai</span>
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] flex items-center justify-center ml-0.5">
                3
              </span>
            </button>

            <button
              type="button"
              onClick={() => setReportStatusFilter('arsip')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                reportStatusFilter === 'arsip'
                  ? 'bg-[#00236F] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="material-symbols-outlined text-[15px] text-slate-400">archive</span>
              <span>Arsip</span>
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] flex items-center justify-center ml-0.5">
                1
              </span>
            </button>
          </div>
        )}

        {/* Status Chips Row for Klaim */}
        {activeSubTab === 'klaim' && (
          <div className="mt-3 -mx-4 px-4 flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setClaimStatusFilter('all')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs ${
                claimStatusFilter === 'all'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              <span>Semua</span>
              <span className="w-4 h-4 rounded-full bg-white/20 text-white text-[10px] flex items-center justify-center">
                {claims.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setClaimStatusFilter('waiting')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs ${
                claimStatusFilter === 'waiting'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#FD761A]"></span>
              <span>Menunggu</span>
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 text-[10px] flex items-center justify-center">
                1
              </span>
            </button>

            <button
              type="button"
              onClick={() => setClaimStatusFilter('approved')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs ${
                claimStatusFilter === 'approved'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
              <span>Disetujui</span>
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 text-[10px] flex items-center justify-center">
                1
              </span>
            </button>

            <button
              type="button"
              onClick={() => setClaimStatusFilter('rejected')}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs ${
                claimStatusFilter === 'rejected'
                  ? 'bg-[#1E3A8A] text-white'
                  : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
              <span>Ditolak</span>
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 text-[10px] flex items-center justify-center">
                1
              </span>
            </button>
          </div>
        )}
      </section>

      {/* Info Notice Banners */}
      {activeSubTab === 'laporan' ? (
        <section className="px-4 mt-1">
          <div className="bg-[#F0F3FF] border border-blue-100 rounded-xl p-3 flex items-start gap-2.5 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-[#00236F] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">info</span>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-[#00236F]">Aturan Masa Aktif Laporan (B4)</p>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                Laporan aktif selama 30 hari. Lakukan perpanjangan jika barang belum ditemukan agar tetap tampil pada radar Peta Kampus.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="px-4 mt-1">
          <div className="bg-[#F0F3FF] border border-blue-100 rounded-xl p-3.5 shadow-xs flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#1E3A8A] shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[19px]">shield</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-[#1E3A8A]">
                  Kuota Klaim Aktif (Aturan B1)
                </span>
                <span className="text-xs font-bold text-slate-600 font-mono">
                  {activeClaimsCount} / 3 Klaim
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                Maksimal 3 klaim aktif secara bersamaan untuk mencegah spam dan menjaga akurasi temuan.
              </p>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-[#FD761A] h-1.5 rounded-full transition-all"
                  style={{ width: `${(activeClaimsCount / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Feed: LAPORAN SAYA TAB */}
      {activeSubTab === 'laporan' && (
        <section className="px-4 mt-3 flex flex-col gap-4">
          {filteredReports.map((item) => {
            const isFound = item.type === 'ditemukan';
            const isTimelineOpen = !!expandedTimelines[item.id];

            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                {/* Media Header with Floating Badges */}
                <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
                  <img
                    src={item.primaryImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                  {/* Left Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs backdrop-blur-sm ${
                        isFound
                          ? 'bg-[#DCFCE7] text-[#166534]'
                          : 'bg-[#FEE2E2] text-[#991B1B]'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {isFound ? 'check_circle' : 'error'}
                      </span>
                      <span>{isFound ? 'Ditemukan' : 'Hilang'}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#00236F] text-white text-xs font-semibold shadow-xs">
                      <span className="material-symbols-outlined text-[13px]">published_with_changes</span>
                      <span>{item.status === 'diklaim' ? 'Diklaim' : 'Aktif'}</span>
                    </span>
                  </div>

                  {/* Right days counter badge */}
                  {item.daysRemaining !== undefined && (
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs backdrop-blur-md ${
                          item.daysRemaining <= 3
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-white/90 text-[#00236F]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {item.daysRemaining <= 3 ? 'warning' : 'timer'}
                        </span>
                        <span>{item.daysRemaining} hari tersisa</span>
                      </span>
                    </div>
                  )}

                  {/* Footnote inside photo */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center text-white text-xs font-medium drop-shadow">
                    <span className="material-symbols-outlined text-[15px] mr-1 text-[#FD761A]">
                      place
                    </span>
                    <span className="truncate">
                      {item.locationBuildingLabel} • {item.reportedAtDisplay}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 flex flex-col gap-3">
                  <div>
                    <h2
                      onClick={() => onSelectReport(item)}
                      className="text-base font-bold text-slate-900 leading-snug cursor-pointer hover:text-[#00236F]"
                    >
                      {item.title}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                  </div>

                  {/* Pending Claim or Approved Notice */}
                  {item.status === 'diklaim' && item.approvedClaimUser ? (
                    <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-[20px] text-[#9D4300] mt-0.5">
                        verified_user
                      </span>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-[#9D4300] leading-tight">
                          Siap Serah Terima!
                        </p>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          Klaim oleh <strong>{item.approvedClaimUser.name} ({item.approvedClaimUser.nim})</strong> telah disetujui Admin Ruang Logistik.
                        </p>
                      </div>
                    </div>
                  ) : item.pendingClaimsCount ? (
                    <div className="p-2.5 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FD761A] animate-pulse"></div>
                      <p className="text-xs font-bold text-[#00236F] flex-1">
                        {item.pendingClaimsCount} klaim baru diajukan • Menunggu verifikasi admin
                      </p>
                      <span className="material-symbols-outlined text-[16px] text-[#00236F]">
                        chevron_right
                      </span>
                    </div>
                  ) : null}

                  {/* Expandable Riwayat Penanganan (Timeline) */}
                  {item.timeline && item.timeline.length > 0 && (
                    <div className="bg-[#F0F3FF]/70 rounded-xl p-3 border border-blue-100/60">
                      <button
                        type="button"
                        onClick={() => toggleTimeline(item.id)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <span className="text-xs font-bold text-[#00236F] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px]">history</span>
                          <span>Riwayat Penanganan</span>
                        </span>
                        <span className="material-symbols-outlined text-[18px] text-slate-500 transition-transform">
                          {isTimelineOpen ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>

                      {isTimelineOpen && (
                        <div className="mt-3 flex flex-col gap-3 pl-2 transition-all">
                          {item.timeline.map((t, idx) => (
                            <div
                              key={idx}
                              className={`relative pl-5 ${
                                idx < item.timeline!.length - 1
                                  ? "before:content-[''] before:absolute before:left-1 before:top-2 before:bottom-[-16px] before:w-0.5 before:bg-blue-200"
                                  : ''
                              }`}
                            >
                              <div
                                className={`absolute left-0 top-1 w-2.5 h-2.5 rounded-full shadow-xs ${
                                  t.statusType === 'claim'
                                    ? 'bg-[#FD761A]'
                                    : t.statusType === 'active'
                                    ? 'bg-[#00236F]'
                                    : 'bg-[#16A34A]'
                                }`}
                              ></div>
                              <p className="text-xs font-bold text-slate-800 leading-snug">
                                {t.title}
                              </p>
                              <p className="text-[11px] text-slate-500 mt-0.5">{t.time}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {item.status === 'diklaim' ? (
                    <div className="flex flex-col gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onConfirmHandover(item.id)}
                        className="w-full h-11 px-4 rounded-xl bg-[#FD761A] hover:bg-[#EA580C] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors active:scale-[0.98]"
                      >
                        <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                        <span>Konfirmasi Serah Terima</span>
                      </button>

                      <a
                        href="https://wa.me/6281234567890?text=Halo%20Faiz,%20terkait%20serah%20terima%20barang%20Tel-U"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full h-10 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#00236F] font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200"
                      >
                        <span className="material-symbols-outlined text-[18px] text-emerald-600">
                          chat
                        </span>
                        <span>Hubungi Faiz via WhatsApp</span>
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onSelectReport(item)}
                        className="flex-1 h-10 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#00236F] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                      >
                        <span className="material-symbols-outlined text-[17px]">edit</span>
                        <span>Ubah</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => onExtendReport(item.id)}
                        className="flex-1 h-10 px-3 rounded-xl bg-[#00236F] hover:bg-[#1E3A8A] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[17px]">update</span>
                        <span>Perpanjang (+30)</span>
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}

          {filteredReports.length === 0 && (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <span className="material-symbols-outlined text-[36px] text-slate-400 mb-2">
                assignment_late
              </span>
              <p className="font-bold text-slate-800 text-sm">Tidak ada laporan dengan status ini</p>
              <p className="text-xs text-slate-500 mt-1">
                Laporan Anda akan tercatat di sini setelah dibuat.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Content Feed: KLAIM SAYA TAB */}
      {activeSubTab === 'klaim' && (
        <section className="px-4 mt-3 flex flex-col gap-4">
          {filteredClaims.map((claim) => {
            return (
              <div
                key={claim.id}
                className="p-4 rounded-2xl bg-white shadow-xs border border-slate-200/80 flex flex-col gap-3"
              >
                {/* Top Row */}
                <div className="flex items-start gap-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100 relative border border-slate-100">
                    <img
                      src={claim.imageUrl}
                      alt={claim.itemTitle}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold backdrop-blur-xs">
                      {claim.category}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                          claim.status === 'waiting'
                            ? 'bg-amber-100 text-amber-800'
                            : claim.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[12px]">
                          {claim.status === 'waiting'
                            ? 'schedule'
                            : claim.status === 'approved'
                            ? 'check_circle'
                            : 'cancel'}
                        </span>
                        <span>
                          {claim.status === 'waiting'
                            ? 'Menunggu Verifikasi'
                            : claim.status === 'approved'
                            ? 'Disetujui'
                            : 'Ditolak'}
                        </span>
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 font-semibold">
                        #{claim.id}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-1">
                      {claim.itemTitle}
                    </h3>

                    <div className="flex items-center gap-1 text-slate-500 mt-1 text-xs truncate">
                      <span className="material-symbols-outlined text-[14px] shrink-0 text-[#FD761A]">
                        location_on
                      </span>
                      <span className="truncate">{claim.location}</span>
                    </div>
                  </div>
                </div>

                {/* Characteristics Box */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-1 text-[#00236F] font-bold text-[11px]">
                    <span className="material-symbols-outlined text-[14px]">description</span>
                    <span>Ciri Kepemilikan Diajukan:</span>
                  </div>
                  <p className="text-slate-700 italic">"{claim.submittedCharacteristics}"</p>
                </div>

                {/* Specific Status Callouts */}
                {claim.status === 'waiting' && (
                  <>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50/70 border border-orange-100 text-slate-700 text-xs">
                      <span className="material-symbols-outlined text-[16px] text-[#FD761A] shrink-0">
                        hourglass_top
                      </span>
                      <span className="truncate">
                        Sedang ditinjau Tim Layanan Kampus • {claim.reviewTimeEst}
                      </span>
                    </div>
                    <div className="pt-1 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-slate-500">
                        Diajukan: {claim.submittedAt}
                      </span>
                      <button
                        type="button"
                        onClick={() => onCancelClaim(claim.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-xs flex items-center gap-1 transition-colors border border-rose-200"
                      >
                        <span className="material-symbols-outlined text-[14px]">cancel</span>
                        <span>Batalkan Klaim</span>
                      </button>
                    </div>
                  </>
                )}

                {claim.status === 'approved' && (
                  <>
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2">
                      <span className="material-symbols-outlined text-[16px] text-emerald-700 mt-0.5">
                        handshake
                      </span>
                      <div className="flex-1 text-xs">
                        <p className="font-bold text-emerald-900">
                          Klaim Anda Sah &amp; Terverifikasi!
                        </p>
                        <p className="text-slate-600 mt-0.5 leading-snug">
                          Barang saat ini disimpan di {claim.pickupLocation}. Silakan hubungi petugas/pelapor untuk jadwal serah terima.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-1">
                      <a
                        href={`https://wa.me/${claim.contactNumber}?text=Halo%20Admin%20FindIt,%20saya%20pemilik%20klaim%20%23${claim.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">chat</span>
                        <span>Hubungi via WhatsApp (Petugas)</span>
                      </a>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-500">
                          Disetujui: {claim.reviewedAt}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onShowToast(`Lokasi pengambilan fisik: ${claim.pickupLocation}. Wajib bawa KTM Asli.`)
                          }
                          className="px-3 py-1 rounded-lg bg-blue-50 text-[#00236F] font-bold text-xs flex items-center gap-1 border border-blue-200"
                        >
                          <span className="material-symbols-outlined text-[15px]">pin_drop</span>
                          <span>Lokasi Ambil</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {claim.status === 'rejected' && (
                  <>
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-rose-900">
                        <span className="material-symbols-outlined text-[16px] text-rose-600">info</span>
                        <span>Alasan Penolakan Petugas (B7):</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed font-medium">
                        "{claim.rejectionReason}"
                      </p>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug">
                      Status penolakan bersifat final. Jika barang Anda berbeda, Anda dapat memantau kembali Peta Barang atau membuat laporan kehilangan baru.
                    </p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        Ditinjau: {claim.reviewedAt}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onShowToast('Menghubungkan ke Helpdesk Logistik Telkom University...')
                        }
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#00236F] font-bold text-xs flex items-center gap-1 border border-slate-200"
                      >
                        <span className="material-symbols-outlined text-[16px]">support_agent</span>
                        <span>Tanya Helpdesk</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {/* Guidelines Box */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00236F] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">help_outline</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#00236F]">Panduan Serah Terima</h4>
                <p className="text-[11px] text-slate-500">
                  Wajib membawa KTM asli saat pengambilan barang di pos satpam
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[20px]">
              arrow_forward
            </span>
          </div>
        </section>
      )}

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
