import React, { useState } from 'react';
import { Plus, Play, Trash2, Edit3, X, Check, Dumbbell, Clock, Layers } from 'lucide-react';
import { MUSCLE_GROUPS } from '../data/exercisesData';

export default function WorkoutsView({
  userData,
  onSaveWorkout,
  onDeleteWorkout,
  onStartWorkout
}) {
  const { workouts = [], exercises = [] } = userData;
  const [isCreating, setIsCreating] = useState(false);

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

  // Filtrage des exercices pour l'ajout
  const filteredAvailableExercises = exercises.filter(ex => {
    if (exerciseFilterMuscle === 'ALL') return true;
    return ex.muscleGroup === exerciseFilterMuscle;
  });

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-mono font-black text-white uppercase tracking-wider">
            PROGRAMMES & SÉANCES
          </h2>
          <p className="text-[10px] font-mono text-[#737373]">
            {workouts.length} PROGRAMMES DISPONIBLES
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-3 py-2 text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <Plus size={16} />
            CRÉER UNE SÉANCE
          </button>
        )}
      </div>

      {/* MODAL / FORMULAIRE DE CRÉATION DE SÉANCE */}
      {isCreating && (
        <div className="bg-[#141414] border-2 border-[#EF4444] p-4 space-y-4">
          <div className="flex items-center justify-between border-b border-[#262626] pb-2">
            <span className="font-mono text-xs font-black uppercase text-white tracking-widest flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#EF4444]"></span>
              NOUVELLE SÉANCE SUR-MESURE
            </span>
            <button
              onClick={() => setIsCreating(false)}
              className="text-[#888] hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div>
            <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
              NOM DE LA SÉANCE
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="EX: UPPER BODY FORCE / PUSH JOUR 1"
              className="w-full bg-[#0A0A0A] border border-[#262626] focus:border-[#EF4444] text-white px-3 py-2 text-xs font-mono outline-none"
            />
          </div>

          {/* Groupes musculaires ciblés */}
          <div>
            <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
              GROUPES MUSCULAIRES CIBLÉS
            </label>
            <div className="flex flex-wrap gap-1.5">
              {MUSCLE_GROUPS.map(muscle => {
                const isSelected = selectedMuscles.includes(muscle);
                return (
                  <button
                    key={muscle}
                    type="button"
                    onClick={() => toggleMuscle(muscle)}
                    className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase border transition-colors ${
                      isSelected
                        ? 'bg-[#EF4444] text-white border-[#EF4444]'
                        : 'bg-[#0A0A0A] text-[#888] border-[#262626] hover:border-[#666]'
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
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-mono text-[#737373] tracking-widest uppercase">
                EXERCICES DANS CETTE SÉANCE ({selectedExercises.length})
              </label>
            </div>

            {selectedExercises.length === 0 ? (
              <div className="bg-[#0A0A0A] border border-dashed border-[#262626] p-3 text-center text-xs font-mono text-[#666]">
                Aucun exercice ajouté pour le moment. Sélectionne ci-dessous.
              </div>
            ) : (
              <div className="space-y-2">
                {selectedExercises.map((item, idx) => {
                  const exObj = exercises.find(e => e.id === item.exerciseId);
                  return (
                    <div
                      key={item.exerciseId}
                      className="bg-[#0A0A0A] border border-[#262626] p-2.5 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-white uppercase">
                          {idx + 1}. {exObj?.name || 'Exercice'}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeExerciseFromRoutine(item.exerciseId)}
                          className="text-[#EF4444] hover:text-white p-0.5"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <span className="text-[9px] font-mono text-[#737373] block uppercase">SÉRIES</span>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            value={item.targetSets}
                            onChange={(e) => updateExerciseParam(item.exerciseId, 'targetSets', parseInt(e.target.value) || 3)}
                            className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-1 text-xs font-mono text-center"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-[#737373] block uppercase">REPS</span>
                          <input
                            type="text"
                            value={item.targetReps}
                            onChange={(e) => updateExerciseParam(item.exerciseId, 'targetReps', e.target.value)}
                            placeholder="8-12"
                            className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-1 text-xs font-mono text-center"
                          />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-[#737373] block uppercase">REPOS (S)</span>
                          <input
                            type="number"
                            step="15"
                            value={item.restSeconds}
                            onChange={(e) => updateExerciseParam(item.exerciseId, 'restSeconds', parseInt(e.target.value) || 90)}
                            className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-1 text-xs font-mono text-center"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sélecteur d'exercices à ajouter */}
          <div className="border-t border-[#262626] pt-3">
            <span className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-2">
              + AJOUTER UN EXERCICE AU PROGRAMME
            </span>

            {/* Filtre rapide */}
            <div className="flex gap-1 overflow-x-auto pb-2 mb-2">
              <button
                type="button"
                onClick={() => setExerciseFilterMuscle('ALL')}
                className={`px-2 py-0.5 text-[10px] font-mono uppercase whitespace-nowrap border ${
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
                  className={`px-2 py-0.5 text-[10px] font-mono uppercase whitespace-nowrap border ${
                    exerciseFilterMuscle === m ? 'bg-[#EF4444] text-white border-[#EF4444]' : 'bg-[#0A0A0A] text-[#888] border-[#262626]'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="max-h-40 overflow-y-auto space-y-1 bg-[#0A0A0A] p-2 border border-[#262626]">
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
                        ? 'opacity-40 bg-[#111] border-[#222] text-[#666] cursor-not-allowed'
                        : 'bg-[#141414] hover:bg-[#1E1E1E] border-[#262626] text-white'
                    }`}
                  >
                    <div>
                      <span className="font-bold">{ex.name}</span>
                      <span className="text-[10px] text-[#737373] ml-2">({ex.muscleGroup} • {ex.equipment})</span>
                    </div>
                    <span className="text-[11px] text-[#EF4444] font-bold">
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
              ENREGISTRER LA SÉANCE
            </button>
          </div>
        </div>
      )}

      {/* LISTE DES PROGRAMMES DISPONIBLES */}
      <div className="space-y-3">
        {workouts.map((routine) => {
          return (
            <div
              key={routine.id}
              className="bg-[#141414] border border-[#262626] hover:border-[#383838] p-4 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-mono text-sm font-black text-white uppercase tracking-wider">
                    {routine.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {routine.targetMuscles?.map((muscle, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono text-[#EF4444] bg-[#220D0D] border border-[#EF4444]/30 px-1.5 py-0.5 uppercase font-bold"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>

                {routine.isCustom && (
                  <button
                    onClick={() => onDeleteWorkout(routine.id)}
                    className="text-[#737373] hover:text-[#EF4444] p-1"
                    title="Supprimer la séance"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              {routine.description && (
                <p className="text-[11px] font-mono text-[#888] mb-3">
                  {routine.description}
                </p>
              )}

              {/* Aperçu des exercices */}
              <div className="bg-[#0A0A0A] border border-[#262626] p-2.5 mb-3 space-y-1">
                <span className="text-[9px] font-mono text-[#666] uppercase block mb-1">
                  EXERCICES ({routine.exercises?.length || 0}) :
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {routine.exercises?.map((item, idx) => {
                    const ex = exercises.find(e => e.id === item.exerciseId);
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-[11px] font-mono text-[#A3A3A3]"
                      >
                        <span className="truncate pr-2">
                          <strong className="text-white">{idx + 1}.</strong> {ex?.name || 'Exercice'}
                        </span>
                        <span className="tabular-nums text-white text-[10px] whitespace-nowrap">
                          {item.targetSets} × {item.targetReps} ({item.restSeconds}s)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bouton de lancement */}
              <button
                onClick={() => onStartWorkout(routine)}
                className="w-full bg-[#181818] hover:bg-[#EF4444] text-white border border-[#333] hover:border-[#EF4444] py-2.5 px-4 font-mono font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:translate-y-0.5"
              >
                <Play size={14} fill="currentColor" />
                LANCER CETTE SÉANCE MAINTENANT
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
