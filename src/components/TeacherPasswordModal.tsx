import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X, AlertCircle, KeyRound } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export const TeacherPasswordModal: React.FC = () => {
  const {
    isPasswordModalOpen,
    setIsPasswordModalOpen,
    authenticateTeacher,
    teacherPasswordHint,
  } = useProgress();

  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isPasswordModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      setErrorMsg('Bitte gib ein Passwort ein.');
      return;
    }

    const success = authenticateTeacher(passwordInput);
    if (success) {
      setPasswordInput('');
      setErrorMsg(null);
    } else {
      setErrorMsg('Falsches Passwort! Bitte überprüfe deine Eingabe.');
    }
  };

  const handleClose = () => {
    setIsPasswordModalOpen(false);
    setPasswordInput('');
    setErrorMsg(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full border border-amber-900/15 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl font-bold">Lehrer-Pult entsperren</h3>
              <p className="text-xs text-slate-300">Zugriffsbeschränkter Bereich</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Dieser Bereich enthält <strong>Musterlösungen</strong> zu allen Schulbuchaufgaben sowie den{' '}
            <strong>Arbeitsblatt-Generator</strong>. Um Schüler vor Spoilern zu schützen, ist der Zugriff
            passwortgeschützt.
          </p>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
              Passwort:
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="Passwort eingeben..."
                autoFocus
                className="w-full pl-3 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 bg-slate-50 text-slate-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-900 text-xs rounded-xl flex items-center gap-2 font-medium animate-in shake duration-200">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="p-3 bg-amber-50/70 border border-amber-900/10 rounded-xl text-[11px] text-amber-950 flex items-start gap-2">
            <KeyRound className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Standard-Passwort: </span>
              <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-900 font-mono font-bold">
                {teacherPasswordHint}
              </code>
              <span className="block text-slate-500 mt-0.5">
                (Kann im Lehrer-Dashboard jederzeit geändert werden)
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Pult entsperren</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
