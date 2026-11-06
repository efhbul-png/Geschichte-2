import React, { useState } from 'react';
import { Feather, CheckCircle2, AlertTriangle, Sparkles, BookOpen } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

interface Stanza {
  number: number;
  lines: string[];
  explanation: string;
  censoredIndices: number[];
  rhetoricalDevice: string;
}

const STANZAS: Stanza[] = [
  {
    number: 1,
    lines: [
      'Deutschland, o zerrissen Herz,',
      'Das zu Ende bald geschlagen,',
      'Nur um dich will ich noch klagen',
      'Und in einer Brust von Erz,',
      'Schweigend meinen kleinen Schmerz,',
      'Meinen kleinen Jammer tragen,',
      'Vaterland, um dich nur klagen!',
    ],
    explanation: 'Das lyrische Ich vergisst den eigenen persönlichen Schmerz vor dem viel größeren Leid des zerrissenen Vaterlandes.',
    censoredIndices: [0, 1],
    rhetoricalDevice: 'Personifikation: Deutschland wird als „zerrissenes, sterbendes Herz“ dargestellt.',
  },
  {
    number: 2,
    lines: [
      'Lustig grünt dein Nadelholz,',
      'Lustig rauschen deine Eichen;',
      'In den neununddreißig Reichen',
      'Fehlt ein einzig Körnchen Golds:',
      'Freier Bürger hoher Stolz',
      'Fehlt im Lande sondergleichen,',
      'In den neununddreißig Reichen!',
    ],
    explanation: 'Die Natur blüht zwar, doch in den 39 Kleinstaaten fehlt das Wertvollste: Der Stolz und die Freiheit des Bürgers!',
    censoredIndices: [2, 4, 6],
    rhetoricalDevice: 'Metapher & Kontrast: Äußere schöne Natur vs. innere Unfreiheit in den „39 Reichen“.',
  },
  {
    number: 3,
    lines: [
      'Wenn ein Sänger für dich ficht,',
      'Hast du scheu dein Schwert geschwungen,',
      'Wenn ein Mann vor dir gesungen:',
      'Hast du schüchtern mitgesungen,',
      'Und man hat dich unterjocht,',
      'Hat dich in den Staub gezwungen,',
      'Weil du gar so still gesungen!',
    ],
    explanation: 'Herwegh wirft den Deutschen vor, aus Feigheit und Schüchternheit ihre Knechtschaft still ertragen zu haben.',
    censoredIndices: [4, 5, 6],
    rhetoricalDevice: 'Klimax (Steigerung): Scheu -> schüchtern -> unterjocht -> in den Staub gezwungen.',
  },
  {
    number: 4,
    lines: [
      'Und das nennt ihr deutsche Treue?',
      'Laßt die Tränen, laßt die Reue,',
      'Soll nicht einst der Enkel Treu\'s',
      'Sterben auf der Zwietracht Kreuz,',
      'Kampf und Händel, Volk, aufs neue,',
      'Denn der Teufel ist die Reue!',
    ],
    explanation: 'Aufruf zur Tat: Keine fruchtlosen Tränen mehr! Nur der offene Kampf gegen die Zwietracht kann die Zukunft retten.',
    censoredIndices: [4],
    rhetoricalDevice: 'Rhetorische Frage & Antithese: Falsche Treue vs. nötiger Befreiungskampf.',
  },
  {
    number: 5,
    lines: [
      'Tritt in deiner Fürsten Reihn!',
      'Sprich: Die neununddreißig Lappen',
      'Sollen weder blasen noch klappen!',
      'Und ein Heldenpurpur sein!',
      'Ein Reich wie ein Sonnenschein!',
      'Ein Volk, ein Herz, ein Wappen!',
      'Die neununddreißig Lappen!',
    ],
    explanation: 'Das visionäre Finale: Die 39 Teilstaaten sind nur zerrissene „Knechtschaftslappen“. An ihre Stelle soll EIN geeintes Volk mit EINEM Wappen treten!',
    censoredIndices: [0, 1, 5, 6],
    rhetoricalDevice: 'Provokation: Herabwürdigung der fürstlichen Territorien als wertlose „Lappen“.',
  },
];

export const PoemAnalyzer: React.FC = () => {
  const { completeStation, completedStations } = useProgress();
  const [activeStanzaIdx, setActiveStanzaIdx] = useState<number>(0);
  const [censoredFound, setCensoredFound] = useState<string[]>([]);
  const [analysisMode, setAnalysisMode] = useState<'reading' | 'censor'>('reading');

  const currentStanza = STANZAS[activeStanzaIdx];

  const handleLineClick = (lineIndex: number) => {
    if (analysisMode !== 'censor') return;

    const lineId = `${activeStanzaIdx}-${lineIndex}`;
    const isCensored = currentStanza.censoredIndices.includes(lineIndex);

    if (isCensored && !censoredFound.includes(lineId)) {
      const updated = [...censoredFound, lineId];
      setCensoredFound(updated);
      if (updated.length >= 6) {
        completeStation(4, 50, 'badge-4');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-amber-900/15 overflow-hidden shadow-sm">
      <div className="p-4 md:p-6 bg-emerald-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            <Feather className="w-4 h-4" />
            <span>Quellen-Labor: Politische Lyrik 1841</span>
          </div>
          <h3 className="font-serif-title text-xl font-bold mt-1">
            Georg Herwegh: „Dem deutschen Volk“
          </h3>
          <p className="text-xs text-emerald-200 mt-0.5">
            Eines der meistverbotenen und gefeiertsten Revolutionsgedichte des Vormärz
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAnalysisMode('reading')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              analysisMode === 'reading'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-900/50 text-emerald-200 hover:bg-emerald-800/50'
            }`}
          >
            Interpretation
          </button>
          <button
            onClick={() => setAnalysisMode('censor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              analysisMode === 'censor'
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-emerald-900/50 text-emerald-200 hover:bg-emerald-800/50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Zensur-Detektiv</span>
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Strophen-Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-100">
          {STANZAS.map((st, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStanzaIdx(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeStanzaIdx === idx
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Strophe {st.number}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gedichtstrophe Text */}
          <div className="lg:col-span-6 bg-amber-50/40 p-6 rounded-xl border border-amber-900/10 font-serif-title">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-900/10">
              <span className="text-xs font-mono font-bold text-amber-900 uppercase tracking-wider">
                Strophe {currentStanza.number} von 5
              </span>
              {analysisMode === 'censor' && (
                <span className="text-[11px] text-red-700 font-sans font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  Klicke auf aufrührerische Zeilen!
                </span>
              )}
            </div>

            <div className="space-y-2 text-base md:text-lg leading-relaxed text-slate-900">
              {currentStanza.lines.map((line, lIdx) => {
                const lineId = `${activeStanzaIdx}-${lIdx}`;
                const isFound = censoredFound.includes(lineId);

                return (
                  <div
                    key={lIdx}
                    onClick={() => handleLineClick(lIdx)}
                    className={`p-1.5 rounded transition-all select-none ${
                      analysisMode === 'censor'
                        ? 'cursor-pointer hover:bg-red-50 hover:text-red-900'
                        : ''
                    } ${
                      isFound
                        ? 'bg-red-100 text-red-900 border-l-4 border-red-600 font-bold line-through decoration-red-700'
                        : ''
                    }`}
                  >
                    <span>{line}</span>
                    {isFound && (
                      <span className="ml-2 text-[10px] uppercase font-sans font-bold text-red-700 bg-red-200 px-1.5 py-0.5 rounded not-italic no-underline">
                        Vom Zensor verboten!
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Analyse & Erklärungen */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-4 rounded-xl bg-white border border-amber-900/10 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>Inhalt &amp; Deutung der Strophe</span>
              </h4>
              <p className="text-sm text-slate-800 leading-relaxed mt-2">
                {currentStanza.explanation}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-900/15">
              <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
                Stilmittel &amp; Bildsprache
              </h5>
              <p className="text-xs text-emerald-900 leading-relaxed">
                {currentStanza.rhetoricalDevice}
              </p>
            </div>

            {analysisMode === 'censor' && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-950">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    Zensierte Sprengstoff-Verse enttarnt:
                  </span>
                  <span className="font-mono font-bold px-2 py-0.5 rounded bg-red-200 text-red-900">
                    {censoredFound.length} / 6 gefunden
                  </span>
                </div>
                <p className="text-red-900/80 leading-relaxed">
                  Finde Verse in den Strophen, die die deutschen Fürsten direkt angreifen oder zum
                  Umsturz aufrufen. Sobald du mindestens 6 zensierte Verse aufgespürt hast, erhältst du
                  das Abzeichen <strong>„Dichter des Vormärz“</strong>!
                </p>

                {censoredFound.length >= 6 && (
                  <div className="mt-3 p-2.5 bg-emerald-100 text-emerald-950 rounded-lg flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Zensur-Detektiv gemeistert! Abzeichen freigeschaltet (+50 XP).</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
