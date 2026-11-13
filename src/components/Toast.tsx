import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'success',
  onClose,
  duration = 2600,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    if (type === 'error') return 'error';
    if (type === 'info') return 'info';
    return 'check_circle';
  };

  return (
    <div className="fixed top-20 left-4 right-4 z-50 flex items-center justify-between p-3.5 bg-slate-900 text-white rounded-xl shadow-2xl transition-all duration-300 animate-in slide-in-from-top-4 max-w-md mx-auto">
      <div className="flex items-center gap-2.5">
        <span
          className={`material-symbols-outlined text-[20px] ${
            type === 'success'
              ? 'text-emerald-400'
              : type === 'error'
              ? 'text-rose-400'
              : 'text-blue-400'
          }`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {getIcon()}
        </span>
        <span className="text-xs font-medium tracking-tight leading-snug">
          {message}
        </span>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        aria-label="Tutup notifikasi"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};
