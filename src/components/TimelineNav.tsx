import React from 'react';
import { CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import { STATIONS } from '../data/historyData';
import { useProgress } from '../context/ProgressContext';

export const TimelineNav: React.FC = () => {
  const { activeStationId, setActiveStationId, completedStations } = useProgress();

  return (
    <div className="bg-amber-100/40 border-b border-amber-900/10 px-4 md:px-8 py-3 overflow-x-auto scrollbar-none">
      <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
        {STATIONS.map((station, index) => {
          const isActive = station.id === activeStationId;
          const isCompleted = completedStations.includes(station.id);

          return (
            <React.Fragment key={station.id}>
              <button
                onClick={() => setActiveStationId(station.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all ${
                  isActive
                    ? 'bg-amber-900 text-white shadow-sm font-semibold'
                    : isCompleted
                    ? 'bg-white/80 text-amber-950 border border-amber-900/15 hover:bg-white'
                    : 'bg-white/40 text-slate-600 hover:bg-white/70 border border-transparent'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                    isActive
                      ? 'bg-amber-200 text-amber-950'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : station.id}
                </div>
                <div className="text-left">
                  <span className="block font-mono text-[10px] opacity-80 leading-none">{station.period}</span>
                  <span className="block truncate max-w-[130px] font-medium leading-tight mt-0.5">
                    {station.title.split('&')[0].replace('Die ', '')}
                  </span>
                </div>
              </button>

              {index < STATIONS.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-amber-900/30 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
