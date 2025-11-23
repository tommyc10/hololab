import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, EyeOff } from "lucide-react";

interface Operative {
  id: number;
  name: string;
  location: string;
  role: string;
  status: string;
  cover: string;
  image: string; // <--- 1. ADDED THIS
}

export default function Operatives() {
  const [operatives, setOperatives] = useState<Operative[]>([]);
  const username = localStorage.getItem("username");
  const isSyndicate = username === "crimson_dawn";

  // THEME CONFIG
  const theme = isSyndicate 
    ? { 
        title: "Sleeper Network", 
        subtitle: "EYES EVERYWHERE",
        text: "text-red-500", 
        border: "border-red-900", 
        bg: "bg-red-950/10", 
        icon: EyeOff,
        cardGlow: "hover:shadow-red-900/40"
      }
    : { 
        title: "Personnel Registry", 
        subtitle: "IMPERIAL STAFFING",
        text: "text-cyan-400", 
        border: "border-cyan-900", 
        bg: "bg-slate-900/50", 
        icon: Users,
        cardGlow: "hover:shadow-cyan-900/40"
      };

  useEffect(() => {
    fetch("http://localhost:8000/operatives")
      .then(res => res.json())
      .then(data => setOperatives(data));
  }, []);

  return (
    <div className="p-8 space-y-8 min-h-screen">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {operatives.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 border rounded-xl backdrop-blur-sm flex items-start gap-4 transition-shadow duration-300 hover:shadow-lg
              ${theme.border} ${theme.bg} ${theme.cardGlow}`}
          >
            
            {/* --- 2. START OF AVATAR IMAGE LOGIC --- */}
            <div className={`relative w-16 h-16 rounded-full overflow-hidden border-2 ${theme.border} shrink-0 bg-black group`}>
              
              {/* The Image itself */}
              <img 
                src={agent.image} 
                alt={agent.name}
                className="w-full h-full object-cover grayscale contrast-125 brightness-110 group-hover:grayscale-0 transition-all duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${agent.name}&background=000&color=fff`;
                }}
              />
              
              {/* Color Tint (Red or Blue) */}
              <div className={`absolute inset-0 mix-blend-color ${isSyndicate ? 'bg-red-600' : 'bg-cyan-500'} opacity-50 group-hover:opacity-0 transition-opacity duration-500`}></div>

              {/* Scanline Texture */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-size-[100%_3px] pointer-events-none opacity-40"></div>
            </div>
            {/* --- END OF AVATAR IMAGE LOGIC --- */}


            {/* 3. TEXT DETAILS (This remains the same) */}
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-white text-lg leading-none mb-1">{agent.name}</h3>
                
                {/* Status Badge */}
                <div className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase
                  ${agent.status === 'Compromised' ? 'border-red-500 text-red-500 bg-red-500/10' : 
                    agent.status === 'Deep Cover' ? 'border-purple-500 text-purple-500 bg-purple-500/10' : 
                    `border-gray-600 text-gray-400`}`}
                >
                  {agent.status}
                </div>
              </div>

              <p className={`text-xs ${theme.text} font-mono uppercase mb-4`}>{agent.role}</p>

              {/* Details */}
              <div className="space-y-1 text-xs text-gray-400 font-mono border-t border-gray-800 pt-3">
                <div className="flex justify-between">
                  <span>LOCATION:</span>
                  <span className="text-gray-300">{agent.location}</span>
                </div>
                <div className="flex justify-between">
                  <span>COVER:</span>
                  <span className="text-gray-300">{agent.cover}</span>
                </div>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </div>
  );
}