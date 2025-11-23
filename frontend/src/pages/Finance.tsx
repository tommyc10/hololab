import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, TrendingDown, Download, Wallet, 
  Shield, Scroll, Radar, Briefcase, Coins, Loader2 
} from "lucide-react";
import { getFinance } from "../api";
import type { Transaction } from "../api";

export default function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // THEME CONFIG
  const isSyndicate = localStorage.getItem("username") === "crimson_dawn";
  const theme = {
    text: isSyndicate ? "text-red-500" : "text-cyan-400",
    subtext: isSyndicate ? "text-red-400/60" : "text-cyan-400/60",
    border: isSyndicate ? "border-red-900/50" : "border-cyan-900/50",
    glow: isSyndicate ? "shadow-red-900/50" : "shadow-cyan-900/50",
    cardBg: "bg-black/40 backdrop-blur-sm",
    positive: "text-emerald-400",
    negative: "text-red-400",
  };

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getFinance();
        setTransactions(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // --- 1. CALCULATE TOTALS FOR DASHBOARD ---
  const totalRevenue = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netProfit = totalRevenue - totalExpenses;

  // --- 2. HELPER FOR ICONS ---
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'revenue': return <TrendingUp size={14} />;
      case 'diplomacy': return <Briefcase size={14} />;
      case 'defense': return <Shield size={14} />;
      case 'intel': return <Radar size={14} />;
      case 'overhead': return <Scroll size={14} />;
      default: return <Coins size={14} />;
    }
  };

  return (
    <div className="p-8 space-y-8 min-h-screen relative">
      
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-gray-800 pb-6">
        <div className="flex items-center gap-4">
          <Coins className={`w-10 h-10 ${theme.text}`} />
          <div>
            <h1 className={`text-3xl font-black uppercase tracking-widest ${theme.text}`}>Tribute Ledger</h1>
            <p className="text-gray-500 text-sm font-mono tracking-wider">Fiscal Year 3 ABY // Sector 7</p>
          </div>
        </div>
        
        <button className={`flex items-center gap-2 px-4 py-2 border ${theme.border} text-xs font-mono uppercase tracking-widest hover:bg-white/5 transition-colors`}>
          <Download size={14} /> Export CSV
        </button>
      </header>

      {/* --- NEW: FINANCIAL DASHBOARD (SUMMARY CARDS) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* REVENUE CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg} relative overflow-hidden`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className={`text-xs font-mono uppercase ${theme.subtext}`}>Gross Revenue</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {totalRevenue.toLocaleString()} <span className="text-xs text-gray-500">CR</span>
              </h3>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><TrendingUp size={20} /></div>
          </div>
          <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[75%]"></div> 
          </div>
        </motion.div>

        {/* EXPENSES CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg} relative overflow-hidden`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className={`text-xs font-mono uppercase ${theme.subtext}`}>Syndicate Upkeep</p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {totalExpenses.toLocaleString()} <span className="text-xs text-gray-500">CR</span>
              </h3>
            </div>
            <div className="p-2 bg-red-500/10 rounded-lg text-red-500"><TrendingDown size={20} /></div>
          </div>
          <div className="w-full bg-gray-800 h-1 mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 w-[45%]"></div> 
          </div>
        </motion.div>

        {/* NET PROFIT CARD */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-xl border ${theme.border} ${theme.cardBg} relative overflow-hidden group`}
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className={`text-xs font-mono uppercase ${theme.subtext}`}>War Chest (Net)</p>
              <h3 className={`text-2xl font-bold mt-1 ${netProfit >= 0 ? 'text-amber-400' : 'text-red-500'}`}>
                {netProfit.toLocaleString()} <span className="text-xs text-gray-500">CR</span>
              </h3>
            </div>
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Wallet size={20} /></div>
          </div>
          <div className="text-xs text-gray-500 font-mono">
            Available for immediate deployment.
          </div>
        </motion.div>
      </div>

      {/* --- TRANSACTION TABLE --- */}
      <div className={`rounded-xl border ${theme.border} overflow-hidden backdrop-blur-md bg-black/20`}>
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 bg-black/40 text-xs font-mono uppercase text-gray-500 tracking-wider">
          <div className="col-span-5 md:col-span-6">Transaction</div>
          <div className="col-span-3 md:col-span-2 text-right">Date</div>
          <div className="col-span-2 md:col-span-2 text-right">Credits</div>
          <div className="col-span-2 md:col-span-2 text-center">Cat.</div>
        </div>

        {/* Table Body */}
        {loading ? (
          <div className="p-12 flex justify-center text-red-500 animate-pulse font-mono">
            <Loader2 className="animate-spin mr-2" /> CALCULATING FLUX...
          </div>
        ) : (
          <div className="divide-y divide-gray-800/50">
            {transactions.map((t, i) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-white/5 transition-colors group"
              >
                {/* Description */}
                <div className="col-span-5 md:col-span-6 font-bold text-gray-200 group-hover:text-white transition-colors">
                  {t.description}
                </div>

                {/* Date */}
                <div className="col-span-3 md:col-span-2 text-right font-mono text-xs text-gray-500">
                  {t.date}
                </div>

                {/* Amount */}
                <div className={`col-span-2 md:col-span-2 text-right font-mono font-bold ${t.amount > 0 ? theme.positive : theme.negative}`}>
                  {t.amount > 0 ? "+" : ""}{t.amount.toLocaleString()}
                </div>

                {/* Category Tag */}
                <div className="col-span-2 md:col-span-2 flex justify-center">
                  <span className={`
                    flex items-center gap-1.5 px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wide border
                    ${t.amount > 0 
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' 
                      : 'border-gray-700 bg-gray-800 text-gray-400'}
                  `}>
                    {getCategoryIcon(t.category)}
                    <span className="hidden md:inline">{t.category}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}