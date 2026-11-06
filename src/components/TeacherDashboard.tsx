import React, { useState } from 'react';
import {
  GraduationCap,
  Printer,
  Search,
  CheckCircle2,
  FileText,
  Lightbulb,
  Award,
  Layers,
  HelpCircle,
  FileSpreadsheet,
  Lock,
  KeyRound,
  ShieldCheck,
  Globe,
  Download,
} from 'lucide-react';
import { SOLUTIONS } from '../data/solutionsData';
import { STATIONS } from '../data/historyData';
import { StationWorksheetGenerator } from './StationWorksheetGenerator';
import { useProgress } from '../context/ProgressContext';

export const TeacherDashboard: React.FC = () => {
  const { lockTeacherDashboard, changeTeacherPassword } = useProgress();
  const [selectedPage, setSelectedPage] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'worksheets' | 'solutions' | 'competencies' | 'printable' | 'security'>('worksheets');

  // Password change state
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passFeedback, setPassFeedback] = useState<{ isError: boolean; message: string } | null>(null);

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPassFeedback({ isError: true, message: 'Die neuen Passwörter stimmen nicht überein.' });
      return;
    }
    const result = changeTeacherPassword(oldPassword, newPassword);
    if (result.success) {
      setPassFeedback({ isError: false, message: result.message });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPassFeedback({ isError: true, message: result.message });
    }
  };

  const filteredSolutions = SOLUTIONS.filter((item) => {
    const matchesPage = selectedPage === 'all' || item.page === selectedPage;
    const matchesSearch =
      item.taskQuestion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sampleSolution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPage && matchesSearch;
  });

  const availablePages = Array.from(new Set(SOLUTIONS.map((s) => s.page))).sort((a, b) => a - b);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Teacher Cockpit Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <GraduationCap className="w-5 h-5" />
            <span>Lehrer-Pult (Geschützter Bereich)</span>
          </div>
          <h2 className="font-serif-title text-2xl md:text-3xl font-bold mt-1">
            Unterrichtsmaterialien &amp; Arbeitsblatt-Generator
          </h2>
          <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl leading-relaxed">
            Generiere automatisch formatierte DIN-A4-Arbeitsblätter zu jeder der 7 Stationen (mit Quellentexten,
            differenzierten Aufgaben und Schreiblinien), greife auf alle Buch-Musterlösungen zu oder drucke den Laufzettel.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={lockTeacherDashboard}
            title="Dashboard sperren und zur Schüler-Ansicht zurückkehren"
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 font-semibold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Pult sperren</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Als PDF drucken / speichern</span>
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-amber-900/10 pb-3 overflow-x-auto print:hidden">
        <button
          onClick={() => setActiveTab('worksheets')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'worksheets'
              ? 'bg-amber-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-amber-100/50'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>PDF-Arbeitsblatt-Generator (Stationen 1–7)</span>
        </button>

        <button
          onClick={() => setActiveTab('solutions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'solutions'
              ? 'bg-amber-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-amber-100/50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Musterlösungen Buch (S. 48–71)</span>
        </button>

        <button
          onClick={() => setActiveTab('competencies')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'competencies'
              ? 'bg-amber-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-amber-100/50'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Kompetenzraster (S. 47)</span>
        </button>

        <button
          onClick={() => setActiveTab('printable')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'printable'
              ? 'bg-amber-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-amber-100/50'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>Stationslaufzettel (Kompakt)</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'security'
              ? 'bg-amber-900 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-amber-100/50'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Passwort &amp; Netlify-Bereitstellung</span>
        </button>
      </div>

      {/* Tab 1: Arbeitsblatt-Generator für Stationen 1–7 */}
      {activeTab === 'worksheets' && <StationWorksheetGenerator />}

      {/* Tab 2: Musterlösungen */}
      {activeTab === 'solutions' && (
        <div className="space-y-6 print:hidden">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-amber-900/10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                Buchseite:
              </span>
              <button
                onClick={() => setSelectedPage('all')}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  selectedPage === 'all'
                    ? 'bg-amber-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Alle Seiten
              </button>
              {availablePages.map((pg) => (
                <button
                  key={pg}
                  onClick={() => setSelectedPage(pg)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedPage === pg
                      ? 'bg-amber-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  S. {pg}
                </button>
              ))}
            </div>

            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Suchbegriff (z.B. Arndt, Paulskirche)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
              />
            </div>
          </div>

          {/* Solutions List */}
          <div className="space-y-4">
            {filteredSolutions.map((sol, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-amber-900/15 p-5 shadow-sm space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-950">
                      Seite {sol.page}
                    </span>
                    <span className="text-xs font-bold text-amber-900">{sol.taskNumber}</span>
                    <span className="text-xs text-slate-500">· {sol.topic}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {sol.competency}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Schulbuchfrage:
                  </h4>
                  <p className="text-sm font-semibold text-slate-900">{sol.taskQuestion}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-900/10">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
                    Erwartete Musterlösung:
                  </h5>
                  <p className="text-xs text-emerald-950 leading-relaxed whitespace-pre-line">
                    {sol.sampleSolution}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-900/10 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-950">
                    <span className="font-bold">Didaktischer Unterrichtstipp: </span>
                    <span>{sol.didacticTip}</span>
                  </div>
                </div>
              </div>
            ))}

            {filteredSolutions.length === 0 && (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-xs">
                Keine Aufgaben zur aktuellen Auswahl gefunden.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Kompetenzen */}
      {activeTab === 'competencies' && (
        <div className="bg-white rounded-2xl border border-amber-900/15 p-6 md:p-8 shadow-sm space-y-6 print:hidden">
          <div>
            <h3 className="font-serif-title text-xl font-bold text-slate-900">
              Kompetenzerwartungen für die Klassenstufe 8–10 (Buch S. 47)
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Am Ende dieser Unterrichtseinheit können die Schülerinnen und Schüler:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Geschichtskarten & Territorien auswerten',
                desc: 'Die territorialen Verhältnisse in Mitteleuropa nach dem Wiener Kongress 1815 beschreiben und Rückschlüsse auf die Machtpolitik ziehen.',
              },
              {
                title: 'Konflikt zwischen Volk & Fürsten analysieren',
                desc: 'Den zentralen Spannungsbogen zwischen Freiheitsstreben (Liberalismus, Einheit) und restaurativen Mächten (Deutscher Bund, Metternich) erklären.',
              },
              {
                title: 'Zensur & Meinungsfreiheit reflektieren',
                desc: 'Möglichkeiten und Grenzen politischer Äußerung vor dem Hintergrund von Karlsbader Beschlüssen und Zensur beurteilen (Wartburg 1817, Hambach 1832).',
              },
              {
                title: 'Weg zur Nationalversammlung nachzeichnen',
                desc: 'Die Märzrevolution 1848, die Barrikadenkämpfe und die Errungenschaften des ersten frei gewählten Parlaments in der Frankfurter Paulskirche darstellen.',
              },
              {
                title: 'Scheitern & historisches Erbe beurteilen',
                desc: 'Die Gründe für das Scheitern von 1848/49 (Kaiserkrone, fehlende Truppen) abwägen und die Bedeutung der Grundrechte für das heutige Grundgesetz erkennen.',
              },
              {
                title: 'Zentrale Grundbegriffe sicher anwenden',
                desc: 'Deutscher Bund, Nationalismus, Liberalismus, Parlament, Verfassung, Restauration, Zensur und Vormärz präzise definieren.',
              },
            ].map((comp, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-amber-50/40 border border-amber-900/10 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-950 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">{comp.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Kompakter Stationslaufzettel */}
      {activeTab === 'printable' && (
        <div className="space-y-8">
          {/* Hinweis im Browser */}
          <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-900/15 text-xs text-amber-950 flex items-center justify-between print:hidden">
            <span>
              💡 <strong>Drucktipp:</strong> Dieser kompakte Laufzettel dient als Übersicht zum Abhaken im Stationenlernen.
            </span>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-amber-900 text-white rounded-lg font-semibold shrink-0"
            >
              Laufzettel drucken
            </button>
          </div>

          {/* Druckversion DIN A4 */}
          <div className="bg-white p-8 md:p-12 rounded-2xl border border-slate-300 shadow-sm print:shadow-none print:border-none print:p-0 text-slate-900">
            {/* Kopfzeile Arbeitsblatt */}
            <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-end">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-600 block">
                  Geschichte · Klasse 8–10 · Stationenlernen
                </span>
                <h1 className="font-serif-title text-2xl font-bold">
                  Einigkeit und Freiheit? Deutschland 1815–1849
                </h1>
              </div>
              <div className="text-right text-xs space-y-1">
                <div>Name: __________________________</div>
                <div>Klasse: _______ Datum: __________</div>
              </div>
            </div>

            {/* Laufzettel Tabelle */}
            <div className="mb-8">
              <h2 className="font-serif-title text-base font-bold mb-2">
                1. Mein Stationen-Laufzettel (1815–1849)
              </h2>
              <p className="text-xs text-slate-600 mb-3">
                Bearbeite die Stationen in der App oder im Lehrbuch und hake erledigte Stationen ab:
              </p>

              <table className="w-full text-xs border border-slate-300 border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300">
                    <th className="p-2 text-left border-r border-slate-300 w-12">Nr.</th>
                    <th className="p-2 text-left border-r border-slate-300">Thema der Station</th>
                    <th className="p-2 text-left border-r border-slate-300 w-28">Zeitraum</th>
                    <th className="p-2 text-center border-r border-slate-300 w-24">Quest gelöst</th>
                    <th className="p-2 text-left">Eigene Notiz / Erkenntnis</th>
                  </tr>
                </thead>
                <tbody>
                  {STATIONS.map((st) => (
                    <tr key={st.id} className="border-b border-slate-200">
                      <td className="p-2 font-mono font-bold border-r border-slate-300">{st.id}</td>
                      <td className="p-2 font-medium border-r border-slate-300">{st.title}</td>
                      <td className="p-2 font-mono text-slate-600 border-r border-slate-300">
                        {st.period}
                      </td>
                      <td className="p-2 text-center border-r border-slate-300">
                        <span className="inline-block w-4 h-4 border border-slate-400 rounded-sm" />
                      </td>
                      <td className="p-2 text-slate-400 italic">..................................</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-300 text-[10px] text-slate-500 flex justify-between">
              <span>Erstellt für den Geschichtsunterricht · Einigkeit und Freiheit 1815–1849</span>
              <span>Klassen 8 bis 10</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Passwort & Netlify-Bereitstellung */}
      {activeTab === 'security' && (
        <div className="space-y-6 print:hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Passwort ändern Box */}
            <div className="bg-white rounded-2xl border border-amber-900/15 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-title text-lg font-bold text-slate-900">
                    Lehrer-Passwort ändern
                  </h3>
                  <p className="text-xs text-slate-500">
                    Passe das Schutzpasswort für dieses Endgerät an
                  </p>
                </div>
              </div>

              <form onSubmit={handlePasswordChangeSubmit} className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Aktuelles Passwort:
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Bisheriges Passwort..."
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Neues Passwort:
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mindestens 4 Zeichen..."
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Neues Passwort bestätigen:
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Neues Passwort wiederholen..."
                    required
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
                  />
                </div>

                {passFeedback && (
                  <div
                    className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                      passFeedback.isError
                        ? 'bg-red-50 text-red-900 border border-red-200'
                        : 'bg-emerald-50 text-emerald-950 border border-emerald-300'
                    }`}
                  >
                    {passFeedback.isError ? (
                      <span>⚠️ {passFeedback.message}</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{passFeedback.message}</span>
                      </>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Neues Passwort speichern
                </button>
              </form>
            </div>

            {/* Netlify & GitHub Leitfaden Box */}
            <div className="bg-white rounded-2xl border border-amber-900/15 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-title text-lg font-bold text-slate-900">
                    Netlify- &amp; GitHub-Bereitstellung
                  </h3>
                  <p className="text-xs text-slate-500">
                    Schritt-für-Schritt-Anleitung für die Veröffentlichung
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                  <span className="font-bold flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Vollständig für Netlify konfiguriert!
                  </span>
                  <p className="text-[11px] text-emerald-900">
                    Die Konfigurationsdateien <code className="font-mono bg-emerald-100 px-1 py-0.5 rounded">netlify.toml</code> und <code className="font-mono bg-emerald-100 px-1 py-0.5 rounded">public/_redirects</code> wurden automatisch angelegt, damit Single-Page-Routing auf Netlify ohne 404-Fehler funktioniert.
                  </p>
                </div>



                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900">Bereitstellung über GitHub &amp; Netlify (Empfohlen):</h4>
                  <ol className="list-decimal pl-4 space-y-1.5 text-slate-700">
                    <li>
                      <strong>Auf GitHub hochladen:</strong> Ein neues Repository auf GitHub erstellen und den Code hochladen (per <code className="font-mono bg-slate-100 px-1">git push</code> oder GitHub Desktop).
                    </li>
                    <li>
                      <strong>Mit Netlify verbinden:</strong> Auf <a href="https://netlify.com" target="_blank" rel="noreferrer" className="text-amber-800 underline font-semibold">netlify.com</a> anmelden, auf <em>„Add new site“ → „Import an existing project“</em> klicken und dein GitHub-Repo auswählen.
                    </li>
                    <li>
                      <strong>Build-Einstellungen prüfen:</strong>
                      <div className="p-2 bg-slate-100 rounded font-mono text-[11px] text-slate-800 my-1 space-y-0.5">
                        <div>Build command: <strong>npm run build</strong></div>
                        <div>Publish directory: <strong>dist</strong></div>
                      </div>
                    </li>
                    <li>
                      <strong>Link an Schüler verteilen:</strong> Netlify generiert dir sofort eine kostenlose HTTPS-Webadresse (z. B. <em>einigkeit-1848.netlify.app</em>), die Schüler auf ihren Handys, Tablets oder Laptops aufrufen können!
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
