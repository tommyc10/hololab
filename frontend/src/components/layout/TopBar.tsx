import { Zap } from 'lucide-react';

export function TopBar() {
  const username = localStorage.getItem("username");
  const isSyndicate = username === "crimson_dawn";

  // Theme Logic
  const theme = isSyndicate
    ? {
        label: "WAR CHEST",
        credits: "85,420,000", 
        coaxium: "120kg",
        avatarText: "CD",
        avatarBg: "bg-red-900 border-red-500 text-red-100",
        accent: "text-amber-500", // Gold for Coaxium
        text: "text-red-500",
        statusDot: "bg-red-500",
        statusText: "text-red-500"
      }
    : {
        label: "DEPT. BUDGET",
        credits: "590,000,000", 
        coaxium: null,
        avatarText: "IMP",
        avatarBg: "bg-slate-800 border-cyan-500 text-cyan-100",
        accent: "text-cyan-400",
        text: "text-cyan-400",
        statusDot: "bg-cyan-400",
        statusText: "text-cyan-400"
      };

  return (
    <header className="h-20 bg-empire-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-30">
      
      {/* Left: Breadcrumb / Status */}
      <div className="flex items-center gap-4">
        <div className={`w-2 h-2 rounded-full animate-pulse ${theme.statusDot}`}></div>
        <span className={`text-xs font-mono tracking-widest uppercase ${theme.statusText}`}>
          System Secure
        </span>
      </div>

      {/* Right: User Data */}
      <div className="flex items-center gap-8">
        
        {/* Credits & Resources Display */}
        <div className="text-right">
          <span className="block text-[10px] text-gray-500 font-mono uppercase tracking-widest mb-1">
            {theme.label}
          </span>
          
          <div className="flex flex-col items-end leading-none">
            {/* Credits */}
            <span className={`text-lg font-bold font-mono ${theme.text}`}>
              {theme.credits} <span className="text-xs text-gray-600">CR</span>
            </span>

            {/* Coaxium (Syndicate Only) */}
            {isSyndicate && theme.coaxium && (
              <span className={`text-xs font-bold font-mono flex items-center gap-1 mt-1 ${theme.accent}`}>
                <Zap size={10} fill="currentColor" />
                {theme.coaxium} <span className="text-[8px] opacity-70">CX</span>
              </span>
            )}
          </div>
        </div>

        {/* Avatar */}
        <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-lg font-mono text-xs font-black tracking-tighter ${theme.avatarBg}`}>
          {theme.avatarText}
        </div>

      </div>
    </header>
  );
}