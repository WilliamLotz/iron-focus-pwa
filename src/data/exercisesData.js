// Catalogue officiel exhaustif des exercices avec biomécanique complète (62 exercices)
export const DEFAULT_EXERCISES = [
  // ==========================================
  // PECTORAUX (10 exercices)
  // ==========================================
  {
    id: 'ex-1',
    name: 'Développé couché aux haltères',
    muscleGroup: 'Pectoraux',
    equipment: 'Haltères',
    defaultSets: 4,
    repRange: '8-10',
    minReps: 8,
    maxReps: 10,
    restSeconds: 120,
    primaryMuscles: ['Grand pectoral (faisceau moyen)'],
    secondaryMuscles: ['Deltoïde antérieur', 'Triceps'],
    anatomyKeys: {
      primary: ['chest_mid', 'chest_low'],
      secondary: ['front_delts', 'triceps']
    },
    execution: 'Allongé sur banc plat, omoplates resserrées. Descendre les haltères de chaque côté du torse (coudes à 45°) puis pousser vers le haut.',
    rationale: 'Amplitude d’étirement maximale en bas et liberté articulaire supérieure à la barre droite.',
    defaultWeight: 34
  },
  {
    id: 'ex-2',
    name: 'Développé incliné machine convergente',
    muscleGroup: 'Pectoraux',
    equipment: 'Machine',
    defaultSets: 3,
    repRange: '8-12',
    minReps: 8,
    maxReps: 12,
    restSeconds: 120,
    primaryMuscles: ['Haut des pectoraux (faisceau claviculaire)'],
    secondaryMuscles: ['Deltoïde antérieur', 'Triceps'],
    anatomyKeys: {
      primary: ['chest_upper'],
      secondary: ['front_delts', 'triceps']
    },
    execution: 'Siège réglé pour avoir les poignées au niveau des clavicules. Pousser sans décoller les épaules du dossier.',
    rationale: 'Trajectoire guidée et convergente qui supprime le besoin d’équilibre pour aller à l’échec musculaire en sécurité.',
    defaultWeight: 75
  },
  {
    id: 'ex-3',
    name: 'Écarté à la poulie vis-à-vis / Pec Deck',
    muscleGroup: 'Pectoraux',
    equipment: 'Poulie',
    defaultSets: 3,
    repRange: '12-15',
    minReps: 12,
    maxReps: 15,
    restSeconds: 90,
    primaryMuscles: ['Grand pectoral (isolation)'],
    secondaryMuscles: ['Deltoïde antérieur'],
    anatomyKeys: {
      primary: ['chest_mid', 'chest_upper', 'chest_low'],
      secondary: ['front_delts']
    },
    execution: 'Bras légèrement fléchis, ramener les poignées l’une contre l’autre devant soi en contrôlant le retour.',
    rationale: 'Maintient une tension mécanique continue sur les pectoraux du début à la fin, contrairement aux haltères.',
    defaultWeight: 17.5
  },
  {
    id: 'ex-pec-4',
    name: 'Développé couché barre',
    muscleGroup: 'Pectoraux',
    equipment: 'Barre',
    defaultSets: 4,
    repRange: '5-8',
    minReps: 5,
    maxReps: 8,
    restSeconds: 180,
    primaryMuscles: ['Grand pectoral (large)'],
    secondaryMuscles: ['Deltoïde antérieur', 'Triceps'],
    anatomyKeys: {
      primary: ['chest_mid'],
      secondary: ['front_delts', 'triceps']
    },
    execution: 'Prise légèrement plus large que les épaules, descendre la barre vers le sternum en gardant les coudes à 70°, pousser explosif.',
    rationale: 'Charge maximale possible, idéal pour la force et l’hypertrophie du grand pectoral.',
    defaultWeight: 80
  },
  {
    id: 'ex-pec-5',
    name: 'Développé décliné barre',
    muscleGroup: 'Pectoraux',
    equipment: 'Barre',
    defaultSets: 3,
    repRange: '8-12',
    minReps: 8,
    maxReps: 12,
    restSeconds: 120,
    primaryMuscles: ['Bas des pectoraux'],
    secondaryMuscles: ['Triceps'],
    anatomyKeys: {
      primary: ['chest_low'],
      secondary: ['triceps']
    },
    execution: 'Tête plus basse que les hanches sur banc décliné, descendre la barre vers le bas du sternum.',
    rationale: 'Cible spécifiquement le faisceau inférieur du pectoral, souvent négligé.',
    defaultWeight: 70
  },
  {
    id: 'ex-pec-6',
    name: 'Écarté aux haltères à plat',
    muscleGroup: 'Pectoraux',
    equipment: 'Haltères',
    defaultSets: 3,
    repRange: '10-15',
    minReps: 10,
    maxReps: 15,
    restSeconds: 90,
    primaryMuscles: ['Grand pectoral (étirement max)'],
    secondaryMuscles: ['Deltoïde antérieur'],
    anatomyKeys: {
      primary: ['chest_mid'],
      secondary: ['front_delts']
    },
    execution: 'Allongé, bras légèrement fléchis, descendre les haltères en arc en gardant la courbure du coude fixe, revenir.',
    rationale: 'Amplitude maximale d’étirement, grand recrutement en position basse.',
    defaultWeight: 20
  },
  {
    id: 'ex-pec-7',
    name: 'Dips lestés (parallèles)',
    muscleGroup: 'Pectoraux',
    equipment: 'Barre',
    defaultSets: 4,
    repRange: '8-12',
    minReps: 8,
    maxReps: 12,
    restSeconds: 120,
    primaryMuscles: ['Bas des pectoraux', 'Triceps'],
    secondaryMuscles: ['Deltoïde antérieur'],
    anatomyKeys: {
      primary: ['chest_low', 'triceps'],
      secondary: ['front_delts']
    },
    execution: 'Corps légèrement penché vers l’avant, descendre jusqu’à étirement du pectoral puis remonter.',
    rationale: 'Exercice polyarticulaire permettant une charge élevée sur le bas du torse.',
    defaultWeight: 20
  },
  {
    id: 'ex-pec-8',
    name: 'Pullover à la poulie',
    muscleGroup: 'Pectoraux',
    equipment: 'Poulie',
    defaultSets: 3,
    repRange: '12-15',
    minReps: 12,
    maxReps: 15,
    restSeconds: 90,
    primaryMuscles: ['Grand pectoral', 'Grand dorsal'],
    secondaryMuscles: ['Triceps'],
    anatomyKeys: {
      primary: ['chest_mid', 'lats'],
      secondary: ['triceps']
    },
    execution: 'Debout dos à la poulie haute, bras tendus, amener la barre en arc de cercle vers les cuisses.',
    rationale: 'Travaille la jonction pecs/dos, grand étirement du grand dentelé.',
    defaultWeight: 25
  },
  {
    id: 'ex-pec-9',
    name: 'Pompes lestées',
    muscleGroup: 'Pectoraux',
    equipment: 'Machine',
    defaultSets: 4,
    repRange: '10-15',
    minReps: 10,
    maxReps: 15,
    restSeconds: 90,
    primaryMuscles: ['Grand pectoral'],
    secondaryMuscles: ['Deltoïde antérieur', 'Triceps', 'Dentelé'],
    anatomyKeys: {
      primary: ['chest_mid'],
      secondary: ['front_delts', 'triceps']
    },
    execution: 'Position de pompe avec lest ou gilet, descendre la poitrine au sol, pousser vers le haut.',
    rationale: 'Travail en chaîne fermée, excellente activation du dentelé.',
    defaultWeight: 20
  },
  {
    id: 'ex-pec-10',
    name: 'Câble Crossover',
    muscleGroup: 'Pectoraux',
    equipment: 'Poulie',
    defaultSets: 3,
    repRange: '12-15',
    minReps: 12,
    maxReps: 15,
    restSeconds: 90,
    primaryMuscles: ['Grand pectoral (adduction)'],
    secondaryMuscles: ['Deltoïde antérieur'],
    anatomyKeys: {
      primary: ['chest_mid', 'chest_low'],
      secondary: ['front_delts']
    },
    execution: 'Deux poulies hautes, croiser les mains devant soi en arc de cercle, contrôler le retour.',
    rationale: 'Tension continue et convergente sur tout le pectoral, finition idéale.',
    defaultWeight: 15
  },

  // ==========================================
  // DOS (12 exercices)
  // ==========================================
  {
    id: 'ex-4',
    name: 'Tirage vertical poitrine (Lat Pulldown)',
    muscleGroup: 'Dos',
    equipment: 'Poulie',
    defaultSets: 4,
    repRange: '8-12',
    minReps: 8,
    maxReps: 12,
    restSeconds: 120,
    primaryMuscles: ['Grand dorsal', 'Grand rond'],
    secondaryMuscles: ['Biceps', 'Trapèzes inférieurs'],
    anatomyKeys: {
      primary: ['lats'],
      secondary: ['biceps', 'mid_back', 'traps']
    },
    execution: 'Cuisses calées, prise large, tirer la barre vers le haut de la poitrine en amenant les coudes vers le bas.',
    rationale: 'Exercice roi pour développer la largeur du dos (effet en V) avec une charge réglable avec précision.',
    defaultWeight: 72.5
  },
  {
    id: 'ex-5',
    name: 'Rowing machine avec appui thoracique',
    muscleGroup: 'Dos',
    equipment: 'Machine',
    defaultSets: 4,
    repRange: '8-10',
    minReps: 8,
    maxReps: 10,
    restSeconds: 120,
    primaryMuscles: ['Rhomboïdes', 'Trapèzes moyens', 'Grand dorsal'],
    secondaryMuscles: ['Deltoïde postérieur', 'Biceps'],
    anatomyKeys: {
      primary: ['mid_back', 'traps', 'lats'],
      secondary: ['rear_delts', 'biceps']
    },
    execution: 'Torse plaqué contre le coussin, tirer les poignées vers l’arrière en serrant fort les omoplates.',
    rationale: 'L’appui ventral stabilise le buste, supprime la fatigue des lombaires et isole l’épaisseur du dos.',
    defaultWeight: 65
  },
  {
    id: 'ex-6',
    name: 'Tirage horizontal poulie basse',
    muscleGroup: 'Dos',
    equipment: 'Poulie',
    defaultSets: 3,
    repRange: '10-12',
    minReps: 10,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Grand dorsal', 'Trapèzes moyens'],
    secondaryMuscles: ['Biceps', 'Lombaires'],
    anatomyKeys: {
      primary: ['lats', 'mid_back'],
      secondary: ['biceps', 'lower_back']
    },
    execution: 'Buste droit, tirer la poignée serrée vers le nombril en gardant les coudes proches du corps.',
    rationale: 'Cible la densité du milieu du dos et la partie basse des dorsaux.',
    defaultWeight: 60
  },
  {
    id: 'ex-dos-7',
    name: 'Traction pronation (Pull-up)',
    muscleGroup: 'Dos',
    equipment: 'Barre',
    defaultSets: 4,
    repRange: '6-10',
    minReps: 6,
    maxReps: 10,
    restSeconds: 120,
    primaryMuscles: ['Grand dorsal', 'Grand rond'],
    secondaryMuscles: ['Biceps', 'Brachial'],
    anatomyKeys: {
      primary: ['lats'],
      secondary: ['biceps', 'mid_back']
    },
    execution: 'Prise en pronation légèrement plus large que les épaules, partir de l’extension complète, tirer les coudes vers le bas et l’arrière.',
    rationale: 'Exercice au poids du corps le plus efficace pour la largeur du dos, force fonctionnelle maximale.',
    defaultWeight: 0
  },
  {
    id: 'ex-dos-8',
    name: 'Rowing barre pronation',
    muscleGroup: 'Dos',
    equipment: 'Barre',
    defaultSets: 4,
    repRange: '6-10',
    minReps: 6,
    maxReps: 10,
    restSeconds: 120,
    primaryMuscles: ['Grand dorsal', 'Rhomboïdes'],
    secondaryMuscles: ['Biceps', 'Lombaires'],
    anatomyKeys: {
      primary: ['lats', 'mid_back'],
      secondary: ['biceps', 'lower_back']
    },
    execution: 'Dos plat à 45°, barre tenue en pronation, tirer vers le bas de l’abdomen en gardant les coudes proches.',
    rationale: 'Masse et épaisseur dorsale maximale, charge lourde possible.',
    defaultWeight: 80
  },
  {
    id: 'ex-dos-9',
    name: 'Rowing haltère unilatéral',
    muscleGroup: 'Dos',
    equipment: 'Haltères',
    defaultSets: 3,
    repRange: '8-12',
    minReps: 8,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Grand dorsal', 'Rhomboïdes'],
    secondaryMuscles: ['Biceps', 'Lombaires'],
    anatomyKeys: {
      primary: ['lats', 'mid_back'],
      secondary: ['biceps', 'lower_back']
    },
    execution: 'Un genou sur banc, tirer l’haltère vers la hanche en gardant le dos plat, épaule en rétraction en haut.',
    rationale: 'Amplitude complète et correction des déséquilibres gauche/droite.',
    defaultWeight: 40
  },
  {
    id: 'ex-dos-10',
    name: 'Face Pull',
    muscleGroup: 'Dos',
    equipment: 'Poulie',
    defaultSets: 4,
    repRange: '15-20',
    minReps: 15,
    maxReps: 20,
    restSeconds: 60,
    primaryMuscles: ['Deltoïde postérieur', 'Rhomboïdes'],
    secondaryMuscles: ['Trapèzes', 'Coiffe des rotateurs'],
    anatomyKeys: {
      primary: ['rear_delts', 'mid_back'],
      secondary: ['traps']
    },
    execution: 'Poulie haute, prise en supination sur corde, tirer vers le visage en écartant les mains vers les oreilles.',
    rationale: 'Rééquilibre l’épaule, protège la coiffe des rotateurs, corrige la posture.',
    defaultWeight: 15
  },
  {
    id: 'ex-dos-11',
    name: 'Shrug à la barre',
    muscleGroup: 'Dos',
    equipment: 'Barre',
    defaultSets: 4,
    repRange: '10-15',
    minReps: 10,
    maxReps: 15,
    restSeconds: 90,
    primaryMuscles: ['Trapèzes supérieurs'],
    secondaryMuscles: ['Élévateurs de la scapula'],
    anatomyKeys: {
      primary: ['traps'],
      secondary: []
    },
    execution: 'Debout, barre en prise neutre, hausser les épaules verticalement sans tourner, maintenir 1s en haut.',
    rationale: 'Isolation maximale des trapèzes supérieurs pour la hauteur du cou.',
    defaultWeight: 100
  },
  {
    id: 'ex-dos-12',
    name: 'Soulevé de terre conventionnel',
    muscleGroup: 'Dos',
    equipment: 'Barre',
    defaultSets: 3,
    repRange: '3-6',
    minReps: 3,
    maxReps: 6,
    restSeconds: 180,
    primaryMuscles: ['Grand dorsal', 'Trapèzes', 'Rhomboïdes'],
    secondaryMuscles: ['Fessiers', 'Quadriceps', 'Ischio-jambiers'],
    anatomyKeys: {
      primary: ['lats', 'traps', 'lower_back'],
      secondary: ['glutes', 'hamstrings', 'quads']
    },
    execution: 'Pieds écartés à la largeur des hanches, barre sur le milieu du pied, tirage vertical strict dos plat.',
    rationale: 'Mouvement roi de la force, recrutement de presque tous les muscles du corps.',
    defaultWeight: 140
  },
  {
    id: 'ex-dos-13',
    name: 'Tirage nuque',
    muscleGroup: 'Dos',
    equipment: 'Poulie',
    defaultSets: 3,
    repRange: '10-12',
    minReps: 10,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Grand dorsal'],
    secondaryMuscles: ['Biceps', 'Trapèzes'],
    anatomyKeys: {
      primary: ['lats'],
      secondary: ['biceps', 'traps']
    },
    execution: 'Poulie haute, prise large en pronation, tirer la barre derrière la nuque.',
    rationale: 'Travaille le dorsal depuis un angle différent, avec précautions sur la cervicale.',
    defaultWeight: 60
  },
  {
    id: 'ex-dos-14',
    name: 'Good Morning',
    muscleGroup: 'Dos',
    equipment: 'Barre',
    defaultSets: 3,
    repRange: '10-12',
    minReps: 10,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Lombaires', 'Ischio-jambiers'],
    secondaryMuscles: ['Fessiers'],
    anatomyKeys: {
      primary: ['lower_back', 'hamstrings'],
      secondary: ['glutes']
    },
    execution: 'Barre sur les trapèzes, incliner le buste vers l’avant dos bien plat jusqu’à parallèle au sol, revenir.',
    rationale: 'Renforcement spécifique des lombaires et chaîne postérieure.',
    defaultWeight: 40
  },

  // ==========================================
  // JAMBES (12 exercices)
  // ==========================================
  {
    id: 'ex-7',
    name: 'Presse à cuisses inclinée / Hack Squat',
    muscleGroup: 'Jambes',
    equipment: 'Machine',
    defaultSets: 4,
    repRange: '8-12',
    minReps: 8,
    maxReps: 12,
    restSeconds: 150,
    primaryMuscles: ['Quadriceps', 'Grand fessier'],
    secondaryMuscles: ['Ischio-jambiers', 'Adducteurs'],
    anatomyKeys: {
      primary: ['quads', 'glutes'],
      secondary: ['hamstrings', 'calves']
    },
    execution: 'Dos et bassin plaqués au dossier, descendre jusqu’à 90° de flexion de genoux minimum puis pousser avec tout le pied.',
    rationale: 'Permet de mettre une charge très lourde sur les cuisses sans être limité par l’équilibre ou le bas du dos.',
    defaultWeight: 240
  },
  {
    id: 'ex-8',
    name: 'Leg Extension assis',
    muscleGroup: 'Jambes',
    equipment: 'Machine',
    defaultSets: 3,
    repRange: '12-15',
    minReps: 12,
    maxReps: 15,
    restSeconds: 90,
    primaryMuscles: ['Quadriceps (Vastes + Droit fémoral)'],
    secondaryMuscles: ['Aucun'],
    anatomyKeys: {
      primary: ['quads'],
      secondary: []
    },
    execution: 'Tendre complètement les jambes, maintenir 1 seconde de contraction en haut et redescendre lentement.',
    rationale: 'Seul mouvement capable d’isoler pleinement le droit fémoral (centre de la cuisse).',
    defaultWeight: 75
  },
  {
    id: 'ex-9',
    name: 'Soulevé de terre Roumain (RDL)',
    muscleGroup: 'Jambes',
    equipment: 'Barre',
    defaultSets: 3,
    repRange: '8-10',
    minReps: 8,
    maxReps: 10,
    restSeconds: 120,
    primaryMuscles: ['Ischio-jambiers', 'Fessiers'],
    secondaryMuscles: ['Lombaires', 'Trapèzes', 'Avant-bras'],
    anatomyKeys: {
      primary: ['hamstrings', 'glutes'],
      secondary: ['lower_back', 'traps', 'forearms']
    },
    execution: 'Genoux légèrement fléchis et fixes, reculer les hanches dos bien plat jusqu’à mi-tibia puis remonter en serrant les fessiers.',
    rationale: 'Développe toute la chaîne postérieure grâce à une tension maximale en position d’étirement.',
    defaultWeight: 110
  },
  {
    id: 'ex-10',
    name: 'Leg Curl assis',
    muscleGroup: 'Jambes',
    equipment: 'Machine',
    defaultSets: 3,
    repRange: '10-15',
    minReps: 10,
    maxReps: 15,
    restSeconds: 90,
    primaryMuscles: ['Ischio-jambiers'],
    secondaryMuscles: ['Mollets'],
    anatomyKeys: {
      primary: ['hamstrings'],
      secondary: ['calves']
    },
    execution: 'Cuisses bloquées par le boudin, plier les jambes au maximum sous le siège.',
    rationale: 'La position assise pré-étire les ischio-jambiers au niveau de la hanche, doublant l’efficacité par rapport au leg curl allongé.',
    defaultWeight: 60
  },
  {
    id: 'ex-leg-5',
    name: 'Squat barre haute',
    muscleGroup: 'Jambes',
    equipment: 'Barre',
    defaultSets: 4,
    repRange: '5-8',
    minReps: 5,
    maxReps: 8,
    restSeconds: 180,
    primaryMuscles: ['Quadriceps', 'Grand fessier'],
    secondaryMuscles: ['Ischio-jambiers', 'Adducteurs'],
    anatomyKeys: {
      primary: ['quads', 'glutes'],
      secondary: ['hamstrings']
    },
    execution: 'Barre sur les trapèzes hauts, pieds épaule-largeur, genoux dans l’axe des orteils, descendre au-dessous du parallèle.',
    rationale: 'Mouvement roi des jambes, recrutement maximal du bas du corps.',
    defaultWeight: 100
  },
  {
    id: 'ex-leg-6',
    name: 'Fentes marchées haltères',
    muscleGroup: 'Jambes',
    equipment: 'Haltères',
    defaultSets: 3,
    repRange: '10-12',
    minReps: 10,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Quadriceps', 'Grand fessier'],
    secondaryMuscles: ['Ischio-jambiers', 'Mollets'],
    anatomyKeys: {
      primary: ['quads', 'glutes'],
      secondary: ['hamstrings', 'calves']
    },
    execution: 'Haltères en main, faire un grand pas en avant, genou arrière proche du sol, alterner jambes en marchant.',
    rationale: 'Travail unilatéral corrigeant les déséquilibres, excellent pour les fessiers.',
    defaultWeight: 24
  },
  {
    id: 'ex-leg-7',
    name: 'Bulgarian Split Squat',
    muscleGroup: 'Jambes',
    equipment: 'Haltères',
    defaultSets: 3,
    repRange: '8-12',
    minReps: 8,
    maxReps: 12,
    restSeconds: 120,
    primaryMuscles: ['Quadriceps', 'Grand fessier'],
    secondaryMuscles: ['Ischio-jambiers'],
    anatomyKeys: {
      primary: ['quads', 'glutes'],
      secondary: ['hamstrings']
    },
    execution: 'Pied arrière sur banc, descendre verticalement en gardant le torse droit, genou avant dans l’axe de l’orteil.',
    rationale: 'Force et hypertrophie unilatérale maximales, grand étirement du psoas.',
    defaultWeight: 28
  },
  {
    id: 'ex-leg-8',
    name: 'Hip Thrust (Pont fessier)',
    muscleGroup: 'Jambes',
    equipment: 'Barre',
    defaultSets: 4,
    repRange: '10-15',
    minReps: 10,
    maxReps: 15,
    restSeconds: 90,
    primaryMuscles: ['Grand fessier'],
    secondaryMuscles: ['Ischio-jambiers', 'Lombaires'],
    anatomyKeys: {
      primary: ['glutes'],
      secondary: ['hamstrings', 'lower_back']
    },
    execution: 'Épaules sur banc, barre sur les hanches, pousser les hanches vers le plafond en serrant les fessiers, 1s de contraction.',
    rationale: 'Isolation maximale du grand fessier, charge très élevée possible.',
    defaultWeight: 80
  },
  {
    id: 'ex-leg-9',
    name: 'Mollets debout (calf machine)',
    muscleGroup: 'Jambes',
    equipment: 'Machine',
    defaultSets: 4,
    repRange: '15-20',
    minReps: 15,
    maxReps: 20,
    restSeconds: 60,
    primaryMuscles: ['Mollet (Gastrocnémien)'],
    secondaryMuscles: ['Soléaire'],
    anatomyKeys: {
      primary: ['calves'],
      secondary: []
    },
    execution: 'Planter de pied complet sur l’avant, descendre le talon sous la plateforme, pousser jusqu’en haut, tenir 1s.',
    rationale: 'Cible le chef latéral et médial du gastrocnémien pour la taille du mollet.',
    defaultWeight: 100
  },
  {
    id: 'ex-leg-10',
    name: 'Mollets assis (machine)',
    muscleGroup: 'Jambes',
    equipment: 'Machine',
    defaultSets: 4,
    repRange: '15-20',
    minReps: 15,
    maxReps: 20,
    restSeconds: 60,
    primaryMuscles: ['Soléaire'],
    secondaryMuscles: ['Gastrocnémien'],
    anatomyKeys: {
      primary: ['calves'],
      secondary: []
    },
    execution: 'Assis genoux fléchis à 90°, pousser sur l’avant du pied, descendre jusqu’à étirement, remonter.',
    rationale: 'Position assise neutralise le gastrocnémien et isole le soléaire en profondeur.',
    defaultWeight: 60
  },
  {
    id: 'ex-leg-11',
    name: 'Hack Squat machine',
    muscleGroup: 'Jambes',
    equipment: 'Machine',
    defaultSets: 4,
    repRange: '8-12',
    minReps: 8,
    maxReps: 12,
    restSeconds: 120,
    primaryMuscles: ['Quadriceps'],
    secondaryMuscles: ['Grand fessier'],
    anatomyKeys: {
      primary: ['quads'],
      secondary: ['glutes']
    },
    execution: 'Dos plaqué, pieds milieu de la plateforme, descendre jusqu’à 90° minimum.',
    rationale: 'Cible extrêmement les vastes, moins de contrainte lombaire que le squat barre.',
    defaultWeight: 160
  },
  {
    id: 'ex-leg-12',
    name: 'Adducteurs machine',
    muscleGroup: 'Jambes',
    equipment: 'Machine',
    defaultSets: 3,
    repRange: '12-15',
    minReps: 12,
    maxReps: 15,
    restSeconds: 75,
    primaryMuscles: ['Adducteurs'],
    secondaryMuscles: ['Gracilis'],
    anatomyKeys: {
      primary: ['quads'],
      secondary: []
    },
    execution: 'Assis, jambes écartées, ramener les jambes l’une vers l’autre contre la résistance.',
    rationale: 'Isolation complète des adducteurs, souvent négligés mais essentiels à la stabilité.',
    defaultWeight: 50
  },

  // ==========================================
  // ÉPAULES (8 exercices)
  // ==========================================
  {
    id: 'ex-11',
    name: 'Développé épaules haltères ou machine',
    muscleGroup: 'Épaules',
    equipment: 'Haltères',
    defaultSets: 4,
    repRange: '8-10',
    minReps: 8,
    maxReps: 10,
    restSeconds: 120,
    primaryMuscles: ['Deltoïde antérieur et moyen'],
    secondaryMuscles: ['Triceps', 'Trapèze supérieur'],
    anatomyKeys: {
      primary: ['front_delts', 'side_delts'],
      secondary: ['triceps', 'traps']
    },
    execution: 'Banc à 75°, pousser les charges au-dessus de la tête avec les coudes légèrement rentrés vers l’avant (plan scapulaire).',
    rationale: 'Exercice polyarticulaire de référence pour le volume et la force globale des épaules.',
    defaultWeight: 28
  },
  {
    id: 'ex-12',
    name: 'Élévations latérales à la poulie basse',
    muscleGroup: 'Épaules',
    equipment: 'Poulie',
    defaultSets: 4,
    repRange: '12-15',
    minReps: 12,
    maxReps: 15,
    restSeconds: 75,
    primaryMuscles: ['Deltoïde moyen (latéral)'],
    secondaryMuscles: ['Trapèze supérieur'],
    anatomyKeys: {
      primary: ['side_delts'],
      secondary: ['traps']
    },
    execution: 'Lever le bras sur le côté jusqu’à l’horizontale en menant le mouvement avec le coude.',
    rationale: 'Élargit la carrure. La poulie maintient la tension dès le bas du mouvement là où l’haltère ne pèse rien.',
    defaultWeight: 12.5
  },
  {
    id: 'ex-13',
    name: 'Reverse Pec Deck (Oiseau machine)',
    muscleGroup: 'Épaules',
    equipment: 'Machine',
    defaultSets: 3,
    repRange: '12-15',
    minReps: 12,
    maxReps: 15,
    restSeconds: 75,
    primaryMuscles: ['Deltoïde postérieur (arrière d’épaule)'],
    secondaryMuscles: ['Rhomboïdes', 'Trapèze moyen'],
    anatomyKeys: {
      primary: ['rear_delts'],
      secondary: ['mid_back', 'traps']
    },
    execution: 'Face au dossier, pousser les poignées vers l’arrière bras quasi tendus.',
    rationale: 'Donne le galbe 3D à l’épaule de profil et protège l’articulation en rééquilibrant la posture.',
    defaultWeight: 50
  },
  {
    id: 'ex-del-4',
    name: 'Développé militaire barre',
    muscleGroup: 'Épaules',
    equipment: 'Barre',
    defaultSets: 4,
    repRange: '5-8',
    minReps: 5,
    maxReps: 8,
    restSeconds: 150,
    primaryMuscles: ['Deltoïde antérieur et moyen'],
    secondaryMuscles: ['Triceps', 'Trapèze supérieur'],
    anatomyKeys: {
      primary: ['front_delts', 'side_delts'],
      secondary: ['triceps', 'traps']
    },
    execution: 'Debout ou assis, barre en avant du visage, pousser verticalement au-dessus de la tête, redescendre au niveau du cou.',
    rationale: 'Exercice de force par excellence pour les épaules, permet les charges les plus lourdes.',
    defaultWeight: 60
  },
  {
    id: 'ex-del-5',
    name: 'Arnold Press',
    muscleGroup: 'Épaules',
    equipment: 'Haltères',
    defaultSets: 3,
    repRange: '8-12',
    minReps: 8,
    maxReps: 12,
    restSeconds: 120,
    primaryMuscles: ['Deltoïde (3 faisceaux)'],
    secondaryMuscles: ['Triceps'],
    anatomyKeys: {
      primary: ['front_delts', 'side_delts', 'rear_delts'],
      secondary: ['triceps']
    },
    execution: 'Départ paume face à soi (comme en fin de curl), ouvrir les bras en rotation supination tout en poussant vers le haut.',
    rationale: 'Rotation scapulaire naturelle couvrant tous les faisceaux du deltoïde en un mouvement.',
    defaultWeight: 24
  },
  {
    id: 'ex-del-6',
    name: 'Élévations frontales haltères',
    muscleGroup: 'Épaules',
    equipment: 'Haltères',
    defaultSets: 3,
    repRange: '10-15',
    minReps: 10,
    maxReps: 15,
    restSeconds: 75,
    primaryMuscles: ['Deltoïde antérieur'],
    secondaryMuscles: ['Deltoïde moyen'],
    anatomyKeys: {
      primary: ['front_delts'],
      secondary: ['side_delts']
    },
    execution: 'Debout, haltères devant les cuisses, lever alternativement chaque bras jusqu’à l’horizontale, pouce vers le haut.',
    rationale: 'Isolation du faisceau antérieur, souvent sous-développé.',
    defaultWeight: 12
  },
  {
    id: 'ex-del-7',
    name: 'Upright Row (Tirage vertical menton)',
    muscleGroup: 'Épaules',
    equipment: 'Barre',
    defaultSets: 3,
    repRange: '10-12',
    minReps: 10,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Deltoïde moyen', 'Trapèzes'],
    secondaryMuscles: ['Biceps'],
    anatomyKeys: {
      primary: ['side_delts', 'traps'],
      secondary: ['biceps']
    },
    execution: 'Prise serrée, tirer la barre le long du corps jusqu’au menton, coudes au-dessus des poignets.',
    rationale: 'Travaille deltoïde moyen et trapèzes simultanément.',
    defaultWeight: 40
  },
  {
    id: 'ex-del-8',
    name: 'Élévations latérales haltères',
    muscleGroup: 'Épaules',
    equipment: 'Haltères',
    defaultSets: 4,
    repRange: '12-15',
    minReps: 12,
    maxReps: 15,
    restSeconds: 75,
    primaryMuscles: ['Deltoïde moyen'],
    secondaryMuscles: ['Deltoïde antérieur', 'Trapèze supérieur'],
    anatomyKeys: {
      primary: ['side_delts'],
      secondary: ['front_delts', 'traps']
    },
    execution: 'Debout, légère flexion du coude, lever les bras sur les côtés jusqu’à l’horizontale.',
    rationale: 'Version libre des élévations, sensation de brûlure du deltoïde moyen.',
    defaultWeight: 12
  },

  // ==========================================
  // BRAS (12 exercices)
  // ==========================================
  {
    id: 'ex-14',
    name: 'Curl incliné aux haltères',
    muscleGroup: 'Bras',
    equipment: 'Haltères',
    defaultSets: 3,
    repRange: '10-12',
    minReps: 10,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Biceps brachial (Longue portion)'],
    secondaryMuscles: ['Avant-bras'],
    anatomyKeys: {
      primary: ['biceps'],
      secondary: ['forearms']
    },
    execution: 'Assis sur banc à 45°, bras pendants derrière le buste, plier les coudes en gardant les épaules fixes.',
    rationale: 'Étire la longue portion du biceps au maximum pour développer le pic du biceps.',
    defaultWeight: 16
  },
  {
    id: 'ex-15',
    name: 'Curl Pupitre (Preacher Curl)',
    muscleGroup: 'Bras',
    equipment: 'Machine',
    defaultSets: 3,
    repRange: '10-12',
    minReps: 10,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Biceps (Courte portion)', 'Brachial'],
    secondaryMuscles: ['Avant-bras'],
    anatomyKeys: {
      primary: ['biceps'],
      secondary: ['forearms']
    },
    execution: 'Bras plaqués sur le pupitre, descendre jusqu’en bas et remonter sans décoller les coudes.',
    rationale: 'Empêche toute triche avec le dos ou les épaules.',
    defaultWeight: 40
  },
  {
    id: 'ex-16',
    name: 'Extension Triceps poulie haute à la corde',
    muscleGroup: 'Bras',
    equipment: 'Poulie',
    defaultSets: 3,
    repRange: '12-15',
    minReps: 12,
    maxReps: 15,
    restSeconds: 75,
    primaryMuscles: ['Triceps (Vastes externe et interne)'],
    secondaryMuscles: ['Anconé'],
    anatomyKeys: {
      primary: ['triceps'],
      secondary: ['forearms']
    },
    execution: 'Coudes collés aux côtes, tendre les bras vers le bas en écartant la corde à la fin.',
    rationale: 'Isole la face latérale du triceps en préservant les coudes.',
    defaultWeight: 27.5
  },
  {
    id: 'ex-17',
    name: 'Extension Triceps overhead à la poulie',
    muscleGroup: 'Bras',
    equipment: 'Poulie',
    defaultSets: 3,
    repRange: '10-12',
    minReps: 10,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Triceps (Longue portion)'],
    secondaryMuscles: ['Aucun'],
    anatomyKeys: {
      primary: ['triceps'],
      secondary: []
    },
    execution: 'Dos à la poulie, bras au-dessus de la tête, tendre les avant-bras vers le haut.',
    rationale: 'Avoir les bras levés est la seule façon d’étirer et de recruter à 100% la longue portion (qui représente 2/3 de la masse du triceps).',
    defaultWeight: 22.5
  },
  {
    id: 'ex-bra-5',
    name: 'Curl barre droite',
    muscleGroup: 'Bras',
    equipment: 'Barre',
    defaultSets: 3,
    repRange: '8-12',
    minReps: 8,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Biceps brachial (2 portions)'],
    secondaryMuscles: ['Avant-bras'],
    anatomyKeys: {
      primary: ['biceps'],
      secondary: ['forearms']
    },
    execution: 'Debout, prise en supination, coudes fixes le long du corps, flexion complète, descente contrôlée.',
    rationale: 'Charge maximale sur les biceps, court et long faisceaux.',
    defaultWeight: 40
  },
  {
    id: 'ex-bra-6',
    name: 'Curl haltères alterné',
    muscleGroup: 'Bras',
    equipment: 'Haltères',
    defaultSets: 3,
    repRange: '10-12',
    minReps: 10,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Biceps', 'Brachial'],
    secondaryMuscles: ['Avant-bras'],
    anatomyKeys: {
      primary: ['biceps'],
      secondary: ['forearms']
    },
    execution: 'Alterner les bras, supination en début de mouvement pour biaiser la longue portion.',
    rationale: 'Amplitude complète bilatérale, correction des asymétries.',
    defaultWeight: 18
  },
  {
    id: 'ex-bra-7',
    name: 'Curl marteau',
    muscleGroup: 'Bras',
    equipment: 'Haltères',
    defaultSets: 3,
    repRange: '10-12',
    minReps: 10,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Brachioradialis', 'Brachial'],
    secondaryMuscles: ['Biceps'],
    anatomyKeys: {
      primary: ['biceps', 'forearms'],
      secondary: []
    },
    execution: 'Prise neutre (pouce en haut), même mouvement que le curl standard.',
    rationale: 'Développe la largeur du bras et l’avant-bras, peu sollicité par les autres exercices.',
    defaultWeight: 20
  },
  {
    id: 'ex-bra-8',
    name: 'Curl barre EZ',
    muscleGroup: 'Bras',
    equipment: 'Barre',
    defaultSets: 3,
    repRange: '10-12',
    minReps: 10,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Biceps'],
    secondaryMuscles: ['Avant-bras'],
    anatomyKeys: {
      primary: ['biceps'],
      secondary: ['forearms']
    },
    execution: 'Barre EZ en légère pronation, moins de contrainte sur les poignets que la barre droite.',
    rationale: 'Meilleur confort articulaire, bon volume sur les deux faisceaux.',
    defaultWeight: 35
  },
  {
    id: 'ex-bra-9',
    name: 'Extension barre couché (Skull Crusher)',
    muscleGroup: 'Bras',
    equipment: 'Barre',
    defaultSets: 3,
    repRange: '8-12',
    minReps: 8,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Triceps (long faisceau)'],
    secondaryMuscles: ['Triceps latéral'],
    anatomyKeys: {
      primary: ['triceps'],
      secondary: []
    },
    execution: 'Couché, barre EZ descend vers le front en gardant les coudes fixes au-dessus des yeux, extension.',
    rationale: 'Grande charge possible sur la longue portion, très efficace pour la masse du triceps.',
    defaultWeight: 40
  },
  {
    id: 'ex-bra-10',
    name: 'Dips barre parallèles (focus triceps)',
    muscleGroup: 'Bras',
    equipment: 'Barre',
    defaultSets: 3,
    repRange: '8-15',
    minReps: 8,
    maxReps: 15,
    restSeconds: 90,
    primaryMuscles: ['Triceps'],
    secondaryMuscles: ['Pectoraux', 'Deltoïde antérieur'],
    anatomyKeys: {
      primary: ['triceps'],
      secondary: ['chest_low', 'front_delts']
    },
    execution: 'Corps vertical, coudes proches du buste, descendre jusqu’à 90° de flexion puis pousser.',
    rationale: 'Poids du corps + lest possible, fort recrutement du triceps en chaîne fermée.',
    defaultWeight: 20
  },
  {
    id: 'ex-bra-11',
    name: 'Kickback Triceps haltère',
    muscleGroup: 'Bras',
    equipment: 'Haltères',
    defaultSets: 3,
    repRange: '12-15',
    minReps: 12,
    maxReps: 15,
    restSeconds: 75,
    primaryMuscles: ['Triceps (vaste externe)'],
    secondaryMuscles: ['Aucun'],
    anatomyKeys: {
      primary: ['triceps'],
      secondary: []
    },
    execution: 'Coude fixé à la hauteur de la hanche, bras horizontal, tendre l’avant-bras vers l’arrière, contraction maximale.',
    rationale: 'Isolation du triceps latéral en position raccourcie, brûlure maximale.',
    defaultWeight: 12
  },
  {
    id: 'ex-bra-12',
    name: 'Reverse Curl',
    muscleGroup: 'Bras',
    equipment: 'Barre',
    defaultSets: 3,
    repRange: '10-12',
    minReps: 10,
    maxReps: 12,
    restSeconds: 75,
    primaryMuscles: ['Brachioradialis', 'Brachial'],
    secondaryMuscles: ['Avant-bras'],
    anatomyKeys: {
      primary: ['forearms', 'biceps'],
      secondary: []
    },
    execution: 'Prise en pronation (dos de la main vers le haut), curl standard.',
    rationale: 'Développe l’avant-bras et le brachioradialis, souvent très faible.',
    defaultWeight: 20
  },

  // ==========================================
  // ABDOMINAUX (8 exercices)
  // ==========================================
  {
    id: 'ex-18',
    name: 'Crunch à la poulie haute (Cable Crunch)',
    muscleGroup: 'Abdos',
    equipment: 'Poulie',
    defaultSets: 3,
    repRange: '12-15',
    minReps: 12,
    maxReps: 15,
    restSeconds: 60,
    primaryMuscles: ['Grand droit de l’abdomen'],
    secondaryMuscles: ['Obliques'],
    anatomyKeys: {
      primary: ['abs'],
      secondary: ['obliques']
    },
    execution: 'À genoux, corde derrière la nuque, enrouler la colonne vertébrale en rapprochant le sternum du bassin.',
    rationale: 'Permet d’appliquer une surcharge progressive avec des poids sur les abdominaux, comme n’importe quel autre muscle.',
    defaultWeight: 50
  },
  {
    id: 'ex-abs-2',
    name: 'Crunch au sol',
    muscleGroup: 'Abdos',
    equipment: 'Machine',
    defaultSets: 3,
    repRange: '15-20',
    minReps: 15,
    maxReps: 20,
    restSeconds: 60,
    primaryMuscles: ['Grand droit'],
    secondaryMuscles: ['Obliques'],
    anatomyKeys: {
      primary: ['abs'],
      secondary: ['obliques']
    },
    execution: 'Couché, genoux fléchis, mains derrière la nuque, enrouler la colonne vertébrale sans soulever le bas du dos.',
    rationale: 'Base de l’isolation abdominale, accessible sans équipement.',
    defaultWeight: 0
  },
  {
    id: 'ex-abs-3',
    name: 'Relevé de jambes suspendu',
    muscleGroup: 'Abdos',
    equipment: 'Barre',
    defaultSets: 3,
    repRange: '12-15',
    minReps: 12,
    maxReps: 15,
    restSeconds: 75,
    primaryMuscles: ['Grand droit (bas)'],
    secondaryMuscles: ['Psoas', 'Obliques'],
    anatomyKeys: {
      primary: ['abs'],
      secondary: ['obliques']
    },
    execution: 'Suspendu à la barre, soulever les jambes tendues jusqu’à l’horizontale (ou genoux à 90°).',
    rationale: 'Cible la partie inférieure du droit abdominal, souvent faible.',
    defaultWeight: 0
  },
  {
    id: 'ex-abs-4',
    name: 'Russian Twist lesté',
    muscleGroup: 'Abdos',
    equipment: 'Haltères',
    defaultSets: 3,
    repRange: '15-20',
    minReps: 15,
    maxReps: 20,
    restSeconds: 60,
    primaryMuscles: ['Obliques'],
    secondaryMuscles: ['Grand droit'],
    anatomyKeys: {
      primary: ['obliques'],
      secondary: ['abs']
    },
    execution: 'Assis, pieds soulevés, rotation du buste de gauche à droite avec un disque ou haltère.',
    rationale: 'Isolation des obliques internes et externes.',
    defaultWeight: 10
  },
  {
    id: 'ex-abs-5',
    name: 'Planche (Plank)',
    muscleGroup: 'Abdos',
    equipment: 'Machine',
    defaultSets: 3,
    repRange: '45-60s',
    minReps: 45,
    maxReps: 60,
    restSeconds: 60,
    primaryMuscles: ['Transverse abdominal'],
    secondaryMuscles: ['Grand droit', 'Lombaires', 'Fessiers'],
    anatomyKeys: {
      primary: ['abs'],
      secondary: ['obliques', 'lower_back', 'glutes']
    },
    execution: 'Coudes à 90°, corps aligné de la tête aux talons, gainage maximal sans chute des hanches.',
    rationale: 'Renforce le gainage profond et la stabilité lombaire, prévient les blessures.',
    defaultWeight: 0
  },
  {
    id: 'ex-abs-6',
    name: 'Ab Wheel (Roue abdominale)',
    muscleGroup: 'Abdos',
    equipment: 'Machine',
    defaultSets: 3,
    repRange: '8-12',
    minReps: 8,
    maxReps: 12,
    restSeconds: 90,
    primaryMuscles: ['Grand droit'],
    secondaryMuscles: ['Dentelé', 'Grand dorsal'],
    anatomyKeys: {
      primary: ['abs'],
      secondary: ['lats']
    },
    execution: 'À genoux, rouler vers l’avant en allongeant les bras, dos plat, revenir avec les abdos sans cambrer.',
    rationale: 'Travail concentrique et excentrique très intense, meilleur pour la définition.',
    defaultWeight: 0
  },
  {
    id: 'ex-abs-7',
    name: 'Crunch oblique haltère',
    muscleGroup: 'Abdos',
    equipment: 'Haltères',
    defaultSets: 3,
    repRange: '15-20',
    minReps: 15,
    maxReps: 20,
    restSeconds: 60,
    primaryMuscles: ['Obliques'],
    secondaryMuscles: ['Grand droit'],
    anatomyKeys: {
      primary: ['obliques'],
      secondary: ['abs']
    },
    execution: 'Couché sur le côté, haltère tenu sur l’épaule, flexion latérale du buste.',
    rationale: 'Isolation des obliques latéraux.',
    defaultWeight: 10
  },
  {
    id: 'ex-abs-8',
    name: 'Dragon Flag',
    muscleGroup: 'Abdos',
    equipment: 'Barre',
    defaultSets: 3,
    repRange: '5-8',
    minReps: 5,
    maxReps: 8,
    restSeconds: 120,
    primaryMuscles: ['Grand droit (complet)'],
    secondaryMuscles: ['Dorsaux', 'Fessiers'],
    anatomyKeys: {
      primary: ['abs'],
      secondary: ['lats', 'glutes']
    },
    execution: 'Sur banc, tenir la tête du banc, monter le corps à la verticale, descendre lentement dos plat.',
    rationale: 'Exercice d’élite, recrutement de toute la sangle abdominale en excentrique.',
    defaultWeight: 0
  }
];

export const MUSCLE_GROUPS = [
  'Pectoraux',
  'Dos',
  'Jambes',
  'Épaules',
  'Bras',
  'Abdos'
];

export const EQUIPMENT_TYPES = [
  'Haltères',
  'Barre',
  'Machine',
  'Poulie'
];
