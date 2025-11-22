
import { NavLink } from 'react-router-dom';

// Simple icon placeholders (You can replace with Lucide-React later)
const ICONS = {
  home: (<span>⌂</span>),
  inventory: (<span>▣</span>),
  bounties: (<span>◎</span>),
  credits: (<span>$</span>),
  logout: (<span>→</span>),
};

export function Sidebar() {
  
  // Helper to style the links based on "isActive" state
  const getLinkClass = ({ isActive }: { isActive: boolean }) => `
    relative flex items-center gap-4 px-6 py-4 text-sm font-mono uppercase tracking-widest transition-all duration-300
    ${isActive 
      ? 'text-hologram-blue bg-hologram-blue/5 border-r-2 border-hologram-blue' 
      : 'text-gray-500 hover:text-white hover:bg-white/5'}
  `;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-empire-black border-r border-white/10 z-40 flex flex-col">
      
      {/* Logo Area */}
      <div className="h-20 flex items-center px-8 border-b border-white/10">
        <span className="font-death-star text-xl text-white tracking-widest">HOLOLAB</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-8 flex flex-col gap-2">
        
        <NavLink to="/dashboard" end className={getLinkClass}>
          {ICONS.home} <span>Overview</span>
        </NavLink>

        <NavLink to="/dashboard/inventory" className={getLinkClass}>
          {ICONS.inventory} <span>Cargo</span>
        </NavLink>

        <NavLink to="/dashboard/bounties" className={getLinkClass}>
          {ICONS.bounties} <span>Bounties</span>
        </NavLink>

        <NavLink to="/dashboard/finance" className={getLinkClass}>
          {ICONS.credits} <span>Finance</span>
        </NavLink>

      </nav>

      {/* Bottom Actions */}
      <div className="p-6 border-t border-white/10">
        <button 
          onClick={() => {
            localStorage.removeItem('token'); // Destroy the keycard
            window.location.href = '/login';  // Eject the user
          }}
          className="flex items-center gap-4 text-red-500/70 hover:text-red-500 font-mono text-xs tracking-widest uppercase transition-colors"
        >
          {ICONS.logout} <span>Terminate Session</span>
        </button>
      </div>

    </aside>
  );
}