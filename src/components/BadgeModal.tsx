import React from 'react';
import { X, Award, CheckCircle2, Lock, Shield, Flag, Crown, Search, Feather, Building } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { BADGES } from '../data/historyData';

export const BadgeModal: React.FC = () => {
  const { isBadgeModalOpen, setIsBadgeModalOpen, unlockedBadges, xp, completedStations } =
    useProgress();

  if (!isBadgeModalOpen) return null;

  const getIcon = (name: string) => {
    switch (name) {
      case 'Flag':
        return <Flag className="w-5 h-5" />;
      case 'Crown':
        return <Crown className="w-5 h-5" />;
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'Feather':
        return <Feather className="w-5 h-5" />;
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Building':
        return <Building className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-amber-900/15 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-amber-900 to-red-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif-title text-xl font-bold">Historische Ehrenorden</h3>
              <p className="text-xs text-amber-200">
                {unlockedBadges.length} von {BADGES.length} Orden freigeschaltet · {xp} Gesamt-XP
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsBadgeModalOpen(false)}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges Grid */}
        <div className="p-6 overflow-y-auto space-y-3">
          {BADGES.map((badge) => {
            const isUnlocked = unlockedBadges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                  isUnlocked
                    ? 'bg-amber-50/60 border-amber-800/30 text-slate-900'
                    : 'bg-slate-50/80 border-slate-200 text-slate-400 opacity-70'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-gradient-to-br from-amber-600 to-red-700 text-white shadow-md'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isUnlocked ? getIcon(badge.iconName) : <Lock className="w-5 h-5" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900">{badge.title}</h4>
                    {isUnlocked && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Erworben
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {badge.description}
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 mt-1 block">
                    Station {badge.unlockedAtStation}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
          <button
            onClick={() => setIsBadgeModalOpen(false)}
            className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
