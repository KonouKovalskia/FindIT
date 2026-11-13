import React from 'react';

interface BottomNavProps {
  activeTab: 'beranda' | 'peta' | 'laporan-saya' | 'profil';
  onTabChange: (tab: 'beranda' | 'peta' | 'laporan-saya' | 'profil') => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'beranda', label: 'Beranda', icon: 'home' },
    { id: 'peta', label: 'Peta', icon: 'map' },
    { id: 'laporan-saya', label: 'Laporan Saya', icon: 'assignment' },
    { id: 'profil', label: 'Profil', icon: 'person' },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-1px_12px_rgba(0,0,0,0.05)] max-w-[430px] mx-auto">
      <div className="h-16 px-1 flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive =
            activeTab === tab.id ||
            (tab.id === 'laporan-saya' && activeTab === ('klaim-saya' as any));

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[46px] px-1 py-1 transition-all active:scale-95 ${
                isActive
                  ? 'text-[#00236F] font-bold'
                  : 'text-slate-500 font-medium hover:text-slate-800'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px] transition-transform"
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {tab.icon}
              </span>
              <span className="text-[11px] leading-tight mt-0.5 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
