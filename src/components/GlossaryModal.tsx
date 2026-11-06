import React, { useState } from 'react';
import { X, BookOpen, Search } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { GLOSSARY } from '../data/historyData';

export const GlossaryModal: React.FC = () => {
  const { isGlossaryOpen, setIsGlossaryOpen } = useProgress();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isGlossaryOpen) return null;

  const categories = ['all', ...Array.from(new Set(GLOSSARY.map((g) => g.category)))];

  const filtered = GLOSSARY.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-amber-900/15 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl font-bold">Historisches Glossar (1815–1849)</h3>
              <p className="text-xs text-slate-300">
                Die wichtigsten Fachbegriffe und Konzepte für die Klassen 8 bis 10
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsGlossaryOpen(false)}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-4 bg-amber-50/50 border-b border-amber-900/10 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Begriff suchen (z. B. Restauration, Zensur, Paulskirche)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-amber-100/60 border border-slate-200'
                }`}
              >
                {cat === 'all' ? 'Alle Begriffe' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Terms List */}
        <div className="p-6 overflow-y-auto space-y-3">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-amber-900/10 hover:border-amber-900/25 transition-colors shadow-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="font-serif-title font-bold text-base text-slate-900">{item.term}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">{item.explanation}</p>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              Kein Glossarbegriff für „{searchTerm}“ gefunden.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={() => setIsGlossaryOpen(false)}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
