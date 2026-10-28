import React from 'react';
import { User, Activity } from 'lucide-react';

export default function Header({ currentUser, onOpenAuthModal, activeSession, onGoToLive }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#262626] px-4 pt-[calc(max(54px,env(safe-area-inset-top,54px))+38px)] pb-3.5">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-[#EF4444] inline-block"></span>
          <h1 className="text-sm font-black tracking-wider uppercase font-mono text-white">
            IRON FOCUS
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {activeSession && (
            <button
              onClick={onGoToLive}
              className="flex items-center gap-1.5 bg-[#1C0D0D] border border-[#EF4444] text-[#EF4444] px-2 py-0.5 text-xs font-mono font-bold animate-pulse-subtle"
            >
              <Activity size={12} className="animate-spin text-[#EF4444]" />
              <span className="tabular-nums text-xs">{formatTime(activeSession.elapsedSeconds || 0)}</span>
            </button>
          )}

          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 bg-[#141414] hover:bg-[#1A1A1A] border border-[#262626] px-2.5 py-1 transition-colors"
          >
            <User size={12} className="text-[#EF4444]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white max-w-[80px] truncate">
              {currentUser?.username?.split(' ')[0] || 'ATHLÈTE'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
