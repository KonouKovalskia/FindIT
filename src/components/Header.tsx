import React from 'react';

interface HeaderProps {
  currentScreen: string;
  onBack?: () => void;
  onOpenNotifications?: () => void;
  onOpenProfile?: () => void;
  onOpenShare?: () => void;
  onClose?: () => void;
  hasUnreadNotification?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onBack,
  onOpenNotifications,
  onOpenProfile,
  onOpenShare,
  onClose,
  hasUnreadNotification = true,
}) => {
  // Screen-specific header variants
  if (currentScreen === 'buat-laporan') {
    return (
      <header className="sticky top-0 z-40 bg-[#1E3A8A] text-white px-4 py-3.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Kembali"
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 active:scale-95 transition"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
          <div>
            <h1 className="text-base font-bold leading-tight">Buat Laporan</h1>
            <p className="text-[11px] text-blue-200">Formulir Pelaporan Barang Kampus</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-blue-900/60 px-2.5 py-1 rounded-full border border-blue-400/30">
          <span className="material-symbols-outlined text-amber-300 text-[14px] animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
          <span className="text-[11px] font-medium text-amber-200">AI Gemini Aktif</span>
        </div>
      </header>
    );
  }

  if (currentScreen === 'detail') {
    return (
      <header className="sticky top-0 w-full z-40 pt-safe bg-[#F9F9FF]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-slate-200/80">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onBack}
              aria-label="Kembali"
              className="w-10 h-10 flex items-center justify-center rounded-full text-slate-800 hover:bg-slate-200/70 active:scale-95 transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <h1 className="text-base font-bold text-slate-900 truncate">Detail Laporan</h1>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenShare}
              aria-label="Bagikan Laporan"
              className="w-10 h-10 flex items-center justify-center rounded-full text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">share</span>
            </button>
            <button
              type="button"
              onClick={onOpenProfile}
              className="w-8 h-8 rounded-full bg-[#00236F] text-white flex items-center justify-center shadow-xs active:scale-95 transition-transform"
              title="Profil Pengguna"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  if (currentScreen === 'poster') {
    return (
      <header className="sticky top-0 w-full z-40 bg-[#F9F9FF]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-slate-200/80">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onBack}
              aria-label="Kembali"
              className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-800 hover:bg-slate-200/70 active:scale-95 transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <h1 className="text-base font-bold text-slate-900 truncate">Poster Laporan</h1>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onClose || onBack}
              aria-label="Tutup"
              className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-200/70 active:scale-95 transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>
            <button
              type="button"
              onClick={onOpenProfile}
              className="w-8 h-8 rounded-full bg-[#00236F] text-white flex items-center justify-center shadow-xs"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Standard Header for Beranda, Peta, Laporan Saya, Profil
  const getSubLabel = () => {
    switch (currentScreen) {
      case 'peta':
        return 'Peta Kampus';
      case 'laporan-saya':
      case 'klaim-saya':
        return 'Laporan Saya';
      case 'profil':
        return 'Akun Pengguna';
      default:
        return 'Beranda';
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-white/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-slate-200/70">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white relative shadow-sm">
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span
              className="material-symbols-outlined text-[13px] text-[#FD761A] absolute -bottom-0.5 -right-0.5"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              location_on
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-bold text-base text-[#00236F] tracking-tight">FindIt</span>
              <span className="text-xs font-bold text-[#9D4300] uppercase tracking-wider">CAMPUS</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium truncate max-w-[140px]">
              {getSubLabel()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onOpenNotifications}
            aria-label="Notifikasi"
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-[#00236F] hover:bg-slate-100 transition-colors relative"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {hasUnreadNotification && (
              <span className="w-2 h-2 rounded-full bg-[#FD761A] absolute top-2 right-2.5 ring-2 ring-white"></span>
            )}
          </button>
          <button
            type="button"
            onClick={onOpenProfile}
            aria-label="Profil Akun"
            className="w-8 h-8 rounded-full bg-[#00236F] text-white flex items-center justify-center shadow-xs active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-white text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
