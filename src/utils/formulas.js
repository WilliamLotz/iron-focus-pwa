// Formules biomécaniques et algorithmes d'analyse

/**
 * Calcul du 1RM estimé selon la formule d'Epley
 * 1RM = Poids * (1 + Reps / 30)
 */
export function calculate1RM(weight, reps) {
  if (!weight || !reps || reps <= 0) return 0;
  if (reps === 1) return Number(weight);
  const oneRM = weight * (1 + reps / 30);
  return Math.round(oneRM * 10) / 10;
}

/**
 * Calcul du tonnage total d'une séance (somme des Poids × Reps)
 */
export function calculateSessionTonnage(exercises) {
  if (!exercises || !Array.isArray(exercises)) return 0;
  return exercises.reduce((acc, ex) => {
    if (!ex.sets) return acc;
    const exTonnage = ex.sets.reduce((sAcc, s) => {
      if (s.completed && s.weight && s.reps) {
        return sAcc + Number(s.weight) * Number(s.reps);
      }
      return sAcc;
    }, 0);
    return acc + exTonnage;
  }, 0);
}

/**
 * Analyse de la surcharge progressive pour un exercice donné
 * Critère : Si lors de la dernière séance, toutes les séries ont atteint le haut de la fourchette de répétitions,
 * proposer +2.5 kg (Machine/Barre) ou +1.25 kg (Haltères/Poulie)
 */
export function checkProgressiveOverload(exerciseId, exercisesCatalog, workoutHistory) {
  const exercise = exercisesCatalog.find(e => e.id === exerciseId);
  if (!exercise || !workoutHistory || workoutHistory.length === 0) {
    return { eligible: false, currentWeight: exercise?.defaultWeight || 20 };
  }

  // Chercher la dernière séance contenant cet exercice
  let lastSessionExercise = null;
  let lastSessionDate = null;

  // Parcourir l'historique du plus récent au plus ancien
  const sortedHistory = [...workoutHistory].sort((a, b) => new Date(b.date) - new Date(a.date));

  for (const session of sortedHistory) {
    const found = session.exercises?.find(e => e.exerciseId === exerciseId);
    if (found && found.sets && found.sets.length > 0) {
      lastSessionExercise = found;
      lastSessionDate = session.date;
      break;
    }
  }

  if (!lastSessionExercise) {
    return {
      eligible: false,
      currentWeight: exercise.defaultWeight || 20,
      previousSets: null
    };
  }

  const completedSets = lastSessionExercise.sets.filter(s => s.completed !== false && s.reps > 0);
  if (completedSets.length === 0) {
    return { eligible: false, currentWeight: exercise.defaultWeight || 20, previousSets: null };
  }

  const lastMaxWeight = Math.max(...completedSets.map(s => Number(s.weight) || 0));
  const targetMaxReps = exercise.maxReps || 10;

  // Vérifier si toutes les séries ont atteint le haut de la fourchette
  const allHitCeiling = completedSets.every(s => Number(s.reps) >= targetMaxReps);

  // Déterminer le palier d'augmentation selon l'équipement
  const increment = (exercise.equipment === 'Machine' || exercise.equipment === 'Barre') ? 2.5 : 1.25;

  if (allHitCeiling) {
    const suggestedWeight = Math.round((lastMaxWeight + increment) * 100) / 100;
    return {
      eligible: true,
      currentWeight: lastMaxWeight,
      suggestedWeight,
      increment,
      targetMaxReps,
      completedSetsCount: completedSets.length,
      lastSessionDate,
      message: `Objectif validé (${completedSets.length}×${targetMaxReps} reps) ! +${increment} kg recommandé.`
    };
  }

  return {
    eligible: false,
    currentWeight: lastMaxWeight,
    suggestedWeight: lastMaxWeight,
    increment,
    targetMaxReps,
    lastSessionDate,
    previousSets: completedSets
  };
}

/**
 * Calcul du temps de repos par groupe musculaire à partir de l'historique
 */
export function getMuscleRecoveryStatus(workoutHistory, exercisesCatalog) {
  const muscleGroups = ['Pectoraux', 'Dos', 'Jambes', 'Épaules', 'Biceps', 'Triceps', 'Abdos'];
  const now = Date.now();
  const sortedHistory = [...(workoutHistory || [])].sort((a, b) => new Date(b.date) - new Date(a.date));

  const status = {};

  muscleGroups.forEach(muscle => {
    let lastTrainedTime = null;
    let lastWorkoutName = '';

    for (const session of sortedHistory) {
      // Vérifier si un des exercices de la séance touche ce muscle
      const hasMuscle = session.exercises?.some(ex => {
        const catalogEx = exercisesCatalog.find(c => c.id === ex.exerciseId);
        return catalogEx && (catalogEx.muscleGroup === muscle || catalogEx.primaryMuscles?.some(m => m.toLowerCase().includes(muscle.toLowerCase())));
      });

      if (hasMuscle) {
        lastTrainedTime = new Date(session.date).getTime();
        lastWorkoutName = session.workoutName;
        break;
      }
    }

    if (!lastTrainedTime) {
      status[muscle] = {
        hoursAgo: 999,
        daysAgo: 99,
        isRested: true,
        label: 'Reposé (> 7j)',
        state: 'ready'
      };
    } else {
      const diffHours = Math.round((now - lastTrainedTime) / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);
      const isRested = diffHours >= 48;
      const isOptimal = diffHours >= 72;

      let label = `${diffHours}h`;
      if (diffDays >= 2) label = `${diffDays} jours`;

      status[muscle] = {
        hoursAgo: diffHours,
        daysAgo: diffDays,
        isRested,
        isOptimal,
        label,
        state: isOptimal ? 'optimal' : isRested ? 'ready' : 'recovering',
        lastWorkoutName
      };
    }
  });

  return status;
}

/**
 * Suggestion automatique intelligente de la prochaine séance basée sur la récupération
 */
export function generateSmartWorkoutSuggestion(recoveryStatus) {
  // Score par typologie de séance
  const chestHours = recoveryStatus['Pectoraux']?.hoursAgo ?? 999;
  const backHours = recoveryStatus['Dos']?.hoursAgo ?? 999;
  const legsHours = recoveryStatus['Jambes']?.hoursAgo ?? 999;
  const shouldersHours = recoveryStatus['Épaules']?.hoursAgo ?? 999;

  // Calcul du score de repos
  const pushScore = (chestHours + shouldersHours) / 2;
  const pullScore = backHours;
  const legsScore = legsHours;

  let suggestedRoutineId = 'routine-push';
  let title = 'PUSH DESTRUCTION';
  let target = 'Pectoraux / Épaules / Triceps';
  let reason = `Pectoraux au repos depuis ${recoveryStatus['Pectoraux']?.label || 'longtemps'}. Prêt pour une séance lourde.`;

  if (legsScore >= pushScore && legsScore >= pullScore && legsScore >= 48) {
    suggestedRoutineId = 'routine-legs';
    title = 'LEGS TORTURE';
    target = 'Quadriceps / Ischios / Fessiers';
    reason = `Jambes pleinement régénérées (${recoveryStatus['Jambes']?.label} de repos). Énergie maximale disponible.`;
  } else if (pullScore >= pushScore && pullScore >= 48) {
    suggestedRoutineId = 'routine-pull';
    title = 'PULL HARDCORE';
    target = 'Dos / Biceps / Arrière Épaules';
    reason = `Chaîne dorsale prête (${recoveryStatus['Dos']?.label} de repos). Surcharge progressive activée.`;
  }

  return {
    routineId: suggestedRoutineId,
    title,
    target,
    reason,
    pushScore,
    pullScore,
    legsScore
  };
}
