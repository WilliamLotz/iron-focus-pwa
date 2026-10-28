import React, { useState, useEffect } from 'react';
import {
  Play,
  Check,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { playSetClickSound, playRestTimerEndSound } from '../utils/audio';
import { checkProgressiveOverload, calculateSessionTonnage } from '../utils/formulas';
import WorkoutSummaryModal from '../components/WorkoutSummaryModal';

export default function LiveView({
  userData,
  activeSession,
  onUpdateActiveSession,
  onFinishWorkout,
  onStartRoutineFromLive,
  onGoToStats
}) {
  const { exercises = [], workouts = [], history = [] } = userData;

  // Index de l'exercice courant dans la séance active
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  // État du chronomètre de repos
  const [restTimer, setRestTimer] = useState({
    active: false,
    duration: 90,
    remaining: 90
  });

  // Modal de fin de séance
  const [completedSummaryData, setCompletedSummaryData] = useState(null);

  // Vue tiroir "Prochains Exercices"
  const [showQueueDrawer, setShowQueueDrawer] = useState(false);

  // Chronomètre global de la séance (tourne toutes les secondes)
  useEffect(() => {
    if (!activeSession) return;

    const interval = setInterval(() => {
      onUpdateActiveSession(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          elapsedSeconds: (prev.elapsedSeconds || 0) + 1
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession, onUpdateActiveSession]);

  // Décompte du chronomètre de repos
  useEffect(() => {
    if (!restTimer.active) return;

    const interval = setInterval(() => {
      setRestTimer(prev => {
        if (prev.remaining <= 1) {
          playRestTimerEndSound();
          return { ...prev, active: false, remaining: 0 };
        }
        return { ...prev, remaining: prev.remaining - 1 };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [restTimer.active]);

  // Formatage HH:MM:SS
  const formatTimer = (seconds = 0) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Si aucune séance n'est en cours, afficher l'écran de lancement
  if (!activeSession) {
    return (
      <div className="space-y-4 pb-24 px-4 pt-4 text-center">
        <div className="bg-[#141414] border border-[#262626] p-6 space-y-4">
          <div className="w-12 h-12 bg-[#1C0C0C] border border-[#EF4444] text-[#EF4444] flex items-center justify-center mx-auto">
            <Play size={24} fill="#EF4444" />
          </div>
          <div>
            <h2 className="text-lg font-mono font-black uppercase text-white tracking-wider">
              AUCUNE SÉANCE EN COURS
            </h2>
            <p className="text-xs font-mono text-textMuted mt-1">
              Choisis un programme pour entrer en mode concentration et suivi des séries en direct.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase text-left">
              // DÉMARRAGE RAPIDE
            </span>
            {workouts.map(routine => (
              <button
                key={routine.id}
                onClick={() => onStartRoutineFromLive(routine)}
                className="w-full bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#262626] hover:border-[#EF4444] p-3 text-left font-mono flex items-center justify-between transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-xs font-bold text-white uppercase">{routine.name}</div>
                  <div className="text-[10px] text-[#737373] truncate">
                    {routine.exercises?.length || 0} exercices
                  </div>
                </div>
                <span className="text-xs font-bold text-[#EF4444] uppercase">LANCER &gt;</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Exercice en cours d'exécution
  const currentSessionExercise = activeSession.exercises[currentExerciseIndex] || activeSession.exercises[0];
  const catalogExercise = exercises.find(e => e.id === currentSessionExercise?.exerciseId) || {
    name: currentSessionExercise?.name || 'Exercice',
    muscleGroup: 'Général',
    equipment: 'Machine',
    restSeconds: 90
  };

  // Vérifier la surcharge progressive pour cet exercice
  const overloadInfo = checkProgressiveOverload(catalogExercise.id, exercises, history);

  // Historique de la dernière séance pour cet exercice
  const previousHistorySets = overloadInfo.previousSets || null;

  // Gestion des séries
  const handleUpdateSet = (setIdx, field, val) => {
    onUpdateActiveSession(prev => {
      const updatedExercises = [...prev.exercises];
      const ex = { ...updatedExercises[currentExerciseIndex] };
      const updatedSets = [...ex.sets];
      updatedSets[setIdx] = {
        ...updatedSets[setIdx],
        [field]: val
      };
      ex.sets = updatedSets;
      updatedExercises[currentExerciseIndex] = ex;
      return { ...prev, exercises: updatedExercises };
    });
  };

  const handleAdjustWeight = (setIdx, delta) => {
    const currentWeight = Number(currentSessionExercise.sets[setIdx].weight) || 0;
    const newWeight = Math.max(0, Math.round((currentWeight + delta) * 10) / 10);
    handleUpdateSet(setIdx, 'weight', newWeight);
  };

  // Validation d'une série : déclenche le bip audio + le chrono de repos
  const handleToggleSetComplete = (setIdx) => {
    const isCurrentlyCompleted = currentSessionExercise.sets[setIdx].completed;
    const nextCompleted = !isCurrentlyCompleted;

    playSetClickSound();
    handleUpdateSet(setIdx, 'completed', nextCompleted);

    if (nextCompleted) {
      // Déclencher le chronomètre de repos automatique
      const restTime = currentSessionExercise.restSeconds || catalogExercise.restSeconds || 90;
      setRestTimer({
        active: true,
        duration: restTime,
        remaining: restTime
      });
    }
  };

  // Ajouter une série
  const handleAddSet = () => {
    const sets = currentSessionExercise.sets || [];
    const lastSet = sets[sets.length - 1];
    const newSet = {
      setNumber: sets.length + 1,
      weight: lastSet ? lastSet.weight : catalogExercise.defaultWeight || 20,
      reps: lastSet ? lastSet.reps : 10,
      completed: false
    };

    onUpdateActiveSession(prev => {
      const updatedExercises = [...prev.exercises];
      const ex = { ...updatedExercises[currentExerciseIndex] };
      ex.sets = [...(ex.sets || []), newSet];
      updatedExercises[currentExerciseIndex] = ex;
      return { ...prev, exercises: updatedExercises };
    });
  };

  // Supprimer une série
  const handleRemoveSet = (setIdx) => {
    if (currentSessionExercise.sets.length <= 1) return;
    onUpdateActiveSession(prev => {
      const updatedExercises = [...prev.exercises];
      const ex = { ...updatedExercises[currentExerciseIndex] };
      ex.sets = ex.sets.filter((_, idx) => idx !== setIdx).map((s, idx) => ({ ...s, setNumber: idx + 1 }));
      updatedExercises[currentExerciseIndex] = ex;
      return { ...prev, exercises: updatedExercises };
    });
  };

  // Déplacer / réordonner un exercice dans la file
  const handleMoveExercise = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= activeSession.exercises.length) return;
    onUpdateActiveSession(prev => {
      const updated = [...prev.exercises];
      const [moved] = updated.splice(fromIdx, 1);
      updated.splice(toIdx, 0, moved);
      return { ...prev, exercises: updated };
    });
    if (currentExerciseIndex === fromIdx) {
      setCurrentExerciseIndex(toIdx);
    }
  };

  // Terminer la séance
  const handleFinishWorkoutClick = () => {
    const totalTonnage = calculateSessionTonnage(activeSession.exercises);
    const summary = {
      id: 'session-' + Date.now(),
      workoutName: activeSession.name,
      date: new Date().toISOString(),
      durationSeconds: activeSession.elapsedSeconds || 0,
      totalTonnage,
      exercises: activeSession.exercises
    };

    onFinishWorkout(summary);
    setCompletedSummaryData(summary);
  };

  return (
    <div className="space-y-3 pb-40">
      {/* EN-TÊTE COMPACT ÉPURÉ DU MODE CONCENTRATION LIVE */}
      <div className="sticky top-[calc(max(56px,env(safe-area-inset-top,56px))+66px)] z-30 bg-[#0A0A0A] border-b border-[#262626] px-3 py-1.5 shadow-md">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[9px] font-mono text-[#EF4444] uppercase tracking-widest font-black flex-shrink-0">
              LIVE:
            </span>
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider truncate">
              {activeSession.name}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-mono font-bold text-white bg-[#141414] border border-[#262626] px-2 py-0.5 tabular-nums">
              {formatTimer(activeSession.elapsedSeconds || 0)}
            </span>

            <button
              onClick={handleFinishWorkoutClick}
              className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-2 py-0.5 text-[10px] font-mono font-black uppercase tracking-wider transition-colors cursor-pointer"
            >
              TERMINER
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3">
        {/* CARTE EXERCICE EN COURS (ÉPURÉE : SANS RATIONALE)
            Garde uniquement :
            - Nom exercice
            - Groupe/Équipement
            - Rappel séance précédente
            - Suggestion surcharge
            - Tableau de séries
        */}
        <div className="bg-[#141414] border border-[#262626] p-3.5 space-y-2.5">
          {/* Ligne groupe / équipement & pagination */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-[#EF4444] text-white px-1.5 py-0.5 text-[9px] font-mono font-black">
                {currentExerciseIndex + 1}/{activeSession.exercises.length}
              </span>
              <span className="text-[10px] font-mono text-[#888] uppercase">
                {catalogExercise.muscleGroup} • {catalogExercise.equipment}
              </span>
            </div>

            {/* Navigation rapide entre exercices */}
            <div className="flex items-center gap-1">
              <button
                disabled={currentExerciseIndex === 0}
                onClick={() => setCurrentExerciseIndex(prev => Math.max(0, prev - 1))}
                className="p-1 bg-[#0A0A0A] border border-[#262626] disabled:opacity-30 text-white cursor-pointer"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                disabled={currentExerciseIndex === activeSession.exercises.length - 1}
                onClick={() => setCurrentExerciseIndex(prev => Math.min(activeSession.exercises.length - 1, prev + 1))}
                className="p-1 bg-[#0A0A0A] border border-[#262626] disabled:opacity-30 text-white cursor-pointer"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Nom exercice */}
          <h3 className="text-sm font-mono font-black text-white uppercase tracking-wider">
            {catalogExercise.name}
          </h3>

          {/* Rappel performance séance précédente */}
          {previousHistorySets && previousHistorySets.length > 0 && (
            <div className="bg-[#0A0A0A] border border-[#262626] p-2 text-[10px] font-mono text-[#A3A3A3] flex items-center justify-between">
              <span>SÉANCE PRÉCÉDENTE :</span>
              <span className="text-white font-bold tabular-nums">
                {previousHistorySets.map(s => `${s.weight}k×${s.reps}`).join(' | ')}
              </span>
            </div>
          )}

          {/* Suggestion Surcharge Progressive (si éligible) */}
          {overloadInfo.eligible && (
            <div className="bg-[#0E2014] border border-[#22C55E] p-2 text-xs font-mono text-[#22C55E] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <TrendingUp size={13} />
                <span className="font-bold text-[10px]">SURCHARGE SUGGÉRÉE :</span>
              </div>
              <span className="font-black tabular-nums text-xs">
                +{overloadInfo.increment} kg ({overloadInfo.suggestedWeight} kg)
              </span>
            </div>
          )}
        </div>

        {/* TABLEAU DES SÉRIES FORMAT BRUTALIST CARRÉ */}
        <div className="bg-[#141414] border border-[#262626]">
          {/* En-têtes du tableau */}
          <div className="grid grid-cols-12 bg-[#0A0A0A] border-b border-[#262626] p-2 text-[10px] font-mono text-[#737373] uppercase font-bold text-center">
            <span className="col-span-2 text-left">SÉRIE</span>
            <span className="col-span-3">PRÉCÉDENT</span>
            <span className="col-span-4">CHARGE (KG)</span>
            <span className="col-span-2">REPS</span>
            <span className="col-span-1">VAL</span>
          </div>

          {/* Lignes des séries */}
          <div className="divide-y divide-[#202020]">
            {currentSessionExercise.sets?.map((set, sIdx) => {
              const prevSet = previousHistorySets ? previousHistorySets[sIdx] : null;
              const isChecked = !!set.completed;

              return (
                <div
                  key={sIdx}
                  className={`grid grid-cols-12 items-center p-2.5 transition-colors ${
                    isChecked ? 'bg-[#1C0E0E]/40' : 'bg-transparent'
                  }`}
                >
                  {/* SÉRIE # & Suppression */}
                  <div className="col-span-2 flex items-center gap-1">
                    <span className="text-xs font-mono font-black text-white tabular-nums">
                      #{set.setNumber}
                    </span>
                    {currentSessionExercise.sets.length > 1 && (
                      <button
                        onClick={() => handleRemoveSet(sIdx)}
                        className="text-[#555] hover:text-[#EF4444] cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>

                  {/* PRÉCÉDENT */}
                  <div className="col-span-3 text-center text-[10px] font-mono text-[#777] tabular-nums">
                    {prevSet ? `${prevSet.weight}kg × ${prevSet.reps}` : '—'}
                  </div>

                  {/* CHARGE (KG) AVEC BOUTONS RAPIDES */}
                  <div className="col-span-4 flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleAdjustWeight(sIdx, -2.5)}
                      className="w-5 h-7 bg-[#0A0A0A] hover:bg-[#222] border border-[#262626] text-white text-[9px] font-mono font-bold flex items-center justify-center active:bg-[#EF4444] cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      step="0.5"
                      value={set.weight}
                      onChange={(e) => handleUpdateSet(sIdx, 'weight', parseFloat(e.target.value) || 0)}
                      className="w-12 bg-[#0A0A0A] border border-[#262626] focus:border-[#EF4444] text-white text-xs font-mono text-center py-1 tabular-nums outline-none font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => handleAdjustWeight(sIdx, +2.5)}
                      className="w-5 h-7 bg-[#0A0A0A] hover:bg-[#222] border border-[#262626] text-white text-[9px] font-mono font-bold flex items-center justify-center active:bg-[#EF4444] cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* REPS */}
                  <div className="col-span-2 flex justify-center">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={set.reps}
                      onChange={(e) => handleUpdateSet(sIdx, 'reps', parseInt(e.target.value) || 0)}
                      className="w-11 bg-[#0A0A0A] border border-[#262626] focus:border-[#EF4444] text-white text-xs font-mono text-center py-1 tabular-nums outline-none font-bold"
                    />
                  </div>

                  {/* BOUTON VALIDER [✓] ROUGE INTENSE QUAND COCHÉ */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleToggleSetComplete(sIdx)}
                      className={`w-7 h-7 flex items-center justify-center transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#EF4444] text-white shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                          : 'bg-[#0A0A0A] border border-[#333] hover:border-white text-[#555]'
                      }`}
                      title={isChecked ? 'Série validée' : 'Valider la série'}
                    >
                      <Check size={14} strokeWidth={isChecked ? 3 : 2} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bouton Ajouter une série */}
          <div className="p-2 border-t border-[#262626] bg-[#0A0A0A]">
            <button
              onClick={handleAddSet}
              className="w-full bg-[#141414] hover:bg-[#1E1E1E] border border-[#262626] hover:border-[#EF4444] py-2 text-xs font-mono font-bold text-white uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus size={14} />
              AJOUTER UNE SÉRIE
            </button>
          </div>
        </div>

        {/* TIROIR / ACCORDÉON PROCHAINS EXERCICES (MODIFIABLE SI MACHINE OCCUPÉE) */}
        <div className="bg-[#141414] border border-[#262626]">
          <button
            onClick={() => setShowQueueDrawer(!showQueueDrawer)}
            className="w-full flex items-center justify-between p-3 text-left font-mono text-xs font-bold text-white uppercase hover:bg-[#1C1C1C] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-[#EF4444]" />
              <span>PROCHAINS EXERCICES ({activeSession.exercises.length - 1})</span>
            </div>
            <span className="text-[10px] text-[#737373]">
              {showQueueDrawer ? 'RÉDUIRE [-]' : 'MODIFIER L’ORDRE [+]'}
            </span>
          </button>

          {showQueueDrawer && (
            <div className="p-3 border-t border-[#262626] space-y-2 bg-[#0A0A0A]">
              <div className="text-[10px] font-mono text-[#737373] mb-1">
                Machine occupée ? Change l’ordre ou clique sur un exercice pour t'y rendre directement :
              </div>
              {activeSession.exercises.map((exItem, idx) => {
                const exObj = exercises.find(e => e.id === exItem.exerciseId);
                const isCurrent = idx === currentExerciseIndex;

                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 text-xs font-mono border ${
                      isCurrent
                        ? 'bg-[#1F1010] border-[#EF4444] text-white font-bold'
                        : 'bg-[#141414] border-[#262626] text-[#A3A3A3]'
                    }`}
                  >
                    <button
                      onClick={() => setCurrentExerciseIndex(idx)}
                      className="flex-1 text-left truncate pr-2 hover:text-white cursor-pointer"
                    >
                      <span className="text-[#EF4444] mr-2">#{idx + 1}</span>
                      {exObj?.name || exItem.name}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        disabled={idx === 0}
                        onClick={() => handleMoveExercise(idx, idx - 1)}
                        className="px-1.5 py-0.5 bg-[#0A0A0A] border border-[#262626] disabled:opacity-20 text-[10px] hover:text-white cursor-pointer"
                        title="Monter"
                      >
                        ▲
                      </button>
                      <button
                        disabled={idx === activeSession.exercises.length - 1}
                        onClick={() => handleMoveExercise(idx, idx + 1)}
                        className="px-1.5 py-0.5 bg-[#0A0A0A] border border-[#262626] disabled:opacity-20 text-[10px] hover:text-white cursor-pointer"
                        title="Descendre"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* BANDEAU DU CHRONOMÈTRE DE REPOS AUTOMATIQUE (EN BAS FIXE AU-DESSUS DE LA NAVBAR) */}
      {restTimer.active && (
        <div className="fixed bottom-[calc(max(22px,env(safe-area-inset-bottom,22px))+56px)] left-0 right-0 z-40 bg-[#0A0A0A] border-t-2 border-[#EF4444] shadow-2xl animate-slide-up">
          <div className="max-w-md mx-auto p-3">
            {/* Barre de progression carrée */}
            <div className="w-full bg-[#1C1C1C] h-1.5 mb-2 overflow-hidden">
              <div
                className="bg-[#EF4444] h-full transition-all duration-1000 ease-linear"
                style={{
                  width: `${(restTimer.remaining / restTimer.duration) * 100}%`
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-[#EF4444] uppercase tracking-widest font-black block">
                  // TEMPS DE REPOS EN COURS
                </span>
                <div className="text-2xl font-mono font-black text-white tabular-nums tracking-wider leading-none">
                  {Math.floor(restTimer.remaining / 60)}:
                  {String(restTimer.remaining % 60).padStart(2, '0')}
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono">
                <button
                  onClick={() => setRestTimer(prev => ({
                    ...prev,
                    remaining: prev.remaining + 30,
                    duration: prev.duration + 30
                  }))}
                  className="bg-[#1C1C1C] hover:bg-[#262626] border border-[#333] text-white px-3 py-1.5 text-xs font-bold uppercase transition-colors cursor-pointer"
                >
                  +30S
                </button>
                <button
                  onClick={() => setRestTimer(prev => ({ ...prev, active: false, remaining: 0 }))}
                  className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-3 py-1.5 text-xs font-black uppercase transition-colors cursor-pointer"
                >
                  PASSER
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE RÉCAPITULATIF FIN DE SÉANCE */}
      <WorkoutSummaryModal
        isOpen={!!completedSummaryData}
        workoutData={completedSummaryData}
        onClose={() => setCompletedSummaryData(null)}
        onGoToStats={() => {
          setCompletedSummaryData(null);
          onGoToStats();
        }}
      />
    </div>
  );
}
