import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, EyeOff, Activity, MapPin, Radio } from "lucide-react";
import { getOperatives } from "../api";
import type { Operative } from "../api";

export default function FieldAgents() {
  const [agents, setAgents] = useState<Operative[]>([]);
  const [filter, setFilter] = useState("All");
  const [, setLoading] = useState(true);

  // THEME CONFIG
  const theme = {
    text: "text-red-500",
    subtext: "text-red-400/60",
    border: "border-red-900/50",
    bg: "bg-red-950/20",
    glow: "shadow-[0_0_15px_rgba(220,38,38,0.5)]",
    card: "bg-black/60 backdrop-blur-md border-red-900/30",
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getOperatives();
        setAgents(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter Logic
  const filteredAgents = filter === "All" 
    ? agents 
    : agents.filter(a => a.status === filter);

  // Status Badge Helper
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Active": return "bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_10px_rgba(220,38,38,0.3)]";
      case "Sleeper": return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      case "Hunting": return "bg-amber-500/20 text-amber-400 border-amber-500/50";
      case "Researching": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      default: return "bg-gray-800 text-gray-500";
    }
  };

  return (
    <div className="p-8 space-y-8 min-h-screen relative">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-4">
          <Users className={`w-10 h-10 ${theme.text}`} />
          <div>
            <h1 className={`text-3xl font-black uppercase tracking-widest ${theme.text}`}>Sleeper Network</h1>
            <p className="text-gray-500 text-sm font-mono tracking-wider">:: EYES EVERYWHERE // VERMILLION COMMAND</p>
          </div>
        </div>

        {/* FILTER TABS */}
        <div className="flex gap-2 bg-black/40 p-1 rounded border border-gray-800">
          {["All", "Active", "Sleeper", "Hunting"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-1 text-xs font-bold uppercase rounded transition-all ${
                filter === tab ? "bg-red-600 text-black" : "text-gray-500 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* AGENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgents.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative group overflow-hidden rounded-xl border ${theme.card} hover:border-red-600/50 transition-all`}
          >
            {/* SCANLINE EFFECT */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
            
            <div className="flex h-full">
              {/* IMAGE SECTION (Left) */}
              <div className="w-1/3 relative border-r border-red-900/30 bg-black">
                {agent.image ? (
                  <img 
                    src={agent.image} 
                    alt={agent.name} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-700">
                    <Users size={32} />
                  </div>
                )}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
              </div>

              {/* INFO SECTION (Right) */}
              <div className="w-2/3 p-5 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-white leading-none">{agent.name}</h2>
                    <span className={`text-[10px] px-2 py-0.5 border rounded uppercase font-mono ${getStatusBadge(agent.status)}`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-red-500 font-mono text-xs uppercase tracking-widest mb-4">{agent.role}</p>

                  <div className="space-y-2 text-xs font-mono text-gray-400">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-1">
                      <span className="flex items-center gap-2"><MapPin size={10} /> LOC:</span>
                      <span className="text-white">{agent.location}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-800 pb-1">
                      <span className="flex items-center gap-2"><EyeOff size={10} /> CVR:</span>
                      <span className="text-white">{agent.cover}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-red-900/20 flex gap-2">
                   <button className="flex-1 py-2 bg-red-950/30 border border-red-900/50 text-red-400 hover:bg-red-600 hover:text-black text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                     <Radio size={12} /> Contact
                   </button>
                   <button className="flex-1 py-2 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2">
                     <Activity size={12} /> Dossier
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}