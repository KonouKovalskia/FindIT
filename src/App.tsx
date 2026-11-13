import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FilterModal } from './components/FilterModal';
import { ShareModal } from './components/ShareModal';
import { ClaimModal } from './components/ClaimModal';
import { DirectionsModal } from './components/DirectionsModal';
import { Toast } from './components/Toast';

import { HomeScreen } from './screens/HomeScreen';
import { MapScreen } from './screens/MapScreen';
import { DetailScreen } from './screens/DetailScreen';
import { PosterScreen } from './screens/PosterScreen';
import { CreateReportScreen } from './screens/CreateReportScreen';
import { MyReportsScreen } from './screens/MyReportsScreen';
import { AuthLoginScreen } from './screens/AuthLoginScreen';
import { AuthRegisterScreen } from './screens/AuthRegisterScreen';
import { ProfileScreen } from './screens/ProfileScreen';

import { INITIAL_REPORTS, INITIAL_CLAIMS } from './mockData';
import { ClaimItem, FilterOptions, ReportItem } from './types';

export default function App() {
  // Navigation & Screen state
  const [currentScreen, setCurrentScreen] = useState<string>('beranda');
  const [activeTab, setActiveTab] = useState<'beranda' | 'peta' | 'laporan-saya' | 'profil'>('beranda');
  const [activeSubTab, setActiveSubTab] = useState<'laporan' | 'klaim'>('laporan');

  // Device display mode: 'mobile' (430px standard) or 'responsive'
  const [previewMode, setPreviewMode] = useState<'mobile' | 'responsive'>('mobile');

  // Data states
  const [reports, setReports] = useState<ReportItem[]>(INITIAL_REPORTS);
  const [claims, setClaims] = useState<ClaimItem[]>(INITIAL_CLAIMS);
  const [selectedReport, setSelectedReport] = useState<ReportItem>(INITIAL_REPORTS[0]);

  // Modals state
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isDirectionsModalOpen, setIsDirectionsModalOpen] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' | 'error' } | null>(null);

  // User state
  const [user, setUser] = useState({
    name: 'Muhammad Faiz Ghiffari',
    email: 'faiz@student.telkomuniversity.ac.id',
  });

  // Filter state for search/discovery
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    type: 'all',
    category: '',
    building: '',
    dateFrom: '2025-10-01',
    dateTo: '2025-10-25',
  });

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  // Screen navigation handlers
  const handleSelectReport = (report: ReportItem) => {
    setSelectedReport(report);
    setCurrentScreen('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: 'beranda' | 'peta' | 'laporan-saya' | 'profil') => {
    setActiveTab(tab);
    if (tab === 'laporan-saya') {
      setCurrentScreen('laporan-saya');
    } else {
      setCurrentScreen(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateReport = (newReport: ReportItem) => {
    setReports([newReport, ...reports]);
    setSelectedReport(newReport);
    setCurrentScreen('detail');
    showToast('Laporan berhasil dikirim dan kini berstatus Aktif di Peta Kampus!');
  };

  const handleSubmitClaim = (characteristics: string, photoProof?: string) => {
    const newClaim: ClaimItem = {
      id: `KLM-${Math.floor(1000 + Math.random() * 9000)}`,
      reportId: selectedReport.id,
      itemTitle: selectedReport.title,
      category: selectedReport.categoryLabel.split(' ')[0] || 'Barang',
      location: `${selectedReport.locationBuildingLabel} • ${selectedReport.reportedAtDisplay}`,
      eventDate: selectedReport.eventDate,
      imageUrl: selectedReport.primaryImage,
      status: 'waiting',
      submittedCharacteristics: characteristics,
      submittedAt: 'Baru saja',
      reviewTimeEst: 'Est. < 24 jam',
    };

    setClaims([newClaim, ...claims]);
    setIsClaimModalOpen(false);
    setActiveTab('laporan-saya');
    setActiveSubTab('klaim');
    setCurrentScreen('laporan-saya');
    showToast('Klaim kepemilikan berhasil dikirim! Menunggu verifikasi admin kampus.');
  };

  const handleCancelClaim = (claimId: string) => {
    setClaims(claims.filter((c) => c.id !== claimId));
    showToast(`Pengajuan klaim #${claimId} telah dibatalkan. Kuota aktif Anda dikembalikan.`);
  };

  const handleConfirmHandover = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId ? { ...r, status: 'selesai' as const } : r
      )
    );
    showToast('Serah terima barang telah selesai dan terverifikasi!');
  };

  const handleExtendReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === reportId ? { ...r, daysRemaining: (r.daysRemaining || 0) + 30 } : r
      )
    );
    showToast('Masa aktif laporan berhasil diperpanjang +30 hari (Aturan B4).');
  };

  const isBottomNavVisible = [
    'beranda',
    'peta',
    'laporan-saya',
    'klaim-saya',
    'profil',
  ].includes(currentScreen);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center">
      {/* Top Bar Switcher (Mobile Mockup 430px vs Full Width) */}
      <div className="w-full bg-[#00164E] text-white py-1.5 px-4 flex items-center justify-between text-xs z-50 shadow-sm border-b border-blue-900/50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="font-bold tracking-tight text-slate-100">FindIt Campus</span>
          <span className="hidden sm:inline text-blue-300">· Telkom University</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-lg border border-white/20">
            <button
              type="button"
              onClick={() => setPreviewMode('mobile')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1 ${
                previewMode === 'mobile'
                  ? 'bg-white text-[#00236F] shadow-xs'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">smartphone</span>
              <span>Mobile (430px)</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode('responsive')}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all flex items-center gap-1 ${
                previewMode === 'responsive'
                  ? 'bg-white text-[#00236F] shadow-xs'
                  : 'text-blue-200 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">desktop_windows</span>
              <span>Layar Lebar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main App Container */}
      <div
        className={`w-full bg-[#F9F9FF] min-h-[92vh] flex flex-col relative shadow-2xl transition-all duration-300 ${
          previewMode === 'mobile'
            ? 'max-w-[430px] my-0 sm:my-3 sm:rounded-3xl border border-slate-200/90 overflow-hidden'
            : 'max-w-4xl my-0 sm:my-3 sm:rounded-3xl border border-slate-200/90 overflow-hidden'
        }`}
      >
        {/* Universal App Header */}
        <Header
          currentScreen={currentScreen}
          onBack={() => {
            if (['detail', 'poster', 'buat-laporan', 'login', 'register'].includes(currentScreen)) {
              setCurrentScreen(activeTab);
            } else {
              setCurrentScreen('beranda');
              setActiveTab('beranda');
            }
          }}
          onOpenNotifications={() => {
            showToast('Semua notifikasi kampus terkini telah dibaca.');
          }}
          onOpenProfile={() => {
            setActiveTab('profil');
            setCurrentScreen('profil');
          }}
          onOpenShare={() => setIsShareModalOpen(true)}
          onClose={() => setCurrentScreen('detail')}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1 flex flex-col relative">
          {currentScreen === 'beranda' && (
            <HomeScreen
              reports={reports}
              onSelectReport={handleSelectReport}
              onOpenCreateReport={() => setCurrentScreen('buat-laporan')}
              onOpenFilterModal={() => setIsFilterModalOpen(true)}
              activeFilters={filters}
              onUpdateFilters={setFilters}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'peta' && (
            <MapScreen
              reports={reports}
              onSelectReport={handleSelectReport}
              onOpenDirections={(item) => {
                setSelectedReport(item);
                setIsDirectionsModalOpen(true);
              }}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'detail' && (
            <DetailScreen
              item={selectedReport}
              onBack={() => setCurrentScreen(activeTab)}
              onOpenClaim={() => setIsClaimModalOpen(true)}
              onOpenShare={() => setIsShareModalOpen(true)}
              onOpenPoster={() => setCurrentScreen('poster')}
              onOpenDirections={(item) => {
                setSelectedReport(item);
                setIsDirectionsModalOpen(true);
              }}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'poster' && (
            <PosterScreen
              item={selectedReport}
              onBack={() => setCurrentScreen('detail')}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'buat-laporan' && (
            <CreateReportScreen
              onBack={() => setCurrentScreen(activeTab)}
              onSubmitReport={handleCreateReport}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'laporan-saya' && (
            <MyReportsScreen
              reports={reports}
              claims={claims}
              activeSubTab={activeSubTab}
              onChangeSubTab={setActiveSubTab}
              onSelectReport={handleSelectReport}
              onOpenCreateReport={() => setCurrentScreen('buat-laporan')}
              onShowToast={showToast}
              onCancelClaim={handleCancelClaim}
              onConfirmHandover={handleConfirmHandover}
              onExtendReport={handleExtendReport}
            />
          )}

          {currentScreen === 'profil' && (
            <ProfileScreen
              userName={user.name}
              userEmail={user.email}
              onGoToLogin={() => setCurrentScreen('login')}
              onGoToRegister={() => setCurrentScreen('register')}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'login' && (
            <AuthLoginScreen
              onLoginSuccess={(email) => {
                setUser({ ...user, email });
                setCurrentScreen('beranda');
                setActiveTab('beranda');
              }}
              onGoToRegister={() => setCurrentScreen('register')}
              onBack={() => setCurrentScreen('profil')}
              onShowToast={showToast}
            />
          )}

          {currentScreen === 'register' && (
            <AuthRegisterScreen
              onRegisterSuccess={(name, email) => {
                setUser({ name, email });
                setCurrentScreen('beranda');
                setActiveTab('beranda');
              }}
              onGoToLogin={() => setCurrentScreen('login')}
              onBack={() => setCurrentScreen('profil')}
              onShowToast={showToast}
            />
          )}
        </main>

        {/* Bottom Navigation (Shown on main tabs) */}
        {isBottomNavVisible && (
          <BottomNav
            activeTab={activeTab}
            onTabChange={handleTabChange}
          />
        )}

        {/* Global Filter Modal */}
        {isFilterModalOpen && (
          <FilterModal
            currentFilters={filters}
            onApply={setFilters}
            onClose={() => setIsFilterModalOpen(false)}
          />
        )}

        {/* Global Share Modal */}
        {isShareModalOpen && (
          <ShareModal
            item={selectedReport}
            onClose={() => setIsShareModalOpen(false)}
            onOpenPoster={() => {
              setIsShareModalOpen(false);
              setCurrentScreen('poster');
            }}
            onShowToast={showToast}
          />
        )}

        {/* Global Claim Modal */}
        {isClaimModalOpen && (
          <ClaimModal
            item={selectedReport}
            onClose={() => setIsClaimModalOpen(false)}
            onSubmitClaim={handleSubmitClaim}
            onShowToast={showToast}
          />
        )}

        {/* Global Directions Modal */}
        {isDirectionsModalOpen && (
          <DirectionsModal
            item={selectedReport}
            onClose={() => setIsDirectionsModalOpen(false)}
            onShowToast={showToast}
          />
        )}

        {/* Global Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}
