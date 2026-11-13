import React, { useState } from 'react';

interface AuthLoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onGoToRegister: () => void;
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export const AuthLoginScreen: React.FC<AuthLoginScreenProps> = ({
  onLoginSuccess,
  onGoToRegister,
  onBack,
  onShowToast,
}) => {
  const [email, setEmail] = useState('faiz@student.telkomuniversity.ac.id');
  const [password, setPassword] = useState('Rahasia123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorBanner, setShowErrorBanner] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onShowToast('Login SSO Telkom University Berhasil! Selamat datang.');
      onLoginSuccess(email);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-12 pt-3 bg-[#F9F9FF] min-h-screen">
      {/* Top Back Nav */}
      <div className="flex items-center justify-between pb-2">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-200"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <span className="text-xs font-semibold text-slate-500">SSO Portal</span>
      </div>

      {/* Campus Institution Badge */}
      <div className="flex flex-col items-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7EEFE] text-[#00236F] mb-3 shadow-2xs border border-blue-200/60">
          <span
            className="material-symbols-outlined text-[16px] text-[#00236F]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            school
          </span>
          <span className="text-[11px] uppercase tracking-wider font-bold">
            TELKOM UNIVERSITY
          </span>
        </div>

        {/* App Logo */}
        <div className="relative w-16 h-16 rounded-2xl bg-[#1E3A8A] text-white shadow-md flex items-center justify-center mb-3">
          <span className="material-symbols-outlined text-[32px]">travel_explore</span>
          <span
            className="material-symbols-outlined absolute -bottom-1 -right-1 text-[#FD761A] text-[20px] bg-white rounded-full p-0.5 shadow-xs"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            location_on
          </span>
        </div>

        {/* Title & Description */}
        <h1 className="text-xl font-bold text-[#00236F] text-center tracking-tight">
          Masuk ke FindIt Campus
        </h1>
        <p className="text-xs text-slate-600 text-center max-w-xs leading-relaxed mt-1">
          Portal terpadu pelaporan &amp; pencarian barang hilang di lingkungan kampus.
        </p>
      </div>

      {/* Login Form Container */}
      <div className="w-full mt-4 bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 flex flex-col gap-3.5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Email field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800" htmlFor="campusEmail">
                Email Kampus / Akun
              </label>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                SSO Tel-U
              </span>
            </div>
            <div className="relative flex items-center rounded-xl bg-slate-50 border border-slate-200">
              <div className="absolute left-3 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[19px]">mail</span>
              </div>
              <input
                id="campusEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="faiz@student.telkomuniversity.ac.id"
                required
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-transparent text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-800" htmlFor="campusPassword">
              Kata Sandi
            </label>
            <div className="relative flex items-center rounded-xl bg-slate-50 border border-slate-200">
              <div className="absolute left-3 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[19px]">lock</span>
              </div>
              <input
                id="campusPassword"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi minimal 8 karakter"
                required
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-transparent text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 flex items-center text-slate-400 hover:text-slate-600 p-1"
                aria-label="Tampilkan atau sembunyikan kata sandi"
              >
                <span className="material-symbols-outlined text-[19px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>

            {/* Error notice banner (as shown in mock) */}
            {showErrorBanner && (
              <div className="flex items-start gap-1.5 mt-1 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 relative">
                <span
                  className="material-symbols-outlined text-[16px] text-rose-600 shrink-0 mt-0.5"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  error
                </span>
                <span className="text-[11px] leading-snug font-medium flex-1">
                  Kombinasi email atau kata sandi tidak sesuai. Tersisa 2 percobaan sebelum akun dikunci 15 menit.
                </span>
                <button
                  type="button"
                  onClick={() => setShowErrorBanner(false)}
                  className="text-rose-400 hover:text-rose-700 text-xs"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#FD761A] focus:ring-0 cursor-pointer accent-[#FD761A]"
              />
              <span className="text-xs text-slate-600">Ingat saya di perangkat ini</span>
            </label>
            <button
              type="button"
              onClick={() => onShowToast('Tautan reset sandi dikirim ke email mahasiswa')}
              className="text-xs font-bold text-[#00236F] hover:underline"
            >
              Lupa Kata Sandi?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-[#FD761A] hover:bg-[#EA580C] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] mt-1"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Memverifikasi SSO...</span>
              </>
            ) : (
              <>
                <span>MASUK</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>

          {/* Link to register */}
          <div className="text-center pt-1 text-xs text-slate-600">
            <span>Belum punya akun?</span>
            <button
              type="button"
              onClick={onGoToRegister}
              className="font-bold text-[#00236F] ml-1 hover:underline"
            >
              Daftar Sekarang
            </button>
          </div>
        </form>
      </div>

      {/* SSO Access Pill */}
      <div className="mt-3 w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#E7EEFE] rounded-xl border border-blue-200">
        <span className="material-symbols-outlined text-[16px] text-[#00236F]">badge</span>
        <span className="text-xs font-bold text-[#00236F]">
          Akses Mahasiswa &amp; Staf Terverifikasi
        </span>
      </div>

      {/* Help & Campus Services Box */}
      <div className="w-full mt-3 bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col gap-2 shadow-2xs">
        <div className="flex items-center gap-2 text-[#00236F]">
          <div className="w-7 h-7 rounded-full bg-[#DCE1FF] flex items-center justify-center">
            <span
              className="material-symbols-outlined text-[16px] text-[#00236F]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_police
            </span>
          </div>
          <h2 className="text-xs font-bold">Posko Layanan Fisik Terpadu</h2>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Barang berharga seperti dokumen identitas resmi (KTM, KTP) atau elektronik dapat segera diserahkan atau diambil di <strong className="font-bold text-slate-800">Pos Keamanan Utama Gedung Bangkit (Rektorat)</strong> atau <strong className="font-bold text-slate-800">Open Library Lt. 2</strong>.
        </p>

        {/* Contacts */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
            <span className="material-symbols-outlined text-[18px] text-[#FD761A]">call</span>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-slate-800 truncate">Call Center Satpam</span>
              <span className="text-[9px] text-slate-500 truncate">Ext. 1102 / 1103</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200">
            <span className="material-symbols-outlined text-[18px] text-emerald-600">support_agent</span>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-slate-800 truncate">Helpdesk Logistik</span>
              <span className="text-[9px] text-slate-500 truncate">WhatsApp Center</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-4 text-center">
        <p className="text-[10px] text-slate-400">
          © 2025 Direktorat Logistik &amp; Keamanan Lingkungan Telkom University
        </p>
      </footer>
    </div>
  );
};
