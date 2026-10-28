import React, { useMemo } from 'react';
import { Play, TrendingUp, ChevronRight } from 'lucide-react';
import { getMuscleRecoveryStatus, generateSmartWorkoutSuggestion, checkProgressiveOverload } from '../utils/formulas';

export default function HomeView({
  userData,
  onStartWorkout,
  onGoToTab
}) {
  const { exercises = [], workouts = [], history = [] } = userData;

  const recoveryStatus = useMemo(() => {
    return getMuscleRecoveryStatus(history, exercises);
  }, [history, exercises]);

  const smartSuggestion = useMemo(() => {
    return generateSmartWorkoutSuggestion(recoveryStatus);
  }, [recoveryStatus]);

  const progressiveOverloadAlerts = useMemo(() => {
    const alerts = [];
    exercises.forEach(ex => {
      const check = checkProgressiveOverload(ex.id, exercises, history);
      if (check.eligible) {
        alerts.push({
          exercise: ex,
          ...check
        });
      }
    });
    return alerts;
  }, [exercises, history]);

  const statsOverview = useMemo(() => {
    const totalSessions = history.length;
    const totalTonnage = history.reduce((acc, s) => acc + (s.totalTonnage || 0), 0);
    return {
      totalSessions,
      totalTonnageTons: Math.round(totalTonnage / 1000),
      exercisesCount: exercises.length
    };
  }, [history, exercises]);

  const recommendedRoutine = workouts.find(w => w.id === smartSuggestion.routineId) || workouts[0];

  return (
    <div className="space-y-3 pb-36 px-3.5 pt-2">
      {/* BARRE STATS COMPACTE 1 LIGNE */}
      <div className="flex items-center justify-around bg-[#141414] border border-[#262626] py-2 px-3 text-center">
        <div>
          <span className="text-[9px] font-mono text-[#737373] uppercase block">SÉANCES</span>
          <span className="text-sm font-mono font-bold text-white tabular-nums">{statsOverview.totalSessions}</span>
        </div>
        <div className="w-[1px] h-6 bg-[#262626]"></div>
        <div>
          <span className="text-[9px] font-mono text-[#737373] uppercase block">TONNAGE</span>
          <span className="text-sm font-mono font-bold text-[#EF4444] tabular-nums">{statsOverview.totalTonnageTons} T</span>
        </div>
        <div className="w-[1px] h-6 bg-[#262626]"></div>
        <div>
          <span className="text-[9px] font-mono text-[#737373] uppercase block">EXERCICES</span>
          <span className="text-sm font-mono font-bold text-white tabular-nums">{statsOverview.exercisesCount}</span>
        </div>
      </div>

      {/* ALERTE SURCHARGE PROGRESSIVE (SI APPLICABLE) */}
      {progressiveOverloadAlerts.length > 0 && (
        <div className="bg-[#0D1C12] border border-[#22C55E] p-3">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-[#22C55E]" />
              <span className="font-mono text-xs font-black text-[#22C55E] uppercase">
                SURCHARGE CONSEILLÉE
              </span>
            </div>
            <span className="text-[9px] font-mono text-[#22C55E] font-bold">
              +{progressiveOverloadAlerts[0]?.increment} KG
            </span>
          </div>
          <div className="text-xs font-mono text-white truncate">
            {progressiveOverloadAlerts[0]?.exercise.name} ➔ <strong className="text-[#22C55E]">{progressiveOverloadAlerts[0]?.suggestedWeight} kg</strong>
          </div>
        </div>
      )}

      {/* SUGGESTION DU JOUR ÉPURÉE (ZERO BLOC DE TEXTE INUTILE) */}
      <div className="bg-[#141414] border border-[#262626] p-4 relative">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#EF4444] animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-widest text-[#EF4444] uppercase font-bold">
              SÉANCE CONSEILLÉE
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#22C55E] border border-[#22C55E]/40 px-1.5 py-0.5 font-bold uppercase">
            PRÊT
          </span>
        </div>

        <h2 className="text-xl font-mono font-black text-white uppercase tracking-wider mb-1">
          {smartSuggestion.title}
        </h2>
        <p className="text-xs font-mono text-[#A3A3A3] uppercase mb-4">
          {smartSuggestion.target}
        </p>

        <button
          onClick={() => {
            if (recommendedRoutine) {
              onStartWorkout(recommendedRoutine);
            }
          }}
          className="w-full bg-[#EF4444] hover:bg-[#DC2626] active:bg-[#B91C1C] text-white py-3.5 px-4 font-mono font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:translate-y-0.5"
        >
          <Play size={16} fill="white" />
          DÉMARRER LA SÉANCE
        </button>
      </div>

      {/* AUTRES PROGRAMMES : CLIC DIRECT ET PROPRE */}
      <div className="bg-[#141414] border border-[#262626] p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono font-black tracking-wider text-white uppercase">
            PROGRAMMES
          </span>
          <button
            onClick={() => onGoToTab('workouts')}
            className="text-[10px] font-mono text-[#EF4444] uppercase flex items-center gap-0.5 cursor-pointer font-bold"
          >
            TOUT VOIR <ChevronRight size={12} />
          </button>
        </div>

        <div className="space-y-1.5">
          {workouts.length === 0 ? (
            <div className="p-3 text-center text-xs font-mono text-[#666]">
              Aucun programme. Créez-en un dans l'onglet Séances.
            </div>
          ) : (
            workouts.map((w) => (
              <div
                key={w.id}
                onClick={() => onStartWorkout(w)}
                className="bg-[#0A0A0A] hover:bg-[#181818] border border-[#262626] p-2.5 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <div className="font-mono text-xs font-bold text-white uppercase truncate">
                    {w.name}
                  </div>
                  <div className="text-[10px] font-mono text-[#737373]">
                    {w.exercises?.length || 0} exercices
                  </div>
                </div>
                <span className="shrink-0 bg-[#1A1A1A] text-white border border-[#333] px-2.5 py-1 text-[10px] font-mono font-bold uppercase">
                  LANCER
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
