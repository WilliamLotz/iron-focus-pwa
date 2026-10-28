export const PRESET_WORKOUTS = [
  {
    id: 'routine-push',
    name: 'PUSH DESTRUCTION (Pecs / Épaules / Triceps)',
    targetMuscles: ['Pectoraux', 'Épaules', 'Bras'],
    description: 'Focus chaîne de poussée. Hypertrophie lourde et finition en tension continue.',
    exercises: [
      { exerciseId: 'ex-1', targetSets: 4, targetReps: '8-10', restSeconds: 120 },
      { exerciseId: 'ex-2', targetSets: 3, targetReps: '8-12', restSeconds: 120 },
      { exerciseId: 'ex-3', targetSets: 3, targetReps: '12-15', restSeconds: 90 },
      { exerciseId: 'ex-11', targetSets: 4, targetReps: '8-10', restSeconds: 120 },
      { exerciseId: 'ex-12', targetSets: 4, targetReps: '12-15', restSeconds: 75 },
      { exerciseId: 'ex-16', targetSets: 3, targetReps: '12-15', restSeconds: 75 },
      { exerciseId: 'ex-17', targetSets: 3, targetReps: '10-12', restSeconds: 90 }
    ]
  },
  {
    id: 'routine-pull',
    name: 'PULL HARDCORE (Dos / Biceps / Arrière Épaules)',
    targetMuscles: ['Dos', 'Épaules', 'Bras'],
    description: 'Densité et largeur dorsale avec isolation complète des fléchisseurs de bras.',
    exercises: [
      { exerciseId: 'ex-4', targetSets: 4, targetReps: '8-12', restSeconds: 120 },
      { exerciseId: 'ex-5', targetSets: 4, targetReps: '8-10', restSeconds: 120 },
      { exerciseId: 'ex-6', targetSets: 3, targetReps: '10-12', restSeconds: 90 },
      { exerciseId: 'ex-13', targetSets: 3, targetReps: '12-15', restSeconds: 75 },
      { exerciseId: 'ex-14', targetSets: 3, targetReps: '10-12', restSeconds: 90 },
      { exerciseId: 'ex-15', targetSets: 3, targetReps: '10-12', restSeconds: 90 }
    ]
  },
  {
    id: 'routine-legs',
    name: 'LEGS TORTURE (Quads / Ischios / Fessiers)',
    targetMuscles: ['Jambes', 'Abdos'],
    description: 'Volume lourd sur presse et chaîne postérieure, complété par crunch poulie.',
    exercises: [
      { exerciseId: 'ex-7', targetSets: 4, targetReps: '8-12', restSeconds: 150 },
      { exerciseId: 'ex-8', targetSets: 3, targetReps: '12-15', restSeconds: 90 },
      { exerciseId: 'ex-9', targetSets: 3, targetReps: '8-10', restSeconds: 120 },
      { exerciseId: 'ex-10', targetSets: 3, targetReps: '10-15', restSeconds: 90 },
      { exerciseId: 'ex-18', targetSets: 3, targetReps: '12-15', restSeconds: 60 }
    ]
  },
  {
    id: 'routine-upper',
    name: 'UPPER BODY BRUTAL (Pecs / Dos / Bras)',
    targetMuscles: ['Pectoraux', 'Dos', 'Bras'],
    description: 'Super-compensation du haut du corps en un seul entraînement condensé.',
    exercises: [
      { exerciseId: 'ex-1', targetSets: 4, targetReps: '8-10', restSeconds: 120 },
      { exerciseId: 'ex-4', targetSets: 4, targetReps: '8-12', restSeconds: 120 },
      { exerciseId: 'ex-2', targetSets: 3, targetReps: '8-12', restSeconds: 120 },
      { exerciseId: 'ex-5', targetSets: 3, targetReps: '8-10', restSeconds: 120 },
      { exerciseId: 'ex-12', targetSets: 3, targetReps: '12-15', restSeconds: 75 },
      { exerciseId: 'ex-14', targetSets: 3, targetReps: '10-12', restSeconds: 90 },
      { exerciseId: 'ex-16', targetSets: 3, targetReps: '12-15', restSeconds: 75 }
    ]
  },
  {
    id: 'routine-shoulders-arms',
    name: 'ARMOR 3D (Épaules & Bras Isolation)',
    targetMuscles: ['Épaules', 'Bras', 'Abdos'],
    description: 'Spécialisation bras et galbe deltoïdes complet pour une silhouette en V imposante.',
    exercises: [
      { exerciseId: 'ex-11', targetSets: 4, targetReps: '8-10', restSeconds: 120 },
      { exerciseId: 'ex-12', targetSets: 4, targetReps: '12-15', restSeconds: 75 },
      { exerciseId: 'ex-13', targetSets: 3, targetReps: '12-15', restSeconds: 75 },
      { exerciseId: 'ex-14', targetSets: 3, targetReps: '10-12', restSeconds: 90 },
      { exerciseId: 'ex-17', targetSets: 3, targetReps: '10-12', restSeconds: 90 },
      { exerciseId: 'ex-18', targetSets: 3, targetReps: '12-15', restSeconds: 60 }
    ]
  }
];
