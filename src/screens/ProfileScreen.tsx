import React from 'react';

interface ProfileScreenProps {
  userName: string;
  userEmail: string;
  onGoToLogin: () => void;
  onGoToRegister: () => void;
  onShowToast: (msg: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userName,
  userEmail,
  onGoToLogin,
  onGoToRegister,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-3 bg-[#F9F9FF]">
      {/* Profile Card Header */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-[#00236F] text-white flex items-center justify-center ring-4 ring-blue-50 shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBE6iEUYzoeJtccMTA5M4CdmOkxAFtoXPMN2CSI7gfp9Yrma3qF-Jr6IdIfpbtVt6WKog42FtvscOFCQa9z6BPf07KTqhdmJmqV6dswXFTKeif-tQ4oTcplsBwwRBCIQmu6E6SS9DTRfH67MHN6saSVLKIevN-cAy9iF96fTtb_4T3NmInnBirsplHTwl4GgvsT5u9CyAg_NI1xEH8ISlg80Dd5v1hI3Ddh9lTRUP0"
              alt={userName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <h2 className="text-base font-bold text-slate-900 truncate">{userName}</h2>
              <span
                className="material-symbols-outlined text-[#16A34A] text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">NIM: 103032400002</p>
            <p className="text-[11px] text-slate-500 truncate">{userEmail}</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#E7EEFE] text-[#00236F] text-[10px] font-bold border border-blue-200">
              Mahasiswa Aktif Telkom University
            </span>
          </div>
        </div>

        {/* Reputation & Activity Badges */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
          <div className="p-2 rounded-xl bg-slate-50 text-center border border-slate-100">
            <span className="block text-sm font-extrabold text-[#00236F]">98%</span>
            <span className="text-[10px] text-slate-500 font-medium">Reputasi</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 text-center border border-slate-100">
            <span className="block text-sm font-extrabold text-[#FD761A]">3</span>
            <span className="text-[10px] text-slate-500 font-medium">Laporan</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 text-center border border-slate-100">
            <span className="block text-sm font-extrabold text-[#16A34A]">1</span>
            <span className="text-[10px] text-slate-500 font-medium">Klaim Aktif</span>
          </div>
        </div>
      </div>

      {/* Campus Identity & Verification Section */}
      <div className="mt-3 bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Status Akun &amp; Keamanan Kampus
        </h3>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F0F3FF] border border-blue-100">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#1E3A8A] text-[20px]">
              badge
            </span>
            <div>
              <p className="text-xs font-bold text-slate-800">SSO Tel-U Terhubung</p>
              <p className="text-[11px] text-slate-500">faiz@student.telkomuniversity.ac.id</p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
            Aktif
          </span>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-slate-600 text-[20px]">
              lock
            </span>
            <div>
              <p className="text-xs font-bold text-slate-800">Keamanan Sandi</p>
              <p className="text-[11px] text-slate-500">Terakhir diperbarui 2 minggu lalu</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onShowToast('Silakan perbarui kata sandi melalui SSO Telkom University')}
            className="text-xs font-bold text-[#00236F] hover:underline"
          >
            Ubah
          </button>
        </div>
      </div>

      {/* Screen Preview & Navigation Helpers */}
      <div className="mt-3 bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Navigasi Otentikasi &amp; Portal
        </h3>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={onGoToLogin}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1E3A8A] text-[18px]">
                login
              </span>
              <span>Buka Layar "Masuk ke FindIt Campus"</span>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">
              chevron_right
            </span>
          </button>

          <button
            type="button"
            onClick={onGoToRegister}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left flex items-center justify-between text-xs font-bold text-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#FD761A] text-[18px]">
                person_add
              </span>
              <span>Buka Layar "Daftar Akun Mahasiswa"</span>
            </div>
            <span className="material-symbols-outlined text-slate-400 text-[18px]">
              chevron_right
            </span>
          </button>
        </div>
      </div>

      {/* Posko Terpadu Callout */}
      <div className="mt-3 p-4 rounded-2xl bg-[#E7EEFE] border border-blue-200 text-xs text-slate-700 space-y-2">
        <div className="flex items-center gap-2 font-bold text-[#00236F]">
          <span className="material-symbols-outlined text-[18px]">support_agent</span>
          <span>Bantuan &amp; Layanan Logistik Kampus</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Gedung Bangkit (Rektorat) Lt. 1 &amp; Open Library Lt. 2 Telkom University, Jl. Telekomunikasi No. 1 Terusan Buahbatu Bandung.
        </p>
        <button
          type="button"
          onClick={() => onShowToast('Menghubungi Posko Keamanan Pusat Kampus')}
          className="text-xs font-bold text-[#00236F] underline"
        >
          Hubungi Hotline Satpam (Ext. 1102)
        </button>
      </div>

      {/* Logout / Switch Account */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => {
            onShowToast('Berhasil keluar. Silakan masuk kembali.');
            onGoToLogin();
          }}
          className="w-full py-3 rounded-xl border border-rose-300 bg-rose-50/50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Keluar dari Akun</span>
        </button>
      </div>
    </div>
  );
};
