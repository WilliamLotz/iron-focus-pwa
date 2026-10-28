import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { TrendingUp, BarChart2, PieChart as PieIcon, Calendar, Dumbbell, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { calculate1RM } from '../utils/formulas';

export default function StatsView({ userData }) {
  const { exercises = [], history = [] } = userData;

  // Exercice sélectionné pour le graphique de progression 1RM
  const [selectedExerciseId, setSelectedExerciseId] = useState(
    exercises[0]?.id || 'ex-1'
  );

  // Vue sélectionnée pour les graphiques : '1rm' | 'volume' | 'muscles'
  const [activeChartTab, setActiveChartTab] = useState('1rm');

  // État d'expansion des séances dans le journal
  const [expandedSessionId, setExpandedSessionId] = useState(null);

  // 1. Données pour la courbe d'évolution 1RM et charge max
  const exercise1RMData = useMemo(() => {
    const data = [];
    const sorted = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));

    sorted.forEach(session => {
      const match = session.exercises?.find(e => e.exerciseId === selectedExerciseId);
      if (match && match.sets && match.sets.length > 0) {
        let maxWeight = 0;
        let max1RM = 0;

        match.sets.forEach(s => {
          if (s.completed && s.weight && s.reps) {
            const w = Number(s.weight);
            const r = Number(s.reps);
            if (w > maxWeight) maxWeight = w;
            const e1rm = calculate1RM(w, r);
            if (e1rm > max1RM) max1RM = e1rm;
          }
        });

        if (maxWeight > 0) {
          const d = new Date(session.date);
          const dateStr = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}`;
          data.push({
            date: dateStr,
            fullDate: d.toLocaleDateString('fr-FR'),
            maxWeight: Math.round(maxWeight * 10) / 10,
            estimated1RM: Math.round(max1RM * 10) / 10
          });
        }
      }
    });

    return data;
  }, [history, selectedExerciseId]);

  // 2. Données pour le volume hebdomadaire (Tonnage en tonnes ou kg)
  const weeklyVolumeData = useMemo(() => {
    const weekMap = {};
    const now = Date.now();
    const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

    // Initialiser les 4 dernières semaines
    for (let i = 3; i >= 0; i--) {
      const label = i === 0 ? 'Cette sem.' : `Sem. -${i}`;
      weekMap[label] = 0;
    }

    history.forEach(session => {
      const diff = now - new Date(session.date).getTime();
      const weekIndex = Math.floor(diff / ONE_WEEK);
      if (weekIndex >= 0 && weekIndex <= 3) {
        const label = weekIndex === 0 ? 'Cette sem.' : `Sem. -${weekIndex}`;
        weekMap[label] = (weekMap[label] || 0) + (session.totalTonnage || 0);
      }
    });

    return Object.entries(weekMap).map(([week, tonnage]) => ({
      week,
      tonnageKg: Math.round(tonnage),
      tonnageTonnes: Math.round((tonnage / 1000) * 10) / 10
    }));
  }, [history]);

  // 3. Données de répartition des groupes musculaires
  const muscleDistributionData = useMemo(() => {
    const counts = {
      'Pectoraux': 0,
      'Dos': 0,
      'Jambes': 0,
      'Épaules': 0,
      'Bras': 0,
      'Abdos': 0
    };

    history.forEach(session => {
      session.exercises?.forEach(exItem => {
        const catalog = exercises.find(e => e.id === exItem.exerciseId);
        if (catalog && counts[catalog.muscleGroup] !== undefined) {
          const setsCount = exItem.sets?.filter(s => s.completed)?.length || 0;
          counts[catalog.muscleGroup] += setsCount;
        }
      });
    });

    const colors = {
      'Pectoraux': '#EF4444',
      'Dos': '#3B82F6',
      'Jambes': '#10B981',
      'Épaules': '#F59E0B',
      'Bras': '#8B5CF6',
      'Abdos': '#EC4899'
    };

    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      color: colors[name] || '#FFFFFF'
    })).filter(item => item.count > 0);
  }, [history, exercises]);

  // Formatage de durée
  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${String(s).padStart(2, '0')}s`;
  };

  const selectedExerciseObj = exercises.find(e => e.id === selectedExerciseId);

  return (
    <div className="space-y-4 pb-36 px-4 pt-3">
      {/* En-tête */}
      <div>
        <h2 className="text-lg font-mono font-black text-white uppercase tracking-wider">
          STATISTIQUES & ANALYSE 1RM
        </h2>
        <p className="text-[10px] font-mono text-[#737373]">
          {history.length} SÉANCES ENREGISTRÉES // FORMULE D'EPLEY
        </p>
      </div>

      {/* Onglets Graphiques */}
      <div className="grid grid-cols-3 bg-[#141414] border border-[#262626] font-mono text-[11px] font-bold">
        <button
          onClick={() => setActiveChartTab('1rm')}
          className={`py-2 px-1 text-center uppercase tracking-wider transition-colors ${
            activeChartTab === '1rm'
              ? 'bg-[#1F1F1F] text-white border-b-2 border-[#EF4444]'
              : 'text-[#888] hover:text-white'
          }`}
        >
          1RM & CHARGE
        </button>
        <button
          onClick={() => setActiveChartTab('volume')}
          className={`py-2 px-1 text-center uppercase tracking-wider transition-colors ${
            activeChartTab === 'volume'
              ? 'bg-[#1F1F1F] text-white border-b-2 border-[#EF4444]'
              : 'text-[#888] hover:text-white'
          }`}
        >
          VOLUME HEBDO
        </button>
        <button
          onClick={() => setActiveChartTab('muscles')}
          className={`py-2 px-1 text-center uppercase tracking-wider transition-colors ${
            activeChartTab === 'muscles'
              ? 'bg-[#1F1F1F] text-white border-b-2 border-[#EF4444]'
              : 'text-[#888] hover:text-white'
          }`}
        >
          RÉPARTITION
        </button>
      </div>

      {/* ZONE GRAPHIQUE */}
      <div className="bg-[#141414] border border-[#262626] p-4">
        {/* VUE 1 : 1RM & CHARGE MAX */}
        {activeChartTab === '1rm' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#737373] uppercase tracking-widest">
                // SÉLECTIONNER L'EXERCICE
              </span>
              <span className="text-[10px] font-mono text-[#EF4444] font-bold">
                FORMULE D'EPLEY
              </span>
            </div>

            <select
              value={selectedExerciseId}
              onChange={(e) => setSelectedExerciseId(e.target.value)}
              className="w-full bg-[#0A0A0A] border border-[#262626] text-white px-3 py-2 text-xs font-mono outline-none font-bold uppercase"
            >
              {exercises.map(ex => (
                <option key={ex.id} value={ex.id}>
                  {ex.name} ({ex.muscleGroup})
                </option>
              ))}
            </select>

            {exercise1RMData.length === 0 ? (
              <div className="bg-[#0A0A0A] border border-[#262626] p-8 text-center text-xs font-mono text-[#666]">
                Aucune donnée d'entraînement pour cet exercice. Effectuez une séance pour tracer la courbe.
              </div>
            ) : (
              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={exercise1RMData}>
                    <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      stroke="#666"
                      tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }}
                    />
                    <YAxis
                      stroke="#666"
                      tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }}
                      domain={['auto', 'auto']}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0A0A0A',
                        border: '1px solid #262626',
                        borderRadius: 0,
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        color: '#FFF'
                      }}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: '10px',
                        fontFamily: 'monospace',
                        paddingTop: '8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="maxWeight"
                      name="Charge Max (kg)"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                      dot={{ fill: '#FFFFFF', r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="estimated1RM"
                      name="1RM Estimé (kg)"
                      stroke="#EF4444"
                      strokeWidth={2}
                      dot={{ fill: '#EF4444', r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {exercise1RMData.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#262626] text-xs font-mono">
                <div className="bg-[#0A0A0A] p-2 border border-[#262626]">
                  <span className="text-[9px] text-[#737373] uppercase block">RECORD CHARGE MAX</span>
                  <span className="text-sm font-bold text-white tabular-nums">
                    {Math.max(...exercise1RMData.map(d => d.maxWeight))} KG
                  </span>
                </div>
                <div className="bg-[#0A0A0A] p-2 border border-[#262626]">
                  <span className="text-[9px] text-[#737373] uppercase block">RECORD 1RM ESTIMÉ</span>
                  <span className="text-sm font-bold text-[#EF4444] tabular-nums">
                    {Math.max(...exercise1RMData.map(d => d.estimated1RM))} KG
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VUE 2 : VOLUME HEBDOMADAIRE (TONNAGE) */}
        {activeChartTab === 'volume' && (
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-[#737373] uppercase tracking-widest block">
              // TONNAGE SOULEVÉ PAR SEMAINE (EN TONNES)
            </span>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyVolumeData}>
                  <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="week"
                    stroke="#666"
                    tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }}
                  />
                  <YAxis
                    stroke="#666"
                    tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }}
                  />
                  <Tooltip
                    formatter={(val) => [`${val} Tonnes`, 'Tonnage']}
                    contentStyle={{
                      backgroundColor: '#0A0A0A',
                      border: '1px solid #262626',
                      borderRadius: 0,
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      color: '#FFF'
                    }}
                  />
                  <Bar
                    dataKey="tonnageTonnes"
                    fill="#EF4444"
                    radius={[0, 0, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="text-[11px] font-mono text-[#888] bg-[#0A0A0A] p-2.5 border border-[#262626]">
              Le tonnage hebdomadaire correspond à la somme des (Poids × Répétitions) de toutes les séries validées durant la semaine.
            </div>
          </div>
        )}

        {/* VUE 3 : RÉPARTITION PAR GROUPE MUSCULAIRE */}
        {activeChartTab === 'muscles' && (
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-[#737373] uppercase tracking-widest block">
              // VOLUME EFFECTUÉ (NOMBRE TOTAL DE SÉRIES VALIDÉES)
            </span>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={muscleDistributionData} layout="vertical">
                  <CartesianGrid stroke="#222" strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    stroke="#666"
                    tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#666"
                    tick={{ fill: '#FFF', fontSize: 10, fontFamily: 'monospace' }}
                    width={80}
                  />
                  <Tooltip
                    formatter={(val) => [`${val} séries validées`, 'Volume']}
                    contentStyle={{
                      backgroundColor: '#0A0A0A',
                      border: '1px solid #262626',
                      borderRadius: 0,
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      color: '#FFF'
                    }}
                  />
                  <Bar dataKey="count" fill="#EF4444">
                    {muscleDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {muscleDistributionData.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0A0A0A] border border-[#262626] p-2 flex items-center justify-between font-mono text-xs"
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: item.color }} />
                    <span className="text-white uppercase">{item.name}</span>
                  </div>
                  <span className="text-[#888] font-bold tabular-nums">{item.count} séries</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* JOURNAL CHRONOLOGIQUE DES SÉANCES TERMINÉES */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-black text-white uppercase tracking-wider">
            JOURNAL D'HISTORIQUE ({history.length})
          </span>
          <span className="text-[10px] font-mono text-[#737373] uppercase">
            ORDRE ANTÉCHRONOLOGIQUE
          </span>
        </div>

        {history.length === 0 ? (
          <div className="bg-[#141414] border border-[#262626] p-6 text-center text-xs font-mono text-[#666]">
            Aucune séance terminée pour le moment.
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((session) => {
              const isExpanded = expandedSessionId === session.id;
              const dateObj = new Date(session.date);
              const formattedDate = dateObj.toLocaleDateString('fr-FR', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

              return (
                <div
                  key={session.id}
                  className="bg-[#141414] border border-[#262626] hover:border-[#383838] transition-all"
                >
                  <div
                    onClick={() => setExpandedSessionId(isExpanded ? null : session.id)}
                    className="p-3 cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-mono text-[#EF4444] bg-[#220C0C] border border-[#EF4444]/30 px-1.5 py-0.5 uppercase font-bold">
                          {formattedDate}
                        </span>
                        <span className="text-[10px] font-mono text-[#888] tabular-nums">
                          {formatDuration(session.durationSeconds || 0)}
                        </span>
                      </div>
                      <h4 className="font-mono text-xs font-black text-white uppercase tracking-wider">
                        {session.workoutName}
                      </h4>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs font-mono font-black text-[#22C55E] tabular-nums">
                          {session.totalTonnage?.toLocaleString()} KG
                        </div>
                        <div className="text-[9px] font-mono text-[#737373] uppercase">
                          {session.exercises?.length || 0} EXERCICES
                        </div>
                      </div>
                      <span className="text-[#666]">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </span>
                    </div>
                  </div>

                  {/* DÉTAIL DÉPLIÉ DES SÉRIES */}
                  {isExpanded && (
                    <div className="border-t border-[#262626] p-3 space-y-2 bg-[#0A0A0A]">
                      {session.exercises?.map((exItem, exIdx) => {
                        const completed = exItem.sets?.filter(s => s.completed) || [];
                        return (
                          <div key={exIdx} className="border-b border-[#202020] pb-2 text-xs font-mono">
                            <div className="text-white font-bold uppercase mb-1">
                              {exIdx + 1}. {exItem.name}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {completed.map((s, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="bg-[#141414] border border-[#262626] px-2 py-0.5 text-[10px] tabular-nums text-[#CCCCCC]"
                                >
                                  S{s.setNumber}: <strong className="text-white">{s.weight} kg</strong> × {s.reps}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
