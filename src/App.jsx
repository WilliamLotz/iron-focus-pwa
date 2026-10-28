import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import HomeView from './views/HomeView';
import WorkoutsView from './views/WorkoutsView';
import LiveView from './views/LiveView';
import ExercisesView from './views/ExercisesView';
import StatsView from './views/StatsView';
import {
  getCurrentUser,
  getUserData,
  saveUserData
} from './services/storage';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [userData, setUserData] = useState(() => getUserData());
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Synchronisation lors du changement d'utilisateur
  const handleUserChanged = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    const data = getUserData(user?.id);
    setUserData(data);
  };

  // Sauvegarde automatique des données utilisateur
  const updateUserDataState = (updater) => {
    setUserData(prev => {
      const nextData = typeof updater === 'function' ? updater(prev) : updater;
      saveUserData(nextData, currentUser?.id);
      return nextData;
    });
  };

  // Lancement d'une séance à partir d'un programme
  const handleStartWorkout = (routine) => {
    const sessionExercises = routine.exercises.map(item => {
      const exObj = userData.exercises.find(e => e.id === item.exerciseId);
      const numSets = item.targetSets || 3;
      const defaultWeight = exObj?.defaultWeight || 20;

      // Créer les séries pré-remplies
      const sets = Array.from({ length: numSets }, (_, i) => ({
        setNumber: i + 1,
        weight: defaultWeight,
        reps: exObj?.maxReps || 10,
        completed: false
      }));

      return {
        exerciseId: item.exerciseId,
        name: exObj?.name || 'Exercice',
        restSeconds: item.restSeconds || exObj?.restSeconds || 90,
        sets
      };
    });

    const newActiveSession = {
      routineId: routine.id,
      name: routine.name,
      startedAt: new Date().toISOString(),
      elapsedSeconds: 0,
      exercises: sessionExercises
    };

    updateUserDataState(prev => ({
      ...prev,
      activeWorkout: newActiveSession
    }));

    setActiveTab('live');
  };

  // Mise à jour de la séance active en temps réel
  const handleUpdateActiveSession = (updater) => {
    updateUserDataState(prev => {
      const updatedActive = typeof updater === 'function' ? updater(prev.activeWorkout) : updater;
      return {
        ...prev,
        activeWorkout: updatedActive
      };
    });
  };

  // Fin de la séance
  const handleFinishWorkout = (summary) => {
    updateUserDataState(prev => ({
      ...prev,
      history: [summary, ...(prev.history || [])],
      activeWorkout: null
    }));
  };

  // Enregistrer ou modifier un programme
  const handleSaveWorkout = (newWorkout) => {
    updateUserDataState(prev => ({
      ...prev,
      workouts: [newWorkout, ...(prev.workouts || [])]
    }));
  };

  // Supprimer un programme
  const handleDeleteWorkout = (workoutId) => {
    updateUserDataState(prev => ({
      ...prev,
      workouts: prev.workouts.filter(w => w.id !== workoutId)
    }));
  };

  // Enregistrer un exercice
  const handleSaveExercise = (newExercise) => {
    updateUserDataState(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }));
  };

  // Supprimer un exercice
  const handleDeleteExercise = (exerciseId) => {
    updateUserDataState(prev => ({
      ...prev,
      exercises: prev.exercises.filter(e => e.id !== exerciseId)
    }));
  };

  // Modifier la charge d'un exercice
  const handleUpdateExerciseWeight = (exerciseId, newWeight) => {
    updateUserDataState(prev => ({
      ...prev,
      exercises: prev.exercises.map(e => {
        if (e.id === exerciseId) {
          return { ...e, defaultWeight: newWeight };
        }
        return e;
      })
    }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col font-sans selection:bg-[#EF4444] selection:text-white">
      {/* Conteneur Mobile centré Dark Brutalist */}
      <div className="w-full max-w-md mx-auto min-h-screen bg-[#0A0A0A] flex flex-col relative shadow-2xl border-x border-[#1C1C1C]">
        {/* En-tête Brutaliste */}
        <Header
          currentUser={currentUser}
          onOpenAuthModal={() => setIsAuthModalOpen(true)}
          activeSession={userData.activeWorkout}
          onGoToLive={() => setActiveTab('live')}
        />

        {/* Corps de vue principal */}
        <main className="flex-1 overflow-x-hidden">
          {activeTab === 'home' && (
            <HomeView
              userData={userData}
              onStartWorkout={handleStartWorkout}
              onSelectRoutine={handleStartWorkout}
              onGoToTab={setActiveTab}
            />
          )}

          {activeTab === 'workouts' && (
            <WorkoutsView
              userData={userData}
              onSaveWorkout={handleSaveWorkout}
              onDeleteWorkout={handleDeleteWorkout}
              onStartWorkout={handleStartWorkout}
            />
          )}

          {activeTab === 'live' && (
            <LiveView
              userData={userData}
              activeSession={userData.activeWorkout}
              onUpdateActiveSession={handleUpdateActiveSession}
              onFinishWorkout={handleFinishWorkout}
              onStartRoutineFromLive={handleStartWorkout}
              onGoToStats={() => setActiveTab('stats')}
            />
          )}

          {activeTab === 'exercises' && (
            <ExercisesView
              userData={userData}
              onSaveExercise={handleSaveExercise}
              onDeleteExercise={handleDeleteExercise}
              onUpdateExerciseWeight={handleUpdateExerciseWeight}
            />
          )}

          {activeTab === 'stats' && (
            <StatsView
              userData={userData}
            />
          )}
        </main>

        {/* Barre de navigation fixe à 5 onglets */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          hasActiveSession={!!userData.activeWorkout}
        />

        {/* Modale d'authentification et gestion de compte */}
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onUserChanged={handleUserChanged}
        />
      </div>
    </div>
  );
}
