import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Radar, Target, Map as MapIcon, ShieldAlert, Activity, Navigation } from "lucide-react";
import { getHeatMap } from "../api";
import type { Planet } from "../api";

export default function HeatMap() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [, setLoading] = useState(true);

  // THEME
  const theme = {
    text: "text-red-500",
    border: "border-red-900/50",
    grid: "border-red-900/20",
    bg: "bg-red-950/20",
    glow: "shadow-[0_0_15px_rgba(220,38,38,0.5)]",
    riskHigh: "bg-red-600 shadow-red-500/50",
    riskMed: "bg-orange-500 shadow-orange-500/50",
    riskLow: "bg-emerald-500 shadow-emerald-500/50",
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getHeatMap();
        setPlanets(data);
        // Default select Coruscant or the first one
        if (data.length > 0) setSelectedPlanet(data.find(p => p.name === "Coruscant") || data[0]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getRiskColor = (risk: string) => {
    if (risk === "Critical" || risk === "Extreme") return theme.riskHigh;
    if (risk === "High" || risk === "Medium") return theme.riskMed;
    return theme.riskLow;
  };

  return (
    <div className="p-8 space-y-8 min-h-screen relative overflow-hidden">
      
      {/* HEADER */}
      <header className="flex items-center gap-4 border-b border-gray-800 pb-6 z-10 relative">
        <Radar className={`w-10 h-10 ${theme.text} animate-pulse`} />
        <div>
          <h1 className={`text-3xl font-black uppercase tracking-widest ${theme.text}`}>Galactic Heat Map</h1>
          <p className="text-gray-500 text-sm font-mono tracking-wider">:: Real-time Transponder Tracking // Cycle 3 ABY</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[70vh]">
        
        {/* --- THE MAP (Take up 3/4 space) --- */}
        <div className={`relative lg:col-span-3 rounded-xl border ${theme.border} bg-black/60 overflow-hidden group`}>
          
          {/* 1. BACKGROUND GRID (The "Graph Paper" look) */}
          <div className="absolute inset-0" 
            style={{ 
              backgroundImage: `linear-gradient(to right, #330505 1px, transparent 1px), linear-gradient(to bottom, #330505 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              opacity: 0.3
            }} 
          />

          {/* 2. RADAR SWEEP ANIMATION */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-[150%] h-[150%] bg-linear-to-b from-transparent via-red-900/10 to-transparent border-r border-red-500/20 origin-center"
              style={{ borderRadius: '50%' }}
            />
          </div>

          {/* 3. HYPERSPACE LANES (Connecting Lines) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            {planets.map((p1, i) => (
              planets.map((p2, j) => {
                // Draw line if they are relatively close (Simulating trade routes)
                const dist = Math.sqrt(Math.pow(p1.coords[0] - p2.coords[0], 2) + Math.pow(p1.coords[1] - p2.coords[1], 2));
                if (i < j && dist < 45) {
                  return (
                    <line 
                      key={`${i}-${j}`}
                      x1={`${p1.coords[0]}%`} y1={`${p1.coords[1]}%`}
                      x2={`${p2.coords[0]}%`} y2={`${p2.coords[1]}%`}
                      stroke="#EF4444" 
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  );
                }
                return null;
              })
            ))}
          </svg>

          {/* 4. PLANET NODES */}
          {planets.map((p) => {
            const isSelected = selectedPlanet?.id === p.id;
            const riskColor = getRiskColor(p.risk);

            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlanet(p)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group/node focus:outline-none"
                style={{ left: `${p.coords[0]}%`, top: `${p.coords[1]}%` }}
              >
                {/* Danger Aura for Critical Planets */}
                {(p.risk === "Critical" || p.risk === "Extreme") && (
                  <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl w-16 h-16 -ml-6 -mt-6 animate-pulse pointer-events-none"></div>
                )}

                {/* The Dot */}
                <div className={`
                  w-4 h-4 rounded-full border border-black transition-all duration-300 relative z-10
                  ${riskColor} ${isSelected ? 'scale-150 ring-2 ring-white' : 'opacity-80 hover:opacity-100 hover:scale-125'}
                `}>
                  {/* Ping Animation ring */}
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${riskColor}`}></span>
                </div>

                {/* Label (Visible on Hover or Select) */}
                <div className={`
                  absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-mono uppercase tracking-widest transition-opacity
                  ${isSelected ? 'opacity-100 font-bold text-white' : 'opacity-60 text-gray-400 group-hover/node:opacity-100'}
                `}>
                  {p.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* --- SIDEBAR: SECTOR INTEL --- */}
        <div className={`lg:col-span-1 p-6 rounded-xl border ${theme.border} ${theme.bg} backdrop-blur-sm relative`}>
          {selectedPlanet ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div>
                <h2 className="text-4xl font-black text-white uppercase">{selectedPlanet.name}</h2>
                <p className="text-red-400 font-mono text-xs tracking-[0.2em] mt-1">{selectedPlanet.sector} SECTOR</p>
              </div>

              <div className="space-y-4 pt-4 border-t border-red-900/30">
                <div>
                  <label className="text-gray-500 text-[10px] uppercase font-mono mb-1 flex items-center gap-2">
                    <ShieldAlert size={12} /> Threat Assessment
                  </label>
                  <div className={`text-lg font-bold ${selectedPlanet.risk === 'Critical' ? 'text-red-500' : 'text-amber-500'}`}>
                    {selectedPlanet.risk.toUpperCase()}
                  </div>
                  {/* Risk Bar */}
                  <div className="w-full bg-gray-900 h-1 mt-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${selectedPlanet.risk === 'Critical' ? 'bg-red-500' : 'bg-amber-500'}`} 
                      style={{ width: selectedPlanet.risk === 'Critical' ? '95%' : '60%' }}
                    ></div>
                  </div>
                </div>

                <div>
                  <label className="text-gray-500 text-[10px] uppercase font-mono mb-1 flex items-center gap-2">
                    <Activity size={12} /> Local Activity
                  </label>
                  <div className="text-white text-sm font-mono leading-relaxed">
                    "{selectedPlanet.activity}"
                  </div>
                </div>

                <div>
                  <label className="text-gray-500 text-[10px] uppercase font-mono mb-1 flex items-center gap-2">
                    <Navigation size={12} /> Coordinates
                  </label>
                  <div className="font-mono text-xs text-gray-400">
                    X: {selectedPlanet.coords[0].toFixed(4)} // Y: {selectedPlanet.coords[1].toFixed(4)}
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <button className="w-full py-3 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <MapIcon size={14} /> View Sector Logs
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4 opacity-50">
              <Target size={48} className="animate-pulse" />
              <p className="font-mono text-xs uppercase tracking-widest">Select a system</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}