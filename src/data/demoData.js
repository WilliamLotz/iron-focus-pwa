// Générateur de 3 semaines d'historique réaliste pour le compte de démonstration
export function generateDemoHistory() {
  const now = Date.now();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  return [
    {
      id: 'hist-1',
      workoutName: 'PUSH DESTRUCTION (Pecs / Épaules / Triceps)',
      date: new Date(now - 19 * ONE_DAY).toISOString(),
      durationSeconds: 3420, // 57 min
      totalTonnage: 12450,
      exercises: [
        {
          exerciseId: 'ex-1',
          name: 'Développé couché aux haltères',
          sets: [
            { setNumber: 1, weight: 30, reps: 10, completed: true },
            { setNumber: 2, weight: 30, reps: 10, completed: true },
            { setNumber: 3, weight: 30, reps: 9, completed: true },
            { setNumber: 4, weight: 30, reps: 9, completed: true }
          ]
        },
        {
          exerciseId: 'ex-2',
          name: 'Développé incliné machine convergente',
          sets: [
            { setNumber: 1, weight: 70, reps: 10, completed: true },
            { setNumber: 2, weight: 70, reps: 10, completed: true },
            { setNumber: 3, weight: 70, reps: 8, completed: true }
          ]
        },
        {
          exerciseId: 'ex-11',
          name: 'Développé épaules haltères ou machine',
          sets: [
            { setNumber: 1, weight: 24, reps: 10, completed: true },
            { setNumber: 2, weight: 24, reps: 9, completed: true },
            { setNumber: 3, weight: 24, reps: 8, completed: true }
          ]
        },
        {
          exerciseId: 'ex-16',
          name: 'Extension Triceps poulie haute à la corde',
          sets: [
            { setNumber: 1, weight: 25, reps: 14, completed: true },
            { setNumber: 2, weight: 25, reps: 13, completed: true },
            { setNumber: 3, weight: 25, reps: 12, completed: true }
          ]
        }
      ]
    },
    {
      id: 'hist-2',
      workoutName: 'PULL HARDCORE (Dos / Biceps / Arrière Épaules)',
      date: new Date(now - 17 * ONE_DAY).toISOString(),
      durationSeconds: 3600, // 60 min
      totalTonnage: 14200,
      exercises: [
        {
          exerciseId: 'ex-4',
          name: 'Tirage vertical poitrine (Lat Pulldown)',
          sets: [
            { setNumber: 1, weight: 65, reps: 12, completed: true },
            { setNumber: 2, weight: 65, reps: 11, completed: true },
            { setNumber: 3, weight: 65, reps: 10, completed: true },
            { setNumber: 4, weight: 65, reps: 10, completed: true }
          ]
        },
        {
          exerciseId: 'ex-5',
          name: 'Rowing machine avec appui thoracique',
          sets: [
            { setNumber: 1, weight: 60, reps: 10, completed: true },
            { setNumber: 2, weight: 60, reps: 10, completed: true },
            { setNumber: 3, weight: 60, reps: 9, completed: true }
          ]
        },
        {
          exerciseId: 'ex-14',
          name: 'Curl incliné aux haltères',
          sets: [
            { setNumber: 1, weight: 14, reps: 12, completed: true },
            { setNumber: 2, weight: 14, reps: 11, completed: true },
            { setNumber: 3, weight: 14, reps: 10, completed: true }
          ]
        }
      ]
    },
    {
      id: 'hist-3',
      workoutName: 'LEGS TORTURE (Quads / Ischios / Fessiers)',
      date: new Date(now - 15 * ONE_DAY).toISOString(),
      durationSeconds: 3900, // 65 min
      totalTonnage: 19800,
      exercises: [
        {
          exerciseId: 'ex-7',
          name: 'Presse à cuisses inclinée / Hack Squat',
          sets: [
            { setNumber: 1, weight: 220, reps: 12, completed: true },
            { setNumber: 2, weight: 220, reps: 12, completed: true },
            { setNumber: 3, weight: 220, reps: 10, completed: true },
            { setNumber: 4, weight: 220, reps: 10, completed: true }
          ]
        },
        {
          exerciseId: 'ex-9',
          name: 'Soulevé de terre Roumain (RDL)',
          sets: [
            { setNumber: 1, weight: 100, reps: 10, completed: true },
            { setNumber: 2, weight: 100, reps: 10, completed: true },
            { setNumber: 3, weight: 100, reps: 9, completed: true }
          ]
        },
        {
          exerciseId: 'ex-8',
          name: 'Leg Extension assis',
          sets: [
            { setNumber: 1, weight: 70, reps: 15, completed: true },
            { setNumber: 2, weight: 70, reps: 14, completed: true },
            { setNumber: 3, weight: 70, reps: 12, completed: true }
          ]
        }
      ]
    },
    {
      id: 'hist-4',
      workoutName: 'PUSH DESTRUCTION (Pecs / Épaules / Triceps)',
      date: new Date(now - 12 * ONE_DAY).toISOString(),
      durationSeconds: 3500,
      totalTonnage: 13600,
      exercises: [
        {
          exerciseId: 'ex-1',
          name: 'Développé couché aux haltères',
          sets: [
            { setNumber: 1, weight: 32, reps: 10, completed: true },
            { setNumber: 2, weight: 32, reps: 10, completed: true },
            { setNumber: 3, weight: 32, reps: 10, completed: true },
            { setNumber: 4, weight: 32, reps: 9, completed: true }
          ]
        },
        {
          exerciseId: 'ex-2',
          name: 'Développé incliné machine convergente',
          sets: [
            { setNumber: 1, weight: 72.5, reps: 11, completed: true },
            { setNumber: 2, weight: 72.5, reps: 10, completed: true },
            { setNumber: 3, weight: 72.5, reps: 9, completed: true }
          ]
        },
        {
          exerciseId: 'ex-12',
          name: 'Élévations latérales à la poulie basse',
          sets: [
            { setNumber: 1, weight: 10, reps: 15, completed: true },
            { setNumber: 2, weight: 10, reps: 15, completed: true },
            { setNumber: 3, weight: 10, reps: 14, completed: true }
          ]
        },
        {
          exerciseId: 'ex-16',
          name: 'Extension Triceps poulie haute à la corde',
          sets: [
            { setNumber: 1, weight: 25, reps: 15, completed: true },
            { setNumber: 2, weight: 25, reps: 14, completed: true },
            { setNumber: 3, weight: 25, reps: 13, completed: true }
          ]
        }
      ]
    },
    {
      id: 'hist-5',
      workoutName: 'PULL HARDCORE (Dos / Biceps / Arrière Épaules)',
      date: new Date(now - 9 * ONE_DAY).toISOString(),
      durationSeconds: 3720,
      totalTonnage: 15400,
      exercises: [
        {
          exerciseId: 'ex-4',
          name: 'Tirage vertical poitrine (Lat Pulldown)',
          sets: [
            { setNumber: 1, weight: 70, reps: 12, completed: true },
            { setNumber: 2, weight: 70, reps: 11, completed: true },
            { setNumber: 3, weight: 70, reps: 10, completed: true },
            { setNumber: 4, weight: 70, reps: 10, completed: true }
          ]
        },
        {
          exerciseId: 'ex-5',
          name: 'Rowing machine avec appui thoracique',
          sets: [
            { setNumber: 1, weight: 62.5, reps: 10, completed: true },
            { setNumber: 2, weight: 62.5, reps: 10, completed: true },
            { setNumber: 3, weight: 62.5, reps: 9, completed: true }
          ]
        },
        {
          exerciseId: 'ex-13',
          name: 'Reverse Pec Deck (Oiseau machine)',
          sets: [
            { setNumber: 1, weight: 45, reps: 15, completed: true },
            { setNumber: 2, weight: 45, reps: 14, completed: true },
            { setNumber: 3, weight: 45, reps: 13, completed: true }
          ]
        },
        {
          exerciseId: 'ex-14',
          name: 'Curl incliné aux haltères',
          sets: [
            { setNumber: 1, weight: 16, reps: 11, completed: true },
            { setNumber: 2, weight: 16, reps: 10, completed: true },
            { setNumber: 3, weight: 16, reps: 10, completed: true }
          ]
        }
      ]
    },
    {
      id: 'hist-6',
      workoutName: 'LEGS TORTURE (Quads / Ischios / Fessiers)',
      date: new Date(now - 7 * ONE_DAY).toISOString(),
      durationSeconds: 3850,
      totalTonnage: 21100,
      exercises: [
        {
          exerciseId: 'ex-7',
          name: 'Presse à cuisses inclinée / Hack Squat',
          sets: [
            { setNumber: 1, weight: 230, reps: 12, completed: true },
            { setNumber: 2, weight: 230, reps: 12, completed: true },
            { setNumber: 3, weight: 230, reps: 11, completed: true },
            { setNumber: 4, weight: 230, reps: 10, completed: true }
          ]
        },
        {
          exerciseId: 'ex-9',
          name: 'Soulevé de terre Roumain (RDL)',
          sets: [
            { setNumber: 1, weight: 105, reps: 10, completed: true },
            { setNumber: 2, weight: 105, reps: 10, completed: true },
            { setNumber: 3, weight: 105, reps: 9, completed: true }
          ]
        },
        {
          exerciseId: 'ex-10',
          name: 'Leg Curl assis',
          sets: [
            { setNumber: 1, weight: 55, reps: 15, completed: true },
            { setNumber: 2, weight: 55, reps: 14, completed: true },
            { setNumber: 3, weight: 55, reps: 12, completed: true }
          ]
        }
      ]
    },
    {
      id: 'hist-7',
      workoutName: 'PUSH DESTRUCTION (Pecs / Épaules / Triceps)',
      date: new Date(now - 5 * ONE_DAY).toISOString(),
      durationSeconds: 3650,
      totalTonnage: 14850,
      exercises: [
        {
          exerciseId: 'ex-1',
          name: 'Développé couché aux haltères',
          // Note: All sets reached the max reps (10 reps) -> PROGRESSIVE OVERLOAD CRITERION MET!
          sets: [
            { setNumber: 1, weight: 34, reps: 10, completed: true },
            { setNumber: 2, weight: 34, reps: 10, completed: true },
            { setNumber: 3, weight: 34, reps: 10, completed: true },
            { setNumber: 4, weight: 34, reps: 10, completed: true }
          ]
        },
        {
          exerciseId: 'ex-2',
          name: 'Développé incliné machine convergente',
          sets: [
            { setNumber: 1, weight: 75, reps: 12, completed: true },
            { setNumber: 2, weight: 75, reps: 11, completed: true },
            { setNumber: 3, weight: 75, reps: 10, completed: true }
          ]
        },
        {
          exerciseId: 'ex-11',
          name: 'Développé épaules haltères ou machine',
          sets: [
            { setNumber: 1, weight: 26, reps: 10, completed: true },
            { setNumber: 2, weight: 26, reps: 10, completed: true },
            { setNumber: 3, weight: 26, reps: 9, completed: true }
          ]
        },
        {
          exerciseId: 'ex-16',
          name: 'Extension Triceps poulie haute à la corde',
          sets: [
            { setNumber: 1, weight: 27.5, reps: 15, completed: true },
            { setNumber: 2, weight: 27.5, reps: 14, completed: true },
            { setNumber: 3, weight: 27.5, reps: 13, completed: true }
          ]
        }
      ]
    },
    {
      id: 'hist-8',
      workoutName: 'PULL HARDCORE (Dos / Biceps / Arrière Épaules)',
      date: new Date(now - 3 * ONE_DAY).toISOString(),
      durationSeconds: 3800,
      totalTonnage: 16200,
      exercises: [
        {
          exerciseId: 'ex-4',
          name: 'Tirage vertical poitrine (Lat Pulldown)',
          // Note: All sets reached the max reps (12 reps) -> PROGRESSIVE OVERLOAD CRITERION MET!
          sets: [
            { setNumber: 1, weight: 72.5, reps: 12, completed: true },
            { setNumber: 2, weight: 72.5, reps: 12, completed: true },
            { setNumber: 3, weight: 72.5, reps: 12, completed: true },
            { setNumber: 4, weight: 72.5, reps: 12, completed: true }
          ]
        },
        {
          exerciseId: 'ex-5',
          name: 'Rowing machine avec appui thoracique',
          sets: [
            { setNumber: 1, weight: 65, reps: 10, completed: true },
            { setNumber: 2, weight: 65, reps: 10, completed: true },
            { setNumber: 3, weight: 65, reps: 9, completed: true }
          ]
        },
        {
          exerciseId: 'ex-14',
          name: 'Curl incliné aux haltères',
          sets: [
            { setNumber: 1, weight: 16, reps: 12, completed: true },
            { setNumber: 2, weight: 16, reps: 11, completed: true },
            { setNumber: 3, weight: 16, reps: 10, completed: true }
          ]
        }
      ]
    },
    {
      id: 'hist-9',
      workoutName: 'LEGS TORTURE (Quads / Ischios / Fessiers)',
      date: new Date(now - 1 * ONE_DAY).toISOString(),
      durationSeconds: 4100,
      totalTonnage: 23400,
      exercises: [
        {
          exerciseId: 'ex-7',
          name: 'Presse à cuisses inclinée / Hack Squat',
          sets: [
            { setNumber: 1, weight: 240, reps: 12, completed: true },
            { setNumber: 2, weight: 240, reps: 11, completed: true },
            { setNumber: 3, weight: 240, reps: 10, completed: true },
            { setNumber: 4, weight: 240, reps: 9, completed: true }
          ]
        },
        {
          exerciseId: 'ex-9',
          name: 'Soulevé de terre Roumain (RDL)',
          sets: [
            { setNumber: 1, weight: 110, reps: 10, completed: true },
            { setNumber: 2, weight: 110, reps: 9, completed: true },
            { setNumber: 3, weight: 110, reps: 8, completed: true }
          ]
        },
        {
          exerciseId: 'ex-8',
          name: 'Leg Extension assis',
          sets: [
            { setNumber: 1, weight: 75, reps: 15, completed: true },
            { setNumber: 2, weight: 75, reps: 14, completed: true },
            { setNumber: 3, weight: 75, reps: 13, completed: true }
          ]
        },
        {
          exerciseId: 'ex-18',
          name: 'Crunch à la poulie haute (Cable Crunch)',
          sets: [
            { setNumber: 1, weight: 50, reps: 15, completed: true },
            { setNumber: 2, weight: 50, reps: 15, completed: true },
            { setNumber: 3, weight: 50, reps: 13, completed: true }
          ]
        }
      ]
    }
  ];
}
