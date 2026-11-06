import React, { useState } from 'react';
import { Landmark, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { PoliticalWing } from '../../types';

interface DeputyCard {
  id: string;
  name: string;
  profession: string;
  statement: string;
  targetWing: PoliticalWing;
  reason: string;
}

const DEPUTY_CARDS: DeputyCard[] = [
  {
    id: 'c1',
    name: 'Friedrich Hecker',
    profession: 'Rechtsanwalt & Freiheitskämpfer',
    statement: '„Weg mit den Kronen! Wir wollen keine Könige mehr, sondern eine freie deutsche Republik und gleiche Rechte für jeden Mann!“',
    targetWing: 'links',
    reason: 'Hecker war Anführer der radikalen Republikaner (Fraktion Donnersberg) und wollte die Monarchie sofort abschaffen.',
  },
  {
    id: 'c2',
    name: 'Heinrich von Gagern',
    profession: 'Hessischer Staatsmann & Parlamentspräsident',
    statement: '„Wir müssen kühne Mäßigung wahren: Ein erblicher deutscher Kaiser, aber gebunden an eine freiheitliche Verfassung und das Parlament.“',
    targetWing: 'mitte',
    reason: 'Gagern war der einflussreichste Kopf der Mitte-Fraktion (Casino), die für eine konstitutionelle Monarchie kämpfte.',
  },
  {
    id: 'c3',
    name: 'Joseph von Radowitz',
    profession: 'Preußischer General & Diplomat',
    statement: '„Die gottgewollte Ordnung und die Rechte der Landesfürsten dürfen nicht dem Volkswillen geopfert werden.“',
    targetWing: 'rechts',
    reason: 'Radowitz saß im konservativen Café Milani und verteidigte die unumschränkten Rechte des preußischen Königs.',
  },
  {
    id: 'c4',
    name: 'Robert Blum',
    profession: 'Publizist & Volkstribun',
    statement: '„Das Volk allein ist der Souverän! Freiheit ohne soziale Gerechtigkeit für die Armen und Arbeiter ist ein leeres Wort.“',
    targetWing: 'links',
    reason: 'Robert Blum vertrat den linken Flügel (Deutscher Hof) und setzte sich leidenschaftlich für die Unterschichten ein.',
  },
  {
    id: 'c5',
    name: 'Friedrich Christoph Dahlmann',
    profession: 'Historiker („Göttinger Sieben“)',
    statement: '„Preußen muss die Führung übernehmen. Ohne Österreich schaffen wir einen starken, stabilen kleindeutschen Verfassungsstaat.“',
    targetWing: 'mitte',
    reason: 'Dahlmann prägte die kleindeutsche Verfassungslösung der liberalen Mitte.',
  },
];

export const PaulskircheGame: React.FC = () => {
  const { completeStation, completedStations } = useProgress();
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [assigned, setAssigned] = useState<Record<string, PoliticalWing>>({});
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const isCompleted = completedStations.includes(6);
  const currentCard = DEPUTY_CARDS[currentCardIndex];

  const handleAssign = (wing: PoliticalWing) => {
    if (!currentCard || feedback) return;

    const isCorrect = wing === currentCard.targetWing;
    setFeedback({
      isCorrect,
      message: isCorrect
        ? `Richtig! ${currentCard.reason}`
        : `Nicht ganz. ${currentCard.name} gehört zur ${
            currentCard.targetWing === 'links'
              ? 'Linken (Donnersberg)'
              : currentCard.targetWing === 'mitte'
              ? 'Mitte (Casino)'
              : 'Rechten (Café Milani)'
          }. ${currentCard.reason}`,
    });

    if (isCorrect) {
      setAssigned((prev) => ({ ...prev, [currentCard.id]: wing }));
    }
  };

  const handleNext = () => {
    setFeedback(null);
    if (currentCardIndex < DEPUTY_CARDS.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
    } else {
      // Completed all cards!
      completeStation(6, 60, 'badge-6');
    }
  };

  const handleReset = () => {
    setAssigned({});
    setCurrentCardIndex(0);
    setFeedback(null);
  };

  const leftCount = Object.values(assigned).filter((w) => w === 'links').length;
  const centerCount = Object.values(assigned).filter((w) => w === 'mitte').length;
  const rightCount = Object.values(assigned).filter((w) => w === 'rechts').length;

  return (
    <div className="bg-white rounded-xl border border-amber-900/15 overflow-hidden shadow-sm">
      <div className="p-4 md:p-6 bg-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
            <Landmark className="w-4 h-4" />
            <span>Parlaments-Simulator 1848</span>
          </div>
          <h3 className="font-serif-title text-xl font-bold mt-1">
            Sitzordnung in der Frankfurter Paulskirche
          </h3>
          <p className="text-xs text-indigo-200 mt-0.5">
            Ordne die Abgeordneten ihren Fraktionen zu (Links, Mitte, Rechts)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-indigo-200">Karten gelöst:</span>
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-400 text-amber-950">
            {Object.keys(assigned).length} / {DEPUTY_CARDS.length}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Die 3 Bänke der Paulskirche */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Linke Bank */}
          <div className="p-4 rounded-xl border-2 border-red-200 bg-red-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                  Links (Donnersberg)
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-red-200 text-red-900 font-bold">
                  {leftCount} Sitze
                </span>
              </div>
              <h4 className="font-serif-title text-sm font-bold text-slate-900 mt-1">
                Radikale Demokraten
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Forderung: Republik, Abschaffung der Monarchie, allgemeines Wahlrecht für Männer.
              </p>
            </div>
            <button
              onClick={() => handleAssign('links')}
              disabled={!!feedback || Object.keys(assigned).length === DEPUTY_CARDS.length}
              className="mt-4 w-full py-2 bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Hierher setzen (Links)
            </button>
          </div>

          {/* Mitte Bank */}
          <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  Mitte (Casino)
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-200 text-blue-900 font-bold">
                  {centerCount} Sitze
                </span>
              </div>
              <h4 className="font-serif-title text-sm font-bold text-slate-900 mt-1">
                Gemäßigte Liberale
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Forderung: Konstitutionelle Monarchie (Kaiser mit Parlament), Zensuswahlrecht, kleindeutsch.
              </p>
            </div>
            <button
              onClick={() => handleAssign('mitte')}
              disabled={!!feedback || Object.keys(assigned).length === DEPUTY_CARDS.length}
              className="mt-4 w-full py-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Hierher setzen (Mitte)
            </button>
          </div>

          {/* Rechte Bank */}
          <div className="p-4 rounded-xl border-2 border-amber-300 bg-amber-50/50 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Rechts (Café Milani)
                </span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-200 text-amber-950 font-bold">
                  {rightCount} Sitze
                </span>
              </div>
              <h4 className="font-serif-title text-sm font-bold text-slate-900 mt-1">
                Konservative
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Forderung: Vorherrschaft der Fürsten (Gottesgnadentum), Föderalismus, gegen Volkssouveränität.
              </p>
            </div>
            <button
              onClick={() => handleAssign('rechts')}
              disabled={!!feedback || Object.keys(assigned).length === DEPUTY_CARDS.length}
              className="mt-4 w-full py-2 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              Hierher setzen (Rechts)
            </button>
          </div>
        </div>

        {/* Aktuelle Abgeordnetenkarte */}
        {Object.keys(assigned).length < DEPUTY_CARDS.length ? (
          <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-900/15 max-w-xl mx-auto text-center shadow-sm">
            <span className="text-[11px] font-mono text-amber-900 font-bold uppercase tracking-wider">
              Abgeordneten-Profil {currentCardIndex + 1} von {DEPUTY_CARDS.length}
            </span>
            <h4 className="font-serif-title text-xl font-bold text-slate-900 mt-1">
              {currentCard.name}
            </h4>
            <span className="text-xs text-slate-500 italic block mb-3">{currentCard.profession}</span>

            <blockquote className="p-4 bg-white rounded-lg border-l-4 border-amber-700 text-sm text-slate-800 font-serif-title italic mb-4 leading-relaxed">
              {currentCard.statement}
            </blockquote>

            {feedback ? (
              <div
                className={`p-4 rounded-lg text-xs leading-relaxed mb-4 text-left ${
                  feedback.isCorrect
                    ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                    : 'bg-red-100 text-red-950 border border-red-300'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  {feedback.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Korrekt zugeordnet!</span>
                    </>
                  ) : (
                    <span>Leider falsch:</span>
                  )}
                </div>
                <p>{feedback.message}</p>
                <button
                  onClick={handleNext}
                  className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  Weiter zur nächsten Karte →
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-600">
                👉 Wähle oben die passende Bank: <strong>Links</strong>, <strong>Mitte</strong> oder{' '}
                <strong>Rechts</strong>!
              </p>
            )}
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif-title text-xl font-bold text-emerald-950">
              Parlament vollständig besetzt!
            </h4>
            <p className="text-xs text-emerald-800 mt-2 leading-relaxed">
              Du hast alle 5 historischen Schlüsselfiguren und ihre politischen Ideologien fehlerfrei
              den Fraktionen zugeordnet. Du erhältst das Abzeichen <strong>„Paulskirchen-Präsident“</strong>{' '}
              (+60 XP)!
            </p>
            <button
              onClick={handleReset}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Simulation wiederholen</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
