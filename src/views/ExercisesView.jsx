import React, { useState } from 'react';
import { Search, Plus, Trash2, X, ChevronDown, ChevronUp } from 'lucide-react';
import { MUSCLE_GROUPS, EQUIPMENT_TYPES } from '../data/exercisesData';
import AnatomySVG from '../components/AnatomySVG';
import ExerciseIllustration from '../components/ExerciseIllustration';

export default function ExercisesView({
  userData,
  onSaveExercise,
  onDeleteExercise,
  onUpdateExerciseWeight
}) {
  const { exercises = [], history = [] } = userData;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('ALL');
  const [selectedEquipment, setSelectedEquipment] = useState('ALL');
  const [expandedExerciseId, setExpandedExerciseId] = useState(null);
  const [showBiomechId, setShowBiomechId] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    muscleGroup: 'Pectoraux',
    equipment: 'Machine',
    defaultSets: 3,
    repRange: '8-12',
    restSeconds: 90,
    primaryMuscles: '',
    execution: '',
    rationale: '',
    defaultWeight: 20
  });

  const getExerciseMaxRecordedWeight = (exerciseId, fallbackWeight = 0) => {
    let maxWeight = fallbackWeight;
    history.forEach(session => {
      const match = session.exercises?.find(e => e.exerciseId === exerciseId);
      if (match && match.sets) {
        match.sets.forEach(s => {
          if (s.completed && Number(s.weight) > maxWeight) {
            maxWeight = Number(s.weight);
          }
        });
      }
    });
    return maxWeight;
  };

  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.primaryMuscles?.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMuscle = selectedMuscle === 'ALL' || ex.muscleGroup === selectedMuscle;
    const matchesEquipment = selectedEquipment === 'ALL' || ex.equipment === selectedEquipment;
    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  const handleCreateExerciseSubmit = (e) => {
    e.preventDefault();
    if (!newExercise.name.trim()) return;

    const created = {
      id: 'ex-custom-' + Date.now(),
      name: newExercise.name.trim().toUpperCase(),
      muscleGroup: newExercise.muscleGroup,
      equipment: newExercise.equipment,
      defaultSets: Number(newExercise.defaultSets) || 3,
      repRange: newExercise.repRange || '8-12',
      minReps: 8,
      maxReps: 12,
      restSeconds: Number(newExercise.restSeconds) || 90,
      primaryMuscles: newExercise.primaryMuscles.split(',').map(s => s.trim()).filter(Boolean),
      secondaryMuscles: [],
      anatomyKeys: {
        primary: [newExercise.muscleGroup === 'Pectoraux' ? 'chest_mid' : newExercise.muscleGroup === 'Dos' ? 'lats' : 'quads'],
        secondary: []
      },
      execution: newExercise.execution.trim() || 'Contrôler la descente et pousser avec force.',
      rationale: newExercise.rationale.trim() || 'Isolation et développement musculaire.',
      defaultWeight: Number(newExercise.defaultWeight) || 20,
      isCustom: true
    };

    onSaveExercise(created);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-3 pb-36 px-3.5 pt-2">
      {/* En-tête compact */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-mono font-black text-white uppercase tracking-wider">
            EXERCICES
          </h2>
          <p className="text-[10px] font-mono text-[#737373]">
            {filteredExercises.length} / {exercises.length} DISPONIBLES
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-2.5 py-1.5 text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
        >
          <Plus size={14} />
          AJOUTER
        </button>
      </div>

      {/* Barre de Recherche */}
      <div className="relative">
        <Search size={14} className="absolute left-2.5 top-2.5 text-[#737373]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="RECHERCHER..."
          className="w-full bg-[#141414] border border-[#262626] focus:border-[#EF4444] text-white pl-8 pr-3 py-1.5 text-xs font-mono outline-none uppercase"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-2.5 top-2 text-[#737373] hover:text-white"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filtres par Groupe Musculaire */}
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setSelectedMuscle('ALL')}
          className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase border transition-colors cursor-pointer ${
            selectedMuscle === 'ALL'
              ? 'bg-[#EF4444] text-white border-[#EF4444]'
              : 'bg-[#141414] text-[#888] border-[#262626]'
          }`}
        >
          TOUS
        </button>
        {MUSCLE_GROUPS.map(muscle => (
          <button
            key={muscle}
            onClick={() => setSelectedMuscle(muscle)}
            className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase border transition-colors cursor-pointer ${
              selectedMuscle === muscle
                ? 'bg-[#EF4444] text-white border-[#EF4444]'
                : 'bg-[#141414] text-[#888] border-[#262626]'
            }`}
          >
            {muscle}
          </button>
        ))}
      </div>

      {/* Filtres Matériel */}
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setSelectedEquipment('ALL')}
          className={`px-2 py-0.5 text-[8.5px] font-mono uppercase border ${
            selectedEquipment === 'ALL' ? 'bg-white text-black font-bold border-white' : 'bg-[#0A0A0A] text-[#737373] border-[#262626]'
          }`}
        >
          TOUT
        </button>
        {EQUIPMENT_TYPES.map(eq => (
          <button
            key={eq}
            onClick={() => setSelectedEquipment(eq)}
            className={`px-2 py-0.5 text-[8.5px] font-mono uppercase border ${
              selectedEquipment === eq ? 'bg-white text-black font-bold border-white' : 'bg-[#0A0A0A] text-[#737373] border-[#262626]'
            }`}
          >
            {eq}
          </button>
        ))}
      </div>

      {/* LISTE DES CARTES D'EXERCICES */}
      <div className="space-y-2">
        {filteredExercises.map(ex => {
          const isExpanded = expandedExerciseId === ex.id;
          const maxWeight = getExerciseMaxRecordedWeight(ex.id, ex.defaultWeight);

          return (
            <div
              key={ex.id}
              className={`bg-[#141414] border transition-all ${
                isExpanded ? 'border-[#EF4444]' : 'border-[#262626]'
              }`}
            >
              {/* Carte repliée : ultra nette */}
              <div
                onClick={() => setExpandedExerciseId(isExpanded ? null : ex.id)}
                className="p-2.5 cursor-pointer flex items-center justify-between gap-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[8.5px] font-mono font-bold text-[#EF4444] bg-[#220B0B] border border-[#EF4444]/30 px-1 py-0.2 uppercase">
                      {ex.muscleGroup}
                    </span>
                    <span className="text-[8.5px] font-mono text-[#737373] uppercase">
                      {ex.equipment}
                    </span>
                  </div>

                  <h3 className="font-mono text-xs font-bold text-white uppercase truncate">
                    {ex.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-bold text-[#22C55E] tabular-nums">
                    {maxWeight} kg
                  </span>
                  <span className="text-[#737373]">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                  {ex.isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteExercise(ex.id);
                      }}
                      className="text-[#666] hover:text-[#EF4444] p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* DÉTAIL DÉPLIÉ : ILLUSTRATION SVG + ESSENTIEL */}
              {isExpanded && (
                <div className="border-t border-[#262626] p-3 space-y-2 bg-[#0F0F0F]">
                  {/* Visuel SVG en haut */}
                  <div className="w-full border border-[#262626] overflow-hidden bg-[#0A0A0A]">
                    <ExerciseIllustration exerciseId={ex.id} muscleGroup={ex.muscleGroup} />
                  </div>

                  {/* Ligne Cible & Paramètres */}
                  <div className="flex items-center justify-between text-xs font-mono bg-[#141414] border border-[#262626] p-2">
                    <span className="text-[#A3A3A3] text-[11px] truncate pr-2">
                      Cible: <strong className="text-white">{ex.primaryMuscles?.join(', ') || ex.muscleGroup}</strong>
                    </span>
                    <span className="text-[#888] shrink-0 text-[10px]">
                      {ex.defaultSets}×{ex.repRange} • {ex.restSeconds || 90}s
                    </span>
                  </div>

                  {/* 1 phrase courte pour l'exécution */}
                  {ex.execution && (
                    <p className="text-[11px] font-mono text-[#CCCCCC] leading-snug px-1">
                      {ex.execution}
                    </p>
                  )}

                  {/* Action : modifier charge */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        const newWeightInput = prompt('Entrez votre nouvelle charge pour cet exercice (kg) :', maxWeight);
                        if (newWeightInput !== null) {
                          const parsed = parseFloat(newWeightInput);
                          if (!isNaN(parsed) && parsed >= 0) {
                            onUpdateExerciseWeight(ex.id, parsed);
                          }
                        }
                      }}
                      className="bg-[#1C1C1C] hover:bg-[#EF4444] text-white border border-[#333] px-3 py-1.5 text-xs font-mono font-bold uppercase transition-colors cursor-pointer"
                    >
                      MODIFIER CHARGE ({maxWeight} KG)
                    </button>

                    <button
                      onClick={() => setShowBiomechId(showBiomechId === ex.id ? null : ex.id)}
                      className="text-[10px] font-mono text-[#737373] hover:text-white underline cursor-pointer"
                    >
                      {showBiomechId === ex.id ? 'Masquer anatomie' : '+ Anatomie'}
                    </button>
                  </div>

                  {/* Schéma anatomique visible uniquement si demandé */}
                  {showBiomechId === ex.id && (
                    <div className="pt-2 border-t border-[#222] space-y-2">
                      <AnatomySVG anatomyKeys={ex.anatomyKeys} compact={true} />
                      {ex.rationale && (
                        <div className="bg-[#141414] p-2 border border-[#262626] text-[10px] font-mono text-[#888]">
                          <span className="text-[#EF4444] font-bold block mb-0.5">UTILITÉ :</span>
                          {ex.rationale}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL AJOUT */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0A0A0A] border border-[#EF4444] p-3 space-y-3">
            <div className="flex items-center justify-between border-b border-[#262626] pb-2">
              <span className="font-mono text-xs font-bold uppercase text-white">
                NOUVEL EXERCICE
              </span>
              <button onClick={() => setIsAddModalOpen(false)} className="text-[#888] hover:text-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateExerciseSubmit} className="space-y-2.5">
              <input
                type="text"
                required
                value={newExercise.name}
                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                placeholder="NOM (EX: BULGARIAN SPLIT SQUAT)"
                className="w-full bg-[#141414] border border-[#262626] text-white px-2.5 py-1.5 text-xs font-mono outline-none uppercase"
              />

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newExercise.muscleGroup}
                  onChange={(e) => setNewExercise({ ...newExercise, muscleGroup: e.target.value })}
                  className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-1.5 text-xs font-mono"
                >
                  {MUSCLE_GROUPS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>

                <select
                  value={newExercise.equipment}
                  onChange={(e) => setNewExercise({ ...newExercise, equipment: e.target.value })}
                  className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-1.5 text-xs font-mono"
                >
                  {EQUIPMENT_TYPES.map(eq => <option key={eq} value={eq}>{eq}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  placeholder="Séries"
                  value={newExercise.defaultSets}
                  onChange={(e) => setNewExercise({ ...newExercise, defaultSets: e.target.value })}
                  className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-1 text-xs font-mono text-center"
                />
                <input
                  type="text"
                  placeholder="Reps"
                  value={newExercise.repRange}
                  onChange={(e) => setNewExercise({ ...newExercise, repRange: e.target.value })}
                  className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-1 text-xs font-mono text-center"
                />
                <input
                  type="number"
                  placeholder="Poids (kg)"
                  value={newExercise.defaultWeight}
                  onChange={(e) => setNewExercise({ ...newExercise, defaultWeight: e.target.value })}
                  className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-1 text-xs font-mono text-center"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-[#1A1A1A] text-white py-1.5 text-xs font-mono font-bold uppercase"
                >
                  ANNULER
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#EF4444] text-white py-1.5 text-xs font-mono font-black uppercase"
                >
                  ENREGISTRER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
