import React from 'react';
import { Award, BookOpen, GraduationCap, RotateCcw, Lock } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { BADGES } from '../data/historyData';

interface HeaderProps {
  onOpenTimelineModal?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const {
    unlockedBadges,
    xp,
    teacherMode,
    toggleTeacherMode,
    setIsGlossaryOpen,
    setIsBadgeModalOpen,
    resetProgress,
    completedStations,
    isTeacherAuthenticated,
    lockTeacherDashboard,
  } = useProgress();

  return (
    <header className="sticky top-0 z-40 bg-amber-50/90 backdrop-blur-md border-b border-amber-900/10 px-4 md:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-900 via-red-800 to-amber-500 flex items-center justify-center text-white shadow-sm font-serif-title font-bold text-lg">
            1848
          </div>
          <button
            onClick={() => {
              if (teacherMode) toggleTeacherMode();
            }}
            className="text-left group"
          >
            <span className="font-serif-title text-xl font-bold tracking-tight text-slate-900 block group-hover:text-amber-800 transition-colors whitespace-nowrap">
              Einigkeit &amp; Freiheit
            </span>
          </button>
        </div>

        {/* Zone 2: Single-line nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
          <button
            onClick={() => {
              if (teacherMode) toggleTeacherMode();
            }}
            className={`whitespace-nowrap transition-colors hover:text-amber-900 ${
              !teacherMode ? 'text-amber-950 font-semibold' : 'text-slate-600'
            }`}
          >
            Lernreise (Klasse 8–10)
          </button>

          <button
            onClick={() => setIsGlossaryOpen(true)}
            className="flex items-center gap-1.5 whitespace-nowrap transition-colors text-slate-600 hover:text-amber-900"
          >
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Historisches Lexikon</span>
          </button>

          <button
            onClick={() => setIsBadgeModalOpen(true)}
            className="flex items-center gap-1.5 whitespace-nowrap transition-colors text-slate-600 hover:text-amber-900"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>Abzeichen-Vitrine ({unlockedBadges.length}/{BADGES.length})</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTeacherMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                teacherMode
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200/70 border border-amber-900/15'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{teacherMode ? 'Schüler-Ansicht' : 'Lehrer-Pult'}</span>
            </button>

            {isTeacherAuthenticated && teacherMode && (
              <button
                onClick={lockTeacherDashboard}
                title="Lehrer-Pult wieder sperren"
                className="px-2 py-1.5 bg-red-100 hover:bg-red-200 text-red-900 border border-red-300 rounded-md text-[11px] font-bold flex items-center gap-1 transition-colors"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sperren</span>
              </button>
            )}
          </div>
        </nav>

        {/* Zone 3: Primary Action / Stats */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs bg-amber-100/60 border border-amber-900/10 px-3 py-1.5 rounded-lg text-slate-800">
            <span className="font-semibold text-amber-900">{completedStations.length}/7</span>
            <span className="text-slate-500">Stationen</span>
            <span className="text-slate-300">|</span>
            <span className="font-mono font-bold text-amber-900 tabular-nums">{xp}</span>
            <span className="text-slate-500">XP</span>
          </div>

          <button
            onClick={() => setIsBadgeModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-amber-700 to-red-800 hover:from-amber-800 hover:to-red-900 rounded-lg shadow-sm transition-all whitespace-nowrap flex items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Orden ansehen</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Möchtest du deinen Lernfortschritt wirklich auf 0 zurücksetzen?')) {
                resetProgress();
              }
            }}
            title="Fortschritt zurücksetzen"
            className="p-1.5 text-slate-400 hover:text-slate-700 transition-colors rounded-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
