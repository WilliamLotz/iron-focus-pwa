import React from 'react';
import { User, Activity } from 'lucide-react';

export default function Header({ currentUser, onOpenAuthModal, activeSession, onGoToLive }) {
  // Format live timer
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#262626] px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#141414] border border-[#262626] flex items-center justify-center">
            <span className="w-4 h-4 bg-[#EF4444] inline-block"></span>
          </div>
          <div>
            <h1 className="text-base font-black tracking-wider uppercase font-mono text-white leading-none">
              IRON FOCUS
            </h1>
            <p className="text-[9px] font-mono text-[#737373] tracking-widest leading-tight mt-0.5">
              // BRUTALIST GYM PWA
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeSession && (
            <button
              onClick={onGoToLive}
              className="flex items-center gap-1.5 bg-[#1C0D0D] border border-[#EF4444] text-[#EF4444] px-2.5 py-1 text-xs font-mono font-bold animate-pulse-subtle"
            >
              <Activity size={13} className="animate-spin text-[#EF4444]" />
              <span className="tabular-nums">{formatTime(activeSession.elapsedSeconds || 0)}</span>
            </button>
          )}

          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] hover:border-white px-2.5 py-1.5 transition-colors"
            title="Gérer le compte et les sauvegardes"
          >
            <User size={14} className="text-[#EF4444]" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white max-w-[80px] truncate">
              {currentUser?.username?.split(' ')[0] || 'ATHLÈTE'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
