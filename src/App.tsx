import React, { useState } from 'react';
import { Award, BookOpen, GraduationCap, Sparkles, ChevronRight, CheckCircle2, History } from 'lucide-react';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { Header } from './components/Header';
import { TimelineNav } from './components/TimelineNav';
import { StationView } from './components/StationView';
import { TeacherDashboard } from './components/TeacherDashboard';
import { BadgeModal } from './components/BadgeModal';
import { GlossaryModal } from './components/GlossaryModal';
import { TeacherPasswordModal } from './components/TeacherPasswordModal';
import { STATIONS, BADGES, TIMELINE_EVENTS } from './data/historyData';

const MainContent: React.FC = () => {
  const {
    activeStationId,
    setActiveStationId,
    teacherMode,
    toggleTeacherMode,
    setIsGlossaryOpen,
    setIsBadgeModalOpen,
    completedStations,
    recentlyUnlockedBadge,
    dismissBadgeNotification,
  } = useProgress();

  const [showTimelineOverview, setShowTimelineOverview] = useState<boolean>(false);
  const activeStation = STATIONS.find((s) => s.id === activeStationId) || STATIONS[0];
  const recentBadgeObj = BADGES.find((b) => b.id === recentlyUnlockedBadge);

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/20 text-slate-800">
      <Header />

      {/* Badge Unlock Notification Toast */}
      {recentBadgeObj && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-950 text-white p-4 rounded-2xl shadow-2xl border border-amber-500/40 animate-in slide-in-from-bottom duration-300 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-amber-400 font-bold block">
                Neuer Orden erworben!
              </span>
              <h4 className="font-bold text-xs text-white">{recentBadgeObj.title}</h4>
              <p className="text-[11px] text-slate-300 line-clamp-1">{recentBadgeObj.description}</p>
            </div>
          </div>
          <button
            onClick={() => {
              dismissBadgeNotification();
              setIsBadgeModalOpen(true);
            }}
            className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg whitespace-nowrap transition-colors"
          >
            Öffnen
          </button>
        </div>
      )}

      {/* Main Layout Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        {teacherMode ? (
          <TeacherDashboard />
        ) : (
          <>
            {/* Timeline Bar across Stations 1–7 */}
            <TimelineNav />

            {/* Quick Hero Banner for Students */}
            <div className="bg-gradient-to-r from-amber-950 via-red-950 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="relative z-10 max-w-2xl">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block mb-1">
                  Mittelstufe (Klasse 8–10) · Interaktive Geschichtswerkstatt
                </span>
                <h1 className="font-serif-title text-2xl md:text-3xl font-bold tracking-tight">
                  Deutschland zwischen Restauration &amp; Revolution
                </h1>
                <p className="text-xs md:text-sm text-slate-300 mt-2 leading-relaxed">
                  Begib dich auf eine Zeitreise von den Befreiungskriegen 1813 bis zur ersten
                  Nationalversammlung in der Frankfurter Paulskirche. Löse Quests, untersuche verbotene
                  Karikaturen und sammle historische Orden!
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
                  <button
                    onClick={() => setShowTimelineOverview((prev) => !prev)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 transition-colors font-medium"
                  >
                    <History className="w-3.5 h-3.5 text-amber-400" />
                    <span>{showTimelineOverview ? 'Chronik verbergen' : 'Epochen-Chronik (1813–1849)'}</span>
                  </button>

                  <button
                    onClick={() => setIsGlossaryOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 transition-colors font-medium"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Begriffs-Lexikon</span>
                  </button>
                </div>
              </div>

              {/* Progress Pillar */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-xl shrink-0 text-center min-w-[180px]">
                <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider block">
                  Dein Gesamtfortschritt
                </span>
                <div className="font-mono text-2xl font-bold text-white mt-1">
                  {completedStations.length} / 7
                </div>
                <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-amber-400 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${(completedStations.length / 7) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-300 mt-2 block">
                  {completedStations.length === 7 ? 'Alle Stationen gemeistert! 🏆' : 'Stationen gelöst'}
                </span>
              </div>
            </div>

            {/* Expandable Historical Timeline Milestone Chart */}
            {showTimelineOverview && (
              <div className="bg-white rounded-2xl border border-amber-900/15 p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-serif-title text-lg font-bold text-slate-900">
                      Chronik der Epoche (1813 bis 1849)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Alle zentralen Meilensteine des Lehrplans im Überblick
                    </p>
                  </div>
                  <button
                    onClick={() => setShowTimelineOverview(false)}
                    className="text-xs text-slate-400 hover:text-slate-700 font-semibold"
                  >
                    Schließen ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {TIMELINE_EVENTS.map((ev, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-900/10 space-y-1 hover:border-amber-900/30 transition-colors"
                    >
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-900 text-white inline-block">
                        {ev.year}
                      </span>
                      <h4 className="font-serif-title font-bold text-sm text-slate-900">{ev.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{ev.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Station Component */}
            <StationView station={activeStation} />
          </>
        )}
      </main>

      {/* Modals */}
      <BadgeModal />
      <GlossaryModal />
      <TeacherPasswordModal />

      {/* Footer */}
      <footer className="mt-auto border-t border-amber-900/10 bg-amber-100/30 py-6 px-4 md:px-8 text-center text-xs text-slate-600 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            <strong>Einigkeit und Freiheit (1815–1849)</strong> · Interaktive Lernplattform für den
            Geschichtsunterricht (Klassen 8 bis 10).
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Befreiungskriege</span>
            <span>·</span>
            <span>Wiener Kongress</span>
            <span>·</span>
            <span>Vormärz</span>
            <span>·</span>
            <span>Paulskirche 1848</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ProgressProvider>
      <MainContent />
    </ProgressProvider>
  );
}
