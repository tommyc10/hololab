import { useState, useEffect } from 'react';
import { PackageSearch, Box, Plus, Trash2 } from 'lucide-react'; // <--- Added Icons

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

export function Inventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: 0 });
  
  const username = localStorage.getItem("username");
  const isSyndicate = username === "crimson_dawn";

  // --- STANDARD THEME CONFIG ---
  const theme = isSyndicate ? {
    text: "text-red-500",
    border: "border-red-900/30",
    input: "bg-red-950/10 border-red-900 focus:border-red-500 text-red-100",
    button: "bg-red-600 hover:bg-red-700 text-black",
    icon: PackageSearch,        // <--- Icon
    title: "Contraband Manifest",
    subtitle: "Illicit Goods Tracking"
  } : {
    text: "text-cyan-400",
    border: "border-cyan-900/30",
    input: "bg-slate-900 border-cyan-900 focus:border-cyan-500 text-cyan-100",
    button: "bg-cyan-600 hover:bg-cyan-500 text-white",
    icon: Box,                 // <--- Icon
    title: "Imperial Inventory",
    subtitle: "Logistics & Supply Chain"
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await fetch('http://127.0.0.1:8000/items/');
    const data = await response.json();
    setItems(data);
  };

  const handleAddItem = async () => {
    await fetch('http://127.0.0.1:8000/items/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    setNewItem({ name: '', description: '', price: 0 });
    fetchItems();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://127.0.0.1:8000/items/${id}`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div className="p-8 min-h-screen">
      
      {/* --- STANDARDIZED HEADER --- */}
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
        
        {/* Quick Action Button (Optional) */}
        <button 
          onClick={handleAddItem} // Simplified trigger for demo
          className={`flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase rounded ${theme.button}`}
        >
          <Plus size={16} /> Smuggle New Item
        </button>
      </header>

      {/* --- FORM & LIST (Keep your existing logic below) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className={`p-6 rounded-xl border backdrop-blur-sm ${theme.border} h-fit`}>
          <h2 className={`text-xl font-bold uppercase mb-4 ${theme.text}`}>Entry Protocol</h2>
          <div className="space-y-4">
            <input
              placeholder="Item Name"
              className={`w-full p-3 rounded outline-none border ${theme.input}`}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              value={newItem.name}
            />
            <input
              placeholder="Description"
              className={`w-full p-3 rounded outline-none border ${theme.input}`}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              value={newItem.description}
            />
            <input
              placeholder="Value (Credits)"
              type="number"
              className={`w-full p-3 rounded outline-none border ${theme.input}`}
              onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) })}
              value={newItem.price || ''}
            />
          </div>
        </div>

        {/* The List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
             <div key={item.id} className={`flex justify-between items-center p-4 border rounded hover:bg-white/5 transition-colors ${theme.border}`}>
                <div>
                  <span className="font-mono text-gray-500 text-xs mr-4">#{item.id}</span>
                  <span className="font-bold text-white text-lg">{item.name}</span>
                  <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`font-mono font-bold ${isSyndicate ? 'text-yellow-500' : 'text-cyan-400'}`}>
                    {item.price.toLocaleString()} CR
                  </span>
                  <button onClick={() => handleDelete(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}