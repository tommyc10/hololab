
export function TopBar() {
  return (
    <header className="h-20 bg-empire-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-30">
      
      {/* Left: Breadcrumb / Status */}
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-mono text-emerald-500 tracking-widest uppercase">System Secure</span>
      </div>

      {/* Right: User Data */}
      <div className="flex items-center gap-8">
        
        {/* Credits Display */}
        <div className="text-right">
          <span className="block text-[10px] text-gray-500 font-mono uppercase tracking-wider">Current Balance</span>
          <span className="text-tatooine-sand font-mono font-bold tracking-wide">105,200 CR</span>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/20 flex items-center justify-center text-hologram-blue font-death-star text-xs">
          ADM
        </div>

      </div>
    </header>
  );
}