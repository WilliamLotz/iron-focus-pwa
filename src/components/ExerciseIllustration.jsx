import React from 'react';

/**
 * ExerciseIllustration - Illustrations SVG Dark Brutalist minimalistes
 * ViewBox: 0 0 320 180
 * Fond: #0F0F0F, Grille: #1A1A1A, Équipement: #262626 / #555, Accent cibles: #EF4444
 */

// Composant d'arrière-plan brutalist commun
const CanvasBg = ({ label }) => (
  <>
    <rect width="320" height="180" fill="#0F0F0F" />
    {/* Grille fine technique */}
    <line x1="0" y1="45" x2="320" y2="45" stroke="#1A1A1A" strokeWidth="1" />
    <line x1="0" y1="90" x2="320" y2="90" stroke="#1A1A1A" strokeWidth="1" />
    <line x1="0" y1="135" x2="320" y2="135" stroke="#1A1A1A" strokeWidth="1" />
    <line x1="80" y1="0" x2="80" y2="180" stroke="#1A1A1A" strokeWidth="1" />
    <line x1="160" y1="0" x2="160" y2="180" stroke="#1A1A1A" strokeWidth="1" />
    <line x1="240" y1="0" x2="240" y2="180" stroke="#1A1A1A" strokeWidth="1" />
    {/* Repère de sol */}
    <line x1="20" y1="145" x2="300" y2="145" stroke="#262626" strokeWidth="1.5" strokeDasharray="4 4" />
    {/* Label bas */}
    {label && (
      <text
        x="160"
        y="166"
        fill="#EF4444"
        fontSize="9.5"
        fontFamily="monospace"
        textAnchor="middle"
        fontWeight="bold"
        letterSpacing="1.5"
      >
        {label}
      </text>
    )}
  </>
);

// Map des illustrations pour chaque exercice
const illustrations = {
  // ==========================================================
  // PECTORAUX (10)
  // ==========================================================
  'ex-1': () => (
    // Développé couché aux haltères
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="PECTORAUX // DÉVELOPPÉ COUCHÉ HALTÈRES" />
      {/* Banc plat */}
      <rect x="70" y="112" width="180" height="10" fill="#222" stroke="#333" strokeWidth="1" />
      <rect x="85" y="122" width="8" height="23" fill="#1C1C1C" />
      <rect x="227" y="122" width="8" height="23" fill="#1C1C1C" />
      {/* Corps allongé */}
      <rect x="90" y="99" width="115" height="13" fill="#888" />
      <circle cx="218" cy="104" r="8" fill="#888" />
      {/* Jambe pliée vers le sol */}
      <polyline points="90,105 75,120 75,145" stroke="#888" strokeWidth="5" strokeLinecap="square" fill="none" />
      {/* Bras poussant les haltères */}
      <line x1="120" y1="102" x2="105" y2="68" stroke="#888" strokeWidth="6" strokeLinecap="square" />
      <line x1="170" y1="102" x2="185" y2="68" stroke="#888" strokeWidth="6" strokeLinecap="square" />
      {/* Haltères en haut */}
      <rect x="92" y="60" width="26" height="8" fill="#444" stroke="#FFF" strokeWidth="0.5" />
      <rect x="172" y="60" width="26" height="8" fill="#444" stroke="#FFF" strokeWidth="0.5" />
      {/* Pectoraux surlignés en rouge */}
      <rect x="125" y="97" width="50" height="15" fill="#EF4444" opacity="0.85" />
    </svg>
  ),

  'ex-2': () => (
    // Développé incliné machine convergente
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="PECTORAUX // INCLINÉ MACHINE CONVERGENTE" />
      {/* Siège incliné */}
      <line x1="110" y1="130" x2="155" y2="70" stroke="#333" strokeWidth="8" strokeLinecap="square" />
      <line x1="100" y1="135" x2="135" y2="135" stroke="#333" strokeWidth="6" />
      {/* Silhouette assise inclinée */}
      <line x1="120" y1="125" x2="150" y2="80" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="70" r="8" fill="#888" />
      {/* Bras poussant vers le haut convergent */}
      <line x1="145" y1="88" x2="195" y2="62" stroke="#888" strokeWidth="6" strokeLinecap="square" />
      {/* Poignées machine & rails */}
      <line x1="195" y1="50" x2="215" y2="85" stroke="#EF4444" strokeWidth="4" />
      <circle cx="195" cy="62" r="5" fill="#EF4444" />
      {/* Haut des pectoraux rouge */}
      <rect x="140" y="80" width="18" height="14" fill="#EF4444" opacity="0.9" />
    </svg>
  ),

  'ex-3': () => (
    // Écarté poulie vis-à-vis / Pec Deck
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="PECTORAUX // ÉCARTÉ POULIE VIS-À-VIS" />
      {/* Colonnes de poulies */}
      <rect x="35" y="30" width="10" height="115" fill="#222" stroke="#333" />
      <rect x="275" y="30" width="10" height="115" fill="#222" stroke="#333" />
      {/* Silhouette debout au centre */}
      <line x1="160" y1="65" x2="160" y2="115" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="52" r="8" fill="#888" />
      <line x1="160" y1="115" x2="148" y2="145" stroke="#888" strokeWidth="5" />
      <line x1="160" y1="115" x2="172" y2="145" stroke="#888" strokeWidth="5" />
      {/* Câbles */}
      <line x1="45" y1="45" x2="140" y2="85" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="275" y1="45" x2="180" y2="85" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
      {/* Bras en arc de cercle convergents */}
      <path d="M 140 85 Q 150 90 160 90" stroke="#888" strokeWidth="5" fill="none" />
      <path d="M 180 85 Q 170 90 160 90" stroke="#888" strokeWidth="5" fill="none" />
      {/* Centre des pectoraux surligné */}
      <rect x="154" y="68" width="12" height="24" fill="#EF4444" opacity="0.9" />
    </svg>
  ),

  'ex-pec-4': () => (
    // Développé couché barre
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="PECTORAUX // DÉVELOPPÉ COUCHÉ BARRE" />
      {/* Chandelles et banc */}
      <rect x="70" y="112" width="180" height="10" fill="#222" stroke="#333" strokeWidth="1" />
      <rect x="195" y="55" width="6" height="60" fill="#2A2A2A" />
      {/* Silhouette allongée */}
      <rect x="90" y="99" width="115" height="13" fill="#888" />
      <circle cx="218" cy="104" r="8" fill="#888" />
      <polyline points="90,105 75,120 75,145" stroke="#888" strokeWidth="5" strokeLinecap="square" fill="none" />
      {/* Bras poussant la barre */}
      <line x1="135" y1="102" x2="125" y2="65" stroke="#888" strokeWidth="6" strokeLinecap="square" />
      <line x1="175" y1="102" x2="185" y2="65" stroke="#888" strokeWidth="6" strokeLinecap="square" />
      {/* Grande barre droite avec disques */}
      <line x1="75" y1="62" x2="235" y2="62" stroke="#D4D4D4" strokeWidth="3" />
      <rect x="70" y="47" width="8" height="30" fill="#EF4444" />
      <rect x="232" y="47" width="8" height="30" fill="#EF4444" />
      {/* Pectoraux surlignés */}
      <rect x="135" y="97" width="45" height="15" fill="#EF4444" opacity="0.85" />
    </svg>
  ),

  'ex-pec-5': () => (
    // Développé décliné barre
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="PECTORAUX // DÉVELOPPÉ DÉCLINÉ BARRE" />
      {/* Banc incliné décliné (tête basse à droite) */}
      <line x1="70" y1="95" x2="230" y2="125" stroke="#333" strokeWidth="9" strokeLinecap="square" />
      <rect x="80" y="95" width="8" height="50" fill="#222" />
      {/* Corps allongé incliné tête vers le bas */}
      <line x1="95" y1="95" x2="195" y2="114" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="210" cy="118" r="8" fill="#888" />
      {/* Bras poussant verticalement */}
      <line x1="145" y1="105" x2="140" y2="60" stroke="#888" strokeWidth="6" />
      <line x1="175" y1="110" x2="170" y2="60" stroke="#888" strokeWidth="6" />
      {/* Barre olympique */}
      <line x1="90" y1="58" x2="220" y2="58" stroke="#D4D4D4" strokeWidth="3" />
      <rect x="85" y="45" width="8" height="26" fill="#EF4444" />
      <rect x="217" y="45" width="8" height="26" fill="#EF4444" />
      {/* Faisceau inférieur pectoral en rouge */}
      <rect x="150" y="102" width="28" height="12" fill="#EF4444" opacity="0.9" />
    </svg>
  ),

  'ex-pec-6': () => (
    // Écarté aux haltères à plat
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="PECTORAUX // ÉCARTÉ HALTÈRES À PLAT" />
      <rect x="70" y="112" width="180" height="10" fill="#222" stroke="#333" strokeWidth="1" />
      <rect x="90" y="99" width="115" height="13" fill="#888" />
      <circle cx="218" cy="104" r="8" fill="#888" />
      {/* Bras ouverts en grand étirement */}
      <path d="M 130 102 Q 100 85 85 80" stroke="#888" strokeWidth="5" fill="none" />
      <path d="M 170 102 Q 200 85 215 80" stroke="#888" strokeWidth="5" fill="none" />
      {/* Haltères aux extrémités */}
      <rect x="75" y="74" width="16" height="12" fill="#444" stroke="#EF4444" strokeWidth="1" />
      <rect x="215" y="74" width="16" height="12" fill="#444" stroke="#EF4444" strokeWidth="1" />
      {/* Étirement max pectoral en rouge */}
      <rect x="120" y="97" width="60" height="15" fill="#EF4444" opacity="0.85" />
    </svg>
  ),

  'ex-pec-7': () => (
    // Dips lestés (parallèles)
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="PECTORAUX // DIPS PARALLÈLES LESTÉS" />
      {/* Barres parallèles */}
      <line x1="80" y1="95" x2="240" y2="95" stroke="#444" strokeWidth="5" />
      <rect x="100" y="95" width="8" height="50" fill="#222" />
      <rect x="220" y="95" width="8" height="50" fill="#222" />
      {/* Corps penché vers l'avant à 30° */}
      <line x1="170" y1="65" x2="150" y2="105" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="178" cy="55" r="8" fill="#888" />
      {/* Bras pliés sur la barre */}
      <polyline points="168,72 170,95 160,95" stroke="#888" strokeWidth="6" strokeLinecap="square" fill="none" />
      {/* Jambes fléchies avec ceinture de lest */}
      <line x1="150" y1="105" x2="160" y2="135" stroke="#888" strokeWidth="6" />
      <rect x="145" y="112" width="12" height="14" fill="#EF4444" />
      {/* Bas du torse en rouge */}
      <rect x="156" y="75" width="14" height="20" fill="#EF4444" opacity="0.85" />
    </svg>
  ),

  'ex-pec-8': () => (
    // Pullover à la poulie
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="PECTORAUX // PULLOVER POULIE HAUTE" />
      {/* Poulie haute à gauche */}
      <rect x="50" y="30" width="8" height="115" fill="#222" />
      <circle cx="54" cy="35" r="6" fill="#EF4444" />
      {/* Câble descendant */}
      <line x1="54" y1="35" x2="150" y2="75" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
      {/* Silhouette penchée bras tendus */}
      <line x1="200" y1="90" x2="180" y2="135" stroke="#888" strokeWidth="6" />
      <line x1="190" y1="85" x2="175" y2="70" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="188" cy="62" r="8" fill="#888" />
      {/* Bras quasi tendus amenant la barre */}
      <line x1="172" y1="72" x2="150" y2="75" stroke="#888" strokeWidth="5" strokeLinecap="square" />
      <circle cx="150" cy="75" r="4" fill="#FFF" />
      {/* Dentelé / Jonction pecs rouge */}
      <rect x="175" y="73" width="12" height="18" fill="#EF4444" opacity="0.9" />
    </svg>
  ),

  'ex-pec-9': () => (
    // Pompes lestées
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="PECTORAUX // POMPES LESTÉES" />
      {/* Corps en planche horizontal */}
      <line x1="90" y1="125" x2="220" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="230" cy="122" r="8" fill="#888" />
      {/* Bras en appui au sol */}
      <polyline points="205,125 195,142 205,142" stroke="#888" strokeWidth="6" strokeLinecap="square" fill="none" />
      {/* Disque de lest sur le haut du dos */}
      <rect x="160" y="112" width="30" height="7" fill="#444" stroke="#FFF" strokeWidth="1" />
      {/* Pectoraux surlignés */}
      <rect x="185" y="123" width="30" height="10" fill="#EF4444" opacity="0.85" />
    </svg>
  ),

  'ex-pec-10': () => (
    // Câble Crossover
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="PECTORAUX // CÂBLE CROSSOVER" />
      {/* Poulies des deux côtés */}
      <circle cx="45" cy="40" r="6" fill="#444" />
      <circle cx="275" cy="40" r="6" fill="#444" />
      {/* Silhouette de face en fente */}
      <line x1="160" y1="65" x2="160" y2="115" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="52" r="8" fill="#888" />
      {/* Câbles se croisant */}
      <line x1="45" y1="40" x2="165" y2="105" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="275" y1="40" x2="155" y2="105" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
      {/* Mains croisées devant le nombril */}
      <circle cx="160" cy="105" r="5" fill="#EF4444" />
      {/* Pectoraux en adduction max rouge */}
      <rect x="154" y="68" width="12" height="26" fill="#EF4444" opacity="0.9" />
    </svg>
  ),

  // ==========================================================
  // DOS (12)
  // ==========================================================
  'ex-4': () => (
    // Tirage vertical poitrine (Lat Pulldown)
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="DOS // TIRAGE VERTICAL POITRINE (LAT PULLDOWN)" />
      {/* Tour & poulie haute */}
      <rect x="158" y="25" width="4" height="40" fill="#333" />
      <circle cx="160" cy="28" r="6" fill="#EF4444" />
      {/* Siège et cale-cuisses */}
      <rect x="145" y="115" width="30" height="8" fill="#222" />
      <rect x="152" y="123" width="8" height="22" fill="#1C1C1C" />
      <rect x="140" y="105" width="10" height="5" fill="#444" />
      {/* Silhouette assise tirant */}
      <line x1="160" y1="75" x2="160" y2="115" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      {/* Bras tirant vers le bas */}
      <line x1="160" y1="75" x2="125" y2="55" stroke="#888" strokeWidth="5" />
      <line x1="160" y1="75" x2="195" y2="55" stroke="#888" strokeWidth="5" />
      {/* Barre large en V */}
      <line x1="110" y1="52" x2="210" y2="52" stroke="#D4D4D4" strokeWidth="3" />
      {/* Grands dorsaux latéraux en rouge éclatant */}
      <polygon points="148,78 154,78 154,105 145,95" fill="#EF4444" />
      <polygon points="172,78 166,78 166,105 175,95" fill="#EF4444" />
    </svg>
  ),

  'ex-5': () => (
    // Rowing machine appui thoracique
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="DOS // ROWING APPUI THORACIQUE" />
      {/* Machine & coussin d'appui */}
      <line x1="170" y1="70" x2="170" y2="125" stroke="#444" strokeWidth="8" />
      <rect x="140" y="120" width="30" height="8" fill="#222" />
      {/* Silhouette torse collé au coussin */}
      <line x1="165" y1="75" x2="160" y2="120" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="168" cy="62" r="8" fill="#888" />
      {/* Bras tirant vers l'arrière coude plié */}
      <polyline points="180,82 205,85 195,85" stroke="#888" strokeWidth="6" strokeLinecap="square" fill="none" />
      {/* Milieu du dos / rhomboïdes en rouge */}
      <rect x="154" y="75" width="10" height="25" fill="#EF4444" opacity="0.9" />
    </svg>
  ),

  'ex-6': () => (
    // Tirage horizontal poulie basse
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="DOS // TIRAGE HORIZONTAL POULIE BASSE" />
      {/* Bloc poulie basse à gauche */}
      <rect x="50" y="80" width="10" height="50" fill="#222" />
      <circle cx="60" cy="110" r="5" fill="#EF4444" />
      {/* Câble tendu */}
      <line x1="60" y1="110" x2="155" y2="98" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
      {/* Silhouette assise dos droit */}
      <line x1="175" y1="80" x2="175" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="175" cy="66" r="8" fill="#888" />
      <line x1="175" y1="125" x2="135" y2="125" stroke="#888" strokeWidth="6" />
      {/* Bras tirant vers le nombril */}
      <polyline points="175,85 190,95 160,98" stroke="#888" strokeWidth="5" strokeLinecap="square" fill="none" />
      {/* Épaisseur dorsale en rouge */}
      <rect x="176" y="80" width="8" height="30" fill="#EF4444" opacity="0.9" />
    </svg>
  ),

  'ex-dos-7': () => (
    // Traction pronation (Pull-up)
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="DOS // TRACTION PRONATION (PULL-UP)" />
      {/* Barre de traction en haut */}
      <line x1="90" y1="35" x2="230" y2="35" stroke="#D4D4D4" strokeWidth="4" />
      {/* Corps suspendu montant */}
      <line x1="160" y1="58" x2="160" y2="108" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="45" r="8" fill="#888" />
      {/* Bras tirant les coudes en bas/arrière */}
      <line x1="120" y1="35" x2="150" y2="60" stroke="#888" strokeWidth="5" />
      <line x1="200" y1="35" x2="170" y2="60" stroke="#888" strokeWidth="5" />
      {/* Jambes croisées suspendues */}
      <line x1="160" y1="108" x2="165" y2="140" stroke="#888" strokeWidth="6" />
      {/* V-Shape Grands dorsaux en rouge vif */}
      <polygon points="148,60 154,60 154,95 142,85" fill="#EF4444" />
      <polygon points="172,60 166,60 166,95 178,85" fill="#EF4444" />
    </svg>
  ),

  'ex-dos-8': () => (
    // Rowing barre pronation
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="DOS // ROWING BARRE PRONATION" />
      {/* Buste penché à 45° */}
      <line x1="170" y1="85" x2="135" y2="70" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="125" cy="65" r="8" fill="#888" />
      {/* Jambes fléchies stables */}
      <polyline points="170,85 180,115 175,145" stroke="#888" strokeWidth="6" fill="none" />
      {/* Bras tirant la barre vers le bas de l'abdomen */}
      <polyline points="145,74 155,90 145,95" stroke="#888" strokeWidth="5" fill="none" />
      {/* Barre avec disques */}
      <line x1="110" y1="95" x2="185" y2="95" stroke="#FFF" strokeWidth="3" />
      <rect x="105" y="83" width="7" height="24" fill="#EF4444" />
      <rect x="183" y="83" width="7" height="24" fill="#EF4444" />
      {/* Dos complet en rouge */}
      <line x1="168" y1="83" x2="138" y2="68" stroke="#EF4444" strokeWidth="6" strokeLinecap="square" />
    </svg>
  ),

  'ex-dos-9': () => (
    // Rowing haltère unilatéral
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="DOS // ROWING HALTÈRE UNILATÉRAL" />
      {/* Banc plat */}
      <rect x="80" y="115" width="160" height="8" fill="#222" stroke="#333" />
      {/* Appui genou et main gauche */}
      <polyline points="105,115 105,85" stroke="#888" strokeWidth="5" />
      <rect x="110" y="80" width="85" height="11" fill="#888" />
      <circle cx="95" cy="78" r="7" fill="#888" />
      {/* Bras droit tirant l'haltère vers la hanche */}
      <polyline points="160,85 175,70 170,90" stroke="#888" strokeWidth="5" fill="none" />
      <rect x="162" y="88" width="16" height="8" fill="#444" stroke="#FFF" strokeWidth="0.5" />
      {/* Dorsal droit contracté en rouge */}
      <rect x="140" y="78" width="35" height="8" fill="#EF4444" opacity="0.9" />
    </svg>
  ),

  'ex-dos-10': () => (
    // Face Pull
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="DOS // FACE PULL POULIE HAUTE" />
      {/* Poulie haute à gauche */}
      <circle cx="50" cy="50" r="6" fill="#444" />
      {/* Câbles vers le visage */}
      <line x1="50" y1="50" x2="155" y2="62" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
      {/* Silhouette debout */}
      <line x1="175" y1="75" x2="175" y2="120" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="175" cy="62" r="8" fill="#888" />
      {/* Coudes hauts tirant vers les oreilles */}
      <polyline points="170,75 185,60 160,62" stroke="#888" strokeWidth="5" fill="none" />
      {/* Arrière d'épaule / trapèze moyen en rouge */}
      <circle cx="178" cy="72" r="6" fill="#EF4444" />
    </svg>
  ),

  'ex-dos-11': () => (
    // Shrug à la barre
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="DOS // SHRUG À LA BARRE" />
      {/* Silhouette debout stricte */}
      <line x1="160" y1="65" x2="160" y2="120" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="52" r="8" fill="#888" />
      <line x1="160" y1="120" x2="150" y2="145" stroke="#888" strokeWidth="5" />
      <line x1="160" y1="120" x2="170" y2="145" stroke="#888" strokeWidth="5" />
      {/* Barre lourde tenue devant les cuisses */}
      <line x1="105" y1="95" x2="215" y2="95" stroke="#D4D4D4" strokeWidth="3" />
      <rect x="98" y="80" width="8" height="30" fill="#EF4444" />
      <rect x="214" y="80" width="8" height="30" fill="#EF4444" />
      {/* Épaules haussées / trapèzes supérieurs en rouge */}
      <polygon points="148,60 160,56 172,60 168,70 152,70" fill="#EF4444" />
    </svg>
  ),

  'ex-dos-12': () => (
    // Soulevé de terre conventionnel
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="DOS // SOULEVÉ DE TERRE CONVENTIONNEL" />
      {/* Silhouette en position de tirage dos plat */}
      <polyline points="180,145 185,115 160,95 125,82" stroke="#888" strokeWidth="10" strokeLinecap="square" fill="none" />
      <circle cx="115" cy="78" r="8" fill="#888" />
      {/* Bras verticaux tenant la barre au sol */}
      <line x1="140" y1="88" x2="140" y2="128" stroke="#888" strokeWidth="5" />
      {/* Disque olympique géant et barre */}
      <line x1="90" y1="128" x2="190" y2="128" stroke="#FFF" strokeWidth="3" />
      <circle cx="95" cy="128" r="16" fill="#1A1A1A" stroke="#EF4444" strokeWidth="3" />
      <circle cx="185" cy="128" r="16" fill="#1A1A1A" stroke="#EF4444" strokeWidth="3" />
      {/* Chaîne dorsale complète en rouge */}
      <line x1="160" y1="95" x2="125" y2="82" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  'ex-dos-13': () => (
    // Tirage nuque
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="DOS // TIRAGE NUQUE POULIE HAUTE" />
      <rect x="158" y="25" width="4" height="30" fill="#333" />
      <circle cx="160" cy="28" r="5" fill="#EF4444" />
      <line x1="160" y1="75" x2="160" y2="120" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      {/* Barre descendant derrière la tête */}
      <line x1="105" y1="62" x2="215" y2="62" stroke="#D4D4D4" strokeWidth="3" />
      <polyline points="120,62 145,72" stroke="#888" strokeWidth="5" />
      <polyline points="200,62 175,72" stroke="#888" strokeWidth="5" />
      <polygon points="148,78 154,78 154,105 145,95" fill="#EF4444" />
      <polygon points="172,78 166,78 166,105 175,95" fill="#EF4444" />
    </svg>
  ),

  'ex-dos-14': () => (
    // Good Morning
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="DOS // GOOD MORNING (CHAÎNE POSTÉRIEURE)" />
      {/* Buste penché quasi à l'horizontale */}
      <line x1="180" y1="145" x2="175" y2="95" stroke="#888" strokeWidth="7" />
      <line x1="175" y1="95" x2="110" y2="95" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="100" cy="95" r="8" fill="#888" />
      {/* Barre sur les trapèzes */}
      <line x1="105" y1="78" x2="145" y2="78" stroke="#FFF" strokeWidth="3" />
      <rect x="100" y="70" width="6" height="16" fill="#EF4444" />
      {/* Lombaires et ischio-jambiers en rouge */}
      <line x1="175" y1="95" x2="140" y2="95" stroke="#EF4444" strokeWidth="6" />
      <line x1="175" y1="95" x2="180" y2="125" stroke="#EF4444" strokeWidth="4" />
    </svg>
  ),

  // ==========================================================
  // JAMBES (12)
  // ==========================================================
  'ex-7': () => (
    // Presse à cuisses
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="JAMBES // PRESSE À CUISSES INCLINÉE" />
      {/* Rails de presse à 45° */}
      <line x1="80" y1="125" x2="220" y2="45" stroke="#333" strokeWidth="6" />
      {/* Siège incliné */}
      <line x1="85" y1="135" x2="120" y2="95" stroke="#444" strokeWidth="8" />
      {/* Silhouette poussant le plateau */}
      <line x1="95" y1="125" x2="125" y2="100" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="90" cy="110" r="8" fill="#888" />
      {/* Jambes en extension poussant le traîneau */}
      <polyline points="125,115 160,90 195,65" stroke="#888" strokeWidth="7" fill="none" />
      {/* Plateau lourd */}
      <rect x="195" y="48" width="12" height="35" fill="#EF4444" transform="rotate(-30 195 48)" />
      {/* Quadriceps en rouge vif */}
      <line x1="125" y1="115" x2="160" y2="90" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  'ex-8': () => (
    // Leg Extension assis
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="JAMBES // LEG EXTENSION ASSIS" />
      {/* Siège machine */}
      <rect x="110" y="80" width="8" height="40" fill="#444" />
      <rect x="110" y="115" width="45" height="8" fill="#444" />
      {/* Silhouette assise jambe tendue */}
      <line x1="115" y1="85" x2="115" y2="115" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="115" cy="72" r="8" fill="#888" />
      {/* Cuisse à plat */}
      <line x1="115" y1="115" x2="155" y2="115" stroke="#888" strokeWidth="7" />
      {/* Tibia tendu vers l'avant à l'horizontale */}
      <line x1="155" y1="115" x2="200" y2="115" stroke="#888" strokeWidth="6" />
      <circle cx="195" cy="115" r="7" fill="#EF4444" />
      {/* Quadriceps / droit fémoral en rouge */}
      <line x1="120" y1="113" x2="150" y2="113" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  'ex-9': () => (
    // Soulevé de terre Roumain (RDL)
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="JAMBES // SOULEVÉ DE TERRE ROUMAIN (RDL)" />
      {/* Silhouette hanches reculées dos droit */}
      <line x1="165" y1="145" x2="168" y2="105" stroke="#888" strokeWidth="7" />
      <line x1="168" y1="105" x2="120" y2="92" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="110" cy="90" r="8" fill="#888" />
      {/* Bras descendants le long des tibias */}
      <line x1="130" y1="95" x2="145" y2="125" stroke="#888" strokeWidth="5" />
      {/* Barre à mi-tibia */}
      <line x1="115" y1="125" x2="175" y2="125" stroke="#FFF" strokeWidth="3" />
      <rect x="110" y="115" width="6" height="20" fill="#EF4444" />
      <rect x="174" y="115" width="6" height="20" fill="#EF4444" />
      {/* Chaîne ischio-jambiers / fessiers rouge */}
      <line x1="168" y1="105" x2="166" y2="135" stroke="#EF4444" strokeWidth="5" />
      <circle cx="170" cy="105" r="7" fill="#EF4444" />
    </svg>
  ),

  'ex-10': () => (
    // Leg Curl assis
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="JAMBES // LEG CURL ASSIS" />
      {/* Siège machine */}
      <rect x="110" y="80" width="8" height="40" fill="#444" />
      <rect x="110" y="115" width="45" height="8" fill="#444" />
      <line x1="115" y1="85" x2="115" y2="115" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="115" cy="72" r="8" fill="#888" />
      {/* Cuisse fixée */}
      <line x1="115" y1="115" x2="155" y2="115" stroke="#888" strokeWidth="7" />
      {/* Jambe fléchie sous le siège contre le boudin */}
      <polyline points="155,115 150,145" stroke="#888" strokeWidth="6" />
      <circle cx="150" cy="142" r="6" fill="#EF4444" />
      {/* Ischio-jambiers contractés en rouge */}
      <line x1="120" y1="117" x2="150" y2="117" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  'ex-leg-5': () => (
    // Squat barre haute
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="JAMBES // SQUAT BARRE HAUTE" />
      {/* Rack de squat */}
      <line x1="110" y1="40" x2="110" y2="145" stroke="#333" strokeWidth="4" />
      <line x1="210" y1="40" x2="210" y2="145" stroke="#333" strokeWidth="4" />
      {/* Silhouette en flexion profonde (parallèle) */}
      <polyline points="180,145 190,118 150,115 145,85" stroke="#888" strokeWidth="8" strokeLinecap="square" fill="none" />
      <circle cx="145" cy="75" r="8" fill="#888" />
      {/* Barre sur les trapèzes avec disques */}
      <line x1="100" y1="80" x2="220" y2="80" stroke="#FFF" strokeWidth="3" />
      <rect x="95" y="65" width="8" height="30" fill="#EF4444" />
      <rect x="217" y="65" width="8" height="30" fill="#EF4444" />
      {/* Quadriceps et fessiers en rouge éclatant */}
      <line x1="190" y1="118" x2="150" y2="115" stroke="#EF4444" strokeWidth="6" />
      <circle cx="148" cy="115" r="7" fill="#EF4444" />
    </svg>
  ),

  'ex-leg-6': () => (
    // Fentes marchées haltères
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="JAMBES // FENTES MARCHÉES HALTÈRES" />
      {/* Buste vertical */}
      <line x1="160" y1="75" x2="160" y2="110" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      {/* Jambe avant pliée à 90° */}
      <polyline points="160,110 190,110 190,145" stroke="#888" strokeWidth="6" fill="none" />
      {/* Jambe arrière genou au ras du sol */}
      <polyline points="160,110 135,130 115,142" stroke="#888" strokeWidth="6" fill="none" />
      {/* Haltères tenus le long du corps */}
      <rect x="154" y="95" width="12" height="18" fill="#444" stroke="#FFF" strokeWidth="0.5" />
      {/* Cuisse avant & fessier en rouge */}
      <line x1="160" y1="110" x2="190" y2="110" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  'ex-leg-7': () => (
    // Bulgarian Split Squat
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="JAMBES // BULGARIAN SPLIT SQUAT" />
      {/* Banc derrière à gauche */}
      <rect x="75" y="120" width="40" height="8" fill="#333" />
      {/* Pied arrière surélevé sur le banc */}
      <polyline points="95,118 135,115 155,105" stroke="#888" strokeWidth="6" fill="none" />
      {/* Buste droit */}
      <line x1="155" y1="105" x2="155" y2="70" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="155" cy="58" r="8" fill="#888" />
      {/* Jambe avant fléchie à 90° */}
      <polyline points="155,105 185,105 185,145" stroke="#888" strokeWidth="6" fill="none" />
      {/* Haltère */}
      <rect x="150" y="85" width="10" height="15" fill="#444" />
      {/* Quadriceps avant & fessier rouge */}
      <line x1="155" y1="105" x2="185" y2="105" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  'ex-leg-8': () => (
    // Hip Thrust (Pont fessier)
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="JAMBES // HIP THRUST (PONT FESSIER)" />
      {/* Banc sous les omoplates */}
      <rect x="70" y="115" width="30" height="25" fill="#333" stroke="#444" />
      {/* Épaules sur le banc, hanches projetées vers le haut */}
      <line x1="95" y1="115" x2="160" y2="115" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="85" cy="115" r="8" fill="#888" />
      {/* Jambes pliées pieds au sol */}
      <polyline points="160,115 200,115 200,145" stroke="#888" strokeWidth="6" fill="none" />
      {/* Barre sur le bassin */}
      <circle cx="160" cy="105" r="8" fill="#EF4444" stroke="#FFF" strokeWidth="1.5" />
      {/* Fessiers en contraction maximale rouge */}
      <rect x="140" y="110" width="30" height="12" fill="#EF4444" opacity="0.9" />
    </svg>
  ),

  'ex-leg-9': () => (
    // Mollets debout
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="JAMBES // MOLLETS DEBOUT MACHINE" />
      {/* Bloc pour les pieds */}
      <rect x="140" y="140" width="40" height="8" fill="#333" />
      {/* Silhouette debout sur la pointe des pieds */}
      <line x1="160" y1="65" x2="160" y2="115" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="52" r="8" fill="#888" />
      <line x1="160" y1="115" x2="160" y2="138" stroke="#888" strokeWidth="6" />
      {/* Coussinets machine sur les épaules */}
      <rect x="145" y="62" width="30" height="8" fill="#444" />
      {/* Mollets (gastrocnémien) en rouge intense */}
      <polygon points="156,120 164,120 162,135 158,135" fill="#EF4444" stroke="#EF4444" strokeWidth="3" />
    </svg>
  ),

  'ex-leg-10': () => (
    // Mollets assis
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="JAMBES // MOLLETS ASSIS (MACHINE)" />
      <rect x="110" y="85" width="8" height="35" fill="#444" />
      <rect x="110" y="115" width="40" height="8" fill="#444" />
      <line x1="115" y1="85" x2="115" y2="115" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="115" cy="72" r="8" fill="#888" />
      <line x1="115" y1="115" x2="155" y2="115" stroke="#888" strokeWidth="7" />
      {/* Jambe fléchie à 90°, boudin sur les genoux */}
      <polyline points="155,115 155,140" stroke="#888" strokeWidth="6" />
      <rect x="145" y="105" width="20" height="8" fill="#EF4444" />
      {/* Soléaire (partie basse du mollet) en rouge */}
      <line x1="155" y1="125" x2="155" y2="140" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  'ex-leg-11': () => (
    // Hack Squat machine
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="JAMBES // HACK SQUAT MACHINE" />
      {/* Rails inclinés à 45° */}
      <line x1="120" y1="35" x2="230" y2="145" stroke="#333" strokeWidth="6" />
      {/* Dossier coulissant avec silhouette plaquée */}
      <line x1="140" y1="60" x2="175" y2="95" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="132" cy="52" r="8" fill="#888" />
      {/* Cuisses fléchies à 90° */}
      <polyline points="175,95 210,95 210,135" stroke="#888" strokeWidth="6" fill="none" />
      {/* Quadriceps sous tension maximale en rouge */}
      <line x1="175" y1="95" x2="210" y2="95" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  'ex-leg-12': () => (
    // Adducteurs machine
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="JAMBES // ADDUCTEURS MACHINE" />
      <line x1="160" y1="65" x2="160" y2="110" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="52" r="8" fill="#888" />
      {/* Jambes ouvertes se resserrant vers le centre */}
      <line x1="160" y1="110" x2="135" y2="138" stroke="#888" strokeWidth="6" />
      <line x1="160" y1="110" x2="185" y2="138" stroke="#888" strokeWidth="6" />
      {/* Coussinets de résistance */}
      <rect x="128" y="125" width="7" height="15" fill="#444" />
      <rect x="185" y="125" width="7" height="15" fill="#444" />
      {/* Intérieur des cuisses (adducteurs) en rouge */}
      <polygon points="155,112 165,112 175,130 145,130" fill="#EF4444" opacity="0.85" />
    </svg>
  ),

  // ==========================================================
  // ÉPAULES (8)
  // ==========================================================
  'ex-11': () => (
    // Développé épaules haltères / machine
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ÉPAULES // DÉVELOPPÉ ÉPAULES HALTÈRES" />
      {/* Banc incliné à 75° */}
      <line x1="140" y1="135" x2="152" y2="75" stroke="#333" strokeWidth="8" />
      {/* Silhouette assise */}
      <line x1="145" y1="130" x2="155" y2="85" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="157" cy="72" r="8" fill="#888" />
      {/* Bras poussant au-dessus de la tête */}
      <line x1="150" y1="85" x2="130" y2="52" stroke="#888" strokeWidth="5" />
      <line x1="160" y1="85" x2="180" y2="52" stroke="#888" strokeWidth="5" />
      {/* Haltères */}
      <rect x="120" y="45" width="20" height="8" fill="#444" stroke="#FFF" strokeWidth="0.5" />
      <rect x="170" y="45" width="20" height="8" fill="#444" stroke="#FFF" strokeWidth="0.5" />
      {/* Deltoïdes antérieurs et moyens en rouge */}
      <circle cx="148" cy="85" r="6" fill="#EF4444" />
      <circle cx="162" cy="85" r="6" fill="#EF4444" />
    </svg>
  ),

  'ex-12': () => (
    // Élévations latérales poulie basse
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ÉPAULES // ÉLÉVATIONS LATÉRALES POULIE" />
      {/* Poulie basse à gauche */}
      <circle cx="65" cy="140" r="5" fill="#EF4444" />
      {/* Silhouette debout */}
      <line x1="160" y1="70" x2="160" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="56" r="8" fill="#888" />
      {/* Câble montant */}
      <line x1="65" y1="140" x2="220" y2="80" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
      {/* Bras levé à l'horizontale sur le côté */}
      <line x1="160" y1="75" x2="225" y2="78" stroke="#888" strokeWidth="5" strokeLinecap="square" />
      {/* Deltoïde latéral en rouge éclatant */}
      <circle cx="168" cy="74" r="7" fill="#EF4444" />
    </svg>
  ),

  'ex-13': () => (
    // Reverse Pec Deck (Oiseau machine)
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ÉPAULES // REVERSE PEC DECK (ARRIÈRE ÉPAULES)" />
      {/* Coussin d'appui machine devant */}
      <rect x="155" y="70" width="10" height="40" fill="#333" />
      {/* Silhouette face au coussin */}
      <line x1="150" y1="80" x2="150" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="150" cy="66" r="8" fill="#888" />
      {/* Bras écartés horizontalement vers l'arrière */}
      <line x1="150" y1="80" x2="90" y2="82" stroke="#888" strokeWidth="5" />
      <line x1="150" y1="80" x2="210" y2="82" stroke="#888" strokeWidth="5" />
      {/* Arrière d'épaule (deltoïde postérieur) en rouge */}
      <circle cx="145" cy="80" r="6" fill="#EF4444" />
      <circle cx="155" cy="80" r="6" fill="#EF4444" />
    </svg>
  ),

  'ex-del-4': () => (
    // Développé militaire barre
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ÉPAULES // DÉVELOPPÉ MILITAIRE BARRE" />
      {/* Silhouette debout droite */}
      <line x1="160" y1="75" x2="160" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      <line x1="160" y1="125" x2="150" y2="145" stroke="#888" strokeWidth="5" />
      <line x1="160" y1="125" x2="170" y2="145" stroke="#888" strokeWidth="5" />
      {/* Bras tendus poussant au-dessus */}
      <line x1="155" y1="75" x2="135" y2="45" stroke="#888" strokeWidth="5" />
      <line x1="165" y1="75" x2="185" y2="45" stroke="#888" strokeWidth="5" />
      {/* Barre olympique overhead */}
      <line x1="90" y1="42" x2="230" y2="42" stroke="#FFF" strokeWidth="3" />
      <rect x="85" y="30" width="7" height="24" fill="#EF4444" />
      <rect x="228" y="30" width="7" height="24" fill="#EF4444" />
      {/* Épaules en rouge */}
      <circle cx="152" cy="74" r="6" fill="#EF4444" />
      <circle cx="168" cy="74" r="6" fill="#EF4444" />
    </svg>
  ),

  'ex-del-5': () => (
    // Arnold Press
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ÉPAULES // ARNOLD PRESS (ROTATION 3 FAISCEAUX)" />
      <line x1="160" y1="75" x2="160" y2="120" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      {/* Trajectoire rotative en spirale */}
      <path d="M 140 85 C 130 65, 140 50, 145 45" stroke="#EF4444" strokeWidth="2" strokeDasharray="2 2" fill="none" />
      <path d="M 180 85 C 190 65, 180 50, 175 45" stroke="#EF4444" strokeWidth="2" strokeDasharray="2 2" fill="none" />
      {/* Haltères en rotation */}
      <rect x="135" y="45" width="16" height="8" fill="#444" stroke="#FFF" strokeWidth="0.5" />
      <rect x="169" y="45" width="16" height="8" fill="#444" stroke="#FFF" strokeWidth="0.5" />
      {/* Deltoïdes complets en rouge */}
      <circle cx="150" cy="75" r="7" fill="#EF4444" />
      <circle cx="170" cy="75" r="7" fill="#EF4444" />
    </svg>
  ),

  'ex-del-6': () => (
    // Élévations frontales haltères
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ÉPAULES // ÉLÉVATIONS FRONTALES" />
      <line x1="150" y1="75" x2="150" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="150" cy="62" r="8" fill="#888" />
      {/* Bras tendu vers l'avant à l'horizontale */}
      <line x1="150" y1="76" x2="215" y2="76" stroke="#888" strokeWidth="5" strokeLinecap="square" />
      <rect x="215" y="68" width="10" height="16" fill="#444" stroke="#EF4444" strokeWidth="1" />
      {/* Deltoïde antérieur en rouge */}
      <circle cx="156" cy="76" r="6" fill="#EF4444" />
    </svg>
  ),

  'ex-del-7': () => (
    // Upright Row (Tirage vertical menton)
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ÉPAULES // UPRIGHT ROW (TIRAGE MENTON)" />
      <line x1="160" y1="75" x2="160" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      {/* Coudes hauts pointés vers le haut/côtés */}
      <polyline points="160,78 135,65 155,75" stroke="#888" strokeWidth="5" fill="none" />
      <polyline points="160,78 185,65 165,75" stroke="#888" strokeWidth="5" fill="none" />
      {/* Barre au menton */}
      <line x1="125" y1="75" x2="195" y2="75" stroke="#FFF" strokeWidth="3" />
      {/* Deltoïdes moyens & trapèzes en rouge */}
      <polygon points="148,65 160,58 172,65 165,75 155,75" fill="#EF4444" />
    </svg>
  ),

  'ex-del-8': () => (
    // Élévations latérales haltères
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ÉPAULES // ÉLÉVATIONS LATÉRALES HALTÈRES" />
      <line x1="160" y1="75" x2="160" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      {/* Bras ouverts en ailes à l'horizontale */}
      <line x1="160" y1="75" x2="105" y2="75" stroke="#888" strokeWidth="5" />
      <line x1="160" y1="75" x2="215" y2="75" stroke="#888" strokeWidth="5" />
      <rect x="95" y="68" width="10" height="14" fill="#444" stroke="#EF4444" strokeWidth="1" />
      <rect x="215" y="68" width="10" height="14" fill="#444" stroke="#EF4444" strokeWidth="1" />
      {/* Faisceaux latéraux des deltoïdes en rouge vif */}
      <circle cx="152" cy="74" r="6" fill="#EF4444" />
      <circle cx="168" cy="74" r="6" fill="#EF4444" />
    </svg>
  ),

  // ==========================================================
  // BRAS (12)
  // ==========================================================
  'ex-14': () => (
    // Curl incliné aux haltères
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="BRAS // CURL INCLINÉ AUX HALTÈRES" />
      {/* Banc incliné 45° */}
      <line x1="120" y1="130" x2="165" y2="85" stroke="#333" strokeWidth="8" />
      <line x1="130" y1="125" x2="160" y2="90" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="170" cy="80" r="8" fill="#888" />
      {/* Bras pendant en arrière puis remontant */}
      <polyline points="155,95 145,120 170,110" stroke="#888" strokeWidth="5" fill="none" />
      <rect x="168" y="103" width="14" height="10" fill="#444" stroke="#FFF" strokeWidth="0.5" />
      {/* Longue portion du biceps étirée en rouge */}
      <ellipse cx="156" cy="107" rx="7" ry="4" fill="#EF4444" transform="rotate(-25 156 107)" />
    </svg>
  ),

  'ex-15': () => (
    // Curl Pupitre (Preacher Curl)
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="BRAS // CURL PUPITRE (PREACHER CURL)" />
      {/* Pupitre incliné */}
      <polygon points="150,115 185,90 190,95 155,120" fill="#333" stroke="#444" />
      {/* Silhouette assise accoudée */}
      <line x1="130" y1="130" x2="145" y2="95" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="145" cy="82" r="8" fill="#888" />
      {/* Bras plaqué sur le pupitre et avant-bras fléchi */}
      <line x1="150" y1="95" x2="175" y2="95" stroke="#888" strokeWidth="6" />
      <line x1="175" y1="95" x2="165" y2="70" stroke="#888" strokeWidth="5" />
      <circle cx="165" cy="70" r="5" fill="#EF4444" />
      {/* Pic du biceps en rouge intense */}
      <circle cx="170" cy="88" r="6" fill="#EF4444" />
    </svg>
  ),

  'ex-16': () => (
    // Extension Triceps poulie haute corde
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="BRAS // EXTENSION TRICEPS POULIE HAUTE" />
      {/* Poulie haute */}
      <circle cx="140" cy="35" r="5" fill="#444" />
      <line x1="140" y1="35" x2="155" y2="85" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="175" y1="75" x2="175" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="175" cy="62" r="8" fill="#888" />
      {/* Coude collé au corps, avant-bras descendant */}
      <polyline points="170,80 170,105 160,125" stroke="#888" strokeWidth="5" fill="none" />
      {/* Triceps face latérale en rouge */}
      <rect x="171" y="85" width="6" height="20" fill="#EF4444" />
    </svg>
  ),

  'ex-17': () => (
    // Extension Triceps overhead à la poulie
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="BRAS // TRICEPS EXTENSION OVERHEAD" />
      <circle cx="65" cy="55" r="5" fill="#444" />
      <line x1="65" y1="55" x2="145" y2="58" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
      {/* Silhouette penchée en avant */}
      <line x1="175" y1="85" x2="160" y2="135" stroke="#888" strokeWidth="6" />
      <line x1="165" y1="90" x2="155" y2="70" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      {/* Bras tendus au-dessus de la tête vers l'avant */}
      <polyline points="155,70 145,55 185,55" stroke="#888" strokeWidth="5" fill="none" />
      {/* Longue portion triceps étirée en rouge */}
      <line x1="150" y1="65" x2="145" y2="55" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  'ex-bra-5': () => (
    // Curl barre droite
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="BRAS // CURL BARRE DROITE" />
      <line x1="160" y1="75" x2="160" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      {/* Coudes fixés, avant-bras en flexion complète */}
      <polyline points="158,80 158,105 175,90" stroke="#888" strokeWidth="5" fill="none" />
      {/* Barre chargée */}
      <line x1="140" y1="90" x2="200" y2="90" stroke="#FFF" strokeWidth="3" />
      <rect x="135" y="80" width="6" height="20" fill="#EF4444" />
      <rect x="199" y="80" width="6" height="20" fill="#EF4444" />
      {/* Les deux faisceaux du biceps en rouge */}
      <circle cx="165" cy="95" r="7" fill="#EF4444" />
    </svg>
  ),

  'ex-bra-6': () => (
    // Curl haltères alterné
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="BRAS // CURL HALTÈRES ALTERNÉ" />
      <line x1="160" y1="75" x2="160" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      {/* Bras gauche en bas, bras droit en flexion avec supination */}
      <line x1="152" y1="80" x2="148" y2="115" stroke="#888" strokeWidth="5" />
      <rect x="143" y="112" width="10" height="8" fill="#444" />
      <polyline points="168,80 168,105 185,92" stroke="#888" strokeWidth="5" fill="none" />
      <rect x="180" y="88" width="12" height="8" fill="#EF4444" />
      {/* Biceps droit en rouge */}
      <circle cx="172" cy="96" r="6" fill="#EF4444" />
    </svg>
  ),

  'ex-bra-7': () => (
    // Curl marteau
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="BRAS // CURL MARTEAU (BRACHIAL & AVANT-BRAS)" />
      <line x1="160" y1="75" x2="160" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      <polyline points="160,80 160,105 178,92" stroke="#888" strokeWidth="5" fill="none" />
      {/* Haltère orienté verticalement (prise neutre) */}
      <rect x="175" y="82" width="6" height="20" fill="#EF4444" stroke="#FFF" strokeWidth="0.5" />
      {/* Brachioradialis & Brachial en rouge */}
      <line x1="165" y1="98" x2="175" y2="94" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  'ex-bra-8': () => (
    // Curl barre EZ
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="BRAS // CURL BARRE EZ" />
      <line x1="160" y1="75" x2="160" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      <polyline points="158,80 158,105 175,90" stroke="#888" strokeWidth="5" fill="none" />
      {/* Barre ondulée EZ */}
      <path d="M 140 90 Q 155 86 170 90 Q 185 94 200 90" stroke="#FFF" strokeWidth="3" fill="none" />
      <rect x="135" y="82" width="6" height="16" fill="#EF4444" />
      <rect x="199" y="82" width="6" height="16" fill="#EF4444" />
      <circle cx="165" cy="95" r="7" fill="#EF4444" />
    </svg>
  ),

  'ex-bra-9': () => (
    // Extension barre couché (Skull Crusher)
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="BRAS // SKULL CRUSHER (BARRE AU FRONT)" />
      <rect x="70" y="112" width="180" height="10" fill="#222" stroke="#333" />
      <rect x="90" y="99" width="115" height="13" fill="#888" />
      <circle cx="218" cy="104" r="8" fill="#888" />
      {/* Bras verticaux coudes fixes, avant-bras fléchis vers le front */}
      <line x1="150" y1="100" x2="160" y2="70" stroke="#888" strokeWidth="6" />
      <line x1="160" y1="70" x2="190" y2="85" stroke="#888" strokeWidth="5" />
      <circle cx="190" cy="85" r="6" fill="#EF4444" />
      {/* Triceps long faisceau étiré en rouge */}
      <line x1="152" y1="95" x2="160" y2="72" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  'ex-bra-10': () => (
    // Dips triceps (buste vertical)
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="BRAS // DIPS PARALLÈLES (FOCUS TRICEPS)" />
      <line x1="80" y1="95" x2="240" y2="95" stroke="#444" strokeWidth="5" />
      {/* Buste strictement vertical */}
      <line x1="160" y1="70" x2="160" y2="115" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="56" r="8" fill="#888" />
      <polyline points="155,75 165,95 155,95" stroke="#888" strokeWidth="6" fill="none" />
      {/* Triceps en rouge vif */}
      <rect x="162" y="75" width="6" height="20" fill="#EF4444" />
    </svg>
  ),

  'ex-bra-11': () => (
    // Kickback Triceps haltère
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="BRAS // KICKBACK TRICEPS HALTÈRE" />
      <rect x="80" y="115" width="160" height="8" fill="#222" />
      {/* Torse à l'horizontale */}
      <line x1="110" y1="85" x2="190" y2="85" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="100" cy="85" r="8" fill="#888" />
      {/* Coude collé aux côtes, bras tendu vers l'arrière */}
      <line x1="150" y1="85" x2="165" y2="85" stroke="#888" strokeWidth="6" />
      <line x1="165" y1="85" x2="215" y2="85" stroke="#888" strokeWidth="5" />
      <rect x="215" y="80" width="14" height="10" fill="#444" stroke="#EF4444" strokeWidth="1" />
      {/* Triceps latéral raccourci en rouge */}
      <line x1="165" y1="85" x2="195" y2="85" stroke="#EF4444" strokeWidth="6" />
    </svg>
  ),

  'ex-bra-12': () => (
    // Reverse Curl
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="BRAS // REVERSE CURL (AVANT-BRAS & BRACHIAL)" />
      <line x1="160" y1="75" x2="160" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      <polyline points="158,80 158,105 175,90" stroke="#888" strokeWidth="5" fill="none" />
      <line x1="145" y1="90" x2="195" y2="90" stroke="#D4D4D4" strokeWidth="3" />
      {/* Prise pronation / avant-bras mis en évidence en rouge */}
      <line x1="160" y1="102" x2="175" y2="90" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  // ==========================================================
  // ABDOMINAUX (8)
  // ==========================================================
  'ex-18': () => (
    // Crunch câble poulie haute
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ABDOMINAUX // CABLE CRUNCH (POULIE HAUTE)" />
      {/* Poulie haute */}
      <circle cx="160" cy="30" r="6" fill="#444" />
      <line x1="160" y1="30" x2="160" y2="70" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
      {/* Silhouette à genoux enroulant le tronc */}
      <polyline points="175,145 175,115 155,100 145,85" stroke="#888" strokeWidth="9" strokeLinecap="round" fill="none" />
      <circle cx="140" cy="80" r="8" fill="#888" />
      {/* Mains tenant la corde derrière la nuque */}
      <line x1="140" y1="80" x2="160" y2="72" stroke="#888" strokeWidth="5" />
      {/* Grand droit de l'abdomen en contraction rouge */}
      <path d="M 155 100 Q 148 92 145 85" stroke="#EF4444" strokeWidth="7" fill="none" />
    </svg>
  ),

  'ex-abs-2': () => (
    // Crunch au sol
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ABDOMINAUX // CRUNCH AU SOL" />
      {/* Tapis de sol */}
      <line x1="60" y1="135" x2="260" y2="135" stroke="#333" strokeWidth="4" />
      {/* Jambes fléchies à 90° */}
      <polyline points="120,135 150,105 175,135" stroke="#888" strokeWidth="7" fill="none" />
      {/* Buste s'enroulant vers les genoux */}
      <path d="M 175 135 Q 215 130 225 110" stroke="#888" strokeWidth="12" strokeLinecap="square" fill="none" />
      <circle cx="230" cy="102" r="8" fill="#888" />
      {/* Abdominaux en compression rouge */}
      <rect x="185" y="118" width="28" height="12" fill="#EF4444" opacity="0.9" />
    </svg>
  ),

  'ex-abs-3': () => (
    // Relevé de jambes suspendu
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ABDOMINAUX // RELEVÉ DE JAMBES SUSPENDU" />
      <line x1="110" y1="35" x2="210" y2="35" stroke="#FFF" strokeWidth="4" />
      <line x1="160" y1="35" x2="160" y2="95" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="48" r="8" fill="#888" />
      {/* Jambes levées tendues à l'horizontale (90°) */}
      <line x1="160" y1="95" x2="215" y2="95" stroke="#888" strokeWidth="7" strokeLinecap="square" />
      {/* Bas des abdominaux en rouge éclatant */}
      <rect x="154" y="80" width="12" height="18" fill="#EF4444" opacity="0.9" />
    </svg>
  ),

  'ex-abs-4': () => (
    // Russian Twist lesté
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ABDOMINAUX // RUSSIAN TWIST LESTÉ" />
      {/* Position assise en V, pieds décollés */}
      <polyline points="120,110 150,135 175,100" stroke="#888" strokeWidth="8" fill="none" />
      <circle cx="180" cy="92" r="8" fill="#888" />
      {/* Rotation avec haltère */}
      <circle cx="150" cy="115" r="9" fill="#EF4444" stroke="#FFF" strokeWidth="1" />
      {/* Obliques en rouge */}
      <rect x="156" y="110" width="16" height="15" fill="#EF4444" opacity="0.85" />
    </svg>
  ),

  'ex-abs-5': () => (
    // Planche (Plank)
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ABDOMINAUX // GAINAGE PLANCHE (PLANK)" />
      {/* Ligne droite rigide des pieds à la tête */}
      <line x1="90" y1="125" x2="225" y2="125" stroke="#888" strokeWidth="11" strokeLinecap="square" />
      <circle cx="235" cy="122" r="8" fill="#888" />
      {/* Coudes posés au sol à 90° */}
      <polyline points="215,125 215,142 225,142" stroke="#888" strokeWidth="5" fill="none" />
      {/* Pieds au sol */}
      <line x1="90" y1="125" x2="85" y2="142" stroke="#888" strokeWidth="4" />
      {/* Sangle abdominale / transverse en rouge lumineux */}
      <rect x="140" y="122" width="60" height="8" fill="#EF4444" opacity="0.9" />
    </svg>
  ),

  'ex-abs-6': () => (
    // Ab Wheel (Roue abdominale)
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ABDOMINAUX // ROUE ABDOMINALE (AB WHEEL)" />
      {/* Silhouette à genoux étirée vers l'avant */}
      <polyline points="95,142 105,120 205,100" stroke="#888" strokeWidth="9" fill="none" />
      <circle cx="215" cy="95" r="7" fill="#888" />
      {/* Bras tendus tenant la roue au sol */}
      <line x1="205" y1="100" x2="235" y2="135" stroke="#888" strokeWidth="5" />
      <circle cx="235" cy="135" r="10" fill="#222" stroke="#EF4444" strokeWidth="3" />
      {/* Grand droit & dentelés en rouge */}
      <line x1="130" y1="115" x2="190" y2="103" stroke="#EF4444" strokeWidth="5" />
    </svg>
  ),

  'ex-abs-7': () => (
    // Crunch oblique haltère
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ABDOMINAUX // CRUNCH OBLIQUE" />
      <line x1="160" y1="75" x2="160" y2="125" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="62" r="8" fill="#888" />
      {/* Flexion latérale du torse avec haltère tenu à la main */}
      <line x1="154" y1="80" x2="140" y2="110" stroke="#888" strokeWidth="5" />
      <rect x="135" y="108" width="10" height="15" fill="#444" stroke="#FFF" strokeWidth="0.5" />
      {/* Obliques du côté contracté en rouge vif */}
      <polygon points="166,78 174,85 170,110 166,110" fill="#EF4444" />
    </svg>
  ),

  'ex-abs-8': () => (
    // Dragon Flag
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label="ABDOMINAUX // DRAGON FLAG" />
      {/* Banc plat */}
      <rect x="70" y="130" width="180" height="10" fill="#222" stroke="#333" />
      {/* Épaules calées, corps rigide monté en drapeau à 45° */}
      <line x1="115" y1="125" x2="215" y2="65" stroke="#888" strokeWidth="11" strokeLinecap="square" />
      <circle cx="100" cy="125" r="8" fill="#888" />
      {/* Mains agrippant le banc */}
      <polyline points="105,125 90,120 90,130" stroke="#888" strokeWidth="4" fill="none" />
      {/* Sangle abdominale complète sous tension maximale rouge */}
      <line x1="120" y1="122" x2="185" y2="83" stroke="#EF4444" strokeWidth="6" />
    </svg>
  )
};

// Illustration par défaut propre si exercice non listé ou custom
const DefaultIllustration = ({ exerciseId, muscleGroup = 'MUSCULATION' }) => {
  return (
    <svg viewBox="0 0 320 180" fill="none" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <CanvasBg label={`${muscleGroup.toUpperCase()} // EXERCICE TECHNIQUE`} />
      {/* Silhouette stylisée universelle */}
      <line x1="160" y1="65" x2="160" y2="115" stroke="#888" strokeWidth="12" strokeLinecap="square" />
      <circle cx="160" cy="50" r="8" fill="#888" />
      <line x1="160" y1="115" x2="148" y2="145" stroke="#888" strokeWidth="6" />
      <line x1="160" y1="115" x2="172" y2="145" stroke="#888" strokeWidth="6" />
      <line x1="160" y1="75" x2="130" y2="95" stroke="#888" strokeWidth="5" />
      <line x1="160" y1="75" x2="190" y2="95" stroke="#888" strokeWidth="5" />
      {/* Halo rouge central */}
      <circle cx="160" cy="85" r="14" fill="#EF4444" opacity="0.8" />
      <rect x="154" y="70" width="12" height="30" fill="#EF4444" opacity="0.5" />
    </svg>
  );
};

export default function ExerciseIllustration({ exerciseId, muscleGroup = 'GÉNÉRAL' }) {
  const render = illustrations[exerciseId];
  if (!render) {
    return <DefaultIllustration exerciseId={exerciseId} muscleGroup={muscleGroup} />;
  }
  return render();
}
