import { useEffect, useState } from "react";
import { 
  AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Database, Crosshair, Globe, Cpu, LayoutDashboard, Shield } from 'lucide-react';
import { getBounties, getFinance, getHeatMap, getOperatives } from "../api";
// 1. IMPORT YOUR THEME HELPER
import { getFactionTheme } from "../utils/theme"; 

// --- LORE DATA: MULTI-FACTION PROJECTIONS ---
const conflictData = [
  // empire: Imperial Control
  // hutts: Jabba's Influence
  // dawn: Qi'ra's insurgence (Purple)
  // sun: Prince Xizor's Black Sun (Green)
  { name: '0 ABY', empire: 90, hutts: 40, sun: 60, dawn: 2 },   
  { name: '1 ABY', empire: 80, hutts: 35, sun: 65, dawn: 10 }, 
  { name: '2 ABY', empire: 70, hutts: 45, sun: 75, dawn: 40 }, 
  { name: '3 ABY', empire: 55, hutts: 60, sun: 90, dawn: 95 }, // Current Era (Chaos)
  { name: '4 ABY', empire: 40, hutts: 10, sun: 95, dawn: 80 }, // Projection
];

export default function DashboardHome() {
  // 2. GET CURRENT USER & THEME
  const username = localStorage.getItem("username");
  const theme = getFactionTheme(username);

  const [stats, setStats] = useState({
    credits: 0,
    activeTargets: 0,
    criticalSectors: 0,
    activeAgents: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSitrep() {
      try {
        const [bounties, finance, heat, agents] = await Promise.all([
          getBounties(), getFinance(), getHeatMap(), getOperatives()
        ]);

        // Filter logic based on Faction
        // (Black Sun agents vs Crimson Dawn agents, etc.)
        // For now, we count ALL, but you can refine this using filter() if your DB supports it.
        const totalCredits = finance.reduce((sum, t) => sum + t.amount, 0);
        const targets = bounties.filter(b => b.status !== "Completed").length;
        const critical = heat.filter(p => p.risk === "Critical" || p.risk === "Extreme").length;
        const activeOps = agents.filter(a => a.status === "Active").length;

        setStats({
          credits: totalCredits,
          activeTargets: targets,
          criticalSectors: critical,
          activeAgents: activeOps
        });
      } catch (e) {
        console.error("Sitrep failed", e);
      } finally {
        setLoading(false);
      }
    }
    loadSitrep();
  }, [username]);

  // 3. ICON MAPPING
  // Different icons for different factions to add flavor
  const HeaderIcon = username === "black_sun" ? Shield : (username === "crimson_dawn" ? Cpu : LayoutDashboard);

  // 4. STAT CARDS CONFIG
  const statCards = [
    { 
      label: "Network Assets", 
      val: stats.activeAgents.toString(), 
      icon: Users,
      alert: false
    },
    { 
      label: "Liquid Reserves", 
      val: stats.credits.toLocaleString(), 
      unit: "CR",
      icon: Database,
      alert: false 
    },
    { 
      label: "Open Contracts", 
      val: stats.activeTargets.toString(), 
      icon: Crosshair,
      alert: false 
    },
    { 
      label: "Conflict Zones", 
      val: stats.criticalSectors.toString(), 
      icon: Globe, 
      alert: stats.criticalSectors > 0 
    },
  ];

  return (
    <div className="p-8 space-y-8 min-h-screen relative">
      
      {/* --- HEADER --- */}
      <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-6">
        <HeaderIcon className={`w-10 h-10 ${theme.text} animate-pulse`} />
        <div>
          <h1 className={`text-3xl font-black uppercase tracking-widest ${theme.text}`}>
            {username === "black_sun" ? "Vigo Command" : theme.name === "Crimson Dawn" ? "Command Nexus" : "Imperial Dashboard"}
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-mono uppercase tracking-wider">
            :: System Secure // {theme.name.toUpperCase()} PROTOCOL
          </p>
        </div>
      </div>

      {/* --- STAT CARDS (Dynamic Theme) --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-xl border backdrop-blur-sm ${theme.bg} ${theme.border} flex items-center justify-between group hover:bg-white/5 transition-colors`}
          >
            <div>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">{stat.label}</p>
              <p className={`text-2xl font-black font-mono ${stat.alert ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                {loading ? "..." : stat.val} <span className="text-xs font-normal text-gray-600">{stat.unit}</span>
              </p>
            </div>
            <div className={`p-3 rounded-lg bg-black/30 ${theme.text}`}>
              <stat.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- THE MAIN CHART --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className={`p-6 rounded-xl border backdrop-blur-sm ${theme.bg} ${theme.border} h-[500px] relative overflow-hidden`}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className={`text-lg font-bold uppercase ${theme.text} flex items-center gap-2`}>
              <TrendingUp size={20} /> 
              {username === "black_sun" ? "Influence Projection" : "Galactic Discord"}
            </h3>
            <p className="text-xs text-gray-500 font-mono tracking-wider mt-1">
              WAR PROJECTION // 3 ABY
            </p>
          </div>
          
          {/* LEGEND (Adapts to Faction) */}
          <div className="flex gap-6">
             <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-wider bg-black/40 px-4 py-2 rounded border border-gray-800">
                
                {/* IF EMPIRE: Show Control */}
                {theme.name === "Galactic Empire" && (
                   <div className="flex items-center gap-2 text-cyan-500"><div className="w-2 h-2 bg-cyan-500 rounded-full"></div>Control</div>
                )}

                {/* IF CRIMSON DAWN: Show Chaos vs Dawn */}
                {theme.name === "Crimson Dawn" && (
                  <>
                   <div className="flex items-center gap-2 text-red-500"><div className="w-2 h-2 bg-red-500 rounded-full"></div>Chaos</div>
                   <div className="flex items-center gap-2 text-purple-400"><div className="w-2 h-2 bg-purple-400 rounded-full"></div>Crimson Dawn</div>
                  </>
                )}

                {/* IF BLACK SUN: Show Sun vs Empire */}
                {theme.name === "Black Sun" && (
                  <>
                   <div className="flex items-center gap-2 text-emerald-500"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div>Black Sun</div>
                   <div className="flex items-center gap-2 text-cyan-600"><div className="w-2 h-2 bg-cyan-600 rounded-full"></div>Empire</div>
                  </>
                )}
             </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={conflictData}>
            <defs>
              <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={username === 'black_sun' ? '#10b981' : (username === 'crimson_dawn' ? '#ef4444' : '#06b6d4')} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={username === 'black_sun' ? '#10b981' : '#ef4444'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} opacity={0.5} />
            <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#000', border: `1px solid #333`, borderRadius: '8px' }}
              itemStyle={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 'bold' }}
            />
            
            {/* --- CHART LOGIC BASED ON FACTION --- */}
            
            {/* 1. EMPIRE VIEW */}
            {theme.name === "Galactic Empire" && (
              <Area type="monotone" dataKey="empire" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorMain)" name="Imperial Control" />
            )}

            {/* 2. CRIMSON DAWN VIEW */}
            {theme.name === "Crimson Dawn" && (
              <>
                <Area type="monotone" dataKey="chaos" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorMain)" name="Instability" />
                <Line type="monotone" dataKey="dawn" stroke="#d8b4fe" strokeWidth={4} dot={{r: 6, fill: "#d8b4fe", strokeWidth: 0}} name="Crimson Dawn" />
              </>
            )}

            {/* 3. BLACK SUN VIEW (New) */}
            {theme.name === "Black Sun" && (
              <>
                <Area type="monotone" dataKey="empire" stroke="#0e7490" strokeWidth={2} fillOpacity={0.1} fill="#0e7490" name="Empire" />
                <Line type="monotone" dataKey="sun" stroke="#10b981" strokeWidth={4} dot={{r: 6, fill: "#10b981", strokeWidth: 0}} name="Black Sun" />
              </>
            )}

          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}