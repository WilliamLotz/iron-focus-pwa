import { DEFAULT_EXERCISES } from '../data/exercisesData';
import { PRESET_WORKOUTS } from '../data/presetWorkouts';
import { generateDemoHistory } from '../data/demoData';

const STORAGE_KEYS = {
  USERS: 'ironfocus_users',
  CURRENT_USER_ID: 'ironfocus_current_user_id',
  USER_DATA_PREFIX: 'ironfocus_data_'
};

const DEMO_USER_ID = 'user-demo-alex';

// Initialisation globale si première visite
export function initializeStorage() {
  if (typeof window === 'undefined') return;

  const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
  let users = usersJson ? JSON.parse(usersJson) : [];

  const demoUserExists = users.some(u => u.id === DEMO_USER_ID);

  if (!demoUserExists) {
    const demoUser = {
      id: DEMO_USER_ID,
      username: 'ALEX // PRO ATHLETE',
      email: 'alex@ironfocus.com',
      password: 'demo',
      createdAt: new Date().toISOString()
    };
    users.push(demoUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Créer les données du compte de démo avec l'historique complet de 3 semaines
    const demoData = {
      exercises: DEFAULT_EXERCISES,
      workouts: PRESET_WORKOUTS,
      history: generateDemoHistory(),
      activeWorkout: null,
      settings: {
        soundEnabled: true,
        vibrateEnabled: true,
        defaultRestSeconds: 90
      }
    };
    localStorage.setItem(STORAGE_KEYS.USER_DATA_PREFIX + DEMO_USER_ID, JSON.stringify(demoData));
  }

  // Si aucun utilisateur actif, activer le compte de démo par défaut
  let currentUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
  if (!currentUserId || !users.some(u => u.id === currentUserId)) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, DEMO_USER_ID);
  }
}

// Récupérer l'utilisateur connecté actuellement
export function getCurrentUser() {
  initializeStorage();
  const currentUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  return users.find(u => u.id === currentUserId) || users[0] || null;
}

// Récupérer toutes les données de l'utilisateur actif
export function getUserData(userId = null) {
  const targetId = userId || getCurrentUser()?.id || DEMO_USER_ID;
  const raw = localStorage.getItem(STORAGE_KEYS.USER_DATA_PREFIX + targetId);
  if (!raw) {
    const defaultData = {
      exercises: DEFAULT_EXERCISES,
      workouts: PRESET_WORKOUTS,
      history: [],
      activeWorkout: null,
      settings: { soundEnabled: true, vibrateEnabled: true, defaultRestSeconds: 90 }
    };
    localStorage.setItem(STORAGE_KEYS.USER_DATA_PREFIX + targetId, JSON.stringify(defaultData));
    return defaultData;
  }
  try {
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.exercises)) {
      const existingIds = new Set(parsed.exercises.map(e => e.id));
      const missingDefaults = DEFAULT_EXERCISES.filter(e => !existingIds.has(e.id));
      if (missingDefaults.length > 0) {
        parsed.exercises = [...parsed.exercises, ...missingDefaults];
        localStorage.setItem(STORAGE_KEYS.USER_DATA_PREFIX + targetId, JSON.stringify(parsed));
      }
    }
    return parsed;
  } catch (e) {
    console.error('Erreur lecture données', e);
    return {
      exercises: DEFAULT_EXERCISES,
      workouts: PRESET_WORKOUTS,
      history: [],
      activeWorkout: null,
      settings: { soundEnabled: true, vibrateEnabled: true, defaultRestSeconds: 90 }
    };
  }
}

// Sauvegarder les données de l'utilisateur actif
export function saveUserData(data, userId = null) {
  const targetId = userId || getCurrentUser()?.id || DEMO_USER_ID;
  localStorage.setItem(STORAGE_KEYS.USER_DATA_PREFIX + targetId, JSON.stringify(data));
}

// Inscription d'un nouvel utilisateur
export function registerUser(username, email, password) {
  initializeStorage();
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const normalizedEmail = email.trim().toLowerCase();

  if (users.some(u => u.email.toLowerCase() === normalizedEmail)) {
    throw new Error('Un compte existe déjà avec cette adresse email.');
  }

  const newUser = {
    id: 'user-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    username: username.trim().toUpperCase(),
    email: normalizedEmail,
    password: password, // En local/offline
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

  // Initialiser les données vierges avec le catalogue d'exercices et routines
  const initialData = {
    exercises: DEFAULT_EXERCISES,
    workouts: PRESET_WORKOUTS,
    history: [],
    activeWorkout: null,
    settings: {
      soundEnabled: true,
      vibrateEnabled: true,
      defaultRestSeconds: 90
    }
  };

  localStorage.setItem(STORAGE_KEYS.USER_DATA_PREFIX + newUser.id, JSON.stringify(initialData));
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, newUser.id);

  return newUser;
}

// Connexion d'un utilisateur existant
export function loginUser(emailOrUsername, password) {
  initializeStorage();
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const input = emailOrUsername.trim().toLowerCase();

  const user = users.find(u => 
    (u.email.toLowerCase() === input || u.username.toLowerCase() === input) &&
    u.password === password
  );

  if (!user) {
    throw new Error('Identifiant ou mot de passe incorrect.');
  }

  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, user.id);
  return user;
}

// Connexion directe en mode Démo
export function loginDemoUser() {
  initializeStorage();
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, DEMO_USER_ID);
  return getCurrentUser();
}

// Déconnexion
export function logoutUser() {
  // On ne supprime pas les données, on bascule en mode anonyme ou sur le premier utilisateur
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
}

// Réinitialiser les données de démo
export function resetDemoData() {
  const demoData = {
    exercises: DEFAULT_EXERCISES,
    workouts: PRESET_WORKOUTS,
    history: generateDemoHistory(),
    activeWorkout: null,
    settings: {
      soundEnabled: true,
      vibrateEnabled: true,
      defaultRestSeconds: 90
    }
  };
  localStorage.setItem(STORAGE_KEYS.USER_DATA_PREFIX + DEMO_USER_ID, JSON.stringify(demoData));
  return demoData;
}

// Exportation des données JSON de l'utilisateur actif
export function exportUserData() {
  const user = getCurrentUser();
  const data = getUserData();
  const payload = {
    app: 'IRON FOCUS PWA',
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    user: {
      id: user?.id,
      username: user?.username,
      email: user?.email
    },
    data
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `IRON_FOCUS_BACKUP_${user?.username?.replace(/\s+/g, '_') || 'USER'}_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Importation de données JSON
export function importUserData(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed.data || !Array.isArray(parsed.data.exercises)) {
      throw new Error('Fichier JSON invalide ou structure incompatible.');
    }
    const currentUserId = getCurrentUser()?.id || DEMO_USER_ID;
    saveUserData(parsed.data, currentUserId);
    return parsed.data;
  } catch (err) {
    throw new Error('Échec de la lecture du fichier : ' + err.message);
  }
}
