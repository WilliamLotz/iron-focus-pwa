import React, { useState } from 'react';
import { Search, Plus, Trash2, X, ChevronDown, ChevronUp, Info } from 'lucide-react';
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

  // Filtres et recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('ALL');
  const [selectedEquipment, setSelectedEquipment] = useState('ALL');

  // Exercice sélectionné pour le détail biomécanique complet
  const [expandedExerciseId, setExpandedExerciseId] = useState(null);

  // Modal d'ajout d'un nouvel exercice personnalisé
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: '',
    muscleGroup: 'Pectoraux',
    equipment: 'Machine',
    defaultSets: 3,
    repRange: '8-12',
    restSeconds: 90,
    primaryMuscles: '',
    secondaryMuscles: '',
    execution: '',
    rationale: '',
    defaultWeight: 20
  });

  // Calcul du record actuel de chaque exercice à partir de l'historique ou du catalogue
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

  // Filtrage
  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.primaryMuscles?.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesMuscle = selectedMuscle === 'ALL' || ex.muscleGroup === selectedMuscle;
    const matchesEquipment = selectedEquipment === 'ALL' || ex.equipment === selectedEquipment;
    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  const handleCreateExerciseSubmit = (e) => {
    e.preventDefault();
    if (!newExercise.name.trim()) {
      alert('Veuillez spécifier le nom de l’exercice.');
      return;
    }

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
      secondaryMuscles: newExercise.secondaryMuscles.split(',').map(s => s.trim()).filter(Boolean),
      anatomyKeys: {
        primary: [newExercise.muscleGroup === 'Pectoraux' ? 'chest_mid' : newExercise.muscleGroup === 'Dos' ? 'lats' : 'quads'],
        secondary: []
      },
      execution: newExercise.execution.trim() || 'Contrôler la phase excentrique et exploser sur la phase concentrique.',
      rationale: newExercise.rationale.trim() || 'Cible optimale pour l’hypertrophie musculaire.',
      defaultWeight: Number(newExercise.defaultWeight) || 20,
      isCustom: true
    };

    onSaveExercise(created);
    setIsAddModalOpen(false);
    setNewExercise({
      name: '',
      muscleGroup: 'Pectoraux',
      equipment: 'Machine',
      defaultSets: 3,
      repRange: '8-12',
      restSeconds: 90,
      primaryMuscles: '',
      secondaryMuscles: '',
      execution: '',
      rationale: '',
      defaultWeight: 20
    });
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-mono font-black text-white uppercase tracking-wider">
            ENCYCLOPÉDIE BIOMÉCANIQUE
          </h2>
          <p className="text-[10px] font-mono text-[#737373]">
            {filteredExercises.length} / {exercises.length} EXERCICES RÉFÉRENCÉS
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-3 py-2 text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus size={16} />
          AJOUTER
        </button>
      </div>

      {/* Barre de Recherche */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-3 text-[#737373]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="RECHERCHER UN EXERCICE, UN MUSCLE..."
          className="w-full bg-[#141414] border border-[#262626] focus:border-[#EF4444] text-white pl-9 pr-3 py-2 text-xs font-mono outline-none uppercase"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-2.5 text-[#737373] hover:text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filtres par Groupe Musculaire (Pas de scroll horizontal, flex-wrap) */}
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setSelectedMuscle('ALL')}
          className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase border transition-colors cursor-pointer ${
            selectedMuscle === 'ALL'
              ? 'bg-[#EF4444] text-white border-[#EF4444]'
              : 'bg-[#141414] text-[#888] border-[#262626] hover:border-[#666]'
          }`}
        >
          TOUS LES MUSCLES
        </button>
        {MUSCLE_GROUPS.map(muscle => (
          <button
            key={muscle}
            onClick={() => setSelectedMuscle(muscle)}
            className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase border transition-colors cursor-pointer ${
              selectedMuscle === muscle
                ? 'bg-[#EF4444] text-white border-[#EF4444]'
                : 'bg-[#141414] text-[#888] border-[#262626] hover:border-[#666]'
            }`}
          >
            {muscle}
          </button>
        ))}
      </div>

      {/* Filtres par Équipement (Pas de scroll horizontal, flex-wrap) */}
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setSelectedEquipment('ALL')}
          className={`px-2 py-0.5 text-[9px] font-mono uppercase border cursor-pointer ${
            selectedEquipment === 'ALL'
              ? 'bg-[#FFFFFF] text-black font-black border-white'
              : 'bg-[#0A0A0A] text-[#737373] border-[#262626]'
          }`}
        >
          TOUT MATÉRIEL
        </button>
        {EQUIPMENT_TYPES.map(eq => (
          <button
            key={eq}
            onClick={() => setSelectedEquipment(eq)}
            className={`px-2 py-0.5 text-[9px] font-mono uppercase border cursor-pointer ${
              selectedEquipment === eq
                ? 'bg-[#FFFFFF] text-black font-black border-white'
                : 'bg-[#0A0A0A] text-[#737373] border-[#262626]'
            }`}
          >
            {eq}
          </button>
        ))}
      </div>

      {/* LISTE DES CARTES D'EXERCICES */}
      <div className="space-y-3">
        {filteredExercises.map(ex => {
          const isExpanded = expandedExerciseId === ex.id;
          const maxWeight = getExerciseMaxRecordedWeight(ex.id, ex.defaultWeight);

          return (
            <div
              key={ex.id}
              className={`bg-[#141414] border transition-all ${
                isExpanded ? 'border-[#EF4444]' : 'border-[#262626] hover:border-[#383838]'
              }`}
            >
              {/* Entête de carte repliée : Nom + Groupe musculaire (badge rouge) + Charge actuelle (verte) + Équipement */}
              <div
                onClick={() => setExpandedExerciseId(isExpanded ? null : ex.id)}
                className="p-3.5 cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[9px] font-mono font-black text-[#EF4444] bg-[#220B0B] border border-[#EF4444]/30 px-1.5 py-0.5 uppercase">
                      {ex.muscleGroup}
                    </span>
                    <span className="text-[9px] font-mono text-[#888] bg-[#0A0A0A] border border-[#262626] px-1.5 py-0.5 uppercase">
                      {ex.equipment}
                    </span>
                  </div>

                  <h3 className="font-mono text-sm font-black text-white uppercase tracking-wider mb-1.5">
                    {ex.name}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-[#888]">
                      Charge actuelle : <strong className="text-[#22C55E] font-black tabular-nums">{maxWeight} kg</strong>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="text-[#737373] p-1">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                  {ex.isCustom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteExercise(ex.id);
                      }}
                      className="text-[#666] hover:text-[#EF4444] p-1 cursor-pointer"
                      title="Supprimer l’exercice personnalisé"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>

              {/* DÉTAIL BIOMÉCANIQUE EXPANDED :
                  1. Illustration SVG d'abord
                  2. Muscles primaires / secondaires
                  3. Schéma anatomique
                  4. Exécution et biomécanique
              */}
              {isExpanded && (
                <div className="border-t border-[#262626] p-4 space-y-4 bg-[#0F0F0F]">
                  {/* 1. VISUEL ILLUSTRATION SVG EN HAUT */}
                  <div className="w-full border border-[#262626] overflow-hidden bg-[#0A0A0A]">
                    <ExerciseIllustration exerciseId={ex.id} muscleGroup={ex.muscleGroup} />
                  </div>

                  {/* 2. MUSCLES PRIMAIRES / SECONDAIRES */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-[#141414] border border-[#262626] p-2.5">
                      <span className="text-[9px] text-[#EF4444] font-bold block uppercase mb-1">
                        MUSCLES PRINCIPAUX :
                      </span>
                      <ul className="text-white list-disc list-inside space-y-0.5">
                        {ex.primaryMuscles?.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#141414] border border-[#262626] p-2.5">
                      <span className="text-[9px] text-[#F97316] font-bold block uppercase mb-1">
                        MUSCLES SECONDAIRES :
                      </span>
                      <ul className="text-textMuted list-disc list-inside space-y-0.5">
                        {ex.secondaryMuscles?.length > 0 ? (
                          ex.secondaryMuscles.map((m, i) => <li key={i}>{m}</li>)
                        ) : (
                          <li className="text-[#666]">Aucun</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* 3. SCHÉMA ANATOMIQUE DYNAMIQUE */}
                  <AnatomySVG anatomyKeys={ex.anatomyKeys} />

                  {/* 4. EXÉCUTION TECHNIQUE STRICTE */}
                  <div className="bg-[#141414] border border-[#262626] p-3 space-y-1">
                    <span className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase font-bold">
                      // EXÉCUTION TECHNIQUE STRICTE
                    </span>
                    <p className="text-xs font-mono text-[#CCCCCC] leading-relaxed">
                      {ex.execution}
                    </p>
                  </div>

                  {/* 5. POURQUOI CET EXERCICE ? (BIOMÉCANIQUE) */}
                  <div className="bg-[#141414] border border-[#262626] p-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-black text-white uppercase">
                      <Info size={14} className="text-[#EF4444]" />
                      POURQUOI CET EXERCICE ? (BIOMÉCANIQUE)
                    </div>
                    <p className="text-xs font-mono text-[#CCCCCC] leading-relaxed">
                      {ex.rationale}
                    </p>
                  </div>

                  {/* Paramètres par défaut & Temps de repos & Modifier charge */}
                  <div className="flex items-center justify-between text-xs font-mono bg-[#141414] border border-[#262626] p-2.5">
                    <span className="text-[#888]">
                      REPOS CONSEILLÉ : <strong className="text-white">{ex.restSeconds || 90}S</strong> | CIBLE : <strong className="text-white">{ex.defaultSets}×{ex.repRange}</strong>
                    </span>
                    <button
                      onClick={() => {
                        const newWeightInput = prompt('Entrez la nouvelle charge par défaut pour cet exercice (en kg) :', maxWeight);
                        if (newWeightInput !== null) {
                          const parsed = parseFloat(newWeightInput);
                          if (!isNaN(parsed) && parsed >= 0) {
                            onUpdateExerciseWeight(ex.id, parsed);
                          }
                        }
                      }}
                      className="bg-[#1C1C1C] hover:bg-[#EF4444] text-white border border-[#333] px-2.5 py-1 text-[10px] uppercase font-bold cursor-pointer transition-colors"
                    >
                      MODIFIER CHARGE
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* MODAL CRÉER UN NOUVEL EXERCICE */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#0A0A0A] border-2 border-[#EF4444] shadow-2xl p-4 space-y-3 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#262626] pb-2">
              <span className="font-mono text-xs font-black uppercase text-white tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#EF4444]"></span>
                AJOUTER UN EXERCICE PERSONNALISÉ
              </span>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-[#888] hover:text-white cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateExerciseSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
                  NOM DE L'EXERCICE
                </label>
                <input
                  type="text"
                  required
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                  placeholder="EX: ROWING T-BAR / BULGARIAN SPLIT SQUAT"
                  className="w-full bg-[#141414] border border-[#262626] focus:border-[#EF4444] text-white px-3 py-2 text-xs font-mono outline-none uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
                    GROUPE MUSCULAIRE
                  </label>
                  <select
                    value={newExercise.muscleGroup}
                    onChange={(e) => setNewExercise({ ...newExercise, muscleGroup: e.target.value })}
                    className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-2 text-xs font-mono outline-none"
                  >
                    {MUSCLE_GROUPS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
                    ÉQUIPEMENT
                  </label>
                  <select
                    value={newExercise.equipment}
                    onChange={(e) => setNewExercise({ ...newExercise, equipment: e.target.value })}
                    className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-2 text-xs font-mono outline-none"
                  >
                    {EQUIPMENT_TYPES.map(eq => (
                      <option key={eq} value={eq}>{eq}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[9px] font-mono text-[#737373] uppercase block mb-1">SÉRIES</label>
                  <input
                    type="number"
                    value={newExercise.defaultSets}
                    onChange={(e) => setNewExercise({ ...newExercise, defaultSets: e.target.value })}
                    className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-1 text-xs font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono text-[#737373] uppercase block mb-1">REPS</label>
                  <input
                    type="text"
                    value={newExercise.repRange}
                    onChange={(e) => setNewExercise({ ...newExercise, repRange: e.target.value })}
                    placeholder="8-12"
                    className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-1 text-xs font-mono text-center"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-mono text-[#737373] uppercase block mb-1">CHARGE (KG)</label>
                  <input
                    type="number"
                    value={newExercise.defaultWeight}
                    onChange={(e) => setNewExercise({ ...newExercise, defaultWeight: e.target.value })}
                    className="w-full bg-[#141414] border border-[#262626] text-white px-2 py-1 text-xs font-mono text-center"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
                  MUSCLES PRINCIPAUX (SÉPARÉS PAR VIRGULE)
                </label>
                <input
                  type="text"
                  value={newExercise.primaryMuscles}
                  onChange={(e) => setNewExercise({ ...newExercise, primaryMuscles: e.target.value })}
                  placeholder="Grand pectoral, Deltoïde antérieur"
                  className="w-full bg-[#141414] border border-[#262626] text-white px-3 py-1.5 text-xs font-mono outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
                  POURQUOI CET EXERCICE ? (BIOMÉCANIQUE)
                </label>
                <textarea
                  rows="2"
                  value={newExercise.rationale}
                  onChange={(e) => setNewExercise({ ...newExercise, rationale: e.target.value })}
                  placeholder="Tension maximale en position d'étirement, stabilité supérieure..."
                  className="w-full bg-[#141414] border border-[#262626] text-white p-2 text-xs font-mono outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
                  EXÉCUTION TECHNIQUE
                </label>
                <textarea
                  rows="2"
                  value={newExercise.execution}
                  onChange={(e) => setNewExercise({ ...newExercise, execution: e.target.value })}
                  placeholder="Trajectoire, placement des coudes, respiration..."
                  className="w-full bg-[#141414] border border-[#262626] text-white p-2 text-xs font-mono outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-[#1A1A1A] text-white py-2 text-xs font-mono font-bold uppercase cursor-pointer"
                >
                  ANNULER
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white py-2 text-xs font-mono font-black uppercase tracking-wider cursor-pointer"
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
