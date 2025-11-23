import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Radar, ShieldAlert, Map as MapIcon } from "lucide-react";

interface Planet {
  id: number;
  name: string;
  sector: string;
  coords: [number, number]; // x, y percentages
  risk: string;
  activity: string;
}

export default function HeatMap() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  
  const username = localStorage.getItem("username");
  const isSyndicate = username === "crimson_dawn";

  // THEME
  const theme = isSyndicate
    ? {
        text: "text-red-500",
        mapBg: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/10 via-black to-black",
        grid: "border-red-900/20",
        nodeSafe: "bg-red-900/50 border-red-800",
        nodeCritical: "bg-red-500 border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.6)]",
        panel: "border-red-900 bg-red-950/20"
      }
    : {
        text: "text-cyan-400",
        mapBg: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-black to-black",
        grid: "border-cyan-900/20",
        nodeSafe: "bg-cyan-900/50 border-cyan-800",
        nodeCritical: "bg-orange-500 border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.6)]",
        panel: "border-cyan-900 bg-slate-900/50"
      };

  useEffect(() => {
    fetch("http://localhost:8000/heat")
      .then(res => res.json())
      .then(data => setPlanets(data));
  }, []);

  return (
    <div className="p-8 h-[calc(100vh-2rem)] flex flex-col">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className={`text-3xl font-black uppercase tracking-widest ${theme.text} flex items-center gap-3`}>
            <Radar className={isSyndicate ? "animate-spin-slow" : ""} />
            {isSyndicate ? "Galactic Heat Map" : "Sector Security"}
          </h1>
          <p className="text-gray-500 text-sm font-mono mt-1">
            Real-time transponder tracking // Cycle 3 ABY
          </p>
        </div>
        
        {/* LEGEND */}
        <div className="flex gap-4 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isSyndicate ? 'bg-red-900' : 'bg-cyan-900'}`} />
            {isSyndicate ? "Clear" : "Secure"}
          </div>
          <div className="flex items-center gap-2">
             <div className={`w-3 h-3 rounded-full animate-pulse ${isSyndicate ? 'bg-red-500' : 'bg-orange-500'}`} />
             {isSyndicate ? "Imp. Blockade" : "Rebel Activity"}
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* THE MAP (Flex Grow) */}
        <div className={`relative flex-1 rounded-xl border ${theme.grid} ${theme.mapBg} overflow-hidden shadow-2xl`}>
          
          {/* Decorative Grid Lines */}
          <div className={`absolute inset-0 opacity-20`} 
               style={{ backgroundImage: `linear-gradient(${isSyndicate ? '#450a0a' : '#164e63'} 1px, transparent 1px), linear-gradient(90deg, ${isSyndicate ? '#450a0a' : '#164e63'} 1px, transparent 1px)`, backgroundSize: '50px 50px' }}>
          </div>

          {/* PLANET NODES */}
          {planets.map((planet) => {
            const isCritical = planet.risk === "Critical" || planet.risk === "High";
            
            return (
              <motion.button
                key={planet.id}
                onClick={() => setSelectedPlanet(planet)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                style={{ left: `${planet.coords[0]}%`, top: `${planet.coords[1]}%` }}
                className={`absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 cursor-pointer transition-colors z-10
                  ${isCritical ? theme.nodeCritical : theme.nodeSafe}
                `}
              >
                {/* Ping Animation for Critical planets */}
                {isCritical && (
                  <span className={`absolute -inset-2 rounded-full opacity-30 animate-ping ${isSyndicate ? 'bg-red-500' : 'bg-orange-500'}`} />
                )}
                
                {/* Label */}
                <span className={`absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono whitespace-nowrap uppercase tracking-wider
                  ${selectedPlanet?.id === planet.id ? 'text-white font-bold' : 'text-gray-500'}
                `}>
                  {planet.name}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* INFO PANEL (Fixed Width) */}
        <div className={`w-80 rounded-xl border p-6 backdrop-blur-md ${theme.panel}`}>
          {selectedPlanet ? (
            <motion.div 
              key={selectedPlanet.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className={`text-2xl font-bold uppercase ${theme.text} mb-1`}>{selectedPlanet.name}</h2>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-6 border-b border-gray-700 pb-2">
                {selectedPlanet.sector} Sector
              </p>

              <div className="space-y-6">
                <div>
                  <span className="text-gray-500 text-xs block mb-1">Status Report</span>
                  <div className={`text-lg font-mono flex items-center gap-2 ${selectedPlanet.risk === 'Critical' ? 'text-red-400' : 'text-gray-300'}`}>
                    <ShieldAlert size={18} />
                    {selectedPlanet.activity}
                  </div>
                </div>

                <div>
                  <span className="text-gray-500 text-xs block mb-1">Threat Level</span>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isSyndicate ? 'bg-red-500' : 'bg-cyan-500'}`} 
                      style={{ width: selectedPlanet.risk === 'Critical' ? '100%' : selectedPlanet.risk === 'High' ? '75%' : '25%' }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                    <span>LOW</span>
                    <span>CRITICAL</span>
                  </div>
                </div>
                
                <button className={`w-full py-2 mt-4 text-xs font-bold uppercase border rounded hover:bg-white/5 transition-colors ${theme.text} ${isSyndicate ? 'border-red-900' : 'border-cyan-900'}`}>
                  View Sector Logs
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
              <MapIcon size={48} className="opacity-20" />
              <p className="text-center text-xs font-mono">SELECT A SYSTEM TO<br/>VIEW INTELLIGENCE</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}