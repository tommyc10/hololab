import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crosshair, Skull, ShieldAlert, CheckCircle, Loader2, Plus, X, Search, Filter } from "lucide-react";

interface Bounty {
  id: number;
  name: string;
  region: string;
  reward: number;
  status: string;
  type: string;
}

export default function Eliminations() {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<number | null>(null);
  
  // NEW: Search State
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBounty, setNewBounty] = useState({ name: "", region: "", reward: 0 });

  const username = localStorage.getItem("username");
  const isSyndicate = username === "crimson_dawn";

  // THEME CONFIG
  const theme = isSyndicate
    ? {
        title: "Active Contracts",
        subtitle: "NO DISINTEGRATIONS",
        icon: Skull,
        text: "text-red-500",
        border: "border-red-900",
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
        border: "border-cyan-900",
        bg: "bg-slate-900/50",
        glow: "shadow-cyan-900/50",
        btn: "bg-cyan-600 hover:bg-cyan-500 text-white",
        input: "bg-slate-900 border-cyan-900 text-cyan-100 placeholder:text-cyan-500/30 focus:border-cyan-500"
      };

  useEffect(() => { fetchBounties(); }, [isSyndicate]);

  const fetchBounties = () => {
    fetch("http://localhost:8000/bounties")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((b: Bounty) => 
          isSyndicate ? b.type === "Syndicate" : b.type === "Empire"
        );
        setBounties(filtered);
        setLoading(false);
      });
  };

  const handleAction = async (id: number) => {
    setProcessingId(id);
    const newStatus = isSyndicate ? "Hunting" : "Detained"; 
    try {
      const response = await fetch(`http://localhost:8000/bounties/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setBounties((prev) => prev.map((b) => b.id === id ? { ...b, status: newStatus } : b));
      }
    } catch (error) { console.error(error); } finally { setProcessingId(null); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const type = isSyndicate ? "Syndicate" : "Empire";
    try {
      const response = await fetch("http://localhost:8000/bounties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newBounty, type }),
      });
      if (response.ok) {
        const createdBounty = await response.json();
        setBounties([...bounties, createdBounty]);
        setIsModalOpen(false);
        setNewBounty({ name: "", region: "", reward: 0 });
      }
    } catch (error) { console.error("Failed to create bounty", error); }
  };

  // --- HELPER: Get Dynamic Status Color ---
  const getStatusColor = (status: string) => {
    if (status === "Completed" || status === "Detained") return "text-green-500 border-green-500/30 opacity-70";
    if (status === "Hunting") return "text-amber-500 border-amber-500/50";
    if (status === "Auction") return "text-purple-400 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]";
    if (status === "High Priority") return "text-yellow-400 border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.3)]";
  };

  // --- FILTER LOGIC ---
  const filteredBounties = bounties.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8 text-white font-mono animate-pulse">SCANNING SECTOR DATABANKS...</div>;

  return (
    <div className="p-8 space-y-8 min-h-screen relative">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-4">
          <theme.icon className={`w-10 h-10 ${theme.text}`} />
          <div>
            <h1 className={`text-3xl font-black uppercase tracking-widest ${theme.text}`}>
              {theme.title}
            </h1>
            <p className="text-gray-500 text-sm font-mono tracking-wider">
              {theme.subtitle}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* SEARCH BAR */}
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
          const isCompleted = ["Completed", "Detained", "Hunting", "Auction"].includes(bounty.status);
          const statusStyle = getStatusColor(bounty.status);

          return (
            <motion.div
              key={bounty.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-6 rounded-xl border backdrop-blur-sm overflow-hidden group hover:shadow-lg transition-all 
                ${bounty.status === 'Auction' 
                  ? 'border-purple-500 bg-purple-900/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]' // 🟣 Special Glow for Auction
                  : bounty.status === 'High Priority' 
                    ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_25px_rgba(251,191,36,0.4)]' // 🟡 Special Glow for High Priority
                  : isCompleted && bounty.status !== "Hunting" 
                    ? 'border-gray-800 bg-black/40 grayscale-[0.5]' // ⚫ Completed/Dead Style
                    : `${theme.border} ${theme.bg} ${theme.glow}`   // 🔴 Standard Active Style
                }
              `}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className={`text-xl font-bold ${bounty.status === 'Hunting' ? 'text-amber-500' : 'text-white'}`}>
                    {bounty.name}
                  </h2>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mt-1 flex items-center gap-1 font-mono">
                    <ShieldAlert size={12} /> {bounty.region}
                  </p>
                </div>
                {/* Dynamic Status Badge */}
                <span className={`px-2 py-1 text-xs font-bold border rounded ${statusStyle}`}>
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
                  onClick={() => handleAction(bounty.id)}
                  disabled={isCompleted || processingId === bounty.id}
                  className={`px-4 py-2 text-sm font-bold rounded transition-all uppercase tracking-wide flex items-center gap-2
                    ${isCompleted ? "bg-gray-900 border border-gray-700 text-gray-400 cursor-not-allowed" : theme.btn}
                  `}
                >
                  {processingId === bounty.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : isCompleted ? (
                    // FIX: This now displays the ACTUAL status (e.g. COMPLETED), not just HUNTING
                    <><CheckCircle size={16} /> {bounty.status.toUpperCase()}</>
                  ) : (
                    isSyndicate ? "ACCEPT" : "DEPLOY"
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
        
        {/* Empty State if Search Fails */}
        {filteredBounties.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 font-mono border border-dashed border-gray-800 rounded-xl">
            NO TARGETS FOUND MATCHING QUERY "{searchTerm.toUpperCase()}"
          </div>
        )}
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
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white"
              >
                <X size={20} />
              </button>
              
              <h2 className={`text-2xl font-bold mb-6 uppercase ${theme.text}`}>
                New {isSyndicate ? "Contract" : "Target"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Name / ID</label>
                  <input 
                    type="text" required
                    value={newBounty.name}
                    onChange={e => setNewBounty({...newBounty, name: e.target.value})}
                    className={`w-full px-4 py-2 rounded outline-none border ${theme.input}`} 
                    placeholder="e.g. Mon Mothma"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Region / Sector</label>
                  <input 
                    type="text" required
                    value={newBounty.region}
                    onChange={e => setNewBounty({...newBounty, region: e.target.value})}
                    className={`w-full px-4 py-2 rounded outline-none border ${theme.input}`} 
                    placeholder="e.g. Corellia"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Bounty Value</label>
                  <input 
                    type="number" required
                    value={newBounty.reward}
                    onChange={e => setNewBounty({...newBounty, reward: parseInt(e.target.value)})}
                    className={`w-full px-4 py-2 rounded outline-none border ${theme.input}`} 
                  />
                </div>
                <button type="submit" className={`w-full py-3 mt-4 font-bold uppercase rounded ${theme.btn}`}>
                  Upload to Network
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}