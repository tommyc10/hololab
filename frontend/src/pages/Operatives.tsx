import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, EyeOff } from "lucide-react";
import { getOperatives, type Operative } from "../api"; // Importing from your clean API file

export default function Operatives() {
  const [operatives, setOperatives] = useState<Operative[]>([]);
  const [loading, setLoading] = useState(true);
  
  const username = localStorage.getItem("username");
  const isSyndicate = username === "crimson_dawn";

  // 1. SIMPLE THEME CONFIG OBJECT
  // This keeps your JSX clean by hiding the color logic here
  const theme = isSyndicate 
    ? { 
        title: "Sleeper Network", 
        subtitle: "EYES EVERYWHERE",
        text: "text-red-500", 
        border: "border-red-900/50", 
        bg: "bg-red-950/20", 
        icon: EyeOff,
        glow: "hover:shadow-[0_0_15px_rgba(220,38,38,0.3)]"
      }
    : { 
        title: "Personnel Registry", 
        subtitle: "IMPERIAL STAFFING",
        text: "text-cyan-400", 
        border: "border-cyan-900/50", 
        bg: "bg-slate-900/50", 
        icon: Users,
        glow: "hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
      };

  // 2. DATA FETCHING
  // Using the function from api.ts keeps this component focused on UI, not networking
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getOperatives();
        setOperatives(data);
      } catch (error) {
        console.error("Failed to load agents", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // 3. IMAGE HELPER
  // Handles missing images gracefully
  const getImageUrl = (path: string | null, name: string) => {
    if (!path) return `https://ui-avatars.com/api/?name=${name}&background=000&color=fff`;
    return path; // This assumes images are in public/ folder
  };

  if (loading) return <div className={`p-8 ${theme.text} animate-pulse`}>DECRYPTING FILES...</div>;

  return (
    <div className="p-8 space-y-8 min-h-screen">
      {/* HEADER */}
      <header className="flex items-center gap-4 border-b border-gray-800 pb-6">
        <theme.icon className={`w-10 h-10 ${theme.text}`} />
        <div>
          <h1 className={`text-3xl font-black uppercase tracking-widest ${theme.text}`}>
            {theme.title}
          </h1>
          <p className="text-gray-500 text-sm font-mono mt-1">
            {theme.subtitle}
          </p>
        </div>
      </header>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operatives.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`
              relative overflow-hidden p-4 rounded-xl border backdrop-blur-md group transition-all duration-300
              ${theme.border} ${theme.bg} ${theme.glow}
            `}
          >
            {/* Scanline Background Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] pointer-events-none opacity-20" />

            <div className="flex items-start gap-4 relative z-10">
              
              {/* AVATAR */}
              <div className={`w-20 h-20 rounded-lg overflow-hidden border ${theme.border} shrink-0 bg-black`}>
                <img 
                  src={getImageUrl(agent.image, agent.name)} 
                  alt={agent.name}
                  className="w-full h-full object-cover filter sepia-[.5] contrast-125 group-hover:sepia-0 transition-all duration-500"
                />
              </div>

              {/* TEXT INFO */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-white text-lg truncate pr-2">{agent.name}</h3>
                  
                  {/* Status Badge */}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase whitespace-nowrap
                    ${agent.status === 'Compromised' ? 'border-yellow-600 text-yellow-500 bg-yellow-500/10' : 
                      agent.status === 'Sleeper' ? 'border-purple-600 text-purple-400 bg-purple-500/10' : 
                      `${theme.border} ${theme.text}`}`}
                  >
                    {agent.status}
                  </span>
                </div>

                <p className={`text-xs ${theme.text} font-mono uppercase tracking-wider mb-3`}>
                  {agent.role}
                </p>

                <div className="space-y-1 text-xs text-gray-400 font-mono border-t border-gray-700/50 pt-2">
                  <div className="flex justify-between">
                    <span>LOC:</span>
                    <span className="text-gray-200">{agent.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CVR:</span>
                    <span className="text-gray-200">{agent.cover}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}