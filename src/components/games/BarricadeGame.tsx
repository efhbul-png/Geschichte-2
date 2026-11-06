import React, { useState } from 'react';
import { Shield, CheckCircle2, RotateCcw, MapPin, Calendar, Award } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { BARRICADE_SCENARIO } from '../../data/historyData';

export const BarricadeGame: React.FC = () => {
  const { completeStation, completedStations } = useProgress();
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const step = BARRICADE_SCENARIO[currentStepIndex];

  const handleSelectChoice = (choiceIndex: number) => {
    if (selectedChoiceIndex !== null) return;
    setSelectedChoiceIndex(choiceIndex);
    const pts = step.choices[choiceIndex].points;
    setTotalPoints((prev) => prev + pts);
  };

  const handleNextStep = () => {
    setSelectedChoiceIndex(null);
    if (currentStepIndex < BARRICADE_SCENARIO.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      completeStation(5, 50, 'badge-5');
    }
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setSelectedChoiceIndex(null);
    setTotalPoints(0);
    setIsFinished(false);
  };

  return (
    <div className="bg-white rounded-xl border border-amber-900/15 overflow-hidden shadow-sm">
      <div className="p-4 md:p-6 bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-700/30">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <Shield className="w-4 h-4" />
            <span>Historisches Entscheidungs-Rollenspiel</span>
          </div>
          <h3 className="font-serif-title text-xl font-bold mt-1">
            Märztage in Berlin (18./19. März 1848)
          </h3>
          <p className="text-xs text-stone-300 mt-0.5">
            Du bist Johann, ein 17-jähriger Buchdrucker-Lehrling mitten im Sturm der Revolution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-stone-300">
            Punkte: <span className="font-mono font-bold text-amber-400 text-sm">{totalPoints}</span>
          </div>
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Szene {currentStepIndex + 1} / {BARRICADE_SCENARIO.length}
          </span>
        </div>
      </div>

      <div className="p-6">
        {!isFinished ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4 text-xs text-slate-500 border-b border-slate-100 pb-3">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                {step.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <MapPin className="w-3.5 h-3.5 text-red-700" />
                {step.location}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-900/10">
              <p className="text-sm text-slate-800 leading-relaxed font-serif-title text-base">
                {step.situation}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Was tust du in dieser brenzligen Sekunde?
              </h4>

              {step.choices.map((choice, idx) => {
                const isSelected = selectedChoiceIndex === idx;
                const isChosenAny = selectedChoiceIndex !== null;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectChoice(idx)}
                    disabled={isChosenAny}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                      isSelected
                        ? 'bg-amber-100/80 border-amber-700 ring-2 ring-amber-600/30 font-medium text-amber-950'
                        : isChosenAny
                        ? 'opacity-50 border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed'
                        : 'bg-white hover:bg-amber-50/50 border-slate-200 text-slate-800 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{choice.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {selectedChoiceIndex !== null && (
              <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-amber-400 block mb-1">
                    Deine Entscheidung &amp; Folge:
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {step.choices[selectedChoiceIndex].consequence}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <span className="text-[11px] font-bold text-amber-300 block mb-0.5">
                    Historischer Hintergrund:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    {step.choices[selectedChoiceIndex].historicalContext}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-amber-400 font-bold">
                    +{step.choices[selectedChoiceIndex].points} Freiheits-Punkte
                  </span>
                  <button
                    onClick={handleNextStep}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition-colors"
                  >
                    {currentStepIndex < BARRICADE_SCENARIO.length - 1
                      ? 'Nächste Szene erleben →'
                      : 'Abschluss & Auswertung →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-amber-50/80 border border-amber-900/15 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-amber-200 text-amber-900 mx-auto flex items-center justify-center mb-3">
              <Award className="w-7 h-7" />
            </div>
            <h4 className="font-serif-title text-2xl font-bold text-slate-900">
              Barrikadentage überstanden!
            </h4>
            <p className="text-sm text-slate-700 mt-2 leading-relaxed">
              Du hast die gefährlichen Tage des März 1848 in Berlin mit{' '}
              <strong className="text-amber-900 font-bold">{totalPoints} Punkten</strong> gemeistert
              und dabei die Dramatik und historischen Konflikte hautnah miterlebt!
            </p>
            <p className="text-xs text-amber-800 mt-2 font-medium">
              Freigeschaltet: Orden <strong>„Barrikaden-Held“</strong> (+50 XP)
            </p>
            <button
              onClick={handleRestart}
              className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Szenario erneut spielen</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
