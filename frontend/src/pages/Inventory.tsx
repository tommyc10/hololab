import { useState, useEffect } from 'react';
import { PackageSearch, Box, Plus, Trash2, Loader2, Gem, AlertTriangle } from 'lucide-react'; 
import { motion, AnimatePresence } from "framer-motion";

// Update this import path if needed based on where your api.ts is located
// If api.ts is in src/api.ts, then use '../api'
import { getItems, createItem, deleteItem } from '../api';
import type { Item } from '../api';

export function Inventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form State
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0 });
  
  const username = localStorage.getItem("username");
  const isSyndicate = username === "crimson_dawn";

  // --- THEME CONFIG ---
  const theme = isSyndicate ? {
    text: "text-red-500",
    border: "border-red-900/50",
    bg: "bg-red-950/20",
    input: "bg-red-950/30 border-red-900 text-red-100 placeholder:text-red-500/30 focus:border-red-500",
    button: "bg-red-600 hover:bg-red-700 text-black shadow-[0_0_15px_rgba(220,38,38,0.4)]",
    icon: PackageSearch,
    title: "Contraband Manifest",
    subtitle: "Illicit Goods Tracking"
  } : {
    text: "text-cyan-400",
    border: "border-cyan-900/50",
    bg: "bg-slate-900/50",
    input: "bg-slate-900 border-cyan-900 text-cyan-100 placeholder:text-cyan-500/30 focus:border-cyan-500",
    button: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]",
    icon: Box,
    title: "Imperial Inventory",
    subtitle: "Logistics & Supply Chain"
  };

  // 1. FETCH ON LOAD
  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to load inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. HANDLE ADD (SMUGGLE)
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setSubmitting(true);

    try {
      await createItem({
        name: newItem.name,
        description: newItem.description,
        price: newItem.price
      });

      setNewItem({ name: '', description: '', price: 0 });
      await loadInventory(); 
    } catch (error) {
      console.error("Failed to smuggle item:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // 3. HANDLE DELETE
  const handleDelete = async (id: number) => {
    if(!confirm("Purge this record from the database?")) return;
    try {
      await deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };

  return (
    <div className="p-8 min-h-screen relative">
      
      {/* HEADER */}
      <header className="flex justify-between items-end border-b border-gray-800 pb-6 mb-8">
        <div className="flex items-center gap-4">
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
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* INPUT FORM (Replaces AddItemModal) */}
        <div className={`p-6 rounded-xl border backdrop-blur-sm ${theme.border} ${theme.bg} h-fit`}>
          <h2 className={`text-xl font-bold uppercase mb-6 ${theme.text} flex items-center gap-2`}>
            <Plus size={20} /> Entry Protocol
          </h2>
          
          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 font-mono uppercase mb-1 block">Item Identification</label>
              <input
                required
                placeholder="e.g. Coaxium Canister"
                className={`w-full p-3 rounded outline-none border transition-all ${theme.input}`}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                value={newItem.name}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 font-mono uppercase mb-1 block">Manifest Details</label>
              <textarea
                required
                placeholder="e.g. Highly volatile hyperfuel."
                className={`w-full p-3 rounded outline-none border transition-all h-24 resize-none ${theme.input}`}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                value={newItem.description}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 font-mono uppercase mb-1 block">Black Market Value</label>
              <div className="relative">
                <input
                  required
                  placeholder="0"
                  type="number"
                  className={`w-full p-3 rounded outline-none border transition-all font-mono ${theme.input}`}
                  onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) || 0 })}
                  value={newItem.price || ''}
                />
                <span className="absolute right-4 top-3 text-gray-500 text-xs font-mono">CREDITS</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={submitting}
              className={`w-full py-3 mt-2 font-bold uppercase rounded flex items-center justify-center gap-2 transition-all ${theme.button}`}
            >
              {submitting ? <Loader2 className="animate-spin" /> : <><Gem size={18} /> SMUGGLE ITEM</>}
            </button>
          </form>
        </div>

        {/* INVENTORY LIST */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-gray-500 text-sm font-mono uppercase tracking-widest mb-4">Current Inventory</h2>

          {loading ? (
             <div className={`font-mono animate-pulse ${theme.text}`}>DECRYPTING MANIFEST...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`relative p-5 rounded-lg border backdrop-blur-md transition-all group hover:shadow-lg
                      ${isSyndicate ? 'border-red-900/30 bg-black/40 hover:border-red-600/50' : 'border-cyan-900/30 bg-slate-900/50 hover:border-cyan-500/50'}
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-bold text-lg">{item.name}</h3>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                      <div className={`flex items-center gap-2 text-xs font-mono uppercase ${isSyndicate ? 'text-red-400' : 'text-cyan-400'}`}>
                        <AlertTriangle size={12} /> Restricted
                      </div>
                      <div className={`font-mono font-bold ${isSyndicate ? 'text-amber-500' : 'text-cyan-300'}`}>
                        {item.price.toLocaleString()} <span className="text-xs text-gray-500">CR</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          
          {!loading && items.length === 0 && (
            <div className="text-gray-600 font-mono border border-dashed border-gray-800 p-8 text-center rounded">
              VAULT EMPTY. AWAITING SHIPMENTS.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}