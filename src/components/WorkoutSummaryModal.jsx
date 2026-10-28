import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Clock, Dumbbell, CheckCircle2, ArrowRight } from 'lucide-react';
import { playPRSound } from '../utils/audio';

export default function WorkoutSummaryModal({
  isOpen,
  workoutData,
  onClose,
  onGoToStats
}) {
  useEffect(() => {
    if (isOpen) {
      playPRSound();
      // Burst brutalist red & white confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EF4444', '#FFFFFF', '#22C55E', '#888888']
      });
    }
  }, [isOpen]);

  if (!isOpen || !workoutData) return null;

  const { workoutName, durationSeconds, totalTonnage, exercises = [] } = workoutData;

  const totalSets = exercises.reduce((acc, ex) => {
    return acc + (ex.sets?.filter(s => s.completed)?.length || 0);
  }, 0);

  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${String(s).padStart(2, '0')}s`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#0A0A0A] border-2 border-[#EF4444] shadow-2xl p-5 space-y-4">
        {/* En-tête */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-[#260C0C] border border-[#EF4444] px-3 py-1 text-[#EF4444] text-xs font-mono font-black uppercase tracking-widest mb-1">
            <Award size={14} /> SÉANCE TERMINÉE // MISSION ACCOMPLIE
          </div>
          <h2 className="text-xl font-mono font-black text-white uppercase tracking-wider">
            {workoutName}
          </h2>
          <p className="text-xs font-mono text-[#888]">
            Enregistré dans votre journal et synchronisé localement.
          </p>
        </div>

        {/* 3 Métriques majeures */}
        <div className="grid grid-cols-3 gap-2 py-2">
          <div className="bg-[#141414] border border-[#262626] p-3 text-center">
            <Clock size={16} className="text-[#EF4444] mx-auto mb-1" />
            <span className="text-[9px] font-mono text-[#737373] uppercase block">DURÉE</span>
            <span className="text-sm font-mono font-black text-white tabular-nums">
              {formatDuration(durationSeconds)}
            </span>
          </div>

          <div className="bg-[#141414] border border-[#262626] p-3 text-center">
            <Dumbbell size={16} className="text-[#22C55E] mx-auto mb-1" />
            <span className="text-[9px] font-mono text-[#737373] uppercase block">TONNAGE</span>
            <span className="text-sm font-mono font-black text-[#22C55E] tabular-nums">
              {totalTonnage.toLocaleString()} KG
            </span>
          </div>

          <div className="bg-[#141414] border border-[#262626] p-3 text-center">
            <CheckCircle2 size={16} className="text-white mx-auto mb-1" />
            <span className="text-[9px] font-mono text-[#737373] uppercase block">SÉRIES</span>
            <span className="text-sm font-mono font-black text-white tabular-nums">
              {totalSets} SÉRIES
            </span>
          </div>
        </div>

        {/* Récapitulatif par exercice */}
        <div className="bg-[#141414] border border-[#262626] p-3 max-h-48 overflow-y-auto space-y-2">
          <span className="text-[10px] font-mono text-[#737373] uppercase tracking-wider block">
            DÉTAIL DES EXERCICES EFFECTUÉS
          </span>
          {exercises.map((ex, idx) => {
            const completedSets = ex.sets?.filter(s => s.completed) || [];
            if (completedSets.length === 0) return null;
            return (
              <div key={idx} className="border-b border-[#222] pb-1.5 text-xs font-mono">
                <div className="text-white font-bold uppercase truncate">{ex.name}</div>
                <div className="text-[#888] text-[10px] tabular-nums flex flex-wrap gap-1 mt-0.5">
                  {completedSets.map((s, sIdx) => (
                    <span key={sIdx} className="bg-[#0A0A0A] border border-[#262626] px-1.5 py-0.5">
                      S{s.setNumber}: {s.weight}kg × {s.reps}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 bg-[#1A1A1A] hover:bg-[#262626] text-white py-3 text-xs font-mono font-bold uppercase tracking-wider"
          >
            RETOURNER À L'ACCUEIL
          </button>
          <button
            onClick={onGoToStats}
            className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white py-3 text-xs font-mono font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
          >
            VOIR STATISTIQUES <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
