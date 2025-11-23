import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Skull, ShieldAlert, CheckCircle, Loader2, Plus, X, Search, Lock } from "lucide-react";
import { getBounties, updateBountyStatus, createBounty } from "../api";
import type { Bounty } from "../api";

export default function Eliminations() {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBounty, setNewBounty] = useState({ name: "", region: "", reward: 0 });

  const username = localStorage.getItem("username");
  const isSyndicate = username === "crimson_dawn";

  // --- THEME CONFIGURATION ---
  const theme = isSyndicate
    ? {
        title: "Active Contracts",
        subtitle: "NO DISINTEGRATIONS",
        icon: Skull,
        text: "text-red-500",
        border: "border-red-900/50",
        bg: "bg-red-950/20",
        glow: "shadow-red-900/50",
        btn: "bg-red-600 hover:bg-red-700 text-black",
        input: "bg-red-950/30 border-red-900 text-red-100 placeholder:text-red-500/30 focus:border-red-500"
      }
    : {
        title: "Priority Targets",
        subtitle: "FOR THE SECURITY OF THE SECTOR",
        icon: Crosshair,
        text: "text-cyan-400",
        border: "border-cyan-900/50",
        bg: "bg-slate-900/50",
        glow: "shadow-cyan-900/50",
        btn: "bg-cyan-600 hover:bg-cyan-500 text-white",
        input: "bg-slate-900 border-cyan-900 text-cyan-100 placeholder:text-cyan-500/30 focus:border-cyan-500"
      };

  // --- DATA FETCHING ---
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getBounties();
        const filtered = data.filter((b) => 
          isSyndicate ? b.type === "Syndicate" : b.type === "Empire"
        );
        setBounties(filtered);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [isSyndicate]);

  // --- ACTIONS (LORE LOGIC UPDATED) ---
  const handleAction = async (id: number, currentStatus: string) => {
    setProcessingId(id);
    
    let newStatus = "Hunting"; // Default fallback

    // Logic Flow:
    if (currentStatus === "Auction") {
        // You hosted the auction -> Item Sold -> Completed
        newStatus = "Completed"; 
    }
    else if (currentStatus === "Intercept") {
        // You seize the asset -> Now you are actively fighting/securing it -> Hunting
        newStatus = "Hunting"; 
    }
    else if (currentStatus === "Hired") {
        // You activate the mercenaries -> They go on the hunt -> Hunting
        newStatus = "Hunting";
    }
    else if (currentStatus === "Hunting") {
        // Target terminated -> Completed
        newStatus = "Completed";
    }

    try {
      setBounties((prev) => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b));
      await updateBountyStatus(id, newStatus);
    } catch (error) { 
      console.error(error); 
    } finally { 
      setProcessingId(null); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const type = isSyndicate ? "Syndicate" : "Empire";
    try {
      const created = await createBounty({ ...newBounty, type });
      setBounties([...bounties, created]);
      setIsModalOpen(false);
      setNewBounty({ name: "", region: "", reward: 0 });
    } catch (error) { 
      console.error("Failed to create bounty", error); 
    }
  };

  // --- STYLE HELPER (HOVER GLOW) ---
  const getStyles = (status: string) => {
    const baseCard = "transition-all duration-300 border-opacity-50 shadow-none"; 
    
    switch (status) {
      case "Auction": // Purple (The Vermillion / Luxury)
        return {
          card: `${baseCard} border-neon-purple bg-neon-purple/10 hover:shadow-[0_0_30px_var(--color-neon-purple)]`,
          tag: "text-neon-purple border-neon-purple shadow-[0_0_10px_var(--color-neon-purple)] bg-neon-purple/10",
          btn: "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        };
      case "Intercept": // Orange (Tactical/Heat)
        return {
          card: `${baseCard} border-thermal-orange bg-thermal-orange/10 hover:shadow-[0_0_30px_var(--color-thermal-orange)]`,
          tag: "text-thermal-orange border-thermal-orange shadow-[0_0_10px_var(--color-thermal-orange)] bg-thermal-orange/10",
          btn: "bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]"
        };
      case "Hunting": // Sand/Gold (Bounty Hunter Guild)
        return {
          card: `${baseCard} border-tatooine-sand bg-tatooine-sand/10 hover:shadow-[0_0_30px_var(--color-tatooine-sand)]`,
          tag: "text-tatooine-sand border-tatooine-sand shadow-[0_0_10px_var(--color-tatooine-sand)] bg-tatooine-sand/10",
          btn: "bg-amber-500 hover:bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
        };
      case "Hired": // Blue (Business Transaction)
        return {
          card: `${baseCard} border-hologram-blue bg-hologram-blue/10 hover:shadow-[0_0_30px_var(--color-hologram-blue)]`,
          tag: "text-hologram-blue border-hologram-blue shadow-[0_0_10px_var(--color-hologram-blue)] bg-hologram-blue/10",
          btn: "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
        };
      case "Avoid": // Red (Danger)
        return {
          card: `${baseCard} border-sith-red bg-sith-red/10 hover:shadow-[0_0_30px_var(--color-sith-red)]`,
          tag: "text-sith-red border-sith-red shadow-[0_0_10px_var(--color-sith-red)] bg-sith-red/10",
          btn: "bg-red-600/50 text-white/50 cursor-not-allowed border border-red-900" // Dimmed button
        };
      case "Completed": // Gray (Archive)
        return {
          card: "border-gray-800 bg-black/40 grayscale-[0.6] shadow-none opacity-75",
          tag: "text-yoda-green border-yoda-green/30 opacity-60",
          btn: "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
        };
      default: // Fallback
        return {
          card: `${baseCard} ${theme.border} ${theme.bg} hover:${theme.glow}`,
          tag: `${theme.text} border-current opacity-70`,
          btn: theme.btn
        };
    }
  };

  // --- BUTTON TEXT HELPER (LORE ACCURATE) ---
  const getButtonText = (status: string, isProcessing: boolean, isCompleted: boolean) => {
    if (isProcessing) return <Loader2 size={16} className="animate-spin" />;
    
    // Different text for "Completed" based on context could go here, but SOLD/PAID works.
    if (isCompleted) return <><CheckCircle size={16} /> {status === 'Auction' ? 'SOLD' : 'PAID'}</>;
    
    switch (status) {
      case "Auction":   
        return "OPEN BIDDING"; // You are the host
      case "Intercept": 
        return "SEIZE ASSET";  // You are stealing it
      case "Hunting":   
        return "TERMINATE";    // Order the kill
      case "Hired":     
        return "ACTIVATE UNIT"; // Send them to work
      case "Avoid":     
        return "DO NOT ENGAGE"; // Safety warning
      default:          
        return isSyndicate ? "AUTHORIZE" : "DEPLOY";
    }
  };

  const filteredBounties = bounties.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className={`p-8 font-mono animate-pulse ${theme.text}`}>SCANNING SECTOR DATABANKS...</div>;

  return (
    <div className="p-8 space-y-8 min-h-screen relative">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-4">
          <theme.icon className={`w-10 h-10 ${theme.text}`} />
          <div>
            <h1 className={`text-3xl font-black uppercase tracking-widest ${theme.text}`}>{theme.title}</h1>
            <p className="text-gray-500 text-sm font-mono tracking-wider">{theme.subtitle}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative group w-full md:w-64">
            <Search className={`absolute left-3 top-2.5 w-4 h-4 transition-colors ${theme.text} opacity-50 group-focus-within:opacity-100`} />
            <input 
              type="text" 
              placeholder="Search Target ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-sm rounded outline-none border transition-all ${theme.input}`}
            />
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase rounded whitespace-nowrap ${theme.btn}`}
          >
            <Plus size={16} /> New Target
          </button>
        </div>
      </header>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBounties.map((bounty, i) => {
          const isCompleted = bounty.status === "Completed";
          const styles = getStyles(bounty.status);
          const isDisabled = isCompleted || processingId === bounty.id || bounty.status === "Avoid";

          return (
            <motion.div
              key={bounty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-6 rounded-xl border backdrop-blur-sm overflow-hidden group 
                ${styles.card}
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className={`text-xl font-bold text-white`}>{bounty.name}</h2>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mt-1 flex items-center gap-1 font-mono">
                    <ShieldAlert size={12} /> {bounty.region}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-bold border rounded ${styles.tag}`}>
                  {bounty.status.toUpperCase()}
                </span>
              </div>
              
              <div className="mt-8 flex items-end justify-between">
                <div>
                  <span className="text-xs text-gray-500 uppercase font-mono">Bounty</span>
                  <div className={`text-2xl font-mono ${bounty.status === 'Hunting' ? 'text-amber-500' : 'text-white'}`}>
                    {bounty.reward.toLocaleString()} <span className="text-xs text-gray-500">CR</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleAction(bounty.id, bounty.status)}
                  disabled={isDisabled}
                  className={`px-4 py-2 text-sm font-bold rounded transition-all uppercase tracking-wide flex items-center gap-2
                    ${styles.btn}
                  `}
                >
                  {/* If it's avoid, show a Lock icon, otherwise show standard text logic */}
                  {bounty.status === 'Avoid' && !isCompleted ? <Lock size={16} /> : null}
                  {getButtonText(bounty.status, processingId === bounty.id, isCompleted)}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CREATE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md p-6 rounded-xl border ${theme.border} bg-gray-950 shadow-2xl relative`}
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20} /></button>
              <h2 className={`text-2xl font-bold mb-6 uppercase ${theme.text}`}>New Contract</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" required placeholder="Name" value={newBounty.name} onChange={e => setNewBounty({...newBounty, name: e.target.value})} className={`w-full px-4 py-2 rounded border outline-none ${theme.input}`} />
                <input type="text" required placeholder="Region" value={newBounty.region} onChange={e => setNewBounty({...newBounty, region: e.target.value})} className={`w-full px-4 py-2 rounded border outline-none ${theme.input}`} />
                <input type="number" required placeholder="Reward" value={newBounty.reward} onChange={e => setNewBounty({...newBounty, reward: parseInt(e.target.value)})} className={`w-full px-4 py-2 rounded border outline-none ${theme.input}`} />
                <button type="submit" className={`w-full py-3 mt-4 font-bold uppercase rounded ${theme.btn}`}>Initialize</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}