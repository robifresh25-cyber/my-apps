import React, { useEffect, useState } from 'react';
import { Lock, X, Delete, AlertCircle } from 'lucide-react';
import { soundFX } from '../utils/sound';

interface PinLockModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

const TEACHER_PIN = '2026';

export const PinLockModal: React.FC<PinLockModalProps> = ({ onSuccess, onClose }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  const appendDigit = (digit: string) => {
    soundFX.playClick();
    setError(null);
    setPin((prev) => {
      if (prev.length >= 4) return prev;
      const next = prev + digit;
      if (next.length === 4) {
        if (next === TEACHER_PIN) {
          soundFX.playSuccess();
          setTimeout(() => onSuccess(), 120);
        } else {
          soundFX.playError();
          setTimeout(() => {
            setError('PIN salah. Masukkan 4 digit PIN guru yang benar.');
            setPin('');
          }, 160);
        }
      }
      return next;
    });
  };

  const handleBackspace = () => {
    soundFX.playClick();
    setError(null);
    setPin((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        appendDigit(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Masuk Dasbor Guru"
    >
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-5 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">Dasbor Guru</h2>
              <p className="text-xs text-slate-400">Masukkan 4 digit PIN akses guru</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="w-9 h-9 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 4-Digit Masked PIN Slots */}
        <div className="grid grid-cols-4 gap-3 py-1">
          {[0, 1, 2, 3].map((idx) => {
            const filled = idx < pin.length;
            return (
              <div
                key={idx}
                className={`h-12 rounded-xl border flex items-center justify-center font-mono text-xl font-bold transition-colors ${
                  error
                    ? 'bg-red-950/35 border-red-500/70 text-red-200'
                    : filled
                    ? 'bg-slate-950 border-amber-400 text-amber-300'
                    : 'bg-slate-950 border-slate-800 text-slate-600'
                }`}
              >
                {filled ? '•' : ''}
              </div>
            );
          })}
        </div>

        {error && (
          <div className="rounded-lg px-3 py-2 bg-red-950/40 border border-red-500/60 text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Touch-friendly Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => appendDigit(digit)}
              className="h-12 rounded-xl bg-slate-950 hover:bg-slate-800 active:bg-slate-700 border border-slate-800 font-mono text-lg font-bold text-white transition-colors cursor-pointer"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setPin('');
              setError(null);
            }}
            className="h-12 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Bersih
          </button>
          <button
            type="button"
            onClick={() => appendDigit('0')}
            className="h-12 rounded-xl bg-slate-950 hover:bg-slate-800 active:bg-slate-700 border border-slate-800 font-mono text-lg font-bold text-white transition-colors cursor-pointer"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleBackspace}
            aria-label="Hapus satu angka"
            className="h-12 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
