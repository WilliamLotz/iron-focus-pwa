import React, { useState } from 'react';
import { Plus, Play, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react';
import { MUSCLE_GROUPS } from '../data/exercisesData';

export default function WorkoutsView({
  userData,
  onSaveWorkout,
  onDeleteWorkout,
  onStartWorkout
}) {
  const { workouts = [], exercises = [] } = userData;
  const [isCreating, setIsCreating] = useState(false);
  const [expandedRoutineId, setExpandedRoutineId] = useState(null);
  const [routineToDelete, setRoutineToDelete] = useState(null);

  // Formulaire de création de séance
  const [name, setName] = useState('');
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [exerciseFilterMuscle, setExerciseFilterMuscle] = useState('ALL');

  const toggleMuscle = (muscle) => {
    if (selectedMuscles.includes(muscle)) {
      setSelectedMuscles(selectedMuscles.filter(m => m !== muscle));
    } else {
      setSelectedMuscles([...selectedMuscles, muscle]);
    }
  };

  const addExerciseToRoutine = (ex) => {
    if (selectedExercises.some(item => item.exerciseId === ex.id)) return;
    setSelectedExercises([
      ...selectedExercises,
      {
        exerciseId: ex.id,
        targetSets: ex.defaultSets || 3,
        targetReps: ex.repRange || '8-12',
        restSeconds: ex.restSeconds || 90
      }
    ]);
  };

  const removeExerciseFromRoutine = (exerciseId) => {
    setSelectedExercises(selectedExercises.filter(item => item.exerciseId !== exerciseId));
  };

  const updateExerciseParam = (exerciseId, field, value) => {
    setSelectedExercises(selectedExercises.map(item => {
      if (item.exerciseId === exerciseId) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const handleSaveRoutine = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Veuillez donner un nom à la séance.');
      return;
    }
    if (selectedExercises.length === 0) {
      alert('Veuillez ajouter au moins un exercice à la séance.');
      return;
    }

    const newWorkout = {
      id: 'routine-custom-' + Date.now(),
      name: name.trim().toUpperCase(),
      targetMuscles: selectedMuscles.length > 0 ? selectedMuscles : ['Personnalisé'],
      exercises: selectedExercises,
      isCustom: true
    };

    onSaveWorkout(newWorkout);
    setIsCreating(false);
    setName('');
    setSelectedMuscles([]);
    setSelectedExercises([]);
  };

  const filteredAvailableExercises = exercises.filter(ex => {
    if (exerciseFilterMuscle === 'ALL') return true;
    return ex.muscleGroup === exerciseFilterMuscle;
  });

  return (
    <div className="space-y-3 pb-36 px-3.5 pt-2">
      {/* En-tête compact */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-mono font-black text-white uppercase tracking-wider">
            MES PROGRAMMES
          </h2>
          <p className="text-[10px] font-mono text-[#737373]">
            {workouts.length} ROUTINES PRÊTES
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-2.5 py-1.5 text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Plus size={14} />
            CRÉER
          </button>
        )}
      </div>

      {/* FORMULAIRE DE CRÉATION DE SÉANCE */}
      {isCreating && (
        <div className="bg-[#141414] border border-[#EF4444] p-3 space-y-3">
          <div className="flex items-center justify-between border-b border-[#262626] pb-2">
            <span className="font-mono text-xs font-black uppercase text-white tracking-wider">
              NOUVELLE SÉANCE
            </span>
            <button
              onClick={() => setIsCreating(false)}
              className="text-[#888] hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <div>
            <label className="text-[9px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
              NOM DU PROGRAMME
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="EX: PUSH FORCE / BRAS 3D"
              className="w-full bg-[#0A0A0A] border border-[#262626] focus:border-[#EF4444] text-white px-3 py-1.5 text-xs font-mono outline-none uppercase"
            />
          </div>

          {/* Groupes musculaires */}
          <div>
            <label className="text-[9px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
              MUSCLES CIBLÉS
            </label>
            <div className="flex flex-wrap gap-1">
              {MUSCLE_GROUPS.map(muscle => {
                const isSelected = selectedMuscles.includes(muscle);
                return (
                  <button
                    key={muscle}
                    type="button"
                    onClick={() => toggleMuscle(muscle)}
                    className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase border transition-colors ${
                      isSelected
                        ? 'bg-[#EF4444] text-white border-[#EF4444]'
                        : 'bg-[#0A0A0A] text-[#888] border-[#262626]'
                    }`}
                  >
                    {muscle}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Exercices sélectionnés */}
          <div>
            <label className="text-[9px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
              EXERCICES AJOUTÉS ({selectedExercises.length})
            </label>

            {selectedExercises.length === 0 ? (
              <div className="bg-[#0A0A0A] border border-dashed border-[#262626] p-2.5 text-center text-xs font-mono text-[#666]">
                Choisis les exercices ci-dessous
              </div>
            ) : (
              <div className="space-y-1.5">
                {selectedExercises.map((item, idx) => {
                  const exObj = exercises.find(e => e.id === item.exerciseId);
                  return (
                    <div
                      key={item.exerciseId}
                      className="bg-[#0A0A0A] border border-[#262626] p-2 flex items-center justify-between text-xs font-mono"
                    >
                      <span className="text-white truncate pr-2">
                        {idx + 1}. {exObj?.name || 'Exercice'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#888] text-[10px]">
                          {item.targetSets}×{item.targetReps}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeExerciseFromRoutine(item.exerciseId)}
                          className="text-[#EF4444] p-0.5"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sélecteur d'exercices */}
          <div className="border-t border-[#262626] pt-2">
            <div className="flex gap-1 overflow-x-auto pb-1.5 mb-1.5">
              <button
                type="button"
                onClick={() => setExerciseFilterMuscle('ALL')}
                className={`px-2 py-0.5 text-[9px] font-mono uppercase whitespace-nowrap border ${
                  exerciseFilterMuscle === 'ALL' ? 'bg-[#EF4444] text-white border-[#EF4444]' : 'bg-[#0A0A0A] text-[#888] border-[#262626]'
                }`}
              >
                TOUS
              </button>
              {MUSCLE_GROUPS.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setExerciseFilterMuscle(m)}
                  className={`px-2 py-0.5 text-[9px] font-mono uppercase whitespace-nowrap border ${
                    exerciseFilterMuscle === m ? 'bg-[#EF4444] text-white border-[#EF4444]' : 'bg-[#0A0A0A] text-[#888] border-[#262626]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1 bg-[#0A0A0A] p-1.5 border border-[#262626]">
              {filteredAvailableExercises.map(ex => {
                const isAlreadyIn = selectedExercises.some(item => item.exerciseId === ex.id);
                return (
                  <button
                    key={ex.id}
                    type="button"
                    disabled={isAlreadyIn}
                    onClick={() => addExerciseToRoutine(ex)}
                    className={`w-full flex items-center justify-between p-1.5 text-left text-xs font-mono border ${
                      isAlreadyIn
                        ? 'opacity-40 bg-[#111] border-[#222] text-[#666]'
                        : 'bg-[#141414] hover:bg-[#1E1E1E] border-[#262626] text-white'
                    }`}
                  >
                    <span className="truncate pr-2 font-bold">{ex.name}</span>
                    <span className="text-[10px] text-[#EF4444] font-bold shrink-0">
                      {isAlreadyIn ? '✓' : '+ AJOUTER'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 pt-2 border-t border-[#262626]">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="flex-1 bg-[#1A1A1A] text-white py-2 text-xs font-mono font-bold uppercase"
            >
              ANNULER
            </button>
            <button
              type="button"
              onClick={handleSaveRoutine}
              className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white py-2 text-xs font-mono font-black uppercase tracking-wider"
            >
              ENREGISTRER
            </button>
          </div>
        </div>
      )}

      {/* LISTE DES PROGRAMMES DISPONIBLES (COMPACTE, SANS PAVE DE TEXTE) */}
      <div className="space-y-2">
        {workouts.length === 0 ? (
          <div className="bg-[#141414] border border-[#262626] p-6 text-center text-xs font-mono text-[#666]">
            Aucun programme enregistré. Cliquez sur "+ CRÉER" pour ajouter une séance.
          </div>
        ) : (
          workouts.map((routine) => {
            const isExpanded = expandedRoutineId === routine.id;

          return (
            <div
              key={routine.id}
              className="bg-[#141414] border border-[#262626] p-3 transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="min-w-0 flex-1">
                  <h3 className="font-mono text-sm font-black text-white uppercase tracking-wider truncate">
                    {routine.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {routine.targetMuscles?.map((muscle, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono text-[#EF4444] bg-[#220D0D] border border-[#EF4444]/30 px-1 py-0.2 uppercase font-bold"
                      >
                        {muscle}
                      </span>
                    ))}
                    <span className="text-[9px] font-mono text-[#737373] ml-1">
                      • {routine.exercises?.length || 0} exos
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setRoutineToDelete(routine)}
                  className="text-[#737373] hover:text-[#EF4444] p-1.5 shrink-0 transition-colors cursor-pointer"
                  title="Supprimer ce programme"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Bouton d'action et toggle liste d'exercices */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onStartWorkout(routine)}
                  className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white py-2.5 px-3 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow"
                >
                  <Play size={13} fill="currentColor" />
                  LANCER LA SÉANCE
                </button>

                <button
                  onClick={() => setExpandedRoutineId(isExpanded ? null : routine.id)}
                  className="bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#262626] text-[#A3A3A3] hover:text-white px-2.5 py-2.5 text-xs font-mono transition-colors shrink-0"
                  title="Voir les exercices"
                >
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>

              {/* Liste d'exercices déroulable uniquement si demandé */}
              {isExpanded && (
                <div className="mt-2.5 pt-2 border-t border-[#262626] space-y-1 bg-[#0A0A0A] p-2">
                  {routine.exercises?.map((item, idx) => {
                    const ex = exercises.find(e => e.id === item.exerciseId);
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-[11px] font-mono text-[#CCCCCC]"
                      >
                        <span className="truncate pr-2">
                          <strong className="text-white">{idx + 1}.</strong> {ex?.name || 'Exercice'}
                        </span>
                        <span className="tabular-nums text-[#888] text-[10px] shrink-0">
                          {item.targetSets}×{item.targetReps}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }))}
      </div>

      {/* Modale de Confirmation de Suppression Brutaliste */}
      {routineToDelete && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141414] border-2 border-[#EF4444] max-w-sm w-full p-4 space-y-3">
            <div className="flex items-center gap-2 text-[#EF4444]">
              <Trash2 size={18} />
              <span className="font-mono font-black text-sm uppercase tracking-wider">
                SUPPRIMER LE PROGRAMME
              </span>
            </div>
            <p className="font-mono text-xs text-[#CCC] leading-relaxed">
              Voulez-vous supprimer définitivement <strong className="text-white">"{routineToDelete.name}"</strong> ?
            </p>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRoutineToDelete(null)}
                className="flex-1 bg-[#262626] hover:bg-[#333] text-white py-2 text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
              >
                ANNULER
              </button>
              <button
                type="button"
                onClick={() => {
                  onDeleteWorkout(routineToDelete.id);
                  setRoutineToDelete(null);
                }}
                className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white py-2 text-xs font-mono font-black uppercase tracking-wider transition-colors cursor-pointer"
              >
                SUPPRIMER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
