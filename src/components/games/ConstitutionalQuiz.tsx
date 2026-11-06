import React, { useState } from 'react';
import { Scale, CheckCircle2, RotateCcw, Award } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

interface Pair {
  id: string;
  p1848: string;
  p1848Text: string;
  gg1949: string;
  gg1949Text: string;
  topic: string;
}

const CONSTITUTION_PAIRS: Pair[] = [
  {
    id: 'p1',
    p1848: '§ 137 Paulskirche',
    p1848Text: '„Vor dem Gesetz gilt kein Unterschied der Stände. Der Adel als Stand ist aufgehoben.“',
    gg1949: 'Artikel 3 Grundgesetz',
    gg1949Text: '„Alle Menschen sind vor dem Gesetz gleich. Niemand darf wegen seines Geschlechtes, seiner Abstammung bevorzugt oder benachteiligt werden.“',
    topic: 'Gleichheit vor dem Gesetz',
  },
  {
    id: 'p2',
    p1848: '§ 143 Paulskirche',
    p1848Text: '„Jeder Deutsche hat das Recht, durch Wort, Schrift, Druck und bildliche Darstellung seine Meinung frei zu äußern.“',
    gg1949: 'Artikel 5 Grundgesetz',
    gg1949Text: '„Jeder hat das Recht, seine Meinung in Wort, Schrift und Bild frei zu äußern und zu verbreiten. Eine Zensur findet nicht statt.“',
    topic: 'Meinungs- & Pressefreiheit',
  },
  {
    id: 'p3',
    p1848: '§ 144 Paulskirche',
    p1848Text: '„Jeder Deutsche hat volle Glaubens- und Gewissensfreiheit.“',
    gg1949: 'Artikel 4 Grundgesetz',
    gg1949Text: '„Die Freiheit des Glaubens, des Gewissens und die Freiheit des religiösen und weltanschaulichen Bekenntnisses sind unverletzlich.“',
    topic: 'Glaubensfreiheit',
  },
  {
    id: 'p4',
    p1848: '§ 140 Paulskirche',
    p1848Text: '„Die Wohnung ist unverletzlich.“',
    gg1949: 'Artikel 13 Grundgesetz',
    gg1949Text: '„Die Wohnung ist unverletzlich. Durchsuchungen dürfen nur durch den Richter angeordnet werden.“',
    topic: 'Schutz der Privatsphäre',
  },
  {
    id: 'p5',
    p1848: '§ 161 Paulskirche',
    p1848Text: '„Die Deutschen haben das Recht, sich friedlich und ohne Waffen zu versammeln.“',
    gg1949: 'Artikel 8 Grundgesetz',
    gg1949Text: '„Alle Deutschen haben das Recht, sich ohne Anmeldung oder Erlaubnis friedlich und ohne Waffen zu versammeln.“',
    topic: 'Versammlungsfreiheit',
  },
];

export const ConstitutionalQuiz: React.FC = () => {
  const { completeStation, completedStations } = useProgress();
  const [selected1848, setSelected1848] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isAllMatched = matchedIds.length === CONSTITUTION_PAIRS.length;

  const handleSelect1848 = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelected1848(id);
    setErrorMessage(null);
  };

  const handleSelect1949 = (id: string) => {
    if (!selected1848) {
      setErrorMessage('Wähle zuerst links einen Paragraphen von 1848 aus!');
      return;
    }

    if (selected1848 === id) {
      const updated = [...matchedIds, id];
      setMatchedIds(updated);
      setSelected1848(null);
      setErrorMessage(null);

      if (updated.length === CONSTITUTION_PAIRS.length) {
        completeStation(7, 60, 'badge-7');
      }
    } else {
      setErrorMessage('Passt inhaltlich nicht zusammen! Vergleiche die Schlüsselworte genau.');
    }
  };

  const handleReset = () => {
    setSelected1848(null);
    setMatchedIds([]);
    setErrorMessage(null);
  };

  return (
    <div className="bg-white rounded-xl border border-amber-900/15 overflow-hidden shadow-sm">
      <div className="p-4 md:p-6 bg-red-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
            <Scale className="w-4 h-4" />
            <span>Verfassungs-Labor</span>
          </div>
          <h3 className="font-serif-title text-xl font-bold mt-1">
            Grundrechte 1848 vs. Grundgesetz 1949
          </h3>
          <p className="text-xs text-red-200 mt-0.5">
            Verbinde die historischen Errungenschaften der Paulskirche mit unseren heutigen Grundrechten
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-red-200">Zugeordnete Paare:</span>
          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-400 text-amber-950">
            {matchedIds.length} / {CONSTITUTION_PAIRS.length}
          </span>
        </div>
      </div>

      <div className="p-6">
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-900 text-xs rounded-lg font-medium">
            ⚠️ {errorMessage}
          </div>
        )}

        {!isAllMatched ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Spalte 1: 1848 Paulskirche */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center justify-between">
                <span>1. Wähle Grundrecht der Paulskirche (1848):</span>
                <span className="font-mono text-[11px] text-slate-500 font-normal">
                  Schritt 1
                </span>
              </h4>

              {CONSTITUTION_PAIRS.map((pair) => {
                const isMatched = matchedIds.includes(pair.id);
                const isSelected = selected1848 === pair.id;

                return (
                  <button
                    key={pair.id}
                    onClick={() => handleSelect1848(pair.id)}
                    disabled={isMatched}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 opacity-60'
                        : isSelected
                        ? 'bg-amber-100 border-amber-700 ring-2 ring-amber-600/40 text-amber-950 shadow-sm'
                        : 'bg-white hover:bg-amber-50/60 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-amber-900">{pair.p1848}</span>
                      {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </div>
                    <p className="font-serif-title text-slate-700 italic">{pair.p1848Text}</p>
                  </button>
                );
              })}
            </div>

            {/* Spalte 2: 1949 Grundgesetz */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                <span>2. Finde das Gegenstück im Grundgesetz (1949):</span>
                <span className="font-mono text-[11px] text-slate-500 font-normal">
                  Schritt 2
                </span>
              </h4>

              {CONSTITUTION_PAIRS.map((pair) => {
                const isMatched = matchedIds.includes(pair.id);

                return (
                  <button
                    key={pair.id}
                    onClick={() => handleSelect1949(pair.id)}
                    disabled={isMatched}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                      isMatched
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 opacity-60'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">{pair.gg1949}</span>
                      <span className="text-[10px] text-slate-500 font-sans uppercase font-medium">
                        Thema: {pair.topic}
                      </span>
                    </div>
                    <p className="text-slate-700">{pair.gg1949Text}</p>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-3">
              <Award className="w-7 h-7" />
            </div>
            <h4 className="font-serif-title text-2xl font-bold text-emerald-950">
              Verfassungs-Vergleich vollendet!
            </h4>
            <p className="text-xs text-emerald-900 mt-2 leading-relaxed">
              Glückwunsch! Du hast bewiesen, dass die mutigen Bürger und Abgeordneten von 1848/49 nicht
              umsonst gekämpft haben: Fast alle ihre Grundrechtsformulierungen wurden 100 Jahre später
              wortwörtlich in unser heutiges deutsches Grundgesetz übernommen!
            </p>
            <p className="text-xs text-emerald-800 mt-2 font-bold">
              Abzeichen erhalten: <strong>„Hüter der Grundrechte“</strong> (+60 XP)
            </p>
            <button
              onClick={handleReset}
              className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Vergleich noch einmal starten</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
