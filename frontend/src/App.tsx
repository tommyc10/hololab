import { useState, useEffect } from 'react';
// FIX 1: We split imports. 'Item' is a type, the others are functions.
import type { Item } from './api'; 
import { getItems, createItem } from './api';

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<string>("System Idle");

  useEffect(() => {
    const loadData = async () => {
      try {
        setStatus("Fetching Data...");
        const data = await getItems();
        setItems(data);
        setStatus("System Online");
      } catch (error) {
        console.error(error);
        setStatus("Connection Error");
      }
    };
    loadData();
  }, []);

  const handleTestPost = async () => {
    try {
      const newItemData = {
        name: `Refactored Item ${new Date().toLocaleTimeString()}`,
        description: "Created via api.ts",
        price: 25,
      };
      const newItem = await createItem(newItemData);
      setItems([...items, newItem]);
    } catch (error) {
      console.error("Creation failed", error);
    }
  };

  // FIX 2: This is the ACTUAL UI code (not a placeholder comment)
  return (
    <div className="min-h-screen bg-empire-black text-tatooine-sand font-mono p-8">
      <div className="max-w-2xl mx-auto border border-hologram-blue/30 p-6 rounded bg-gray-900/50">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
          <h1 className="text-2xl text-hologram-blue uppercase tracking-widest">Hololab v1.0</h1>
          <span className="text-xs text-gray-500 uppercase">{status}</span>
        </div>

        {/* Test Action */}
        <div className="mb-6 text-right">
          <button 
            onClick={handleTestPost}
            className="bg-hologram-blue/10 text-hologram-blue border border-hologram-blue px-4 py-2 rounded text-xs uppercase hover:bg-hologram-blue hover:text-black transition-colors cursor-pointer"
          >
            + Test API Module
          </button>
        </div>

        {/* Data Display */}
        <div className="space-y-2">
          {items.length === 0 && <p className="text-gray-600 text-center">No items found.</p>}
          
          {items.map((item) => (
            <div key={item.id} className="flex justify-between p-3 border border-gray-800 bg-black rounded hover:border-hologram-blue/50">
              <div>
                <span className="block font-bold text-white">{item.name}</span>
                <span className="text-xs text-gray-500">{item.description}</span>
              </div>
              <span className="text-hologram-blue">{item.price} cr</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;