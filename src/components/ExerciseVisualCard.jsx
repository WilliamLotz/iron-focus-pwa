import React, { useState } from 'react';
import { Play, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import AnatomySVG from './AnatomySVG';
import { EXERCISE_GIFS } from '../data/exerciseGifs';

export default function ExerciseVisualCard({ exercise }) {
  const [activeTab, setActiveTab] = useState('anatomy'); // 'anatomy' | 'animation'
  const [gifLoaded, setGifLoaded] = useState(false);
  const [gifError, setGifError] = useState(false);

  const gifUrl = EXERCISE_GIFS[exercise.id];

  return (
    <div className="w-full bg-[#0D0D0D] border border-[#262626] overflow-hidden">
      {/* Sélecteur de vue : 1 (Anatomie) & 2 (Animation Réelle) */}
      <div className="grid grid-cols-2 border-b border-[#262626]">
        <button
          type="button"
          onClick={() => setActiveTab('anatomy')}
          className={`py-2 px-2 text-[10px] font-mono font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'anatomy'
              ? 'bg-[#1C1C1C] text-white border-b-2 border-[#EF4444]'
              : 'bg-[#0D0D0D] text-[#737373] hover:text-[#BBB]'
          }`}
        >
          <Sparkles size={12} className={activeTab === 'anatomy' ? 'text-[#EF4444]' : ''} />
          ANATOMIE & CIBLES
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('animation')}
          className={`py-2 px-2 text-[10px] font-mono font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'animation'
              ? 'bg-[#1C1C1C] text-white border-b-2 border-[#EF4444]'
              : 'bg-[#0D0D0D] text-[#737373] hover:text-[#BBB]'
          }`}
        >
          <Play size={12} fill={activeTab === 'animation' ? '#EF4444' : 'currentColor'} className={activeTab === 'animation' ? 'text-[#EF4444]' : ''} />
          ANIMATION RÉELLE
        </button>
      </div>

      {/* VUE 1 : ANATOMIE CIBLÉE & REPERES DE COACH */}
      {activeTab === 'anatomy' && (
        <div className="p-3 space-y-3">
          {/* Schéma anatomique compact avec surbrillance musculaire */}
          <div className="w-full bg-[#0A0A0A] border border-[#1F1F1F] p-2 flex justify-center">
            <AnatomySVG anatomyKeys={exercise.anatomyKeys || { primary: [], secondary: [] }} compact={true} />
          </div>

          {/* Badges de coaching technique */}
          <div className="space-y-2">
            {/* Cibles musculaires */}
            <div className="bg-[#141414] border-l-2 border-[#EF4444] p-2">
              <div className="text-[9px] font-mono text-[#EF4444] font-black tracking-widest uppercase mb-0.5">
                // MUSCLES SOLLICITÉS
              </div>
              <div className="text-xs font-mono text-white font-bold">
                {exercise.primaryMuscles?.join(', ') || exercise.muscleGroup}
              </div>
              {exercise.secondaryMuscles?.length > 0 && (
                <div className="text-[10px] font-mono text-[#888888] mt-0.5">
                  Synergistes : {exercise.secondaryMuscles.join(', ')}
                </div>
              )}
            </div>

            {/* Exécution stricte */}
            {exercise.execution && (
              <div className="bg-[#141414] border-l-2 border-[#3B82F6] p-2">
                <div className="text-[9px] font-mono text-[#3B82F6] font-black tracking-widest uppercase mb-0.5">
                  // EXÉCUTION TECHNIQUE STRICTE
                </div>
                <div className="text-[11px] font-mono text-[#D4D4D4] leading-relaxed">
                  {exercise.execution}
                </div>
              </div>
            )}

            {/* Biomécanique & Rationale */}
            {exercise.rationale && (
              <div className="bg-[#141414] border-l-2 border-[#22C55E] p-2">
                <div className="text-[9px] font-mono text-[#22C55E] font-black tracking-widest uppercase mb-0.5">
                  // FOCUS BIOMÉCANIQUE
                </div>
                <div className="text-[11px] font-mono text-[#D4D4D4] leading-relaxed">
                  {exercise.rationale}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VUE 2 : ANIMATION RÉELLE DU MOUVEMENT */}
      {activeTab === 'animation' && (
        <div className="p-3">
          <div className="relative bg-[#0A0A0A] border border-[#222222] min-h-[220px] flex flex-col items-center justify-center overflow-hidden">
            {gifUrl && !gifError ? (
              <>
                {!gifLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0A0A] z-10 gap-2">
                    <RefreshCw size={18} className="animate-spin text-[#EF4444]" />
                    <span className="text-[10px] font-mono text-[#888888] uppercase tracking-wider">
                      Chargement de l'animation...
                    </span>
                  </div>
                )}
                <img
                  src={gifUrl}
                  alt={exercise.name}
                  loading="lazy"
                  onLoad={() => setGifLoaded(true)}
                  onError={() => setGifError(true)}
                  className={`w-full max-h-64 object-contain transition-opacity duration-300 ${gifLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
                <div className="w-full bg-[#111111] border-t border-[#1C1C1C] px-2.5 py-1 flex items-center justify-between text-[9px] font-mono text-[#737373]">
                  <span>// DÉMONSTRATION EN BOUCLE</span>
                  <span className="text-[#EF4444] font-bold uppercase">{exercise.equipment}</span>
                </div>
              </>
            ) : (
              <div className="p-4 text-center space-y-2">
                <AlertCircle size={20} className="text-[#EF4444] mx-auto" />
                <p className="text-xs font-mono text-white uppercase font-bold">
                  Animation hors-ligne indisponible
                </p>
                <p className="text-[10px] font-mono text-[#888]">
                  Consultez la fiche anatomique vectorielle pour voir la technique.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('anatomy')}
                  className="bg-[#1C1C1C] border border-[#333] hover:border-[#EF4444] text-white px-3 py-1 text-[10px] font-mono uppercase cursor-pointer"
                >
                  Voir l'anatomie
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
