import React, { useState } from 'react';
import {
  Printer,
  FileCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  HelpCircle,
  Eye,
  SlidersHorizontal,
  Download,
  BookOpen,
} from 'lucide-react';
import { STATIONS } from '../data/historyData';
import { STATION_WORKSHEETS } from '../data/worksheetTasks';

export const StationWorksheetGenerator: React.FC = () => {
  const [selectedStationId, setSelectedStationId] = useState<number | 'all'>(1);
  const [includeSolutions, setIncludeSolutions] = useState<boolean>(false);
  const [includeWritingLines, setIncludeWritingLines] = useState<boolean>(true);
  const [includeVocabulary, setIncludeVocabulary] = useState<boolean>(true);
  const [includeGrading, setIncludeGrading] = useState<boolean>(true);
  const [includeQuiz, setIncludeQuiz] = useState<boolean>(true);

  const handlePrint = () => {
    window.print();
  };

  const stationsToRender =
    selectedStationId === 'all'
      ? STATIONS
      : STATIONS.filter((s) => s.id === selectedStationId);

  return (
    <div className="space-y-6">
      {/* Control Deck for the Teacher (Hidden in Print) */}
      <div className="bg-white rounded-2xl border border-amber-900/15 p-6 shadow-sm space-y-6 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
              <Printer className="w-4 h-4" />
              <span>Automatischer PDF-Arbeitsblatt-Generator</span>
            </div>
            <h3 className="font-serif-title text-xl font-bold text-slate-900 mt-1">
              Stationen-Arbeitsblätter für den Geschichtsunterricht
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Wähle eine Station aus, passe Differenzierungsoptionen an und drucke das fertige DIN-A4-Arbeitsblatt aus oder speichere es als PDF.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-700 to-red-800 hover:from-amber-800 hover:to-red-900 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Als PDF speichern / Drucken</span>
          </button>
        </div>

        {/* Station Selector Bar */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            1. Station auswählen:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedStationId('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStationId === 'all'
                  ? 'bg-amber-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📚 Alle 7 Stationen (Gesamt-Heft)
            </button>
            {STATIONS.map((st) => (
              <button
                key={st.id}
                onClick={() => setSelectedStationId(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStationId === st.id
                    ? 'bg-amber-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Station {st.id}: {st.title.split('&')[0].replace('Die ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Customization Options */}
        <div className="pt-4 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
            2. Arbeitsblatt-Optionen &amp; Differenzierung:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Toggle Musterlösung */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-amber-50/30 cursor-pointer text-xs transition-colors">
              <input
                type="checkbox"
                checked={includeSolutions}
                onChange={(e) => setIncludeSolutions(e.target.checked)}
                className="rounded border-slate-300 text-amber-900 focus:ring-amber-500"
              />
              <div>
                <span className="font-bold text-slate-900 block">Musterlösungen</span>
                <span className="text-[11px] text-slate-500">Lehrer-Lösungsbogen</span>
              </div>
            </label>

            {/* Toggle Schreiblinien */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-amber-50/30 cursor-pointer text-xs transition-colors">
              <input
                type="checkbox"
                checked={includeWritingLines}
                onChange={(e) => setIncludeWritingLines(e.target.checked)}
                className="rounded border-slate-300 text-amber-900 focus:ring-amber-500"
              />
              <div>
                <span className="font-bold text-slate-900 block">Schreiblinien</span>
                <span className="text-[11px] text-slate-500">Für Handeintrag</span>
              </div>
            </label>

            {/* Toggle Worterklärungen */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-amber-50/30 cursor-pointer text-xs transition-colors">
              <input
                type="checkbox"
                checked={includeVocabulary}
                onChange={(e) => setIncludeVocabulary(e.target.checked)}
                className="rounded border-slate-300 text-amber-900 focus:ring-amber-500"
              />
              <div>
                <span className="font-bold text-slate-900 block">Worterklärungen</span>
                <span className="text-[11px] text-slate-500">Binnendifferenzierung</span>
              </div>
            </label>

            {/* Toggle Multiple Choice Quiz */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-amber-50/30 cursor-pointer text-xs transition-colors">
              <input
                type="checkbox"
                checked={includeQuiz}
                onChange={(e) => setIncludeQuiz(e.target.checked)}
                className="rounded border-slate-300 text-amber-900 focus:ring-amber-500"
              />
              <div>
                <span className="font-bold text-slate-900 block">Schnell-Check</span>
                <span className="text-[11px] text-slate-500">Multiple-Choice Quiz</span>
              </div>
            </label>

            {/* Toggle Punktevergabe */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-amber-50/30 cursor-pointer text-xs transition-colors">
              <input
                type="checkbox"
                checked={includeGrading}
                onChange={(e) => setIncludeGrading(e.target.checked)}
                className="rounded border-slate-300 text-amber-900 focus:ring-amber-500"
              />
              <div>
                <span className="font-bold text-slate-900 block">Punkte &amp; Noten</span>
                <span className="text-[11px] text-slate-500">Bewertungsraster</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Generated Printable Worksheets Container */}
      <div className="space-y-12">
        {stationsToRender.map((station) => {
          const wsData = STATION_WORKSHEETS[station.id];
          const totalPoints = wsData.tasks.reduce((sum, t) => sum + t.points, 0) + (includeQuiz ? 4 : 0);

          return (
            <div
              key={station.id}
              className="print-page bg-white p-8 md:p-12 rounded-2xl border border-slate-300 shadow-sm text-slate-900 max-w-4xl mx-auto space-y-6"
            >
              {/* Header Box (DIN A4 Schulstandard) */}
              <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] uppercase font-mono font-bold tracking-wider text-slate-600">
                    <span>Geschichte</span>
                    <span>·</span>
                    <span>Klassenstufe 8–10</span>
                    <span>·</span>
                    <span>Stationenlernen 1815–1849</span>
                  </div>
                  <h1 className="font-serif-title text-xl md:text-2xl font-bold mt-1 text-slate-950">
                    Station {station.id}: {station.title}
                  </h1>
                  <span className="text-xs text-slate-600 font-medium">
                    {station.subtitle} ({station.period})
                  </span>
                </div>

                <div className="text-xs space-y-1 border-t sm:border-t-0 sm:border-l border-slate-300 pt-2 sm:pt-0 sm:pl-4 shrink-0 min-w-[200px]">
                  <div>Name: _______________________________</div>
                  <div>Klasse: ________ Datum: ______________</div>
                  {includeGrading && (
                    <div className="text-[11px] text-slate-600 pt-0.5">
                      Punkte: ____ / {totalPoints} P. (Note: _____)
                    </div>
                  )}
                </div>
              </div>

              {/* Leitfrage Kasten */}
              <div className="p-3 bg-slate-100 rounded-lg border border-slate-300 text-xs flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">Leitfrage der Station: </span>
                  <span className="italic text-slate-800">{station.keyQuestion}</span>
                </div>
              </div>

              {/* Abschnitt A: Historischer Informationstext */}
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Teil A: Historischer Grundlagentext
                  </h2>
                  <span className="text-[10px] text-slate-500 italic">
                    Arbeitsauftrag: Aufmerksam lesen &amp; Wichtiges markieren
                  </span>
                </div>
                <div className="text-xs text-slate-800 leading-relaxed space-y-2 text-justify">
                  <p>{station.summary}</p>
                  {station.contentParagraphs.slice(0, 2).map((p, pIdx) => (
                    <div key={pIdx}>
                      <strong className="text-slate-900">{p.heading}: </strong>
                      <span>{p.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Abschnitt B: Historische Quelle mit Zeilennummern */}
              {station.quotes.length > 0 && (
                <div className="space-y-2 print-avoid-break">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Teil B: Historisches Zeitdokument (Quelle)
                    </h2>
                    <span className="text-[10px] text-slate-500">
                      {station.quotes[0].author} ({station.quotes[0].year})
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 border border-slate-300 rounded-lg text-xs leading-relaxed font-serif-title italic text-slate-900 relative">
                    <p>{station.quotes[0].text}</p>
                    <div className="mt-2 not-italic font-sans text-[10px] text-slate-500 text-right">
                      Quelle: {station.quotes[0].source}
                    </div>
                  </div>
                </div>
              )}

              {/* Binnendifferenzierung: Worterklärungen */}
              {includeVocabulary && wsData.vocabulary.length > 0 && (
                <div className="p-3 bg-amber-50/50 border border-amber-900/20 rounded-lg text-[11px] print-avoid-break">
                  <strong className="text-amber-950 block mb-1">
                    💡 Historischer Wortschatz-Spickzettel (Worterklärungen):
                  </strong>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {wsData.vocabulary.map((vocab, vIdx) => (
                      <div key={vIdx} className="text-slate-800">
                        <span className="font-bold text-slate-950">{vocab.word}: </span>
                        <span>{vocab.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Abschnitt C: Kompetenzorientierte Arbeitsaufgaben */}
              <div className="space-y-4 print-avoid-break">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Teil C: Arbeitsaufgaben (AFB I, II &amp; III)
                  </h2>
                  <span className="text-[10px] text-slate-500">
                    Formuliere in vollständigen Sätzen
                  </span>
                </div>

                {wsData.tasks.map((task) => (
                  <div key={task.number} className="space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-slate-900">
                        <span className="font-bold mr-1">{task.number}.</span>
                        <span>{task.prompt}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 text-[10px] font-mono text-slate-500">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100">{task.afb}</span>
                        {includeGrading && (
                          <span className="font-bold">[{task.points} P.]</span>
                        )}
                      </div>
                    </div>

                    {/* Schreiblinien für Schüler */}
                    {includeWritingLines && !includeSolutions && (
                      <div className="space-y-3 py-1">
                        {Array.from({ length: task.linesCount }).map((_, lIdx) => (
                          <div key={lIdx} className="border-b border-slate-300 w-full h-2" />
                        ))}
                      </div>
                    )}

                    {/* Eingeblendete Musterlösung (wenn aktiv) */}
                    {includeSolutions && (
                      <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-950 font-serif-title text-[11px] leading-relaxed">
                        <strong className="font-sans font-bold text-emerald-900 block mb-0.5">
                          ✓ Erwartete Musterlösung:
                        </strong>
                        <p>{task.sampleAnswer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Abschnitt D: Multiple-Choice-Schnellcheck */}
              {includeQuiz && station.quiz.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-slate-200 print-avoid-break">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      Teil D: Wissens-Check zur Station
                    </h2>
                    {includeGrading && <span className="text-[10px] font-mono font-bold">[4 P.]</span>}
                  </div>

                  <div className="space-y-2 text-xs">
                    {station.quiz.slice(0, 2).map((q, qIdx) => (
                      <div key={q.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="font-bold text-slate-900 mb-1.5">
                          {qIdx + 1}. {q.question}
                        </p>
                        <div className="space-y-1">
                          {q.options.map((opt, oIdx) => (
                            <div key={oIdx} className="flex items-start gap-2">
                              <span
                                className={`inline-block w-3.5 h-3.5 border rounded-xs shrink-0 mt-0.5 text-[9px] text-center leading-3 ${
                                  includeSolutions && oIdx === q.correctIndex
                                    ? 'bg-emerald-600 text-white font-bold border-emerald-700'
                                    : 'border-slate-400 bg-white'
                                }`}
                              >
                                {includeSolutions && oIdx === q.correctIndex ? '✕' : ''}
                              </span>
                              <span
                                className={`${
                                  includeSolutions && oIdx === q.correctIndex
                                    ? 'font-bold text-emerald-950'
                                    : 'text-slate-800'
                                }`}
                              >
                                {opt}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fußzeile des Arbeitsblattes */}
              <div className="pt-4 border-t border-slate-300 text-[10px] text-slate-500 flex justify-between items-center print:pt-2">
                <span>
                  Einigkeit und Freiheit 1815–1849 · Station {station.id} Arbeitsblatt
                </span>
                <span>
                  {includeSolutions ? 'LEHRER-LÖSUNGSBOGEN' : 'Klasse 8–10 · Geschichtsunterricht'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
