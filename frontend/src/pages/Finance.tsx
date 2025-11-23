import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Download } from "lucide-react";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export default function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Check Identity
  const username = localStorage.getItem("username");
  const isSyndicate = username === "crimson_dawn";

  const theme = isSyndicate
    ? { 
        text: "text-amber-500", 
        header: "bg-amber-950/30 text-amber-100",
        border: "border-amber-900/30"
      }
    : { 
        text: "text-cyan-400", 
        header: "bg-slate-900 text-cyan-100",
        border: "border-cyan-900/30"
      };

  useEffect(() => {
    fetch("http://localhost:8000/finance")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div className="p-8 space-y-6 min-h-screen">
      <div className="flex justify-between items-center border-b border-gray-800 pb-6">
        <div>
          <h1 className={`text-3xl font-bold uppercase tracking-widest ${theme.text}`}>
            {isSyndicate ? "Tribute Ledger" : "Imperial Treasury"}
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-mono">
            Fiscal Year 25 BBY // Sector 7
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-700 hover:bg-gray-800 rounded text-sm transition-colors text-gray-300 font-mono uppercase">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className={`border rounded-lg overflow-hidden bg-black/40 backdrop-blur-md ${theme.border}`}>
        <table className="w-full text-left">
          <thead className={`text-xs uppercase tracking-wider font-medium ${theme.header}`}>
            <tr>
              <th className="p-4">Transaction</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Credits</th>
              <th className="p-4 text-right">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
            {transactions.map((tx, i) => (
              <motion.tr
                key={tx.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-white/5 transition-colors font-mono"
              >
                <td className="p-4 font-medium flex items-center gap-3">
                  <div className={`p-2 rounded-full ${tx.amount > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {tx.amount > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  </div>
                  {tx.description}
                </td>
                <td className="p-4 text-gray-500">{tx.date}</td>
                <td className={`p-4 text-right font-bold text-base ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString()}
                </td>
                <td className="p-4 text-right">
                  <span className="px-2 py-1 rounded text-xs bg-gray-800 text-gray-400 border border-gray-700 uppercase">
                    {tx.category}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}