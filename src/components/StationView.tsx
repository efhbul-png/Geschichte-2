import React, { useState } from 'react';
import {
  BookOpen,
  Quote,
  Gamepad2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Award,
  Sparkles,
  HelpCircle,
  Printer,
} from 'lucide-react';
import { Station } from '../types';
import { useProgress } from '../context/ProgressContext';
import { CaricatureInspector } from './games/CaricatureInspector';
import { PaulskircheGame } from './games/PaulskircheGame';
import { BarricadeGame } from './games/BarricadeGame';
import { PoemAnalyzer } from './games/PoemAnalyzer';
import { ConstitutionalQuiz } from './games/ConstitutionalQuiz';
import { STATIONS, BADGES } from '../data/historyData';

interface StationViewProps {
  station: Station;
}

export const StationView: React.FC<StationViewProps> = ({ station }) => {
  const { completedStations, completeStation, setActiveStationId, setIsBadgeModalOpen, requestTeacherMode } =
    useProgress();
  const [activeTab, setActiveTab] = useState<'reading' | 'sources' | 'quest'>('reading');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  const isCompleted = completedStations.includes(station.id);
  const badge = BADGES.find((b) => b.id === station.badgeId);

  const handleSelectQuiz = (qId: string, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = () => {
    setShowQuizResult(true);
    const correctCount = station.quiz.filter(
      (q) => quizAnswers[q.id] === q.correctIndex
    ).length;

    if (correctCount === station.quiz.length) {
      completeStation(station.id, 40, station.badgeId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Station Header Card */}
      <div className="bg-white rounded-2xl border border-amber-900/15 p-6 md:p-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-100/60 to-transparent -mr-16 -mt-16 rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold px-2.5 py-1 rounded bg-amber-900 text-amber-100">
                Station {station.id} von 7
              </span>
              <span className="font-mono font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                {station.period}
              </span>
              {isCompleted && (
                <span className="flex items-center gap-1 text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Station gemeistert!
                </span>
              )}
            </div>

            <button
              onClick={requestTeacherMode}
              title="Druckbares PDF-Arbeitsblatt zu dieser Station im geschützten Lehrer-Pult öffnen"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100/70 hover:bg-amber-200/80 border border-amber-900/15 text-amber-950 text-xs font-semibold transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5 text-amber-800" />
              <span>PDF-Arbeitsblatt</span>
            </button>
          </div>

          <h2 className="font-serif-title text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {station.title}
          </h2>
          <p className="text-slate-600 font-medium text-sm md:text-base mt-1">
            {station.subtitle}
          </p>

          <div className="mt-4 p-3.5 rounded-xl bg-amber-50/80 border border-amber-900/10 text-xs md:text-sm text-amber-950 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Leitfrage des Kapitels: </span>
              <span className="italic">{station.keyQuestion}</span>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('reading')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'reading'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1. Wissen &amp; Überblick</span>
          </button>

          <button
            onClick={() => setActiveTab('sources')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'sources'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            <span>2. Originalquellen ({station.quotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quest')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'quest'
                ? 'bg-gradient-to-r from-red-800 to-amber-700 text-white shadow-sm'
                : 'bg-amber-100/70 text-amber-950 hover:bg-amber-200/70 border border-amber-900/15'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 text-amber-300" />
            <span>3. Interaktives Spiel / Quest</span>
            {badge && (
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
                +{isCompleted ? 'Gelöst' : 'Orden'}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Tab 1: Lesetexte */}
      {activeTab === 'reading' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-amber-900/15 p-6 md:p-8 shadow-sm space-y-6">
              <div className="p-4 rounded-xl bg-amber-50/50 border-l-4 border-amber-700 text-xs md:text-sm text-slate-700 leading-relaxed italic">
                {station.summary}
              </div>

              {station.contentParagraphs.map((par, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-serif-title text-lg font-bold text-slate-900">
                    {par.heading}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {par.text}
                  </p>
                  {par.highlight && (
                    <div className="p-3 bg-amber-100/50 rounded-lg text-xs text-amber-900 border border-amber-900/10 font-medium">
                      📌 <strong>Merksatz:</strong> {par.highlight}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            {/* Quest Teaser Card */}
            <div className="bg-gradient-to-br from-amber-900 to-red-950 text-white p-6 rounded-2xl shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold block mb-1">
                Lernziel dieser Station
              </span>
              <h4 className="font-serif-title text-lg font-bold">
                Beweise dein historisches Wissen!
              </h4>
              <p className="text-xs text-amber-100 mt-2 leading-relaxed">
                Wechsle zum Tab <strong>„Interaktives Spiel / Quest“</strong>, um die Herausforderung
                zu meistern und das Kapitel-Abzeichen freizuschalten.
              </p>
              <button
                onClick={() => setActiveTab('quest')}
                className="mt-4 w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-2"
              >
                <span>Zur Quest dieser Station</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Abzeichen Info */}
            {badge && (
              <div className="p-4 rounded-xl bg-white border border-amber-900/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Belohnung</span>
                  <div className="text-xs font-bold text-slate-900">{badge.title}</div>
                  <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                    {badge.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Originalquellen */}
      {activeTab === 'sources' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {station.quotes.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-amber-900/15 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-bold text-amber-900 font-serif-title text-base">
                      {q.author}
                    </span>
                    <span className="font-mono bg-slate-100 px-2 py-0.5 rounded">{q.year}</span>
                  </div>
                  <span className="text-xs text-slate-500 block mb-3 italic">{q.role}</span>

                  <blockquote className="p-4 rounded-xl bg-amber-50/50 border-l-4 border-amber-700 text-sm text-slate-800 font-serif-title italic leading-relaxed mb-4">
                    {q.text}
                  </blockquote>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs">
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                    Analyse-Aufgabe:
                  </span>
                  <p className="text-slate-700 leading-relaxed">{q.task}</p>
                  <span className="text-[10px] text-slate-400 mt-2 block">Quelle: {q.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Interaktives Spiel / Quest */}
      {activeTab === 'quest' && (
        <div className="space-y-6">
          {station.miniGameType === 'caricature' && station.caricature ? (
            <CaricatureInspector
              caricature={station.caricature}
              stationId={station.id}
              badgeId={station.badgeId}
            />
          ) : station.miniGameType === 'paulskirche' ? (
            <PaulskircheGame />
          ) : station.miniGameType === 'barricade' ? (
            <BarricadeGame />
          ) : station.miniGameType === 'poetry' ? (
            <PoemAnalyzer />
          ) : station.miniGameType === 'constitution' ? (
            <ConstitutionalQuiz />
          ) : (
            /* Standard Multiple Choice Quiz für Station 1 & 2 */
            <div className="bg-white rounded-2xl border border-amber-900/15 p-6 md:p-8 shadow-sm">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
                    Kapitel-Wissenscheck
                  </span>
                  <h3 className="font-serif-title text-2xl font-bold text-slate-900 mt-1">
                    Beweise dein Wissen zu Station {station.id}!
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Beantworte alle 3 Fragen richtig, um den Orden freizuschalten.
                  </p>
                </div>

                <div className="space-y-6">
                  {station.quiz.map((q, qIdx) => {
                    const selected = quizAnswers[q.id];
                    const isCorrect = selected === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className="p-5 rounded-xl bg-amber-50/40 border border-amber-900/10 space-y-3"
                      >
                        <h4 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-950 flex items-center justify-center text-xs shrink-0 mt-0.5 font-mono">
                            {qIdx + 1}
                          </span>
                          <span>{q.question}</span>
                        </h4>

                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isChosen = selected === optIdx;

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectQuiz(q.id, optIdx)}
                                className={`w-full text-left p-3 rounded-lg text-xs transition-all border ${
                                  isChosen
                                    ? 'bg-amber-900 text-white border-amber-900 font-medium'
                                    : 'bg-white hover:bg-amber-100/50 border-slate-200 text-slate-800'
                                }`}
                              >
                                <span className="font-bold mr-2 font-mono">
                                  {String.fromCharCode(65 + optIdx)})
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {showQuizResult && selected !== undefined && (
                          <div
                            className={`p-3 rounded-lg text-xs leading-relaxed ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-950 font-medium'
                                : 'bg-red-100 text-red-950'
                            }`}
                          >
                            <span className="font-bold block mb-0.5">
                              {isCorrect ? '✓ Richtig!' : '✗ Leider falsch:'}
                            </span>
                            <p>{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4 text-center">
                  <button
                    onClick={handleSubmitQuiz}
                    disabled={Object.keys(quizAnswers).length < station.quiz.length}
                    className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white font-bold text-xs shadow transition-colors"
                  >
                    Antworten prüfen &amp; Punkte sichern
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer Nav between stations */}
      <div className="flex items-center justify-between pt-6 border-t border-amber-900/10">
        <button
          onClick={() => setActiveStationId(Math.max(1, station.id - 1))}
          disabled={station.id === 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Vorherige Station</span>
        </button>

        <span className="text-xs text-slate-500 font-mono">
          Station {station.id} von {STATIONS.length}
        </span>

        <button
          onClick={() => setActiveStationId(Math.min(STATIONS.length, station.id + 1))}
          disabled={station.id === STATIONS.length}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-amber-900 text-white hover:bg-amber-950 disabled:opacity-30 transition-all shadow-sm"
        >
          <span>Nächste Station</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
