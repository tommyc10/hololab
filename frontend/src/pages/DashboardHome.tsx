import { 
  AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Users, AlertTriangle, Activity, Cpu, LayoutDashboard } from 'lucide-react';

// --- UPDATED DATA: 3 FACTIONS ---
const conflictData = [
  // dawn: Crimson Dawn influence (The Purple Line)
  // chaos: General War/Instability (The Red Background)
  // hutts: Jabba's Power (The Gold Dashed Line)
  { name: '0 ABY', empire: 90, hutts: 40, chaos: 5, dawn: 2 },  // In shadows
  { name: '1 ABY', empire: 80, hutts: 35, chaos: 15, dawn: 10 }, // Rebuilding
  { name: '2 ABY', empire: 70, hutts: 45, chaos: 30, dawn: 40 }, // Recruiting
  { name: '3 ABY', empire: 55, hutts: 60, chaos: 85, dawn: 95 }, // THE AUCTION (Peak)
  { name: '4 ABY', empire: 40, hutts: 10, chaos: 95, dawn: 80 }, // Hidden Empire
];

export default function DashboardHome() {
  const username = localStorage.getItem("username");
  const isSyndicate = username === "crimson_dawn";

  // Theme Logic
  const theme = isSyndicate ? {
    text: "text-red-500",
    icon: Cpu,                  
    title: "Command Nexus",
    subtitle: "System Secure",  
    
    // Chart Colors
    chartStroke: "#ef4444", 
    chartFill: "url(#colorChaos)",
    secondaryStroke: "#eab308", 
    tertiaryStroke: "#d8b4fe",
    bg: "bg-red-950/10 border-red-900",
  } : {
    text: "text-cyan-400",
    icon: LayoutDashboard,      
    title: "Dashboard Overview",
    subtitle: "Sector Status",
    
    // Chart Colors
    chartStroke: "#06b6d4", 
    chartFill: "url(#colorEmpire)",
    bg: "bg-slate-900/50 border-cyan-900",
  };

  return (
    <div className="space-y-6">
      
      {/* --- STANDARDIZED HEADER --- */}
      <div className="flex items-center gap-4 mb-8">
        <theme.icon className={`w-10 h-10 ${theme.text}`} />
        <div>
          <h1 className={`text-3xl font-black uppercase tracking-widest ${theme.text}`}>
            {theme.title}
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-mono uppercase tracking-wider">
            :: {theme.subtitle}
          </p>
        </div>
      </div>

      {/* --- STAT CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Agents", val: "12", icon: Users },
          { label: "Credits Laundering", val: "10.5M", icon: TrendingUp },
          { label: "Open Bounties", val: "4", icon: Activity },
          { label: "Threat Level", val: "CRITICAL", icon: AlertTriangle, alert: true },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-lg border backdrop-blur-sm ${theme.bg} flex items-center justify-between`}
          >
            <div>
              <p className="text-xs text-gray-500 uppercase">{stat.label}</p>
              <p className={`text-xl font-bold font-mono ${stat.alert ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                {stat.val}
              </p>
            </div>
            <stat.icon size={20} className={theme.text} opacity={0.7} />
          </motion.div>
        ))}
      </div>

      {/* --- THE MAIN CHART --- */}
      <div className={`p-6 rounded-xl border backdrop-blur-sm ${theme.bg} h-[400px]`}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className={`text-lg font-bold uppercase ${theme.text}`}>
              Galactic Discord
            </h3>
            <p className="text-xs text-gray-500 font-mono">
              SYNDICATE WAR PROJECTION // 3 ABY
            </p>
          </div>
          
          {isSyndicate && (
            <div className="flex gap-4">
              {/* LEGEND */}
              <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-wider">
                 <div className="flex items-center gap-1 text-red-500"><div className="w-2 h-2 bg-red-500 rounded-full"></div>Chaos</div>
                 <div className="flex items-center gap-1 text-yellow-500"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div>Hutts</div>
                 <div className="flex items-center gap-1 text-purple-400"><div className="w-2 h-2 bg-purple-400 rounded-full"></div>Crimson Dawn</div>
              </div>
              <div className="px-3 py-1 bg-purple-900/20 border border-purple-500/50 text-purple-400 text-xs rounded uppercase font-bold animate-pulse">
                Protocol: Uprising
              </div>
            </div>
          )}
        </div>

        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={conflictData}>
            <defs>
              <linearGradient id="colorChaos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEmpire" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} />
            <YAxis stroke="#666" fontSize={12} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
              itemStyle={{ fontSize: '12px', textTransform: 'uppercase' }}
            />
            
            {isSyndicate ? (
              // SYNDICATE VIEW: 3 LAYERS
              <>
                {/* 1. The Chaos Background (Red Area) */}
                <Area type="monotone" dataKey="chaos" stroke={theme.chartStroke} strokeWidth={2} fillOpacity={1} fill={theme.chartFill} name="Instability" />
                
                {/* 2. The Hutts (Gold Dashed) */}
                <Line type="monotone" dataKey="hutts" stroke={theme.secondaryStroke} strokeWidth={2} strokeDasharray="5 5" dot={false} name="Hutt Influence" />
                
                {/* 3. Crimson Dawn (Purple Solid - The Main Character) */}
                <Line type="monotone" dataKey="dawn" stroke={theme.tertiaryStroke} strokeWidth={4} dot={{r: 4, fill: theme.tertiaryStroke}} name="Crimson Dawn" />
              </>
            ) : (
              // EMPIRE VIEW: Just Control
              <Area type="monotone" dataKey="empire" stroke={theme.chartStroke} strokeWidth={3} fillOpacity={1} fill={theme.chartFill} name="Imperial Control" />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}