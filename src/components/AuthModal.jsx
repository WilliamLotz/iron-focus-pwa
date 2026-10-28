import React, { useState } from 'react';
import { X, Download, Upload, RefreshCw, LogIn, UserPlus, LogOut, Check, AlertCircle } from 'lucide-react';
import {
  getCurrentUser,
  registerUser,
  loginUser,
  loginDemoUser,
  logoutUser,
  resetDemoData,
  exportUserData,
  importUserData
} from '../services/storage';

export default function AuthModal({ isOpen, onClose, onUserChanged }) {
  const [tab, setTab] = useState('profile'); // 'profile' | 'login' | 'register'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const currentUser = getCurrentUser();

  if (!isOpen) return null;

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      if (!username || !email || !password) {
        setErrorMsg('Veuillez remplir tous les champs.');
        return;
      }
      const user = registerUser(username, email, password);
      setSuccessMsg(`Compte créé avec succès ! Bienvenue ${user.username}.`);
      onUserChanged();
      setTimeout(() => {
        setTab('profile');
        setSuccessMsg('');
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message || 'Erreur lors de l’inscription.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    try {
      if (!email || !password) {
        setErrorMsg('Identifiant et mot de passe requis.');
        return;
      }
      loginUser(email, password);
      setSuccessMsg('Connexion réussie !');
      onUserChanged();
      setTimeout(() => {
        setTab('profile');
        setSuccessMsg('');
        onClose();
      }, 900);
    } catch (err) {
      setErrorMsg(err.message || 'Identifiants invalides.');
    }
  };

  const handleDemoLogin = () => {
    setErrorMsg('');
    loginDemoUser();
    onUserChanged();
    setSuccessMsg('Compte Démo Alex chargé !');
    setTimeout(() => {
      setTab('profile');
      setSuccessMsg('');
      onClose();
    }, 800);
  };

  const handleResetDemo = () => {
    if (window.confirm('Voulez-vous réinitialiser les 3 semaines d’historique du compte démo ?')) {
      resetDemoData();
      onUserChanged();
      setSuccessMsg('Données de démo réinitialisées avec succès !');
      setTimeout(() => setSuccessMsg(''), 2000);
    }
  };

  const handleExport = () => {
    exportUserData();
    setSuccessMsg('Fichier JSON exporté avec succès.');
    setTimeout(() => setSuccessMsg(''), 2000);
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        importUserData(content);
        onUserChanged();
        setSuccessMsg('Sauvegarde importée avec succès !');
        setTimeout(() => setSuccessMsg(''), 2500);
      } catch (err) {
        setErrorMsg(err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-[#262626] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* En-tête */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-[#262626]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#EF4444] inline-block"></span>
            <span className="font-mono text-xs font-black tracking-widest uppercase text-white">
              GESTION UTILISATEUR & DONNÉES
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-white p-1 hover:bg-[#262626]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Onglets */}
        <div className="grid grid-cols-3 bg-[#0F0F0F] border-b border-[#262626] font-mono text-[11px] font-bold">
          <button
            onClick={() => { setTab('profile'); setErrorMsg(''); }}
            className={`py-2.5 px-1 uppercase tracking-wider transition-colors ${
              tab === 'profile' ? 'bg-[#181818] text-white border-b-2 border-[#EF4444]' : 'text-[#888] hover:text-white'
            }`}
          >
            PROFIL
          </button>
          <button
            onClick={() => { setTab('login'); setErrorMsg(''); }}
            className={`py-2.5 px-1 uppercase tracking-wider transition-colors ${
              tab === 'login' ? 'bg-[#181818] text-white border-b-2 border-[#EF4444]' : 'text-[#888] hover:text-white'
            }`}
          >
            CONNEXION
          </button>
          <button
            onClick={() => { setTab('register'); setErrorMsg(''); }}
            className={`py-2.5 px-1 uppercase tracking-wider transition-colors ${
              tab === 'register' ? 'bg-[#181818] text-white border-b-2 border-[#EF4444]' : 'text-[#888] hover:text-white'
            }`}
          >
            INSCRIPTION
          </button>
        </div>

        {/* Notifications */}
        {errorMsg && (
          <div className="mx-4 mt-3 p-2 bg-[#2D0F0F] border border-[#EF4444] text-[#EF4444] text-xs font-mono flex items-center gap-2">
            <AlertCircle size={15} />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="mx-4 mt-3 p-2 bg-[#0F2D14] border border-[#22C55E] text-[#22C55E] text-xs font-mono flex items-center gap-2">
            <Check size={15} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Corps du modal */}
        <div className="p-4 overflow-y-auto space-y-4">
          {tab === 'profile' && (
            <div className="space-y-4">
              <div className="bg-[#141414] border border-[#262626] p-4">
                <span className="text-[10px] font-mono text-[#737373] tracking-widest block mb-1 uppercase">
                  COMPTE CONNECTÉ
                </span>
                <div className="text-lg font-mono font-black text-white uppercase tracking-wider">
                  {currentUser?.username || 'ATHLÈTE ANONYME'}
                </div>
                <div className="text-xs font-mono text-textMuted mt-0.5">
                  {currentUser?.email || 'Mode local autonome'}
                </div>
                <div className="text-[10px] font-mono text-[#555] mt-2">
                  ID: {currentUser?.id || 'LOCAL-001'}
                </div>
              </div>

              {/* Sauvegarde & Persistance */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-[#737373] uppercase block">
                  // SAUVEGARDE & PERSISTANCE (100% OFFLINE)
                </span>

                <button
                  onClick={handleExport}
                  className="w-full flex items-center justify-between bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626] hover:border-white p-3 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Download size={16} className="text-[#EF4444]" />
                    <div>
                      <div className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                        EXPORTER LES DONNÉES (JSON)
                      </div>
                      <div className="text-[10px] text-[#737373]">
                        Télécharger une sauvegarde complète de vos séances
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#888]">&gt;</span>
                </button>

                <label className="w-full flex items-center justify-between bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626] hover:border-white p-3 text-left cursor-pointer transition-colors">
                  <div className="flex items-center gap-2.5">
                    <Upload size={16} className="text-[#22C55E]" />
                    <div>
                      <div className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                        IMPORTER UNE SAUVEGARDE (JSON)
                      </div>
                      <div className="text-[10px] text-[#737373]">
                        Restaurer un fichier JSON exporté précédemment
                      </div>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportFile}
                    className="hidden"
                  />
                  <span className="text-xs font-mono text-[#888]">&gt;</span>
                </label>

                {currentUser?.id === 'user-demo-alex' && (
                  <button
                    onClick={handleResetDemo}
                    className="w-full flex items-center justify-between bg-[#141414] hover:bg-[#1C1C1C] border border-[#262626] hover:border-[#EF4444] p-3 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <RefreshCw size={16} className="text-[#F97316]" />
                      <div>
                        <div className="text-xs font-mono font-bold uppercase text-white tracking-wider">
                          RÉINITIALISER LES 3 SEMAINES DÉMO
                        </div>
                        <div className="text-[10px] text-[#737373]">
                          Recharger l'historique complet initial
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#888]">&gt;</span>
                  </button>
                )}
              </div>

              {/* Actions de session */}
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    logoutUser();
                    onUserChanged();
                    setTab('login');
                  }}
                  className="flex-1 bg-[#141414] border border-[#262626] hover:border-[#EF4444] text-white hover:text-[#EF4444] py-2.5 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <LogOut size={14} />
                  DÉCONNEXION
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-[#EF4444] hover:bg-[#DC2626] text-white py-2.5 text-xs font-mono font-black uppercase tracking-wider"
                >
                  FERMER
                </button>
              </div>
            </div>
          )}

          {tab === 'login' && (
            <div className="space-y-4">
              <button
                onClick={handleDemoLogin}
                className="w-full bg-[#181818] border-2 border-[#EF4444] text-white hover:bg-[#EF4444] py-3 px-4 font-mono font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <LogIn size={16} />
                CHARGER LE COMPTE DÉMO (ALEX // 3 SEMAINES D'HISTORIQUE)
              </button>

              <div className="flex items-center gap-2 my-2">
                <div className="flex-1 h-[1px] bg-[#262626]"></div>
                <span className="text-[10px] font-mono text-[#737373] uppercase tracking-wider">OU IDENTIFIANTS</span>
                <div className="flex-1 h-[1px] bg-[#262626]"></div>
              </div>

              <form onSubmit={handleLogin} className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
                    EMAIL OU IDENTIFIANT
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@ironfocus.com"
                    className="w-full bg-[#141414] border border-[#262626] focus:border-[#EF4444] text-white px-3 py-2 text-sm font-mono outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
                    MOT DE PASSE
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#141414] border border-[#262626] focus:border-[#EF4444] text-white px-3 py-2 text-sm font-mono outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white py-2.5 text-xs font-mono font-black uppercase tracking-wider mt-2"
                >
                  SE CONNECTER
                </button>
              </form>
            </div>
          )}

          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3">
              <div>
                <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
                  NOM D'ATHLÈTE / PSEUDO
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="VIKTOR // BEAST"
                  className="w-full bg-[#141414] border border-[#262626] focus:border-[#EF4444] text-white px-3 py-2 text-sm font-mono outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
                  ADRESSE EMAIL
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="viktor@hardcore.gym"
                  className="w-full bg-[#141414] border border-[#262626] focus:border-[#EF4444] text-white px-3 py-2 text-sm font-mono outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-[#737373] tracking-widest block uppercase mb-1">
                  MOT DE PASSE
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#141414] border border-[#262626] focus:border-[#EF4444] text-white px-3 py-2 text-sm font-mono outline-none"
                />
              </div>

              <div className="bg-[#141414] border border-[#262626] p-2 text-[10px] font-mono text-[#737373]">
                * Compte vierge instantané avec les 18 exercices pré-chargés et persistance locale isolée.
              </div>

              <button
                type="submit"
                className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white py-2.5 text-xs font-mono font-black uppercase tracking-wider flex items-center justify-center gap-2 mt-2"
              >
                <UserPlus size={15} />
                CRÉER MON COMPTE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
