import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { AddItemModal } from '../components/inventory/AddItemModal';

// Define the shape of our Cargo
interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  is_active: boolean;
}

export function Inventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [isSyndicate, setIsSyndicate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls the popup

  // 1. Check Identity & Fetch Data on Load
  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === 'crimson_dawn') setIsSyndicate(true);
    fetchItems();
  }, []);

  // 2. Fetch Data from Python Backend
  const fetchItems = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch cargo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Define Theme Colors (The Chameleon Logic)
  const theme = isSyndicate ? {
    // 🔴 CRIMSON DAWN
    header: 'text-crimson-light border-crimson-light/30',
    button: 'bg-crimson-light text-black hover:bg-white',
    tableHead: 'text-red-400',
    rowHover: 'hover:bg-crimson-light/5',
    price: 'text-syndicate-gold',
    tagActive: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
  } : {
    // 🔵 EMPIRE / STANDARD
    header: 'text-hologram-blue border-white/10',
    button: 'bg-hologram-blue text-black hover:bg-white',
    tableHead: 'text-hologram-blue',
    rowHover: 'hover:bg-hologram-blue/5',
    price: 'text-tatooine-sand',
    tagActive: 'border-hologram-blue/30 text-hologram-blue bg-hologram-blue/10'
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      
      {/* Header Section */}
      <div className={`flex flex-col md:flex-row justify-between items-end border-b pb-6 ${theme.header}`}>
        <div>
          <h1 className={`text-3xl font-death-star tracking-widest ${isSyndicate ? 'text-crimson-light' : 'text-white'}`}>
            {isSyndicate ? 'CONTRABAND MANIFEST' : 'CARGO LOGISTICS'}
          </h1>
          <p className="font-mono text-xs tracking-[0.2em] mt-2 opacity-70">
            :: {isSyndicate ? 'ILLICIT GOODS TRACKING' : 'STANDARD SUPPLY CHAIN'}
          </p>
        </div>
        
        {/* The Button that opens your new Modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className={`px-6 py-3 font-bold font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-all rounded-sm ${theme.button}`}
        >
          <Plus size={16} />
          {isSyndicate ? 'Smuggle New Item' : 'Add Shipment'}
        </button>
      </div>

      {/* The Glass Table */}
      <div className={`rounded-lg border overflow-hidden backdrop-blur-md ${isSyndicate ? 'bg-crimson-dark/10 border-crimson-light/20' : 'bg-empire-black/40 border-white/10'}`}>
        
        {/* Loading State */}
        {isLoading && (
          <div className="p-12 text-center font-mono text-sm opacity-50 animate-pulse">
            SCANNING CARGO HOLD...
          </div>
        )}

        {/* Data Table */}
        {!isLoading && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b ${isSyndicate ? 'border-crimson-light/20 bg-crimson-light/5' : 'border-white/10 bg-white/5'}`}>
                  <th className={`p-6 font-mono text-xs uppercase tracking-widest whitespace-nowrap ${theme.tableHead}`}>ID</th>
                  <th className={`p-6 font-mono text-xs uppercase tracking-widest whitespace-nowrap ${theme.tableHead}`}>Item Name</th>
                  <th className={`p-6 font-mono text-xs uppercase tracking-widest whitespace-nowrap ${theme.tableHead}`}>Description</th>
                  <th className={`p-6 font-mono text-xs uppercase tracking-widest whitespace-nowrap ${theme.tableHead}`}>Value</th>
                  <th className={`p-6 font-mono text-xs uppercase tracking-widest whitespace-nowrap ${theme.tableHead}`}>Status</th>
                </tr>
              </thead>
              <tbody className="text-sm font-mono text-gray-400">
                {items.map((item) => (
                  <tr key={item.id} className={`border-b border-white/5 transition-colors ${theme.rowHover}`}>
                    <td className="p-6 opacity-50">#{item.id}</td>
                    <td className="p-6 text-white font-bold">{item.name}</td>
                    <td className="p-6 max-w-md truncate opacity-80">{item.description}</td>
                    <td className={`p-6 font-bold ${theme.price}`}>{item.price.toLocaleString()} CR</td>
                    <td className="p-6">
                      <span className={`px-2 py-1 rounded text-[10px] uppercase border ${item.is_active 
                        ? theme.tagActive 
                        : 'border-red-500/30 text-red-500 bg-red-500/10'}`}>
                        {item.is_active ? 'In Stock' : 'Depleted'}
                      </span>
                    </td>
                  </tr>
                ))}
                
                {/* Empty State */}
                {items.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-12 text-center opacity-40 font-mono tracking-widest">
                      [ NO CARGO FOUND IN SECTOR ]
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* The Modal Component (Hidden until button is clicked) */}
      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onItemAdded={fetchItems} // When modal finishes, it calls this to refresh the table
      />

    </div>
  );
}