import React from 'react';

/**
 * Composant de schéma SVG anatomique dynamique
 * Met en surbrillance rouge (#EF4444) les muscles principaux
 * et en orange (#F97316) les muscles secondaires.
 */
export default function AnatomySVG({ anatomyKeys = { primary: [], secondary: [] }, compact = false }) {
  const primaryKeys = anatomyKeys.primary || [];
  const secondaryKeys = anatomyKeys.secondary || [];

  const getColor = (key) => {
    if (primaryKeys.includes(key)) return '#EF4444'; // Rouge intense
    if (secondaryKeys.includes(key)) return '#F97316'; // Orange vif
    return '#262626'; // Gris sombre inactif
  };

  const getOpacity = (key) => {
    if (primaryKeys.includes(key)) return '1';
    if (secondaryKeys.includes(key)) return '0.9';
    return '0.35';
  };

  return (
    <div className={`w-full bg-[#111111] border border-[#262626] p-3 ${compact ? 'py-2' : 'py-4'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-mono tracking-widest text-textMuted uppercase">// BIOMÉCANIQUE CIBLÉE</span>
        <div className="flex items-center gap-3 text-[10px] font-mono">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-[#EF4444] inline-block"></span>
            <span className="text-white">PRINCIPAL</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 bg-[#F97316] inline-block"></span>
            <span className="text-white">SECONDAIRE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center">
        {/* VUE ANTERIEURE (FACE) */}
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-mono tracking-wider text-textMuted mb-1">VUE FACE</span>
          <svg
            viewBox="0 0 100 180"
            className={`${compact ? 'h-36' : 'h-48'} w-auto`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Tête */}
            <circle cx="50" cy="14" r="8" fill="#1C1C1C" stroke="#333" strokeWidth="1" />
            {/* Cou */}
            <rect x="46" y="22" width="8" height="6" fill="#1C1C1C" />

            {/* Trapèzes antérieurs */}
            <polygon
              points="44,24 50,28 40,32 36,28"
              fill={getColor('traps')}
              opacity={getOpacity('traps')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="56,24 50,28 60,32 64,28"
              fill={getColor('traps')}
              opacity={getOpacity('traps')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Deltoïdes antérieurs (Épaules face) */}
            <polygon
              points="28,28 38,28 35,42 25,38"
              fill={getColor('front_delts')}
              opacity={getOpacity('front_delts')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="72,28 62,28 65,42 75,38"
              fill={getColor('front_delts')}
              opacity={getOpacity('front_delts')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Deltoïdes moyens (Côté épaules) */}
            <polygon
              points="24,32 28,28 25,44 20,40"
              fill={getColor('side_delts')}
              opacity={getOpacity('side_delts')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="76,32 72,28 75,44 80,40"
              fill={getColor('side_delts')}
              opacity={getOpacity('side_delts')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Pectoraux Hauts (Claviculaire) */}
            <polygon
              points="38,28 50,30 50,35 37,34"
              fill={getColor('chest_upper')}
              opacity={getOpacity('chest_upper')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="62,28 50,30 50,35 63,34"
              fill={getColor('chest_upper')}
              opacity={getOpacity('chest_upper')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Pectoraux Moyens / Bas */}
            <polygon
              points="37,34 50,35 50,46 36,44"
              fill={getColor('chest_mid')}
              opacity={getOpacity('chest_mid')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="63,34 50,35 50,46 64,44"
              fill={getColor('chest_mid')}
              opacity={getOpacity('chest_mid')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Biceps */}
            <polygon
              points="24,42 32,42 30,58 22,56"
              fill={getColor('biceps')}
              opacity={getOpacity('biceps')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="76,42 68,42 70,58 78,56"
              fill={getColor('biceps')}
              opacity={getOpacity('biceps')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Avant-bras face */}
            <polygon
              points="22,58 30,58 28,78 20,74"
              fill={getColor('forearms')}
              opacity={getOpacity('forearms')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="78,58 70,58 72,78 80,74"
              fill={getColor('forearms')}
              opacity={getOpacity('forearms')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Abdominaux (Grand droit) */}
            <rect
              x="44"
              y="48"
              width="5.5"
              height="8"
              fill={getColor('abs')}
              opacity={getOpacity('abs')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <rect
              x="50.5"
              y="48"
              width="5.5"
              height="8"
              fill={getColor('abs')}
              opacity={getOpacity('abs')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <rect
              x="44"
              y="57"
              width="5.5"
              height="8"
              fill={getColor('abs')}
              opacity={getOpacity('abs')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <rect
              x="50.5"
              y="57"
              width="5.5"
              height="8"
              fill={getColor('abs')}
              opacity={getOpacity('abs')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <rect
              x="44"
              y="66"
              width="5.5"
              height="8"
              fill={getColor('abs')}
              opacity={getOpacity('abs')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <rect
              x="50.5"
              y="66"
              width="5.5"
              height="8"
              fill={getColor('abs')}
              opacity={getOpacity('abs')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Obliques */}
            <polygon
              points="38,48 43,48 43,72 37,68"
              fill={getColor('obliques')}
              opacity={getOpacity('obliques')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="62,48 57,48 57,72 63,68"
              fill={getColor('obliques')}
              opacity={getOpacity('obliques')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Bassin */}
            <polygon points="36,74 64,74 58,84 42,84" fill="#1C1C1C" stroke="#333" strokeWidth="0.5" />

            {/* Quadriceps */}
            <polygon
              points="37,84 49,84 46,122 36,120"
              fill={getColor('quads')}
              opacity={getOpacity('quads')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="63,84 51,84 54,122 64,120"
              fill={getColor('quads')}
              opacity={getOpacity('quads')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Genoux */}
            <circle cx="41" cy="124" r="3" fill="#1C1C1C" stroke="#333" strokeWidth="0.5" />
            <circle cx="59" cy="124" r="3" fill="#1C1C1C" stroke="#333" strokeWidth="0.5" />

            {/* Mollets face */}
            <polygon
              points="37,128 45,128 44,160 38,160"
              fill={getColor('calves')}
              opacity={getOpacity('calves')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="63,128 55,128 56,160 62,160"
              fill={getColor('calves')}
              opacity={getOpacity('calves')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Pieds */}
            <rect x="35" y="162" width="10" height="4" fill="#1C1C1C" stroke="#333" strokeWidth="0.5" />
            <rect x="55" y="162" width="10" height="4" fill="#1C1C1C" stroke="#333" strokeWidth="0.5" />
          </svg>
        </div>

        {/* VUE POSTERIEURE (DOS) */}
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-mono tracking-wider text-textMuted mb-1">VUE DOS</span>
          <svg
            viewBox="0 0 100 180"
            className={`${compact ? 'h-36' : 'h-48'} w-auto`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Tête dos */}
            <circle cx="50" cy="14" r="8" fill="#1C1C1C" stroke="#333" strokeWidth="1" />
            {/* Cou */}
            <rect x="46" y="22" width="8" height="6" fill="#1C1C1C" />

            {/* Trapèzes dos */}
            <polygon
              points="50,24 62,28 56,44 50,48 44,44 38,28"
              fill={getColor('traps')}
              opacity={getOpacity('traps')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Deltoïdes postérieurs (Arrière épaules) */}
            <polygon
              points="28,28 37,28 34,42 24,38"
              fill={getColor('rear_delts')}
              opacity={getOpacity('rear_delts')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="72,28 63,28 66,42 76,38"
              fill={getColor('rear_delts')}
              opacity={getOpacity('rear_delts')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Triceps */}
            <polygon
              points="23,40 31,42 29,58 21,56"
              fill={getColor('triceps')}
              opacity={getOpacity('triceps')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="77,40 69,42 71,58 79,56"
              fill={getColor('triceps')}
              opacity={getOpacity('triceps')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Avant-bras dos */}
            <polygon
              points="21,58 29,58 27,78 19,74"
              fill={getColor('forearms')}
              opacity={getOpacity('forearms')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="79,58 71,58 73,78 81,74"
              fill={getColor('forearms')}
              opacity={getOpacity('forearms')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Rhomboïdes / Milieu du dos */}
            <polygon
              points="44,44 56,44 54,58 46,58"
              fill={getColor('mid_back')}
              opacity={getOpacity('mid_back')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Grands Dorsaux (Lats) */}
            <polygon
              points="34,42 44,44 46,68 36,66"
              fill={getColor('lats')}
              opacity={getOpacity('lats')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="66,42 56,44 54,68 64,66"
              fill={getColor('lats')}
              opacity={getOpacity('lats')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Lombaires (Bas du dos) */}
            <polygon
              points="46,60 54,60 56,74 44,74"
              fill={getColor('lower_back')}
              opacity={getOpacity('lower_back')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Fessiers (Glutes) */}
            <polygon
              points="37,74 49,74 48,94 36,92"
              fill={getColor('glutes')}
              opacity={getOpacity('glutes')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="63,74 51,74 52,94 64,92"
              fill={getColor('glutes')}
              opacity={getOpacity('glutes')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Ischio-jambiers */}
            <polygon
              points="36,94 48,94 46,122 36,120"
              fill={getColor('hamstrings')}
              opacity={getOpacity('hamstrings')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="64,94 52,94 54,122 64,120"
              fill={getColor('hamstrings')}
              opacity={getOpacity('hamstrings')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Mollets dos */}
            <polygon
              points="36,126 46,126 43,158 37,158"
              fill={getColor('calves')}
              opacity={getOpacity('calves')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />
            <polygon
              points="64,126 54,126 57,158 63,158"
              fill={getColor('calves')}
              opacity={getOpacity('calves')}
              stroke="#0A0A0A"
              strokeWidth="0.5"
            />

            {/* Talons */}
            <rect x="35" y="160" width="10" height="4" fill="#1C1C1C" stroke="#333" strokeWidth="0.5" />
            <rect x="55" y="160" width="10" height="4" fill="#1C1C1C" stroke="#333" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
