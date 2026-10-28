import React from 'react';
import { Home, Calendar, Zap, BookOpen, BarChart3 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, hasActiveSession }) {
  const tabs = [
    { id: 'home', label: 'ACCUEIL', icon: Home },
    { id: 'workouts', label: 'SÉANCES', icon: Calendar },
    { id: 'live', label: 'LIVE', icon: Zap, isLive: true },
    { id: 'exercises', label: 'EXERCICES', icon: BookOpen },
    { id: 'stats', label: 'STATS', icon: BarChart3 }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/98 backdrop-blur-md border-t border-[#262626] pb-[max(22px,env(safe-area-inset-bottom,22px))] pt-2">
      <div className="max-w-md mx-auto grid grid-cols-5 h-12">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center transition-all ${
                isActive
                  ? 'bg-[#181818] text-white border-t-2 border-[#EF4444]'
                  : 'text-[#888888] hover:text-white hover:bg-[#121212]'
              }`}
            >
              {tab.isLive && hasActiveSession && (
                <span className="absolute top-1.5 right-4 w-2 h-2 bg-[#EF4444] animate-ping" />
              )}
              {tab.isLive && hasActiveSession && (
                <span className="absolute top-1.5 right-4 w-2 h-2 bg-[#EF4444]" />
              )}
              <Icon
                size={18}
                className={`mb-0.5 ${isActive ? (tab.isLive ? 'text-[#EF4444]' : 'text-white') : 'text-[#777777]'}`}
              />
              <span
                className={`text-[8.5px] font-mono tracking-wider uppercase font-bold ${
                  isActive ? (tab.isLive ? 'text-[#EF4444]' : 'text-white') : 'text-[#777777]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
