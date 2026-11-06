import React, { useState } from 'react';
import { Eye, CheckCircle2, HelpCircle, Sparkles, ZoomIn } from 'lucide-react';
import { Caricature } from '../../types';
import { useProgress } from '../../context/ProgressContext';

interface CaricatureInspectorProps {
  caricature: Caricature;
  stationId: number;
  badgeId: string;
}

export const CaricatureInspector: React.FC<CaricatureInspectorProps> = ({
  caricature,
  stationId,
  badgeId,
}) => {
  const { completeStation, completedStations } = useProgress();
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(0);
  const [discoveredIndices, setDiscoveredIndices] = useState<number[]>([0]);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  const isCompleted = completedStations.includes(stationId);

  const handleHotspotClick = (idx: number) => {
    setActiveHotspotIndex(idx);
    if (!discoveredIndices.includes(idx)) {
      setDiscoveredIndices((prev) => [...prev, idx]);
    }
  };

  const allDiscovered = discoveredIndices.length === caricature.hotspots.length;

  const handleVerify = (optionIdx: number) => {
    setSelectedQuizOption(optionIdx);
    setQuizAnswered(true);
    if (optionIdx === 1) {
      completeStation(stationId, 50, badgeId);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-amber-900/15 overflow-hidden shadow-sm">
      <div className="p-4 md:p-6 bg-amber-50/50 border-b border-amber-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <Eye className="w-4 h-4" />
            <span>Historische Karikaturen-Lupe</span>
          </div>
          <h3 className="font-serif-title text-xl font-bold text-slate-900 mt-1">
            {caricature.title}
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">{caricature.source}</p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-xs text-slate-600">Entdeckte Bildsymbole:</span>
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-950">
            {discoveredIndices.length} / {caricature.hotspots.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Karikatur-Bühne */}
        <div className="lg:col-span-7 p-6 bg-slate-950 flex flex-col items-center justify-center relative min-h-[360px] select-none">
          {/* Karikaturen-Simulations-Bühne mit stilisiertem Kupferstich-Design */}
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-lg border-2 border-amber-700/40 bg-stone-900 overflow-hidden shadow-2xl flex items-center justify-center p-4">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Historisches Artwork / Vignette je nach Karikatur */}
            <div className="text-center p-6 text-stone-300 relative z-10">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-900/40 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <ZoomIn className="w-8 h-8" />
              </div>
              <p className="font-serif-title text-lg font-bold text-amber-200">
                {caricature.title}
              </p>
              <p className="text-xs text-stone-400 mt-2 max-w-sm mx-auto leading-relaxed">
                {caricature.description}
              </p>
              <div className="mt-4 text-[11px] text-amber-400/80 bg-stone-800/80 px-3 py-1.5 rounded-full inline-block border border-amber-500/20">
                Klicke auf die leuchtenden Lupen-Zahlen, um die Satire zu entschlüsseln!
              </div>
            </div>

            {/* Hotspots */}
            {caricature.hotspots.map((spot, idx) => {
              const isDiscovered = discoveredIndices.includes(idx);
              const isActive = activeHotspotIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleHotspotClick(idx)}
                  style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-lg z-20 ${
                    isActive
                      ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-300/40 scale-125'
                      : isDiscovered
                      ? 'bg-amber-600 text-white hover:scale-110'
                      : 'bg-red-600 text-white hover:scale-110 animate-bounce'
                  }`}
                  title={spot.title}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hotspot-Erklärungsbereich */}
        <div className="lg:col-span-5 p-6 bg-amber-50/20 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-amber-900/10">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Bilddetail {activeHotspotIndex !== null ? activeHotspotIndex + 1 : 1} von{' '}
              {caricature.hotspots.length}
            </h4>

            {activeHotspotIndex !== null && caricature.hotspots[activeHotspotIndex] ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-white border border-amber-900/10 shadow-sm">
                  <div className="flex items-center gap-2 text-amber-900 font-serif-title font-bold text-base">
                    <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-950 flex items-center justify-center text-xs">
                      {activeHotspotIndex + 1}
                    </span>
                    <span>{caricature.hotspots[activeHotspotIndex].title}</span>
                  </div>
                  <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                    {caricature.hotspots[activeHotspotIndex].description}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-amber-100/60 border border-amber-900/10">
                  <span className="text-xs font-semibold text-amber-950 block mb-1">
                    Historische Entschlüsselung:
                  </span>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    {caricature.hotspots[activeHotspotIndex].historicalDetail}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {/* Abschluss-Frage zur Karikatur */}
          <div className="mt-6 pt-6 border-t border-amber-900/10">
            <h5 className="font-semibold text-xs text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Karikatur-Synthese</span>
            </h5>
            <p className="text-xs text-slate-700 mb-3">{caricature.guidingQuestion}</p>

            <div className="space-y-2">
              <button
                onClick={() => handleVerify(0)}
                disabled={quizAnswered || !allDiscovered}
                className={`w-full text-left p-2.5 rounded-lg text-xs transition-all border ${
                  quizAnswered && selectedQuizOption === 0
                    ? 'bg-red-50 border-red-300 text-red-900'
                    : 'bg-white hover:bg-amber-50 border-slate-200 text-slate-800'
                } ${!allDiscovered ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                A) Das Bild lobt die Gelehrten für ihre vorbildliche Disziplin und Regierungsnähe.
              </button>

              <button
                onClick={() => handleVerify(1)}
                disabled={quizAnswered || !allDiscovered}
                className={`w-full text-left p-2.5 rounded-lg text-xs transition-all border ${
                  quizAnswered && selectedQuizOption === 1
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                    : 'bg-white hover:bg-amber-50 border-slate-200 text-slate-800'
                } ${!allDiscovered ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                B) Das Bild kritisiert beißend die Zensur und Bespitzelung, die das freie Denken erstickt.
              </button>
            </div>

            {!allDiscovered && (
              <p className="text-[11px] text-amber-800 mt-2 font-medium">
                💡 Klicke erst alle {caricature.hotspots.length} Bildsymbole an, um die Frage zu beantworten!
              </p>
            )}

            {quizAnswered && selectedQuizOption === 1 && (
              <div className="mt-3 p-3 bg-emerald-100 text-emerald-950 rounded-lg text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Hervorragend analysiert! Du hast die satirische Absicht des Zeichners präzise erkannt (+50 XP).
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
