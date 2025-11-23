import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';



import { 
  // Standard Icons
  Home, Box, Target, CreditCard, LogOut,
  // Crimson Dawn Icons
  Cpu, PackageSearch, Coins, Radar, Crosshair, Users
} from 'lucide-react';

export function Sidebar() {
  const [isSyndicate, setIsSyndicate] = useState(false);

  // 1. Check Identity on Load
  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === 'crimson_dawn') {
      setIsSyndicate(true);
    }
  }, []);

  // 2. Define Colors based on Identity using your new CSS variables
  const activeTheme = isSyndicate 
    ? 'text-crimson-light bg-crimson-light/10 border-crimson-light shadow-[0_0_10px_rgba(255,0,51,0.2)]' 
    : 'text-hologram-blue bg-hologram-blue/5 border-hologram-blue shadow-[0_0_10px_rgba(0,240,255,0.2)]';

  const hoverTheme = isSyndicate 
    ? 'hover:text-crimson-light hover:bg-crimson-light/5' 
    : 'hover:text-white hover:bg-white/5';

  const logoColor = isSyndicate ? 'text-crimson-light' : 'text-white';

  // Helper to apply classes
  const getLinkClass = ({ isActive }: { isActive: boolean }) => `
    relative flex items-center gap-4 px-6 py-4 text-sm font-mono uppercase tracking-widest transition-all duration-300 border-r-2 border-transparent
    ${isActive 
      ? `${activeTheme}` 
      : `text-gray-500 ${hoverTheme}`}
  `;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-empire-black border-r border-white/10 z-40 flex flex-col">
      
      {/* Logo Area */}
      <div className="h-20 flex items-center px-8 border-b border-white/10 relative overflow-hidden">
        {/* Subtle glow behind logo */}
        <div className={`absolute top-0 left-0 w-20 h-full blur-3xl opacity-20 ${isSyndicate ? 'bg-crimson-light' : 'bg-hologram-blue'}`}></div>
        
        <span className={`font-death-star text-xl tracking-widest ${logoColor} transition-colors duration-500 relative z-10`}>
          {isSyndicate ? 'CRIMSON DAWN' : 'HOLOLAB'}
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-8 flex flex-col gap-2">
        
        {/* --- LOGIC BRANCHING --- */}
        
        {isSyndicate ? (
          // 🔴 RED SYNDICATE MENU
          <>
            <div className="px-6 mb-2">
               <span className="text-crimson-light/50 font-death-star text-[10px] tracking-widest">OPERATIONS</span>
            </div>
            
            <NavLink to="/dashboard" end className={getLinkClass}>
              <Cpu size={18} /> <span>Command Nexus</span>
            </NavLink>
            <NavLink to="/inventory" className={getLinkClass}>
              <PackageSearch size={18} /> <span>Contraband</span>
            </NavLink>
            <NavLink to="/eliminations" className={getLinkClass}>
              <Crosshair size={18} /> <span>Eliminations</span>
            </NavLink>
            <NavLink to="/operatives" className={getLinkClass}>
              <Users size={18} /> <span>Field Agents</span>
            </NavLink>
            <NavLink to="/finance" className={getLinkClass}>
              <Coins size={18} /> <span>Tribute Flows</span>
            </NavLink>
            
            <div className="px-6 mt-6 mb-2">
               <span className="text-crimson-light/50 font-death-star text-[10px] tracking-widest">RISK ASSESSMENT</span>
            </div>
            {/* ACTIVE LINK */}
          <NavLink to="/heat" className={getLinkClass}>
          <Radar size={18} className={isSyndicate ? "animate-pulse text-red-500" : ""} /> 
          <span>{isSyndicate ? "Heat Map" : "Sector Risks"}</span>
            </NavLink>

          </>
        ) : (
          // 🔵 BLUE STANDARD MENU
          <>
            <NavLink to="/dashboard" end className={getLinkClass}>
              <Home size={18} /> <span>Overview</span>
            </NavLink>
            <NavLink to="/inventory" className={getLinkClass}>
              <Box size={18} /> <span>Cargo</span>
            </NavLink>
            <NavLink to="/bounties" className={getLinkClass}>
              <Target size={18} /> <span>Bounties</span>
            </NavLink>
            <NavLink to="/operatives" className={getLinkClass}>
              <Users size={18} /> <span>Field Agents</span>
            </NavLink>
            <NavLink to="/finance" className={getLinkClass}>
              <CreditCard size={18} /> <span>Finance</span>
            </NavLink>
          </>
        )}

      </nav>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-white/10">
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('username'); // Clear identity so next login checks fresh
            window.location.href = '/login';
          }}
          className={`w-full flex items-center gap-4 font-mono text-xs tracking-widest uppercase transition-colors py-2 
            ${isSyndicate ? 'text-crimson-light hover:text-white' : 'text-red-500/70 hover:text-red-500'}`}
        >
          <LogOut size={16} /> <span>Terminate Link</span>
        </button>
      </div>

    </aside>
  );
}