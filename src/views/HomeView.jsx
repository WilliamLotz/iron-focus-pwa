import React, { useMemo } from 'react';
import { Play, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { getMuscleRecoveryStatus, generateSmartWorkoutSuggestion, checkProgressiveOverload } from '../utils/formulas';

export default function HomeView({
  userData,
  onStartWorkout,
  onGoToTab
}) {
  const { exercises = [], workouts = [], history = [] } = userData;

  // Analyse de la récupération musculaire en tâche de fond pour alimenter l'algorithme
  const recoveryStatus = useMemo(() => {
    return getMuscleRecoveryStatus(history, exercises);
  }, [history, exercises]);

  // Suggestion automatique intelligente
  const smartSuggestion = useMemo(() => {
    return generateSmartWorkoutSuggestion(recoveryStatus);
  }, [recoveryStatus]);

  // Analyse des surcharges progressives éligibles
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

  // 3 Statistiques rapides compactes
  const statsOverview = useMemo(() => {
    const totalSessions = history.length;
    const totalTonnage = history.reduce((acc, s) => acc + (s.totalTonnage || 0), 0);
    return {
      totalSessions,
      totalTonnageTons: Math.round(totalTonnage / 1000),
      exercisesCount: exercises.length
    };
  }, [history, exercises]);

  // Trouver la routine suggérée
  const recommendedRoutine = workouts.find(w => w.id === smartSuggestion.routineId) || workouts[0];

  return (
    <div className="space-y-4 pb-36 px-4 pt-3">
      {/* 3 MÉTRIQUES COMPACTES */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-[#141414] p-3 border border-[#262626]">
          <span className="text-[9px] font-mono text-[#737373] uppercase tracking-wider block">
            SÉANCES
          </span>
          <span className="text-lg font-mono font-black text-white tabular-nums">
            {statsOverview.totalSessions}
          </span>
        </div>
        <div className="bg-[#141414] p-3 border border-[#262626]">
          <span className="text-[9px] font-mono text-[#737373] uppercase tracking-wider block">
            TONNAGE
          </span>
          <span className="text-lg font-mono font-black text-[#EF4444] tabular-nums">
            {statsOverview.totalTonnageTons} T
          </span>
        </div>
        <div className="bg-[#141414] p-3 border border-[#262626]">
          <span className="text-[9px] font-mono text-[#737373] uppercase tracking-wider block">
            EXERCICES
          </span>
          <span className="text-lg font-mono font-black text-white tabular-nums">
            {statsOverview.exercisesCount}
          </span>
        </div>
      </div>

      {/* ALERTE SURCHARGE PROGRESSIVE (SI APPLICABLE) */}
      {progressiveOverloadAlerts.length > 0 && (
        <div className="bg-[#0D1C12] border-2 border-[#22C55E] p-3.5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#22C55E]" />
              <span className="font-mono text-xs font-black tracking-widest text-[#22C55E] uppercase">
                SURCHARGE PROGRESSIVE DÉTECTÉE ({progressiveOverloadAlerts.length})
              </span>
            </div>
            <span className="text-[9px] font-mono text-[#22C55E] font-bold uppercase">
              PRÊT À MONTER
            </span>
          </div>

          <div className="space-y-1.5">
            {progressiveOverloadAlerts.slice(0, 2).map((item) => (
              <div
                key={item.exercise.id}
                className="bg-[#0A0A0A] border border-[#22C55E]/40 p-2 flex items-center justify-between"
              >
                <div>
                  <div className="font-mono text-xs font-bold text-white uppercase truncate max-w-[200px]">
                    {item.exercise.name}
                  </div>
                  <div className="text-[10px] font-mono text-[#888]">
                    Dernière : {item.currentWeight} kg validé
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-black text-[#22C55E] tabular-nums">
                    +{item.increment} KG
                  </div>
                  <div className="text-[9px] font-mono text-white font-bold tabular-nums">
                    CIBLE : {item.suggestedWeight} KG
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUGGESTION DU JOUR ÉPURÉE EN GRAND (FOCUS PRINCIPAL ~70% DE L'ÉCRAN) */}
      <div className="bg-[#141414] border border-[#262626] p-5 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
        {/* Accent géométrique d'arrière-plan */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#EF4444]/5 pointer-events-none -mr-10 -mt-10"></div>

        <div>
          {/* Header de la carte suggestion */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#EF4444] animate-pulse"></span>
              <span className="text-[10px] font-mono tracking-widest text-[#EF4444] uppercase font-bold">
                // SUGGESTION DU JOUR
              </span>
            </div>
            <span className="text-[9px] font-mono text-[#22C55E] bg-[#0E2A18] px-2 py-0.5 border border-[#22C55E]/40 font-bold uppercase">
              RÉCUPÉRATION OPTIMISÉE
            </span>
          </div>

          {/* Titre grand format */}
          <h1 className="text-2xl font-mono font-black text-white uppercase tracking-wider mb-2 leading-tight">
            {smartSuggestion.title}
          </h1>

          {/* Groupes musculaires ciblés */}
          <div className="inline-block bg-[#0A0A0A] border border-[#262626] px-3 py-1 mb-4">
            <span className="text-xs font-mono font-bold text-[#EF4444] uppercase tracking-wide">
              {smartSuggestion.target}
            </span>
          </div>

          {/* Raison biomécanique synthétique */}
          <div className="bg-[#0A0A0A] border border-[#262626] p-3 text-xs font-mono text-[#CCCCCC] leading-relaxed mb-6">
            <span className="text-[9px] font-mono text-[#737373] block uppercase mb-1">
              // ANALYSE BIOMÉCANIQUE
            </span>
            {smartSuggestion.reason}
          </div>
        </div>

        {/* GROS BOUTON ROUGE LANCER */}
        <button
          onClick={() => {
            if (recommendedRoutine) {
              onStartWorkout(recommendedRoutine);
            }
          }}
          className="w-full bg-[#EF4444] hover:bg-[#DC2626] active:bg-[#B91C1C] text-white py-4 px-6 font-mono font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(239,68,68,0.25)] active:translate-y-0.5 cursor-pointer"
        >
          <Play size={18} fill="white" />
          LANCER
        </button>
      </div>

      {/* PROGRAMMES EN DESSOUS : LISTE SIMPLE SANS DESCRIPTION LONGUE */}
      <div className="bg-[#141414] border border-[#262626] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-black tracking-wider text-white uppercase">
            AUTRES PROGRAMMES
          </span>
          <button
            onClick={() => onGoToTab('workouts')}
            className="text-[10px] font-mono text-[#EF4444] hover:underline uppercase flex items-center gap-0.5 cursor-pointer"
          >
            TOUT VOIR <ChevronRight size={12} />
          </button>
        </div>

        <div className="space-y-1.5">
          {workouts.map((w) => (
            <div
              key={w.id}
              className="bg-[#0A0A0A] hover:bg-[#121212] border border-[#262626] p-2.5 flex items-center justify-between transition-colors"
            >
              <div className="flex-1 pr-3">
                <div className="font-mono text-xs font-bold text-white uppercase truncate">
                  {w.name}
                </div>
                <div className="text-[10px] font-mono text-[#737373] uppercase">
                  {w.exercises?.length || 0} EXERCICES
                </div>
              </div>
              <button
                onClick={() => onStartWorkout(w)}
                className="bg-[#1A1A1A] hover:bg-[#EF4444] text-white border border-[#333] hover:border-[#EF4444] px-3 py-1.5 text-[11px] font-mono font-bold uppercase transition-all cursor-pointer"
              >
                LANCER
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
