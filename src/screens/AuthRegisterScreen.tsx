import React, { useState } from 'react';

interface AuthRegisterScreenProps {
  onRegisterSuccess: (name: string, email: string) => void;
  onGoToLogin: () => void;
  onBack: () => void;
  onShowToast: (msg: string) => void;
}

export const AuthRegisterScreen: React.FC<AuthRegisterScreenProps> = ({
  onRegisterSuccess,
  onGoToLogin,
  onBack,
  onShowToast,
}) => {
  const [fullName, setFullName] = useState('Muhammad Faiz Ghiffari');
  const [nim, setNim] = useState('103032400002');
  const [email, setEmail] = useState('faiz@student.telkomuniversity.ac.id');
  const [phone, setPhone] = useState('081234567890');
  const [password, setPassword] = useState('Telkom2025!');
  const [confirmPassword, setConfirmPassword] = useState('Telkom2025!');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Compute password score (0 to 4)
  const computeScore = (val: string) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const score = computeScore(password);

  const getStrengthMeta = () => {
    if (password.length === 0) return { label: 'Lemah', colorClass: 'text-slate-400' };
    if (score <= 1) return { label: 'Rentan', colorClass: 'text-rose-600' };
    if (score === 2) return { label: 'Sedang', colorClass: 'text-amber-600' };
    if (score === 3) return { label: 'Kuat', colorClass: 'text-blue-700' };
    return { label: 'Sangat Kuat', colorClass: 'text-emerald-700' };
  };

  const strengthMeta = getStrengthMeta();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !nim.trim() || !email.trim() || !phone.trim()) {
      onShowToast('Harap lengkapi semua kolom bertanda bintang.');
      return;
    }
    if (!email.endsWith('@student.telkomuniversity.ac.id')) {
      onShowToast('Gunakan email institusi kampus @student.telkomuniversity.ac.id');
      return;
    }
    if (password !== confirmPassword) {
      onShowToast('Kata sandi dan ulangi kata sandi tidak cocok.');
      return;
    }
    if (!agreedToTerms) {
      onShowToast('Anda harus menyetujui Ketentuan Layanan & Kebijakan Privasi.');
      return;
    }

    onShowToast('Pendaftaran akun mahasiswa Telkom University berhasil!');
    onRegisterSuccess(fullName, email);
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
        <span className="text-xs font-semibold text-slate-500">Registrasi Mahasiswa</span>
      </div>

      {/* Brand Header */}
      <div className="flex flex-col items-center pt-2 pb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7EEFE] text-[#00236F] mb-3 shadow-2xs border border-blue-200/60">
          <span
            className="material-symbols-outlined text-[16px] text-[#00236F]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            account_balance
          </span>
          <span className="text-[11px] uppercase tracking-wider font-bold">
            TELKOM UNIVERSITY
          </span>
        </div>

        {/* App Logo Badge */}
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1E3A8A] text-white shadow-md mb-2">
          <span className="material-symbols-outlined text-[32px]">travel_explore</span>
          <span
            className="material-symbols-outlined absolute -bottom-1 -right-1 text-[#FD761A] text-[20px] bg-white rounded-full p-0.5 shadow-xs"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            location_on
          </span>
        </div>

        <h1 className="text-xl font-bold text-[#00236F] text-center tracking-tight">
          Daftar Akun
        </h1>
        <p className="text-xs text-slate-600 text-center max-w-xs mt-1 leading-relaxed">
          Buat akun mahasiswa Telkom University untuk mulai melaporkan atau mencari barang hilang.
        </p>
      </div>

      {/* Registration Form Card */}
      <div className="w-full bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Nama Lengkap */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1" htmlFor="nama-lengkap">
              <span>Nama Lengkap</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200">
              <span className="material-symbols-outlined absolute left-3 text-[#1E3A8A] text-[20px] pointer-events-none">
                person
              </span>
              <input
                id="nama-lengkap"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="cth. Muhammad Faiz Ghiffari"
                required
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-transparent text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          {/* NIM */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1" htmlFor="nim">
              <span>NIM (Nomor Induk Mahasiswa)</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200">
              <span className="material-symbols-outlined absolute left-3 text-[#1E3A8A] text-[20px] pointer-events-none">
                badge
              </span>
              <input
                id="nim"
                type="text"
                inputMode="numeric"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="103032400002"
                required
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-transparent text-xs font-mono font-medium text-slate-800 tracking-wider focus:outline-none"
              />
            </div>
          </div>

          {/* Email Mahasiswa */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1" htmlFor="email-kampus">
              <span>Email Mahasiswa</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200">
              <span className="material-symbols-outlined absolute left-3 text-[#1E3A8A] text-[20px] pointer-events-none">
                mail
              </span>
              <input
                id="email-kampus"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="faiz@student.telkomuniversity.ac.id"
                required
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-transparent text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[13px] text-emerald-600">verified</span>
              <span>Gunakan email institusi (@student.telkomuniversity.ac.id)</span>
            </p>
          </div>

          {/* Nomor WhatsApp */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1" htmlFor="nomor-telepon">
              <span>Nomor HP (WhatsApp)</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200">
              <span className="material-symbols-outlined absolute left-3 text-[#1E3A8A] text-[20px] pointer-events-none">
                phone_iphone
              </span>
              <input
                id="nomor-telepon"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="081234567890"
                required
                className="w-full h-11 pl-10 pr-3 rounded-xl bg-transparent text-xs font-medium text-slate-800 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-[13px] text-orange-600">handshake</span>
              <span>Digunakan untuk koordinasi serah terima barang</span>
            </p>
          </div>

          {/* Kata Sandi */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1" htmlFor="reg-password">
              <span>Kata Sandi</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200">
              <span className="material-symbols-outlined absolute left-3 text-[#1E3A8A] text-[20px] pointer-events-none">
                lock
              </span>
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-transparent text-xs font-medium text-slate-800 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-700 p-1"
                aria-label="Tampilkan atau sembunyikan kata sandi"
              >
                <span className="material-symbols-outlined text-[19px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>

            {/* Password Strength Meter */}
            <div className="flex flex-col gap-1 mt-1">
              <div className="grid grid-cols-4 gap-1.5 w-full h-1.5 rounded-full overflow-hidden bg-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    score >= 1 ? (score === 1 ? 'bg-rose-500' : 'bg-[#FD761A]') : 'bg-transparent'
                  }`}
                ></div>
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    score >= 2 ? (score === 2 ? 'bg-[#FD761A]' : 'bg-blue-600') : 'bg-transparent'
                  }`}
                ></div>
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    score >= 3 ? 'bg-blue-600' : 'bg-transparent'
                  }`}
                ></div>
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    score >= 4 ? 'bg-emerald-600' : 'bg-transparent'
                  }`}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[11px] text-slate-500">
                <span>Minimal 8 karakter (kombinasi huruf &amp; angka)</span>
                <span className={`font-bold ${strengthMeta.colorClass}`}>
                  {strengthMeta.label}
                </span>
              </div>
            </div>
          </div>

          {/* Ulangi Kata Sandi */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1" htmlFor="confirm-pass">
              <span>Ulangi Kata Sandi</span>
              <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center bg-slate-50 rounded-xl border border-slate-200">
              <span className="material-symbols-outlined absolute left-3 text-[#1E3A8A] text-[20px] pointer-events-none">
                lock_reset
              </span>
              <input
                id="confirm-pass"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-transparent text-xs font-medium text-slate-800 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 text-slate-400 hover:text-slate-700 p-1"
                aria-label="Tampilkan atau sembunyikan pengulangan kata sandi"
              >
                <span className="material-symbols-outlined text-[19px]">
                  {showConfirmPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              required
              className="mt-0.5 w-4 h-4 rounded text-[#FD761A] focus:ring-0 cursor-pointer accent-[#FD761A]"
            />
            <label htmlFor="terms" className="text-xs text-slate-700 cursor-pointer select-none leading-relaxed">
              Saya menyetujui{' '}
              <span className="font-bold text-[#00236F] hover:underline">Ketentuan Layanan</span> &amp;{' '}
              <span className="font-bold text-[#00236F] hover:underline">Kebijakan Privasi</span> FindIt Campus
            </label>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full h-12 mt-1 bg-[#FD761A] hover:bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>DAFTAR</span>
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>

          {/* Back to Login */}
          <div className="flex items-center justify-center gap-1.5 pt-1 text-xs text-slate-600">
            <span>Sudah punya akun?</span>
            <button
              type="button"
              onClick={onGoToLogin}
              className="font-bold text-[#00236F] hover:underline"
            >
              Masuk
            </button>
          </div>
        </form>
      </div>

      {/* SSO Trust Badge */}
      <div className="mt-4 flex items-center justify-center gap-2 bg-[#E7EEFE] px-3.5 py-2 rounded-xl text-center border border-blue-200">
        <span className="material-symbols-outlined text-emerald-700 text-[18px]">verified_user</span>
        <span className="text-xs font-bold text-[#00236F]">
          Verifikasi Otomatis SSO &amp; Mahasiswa Aktif Telkom University
        </span>
      </div>

      <footer className="mt-4 text-center">
        <p className="text-[10px] text-slate-400">
          © 2025 Direktorat Logistik &amp; Keamanan Lingkungan Telkom University
        </p>
      </footer>
    </div>
  );
};
