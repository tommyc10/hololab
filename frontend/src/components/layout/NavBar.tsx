import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-hologram-blue/20 bg-empire-black/80 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.1)]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Brand */}
        <div className="flex-1">
          <Brand />
        </div>

        {/* Center: Navigation */}
        <div className="flex gap-8 justify-center">
          <a href="/#features" className="relative px-6 py-2 text-sm font-mono uppercase tracking-widest transition-all duration-300 text-gray-500 hover:text-white group">
            <span className="relative z-10">Modules</span>
          </a>
          <a href="/#partners" className="relative px-6 py-2 text-sm font-mono uppercase tracking-widest transition-all duration-300 text-gray-500 hover:text-white group">
            <span className="relative z-10">Alliances</span>
          </a>
          <a href="/#pricing" className="relative px-6 py-2 text-sm font-mono uppercase tracking-widest transition-all duration-300 text-gray-500 hover:text-white group">
            <span className="relative z-10">Clearance</span>
          </a>
        </div>

        {/* Right: Login */}
        <div className="flex-1 flex justify-end">
          <LoginButton />
        </div>

      </div>
    </nav>
  );
}

// --- Sub Components ---

function Brand() {
  return (
    <a href="/#hero" className="flex items-center gap-4 group w-fit">
      <div className="flex flex-col gap-1">
        <div className="w-8 h-1 bg-hologram-blue shadow-[0_0_8px_#00F0FF] group-hover:w-12 transition-all duration-300" />
        <div className="w-4 h-1 bg-hologram-blue/50 group-hover:w-8 transition-all duration-300 delay-75" />
      </div>
      <span className="text-2xl font-black tracking-[0.25em] text-white uppercase group-hover:text-hologram-blue transition-colors duration-300 font-death-star">
        Hololab
      </span>
    </a>
  );
}

function LoginButton() {
  return (
    <Link 
      to="/login"
      className="
        relative px-8 py-2 
        border border-hologram-blue/50 
        bg-hologram-blue/5
        text-hologram-blue 
        font-mono text-xs font-bold uppercase tracking-[0.2em]
        hover:bg-hologram-blue hover:text-empire-black hover:border-hologram-blue
        hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]
        transition-all duration-300
      "
    >
      Login
    </Link>
  );
}