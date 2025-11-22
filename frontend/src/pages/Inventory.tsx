import { useState, useEffect } from 'react';
import type { Item } from '../api';
import { getItems, deleteItem } from '../api';
import ItemForm from '../components/ItemForm';

export function Inventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [status, setStatus] = useState<string>("System Idle");

  const fetchLatestItems = async () => {
    try {
      setStatus("Refreshing Data...");
      const data = await getItems();
      setItems(data);
      setStatus("System Online");
    } catch (error) {
      console.error(error);
      setStatus("Connection Error");
    }
  };

  const handleDelete = async (itemId: number) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await deleteItem(itemId);
      fetchLatestItems();
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  useEffect(() => {
    fetchLatestItems();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <h1 className="text-2xl text-hologram-blue uppercase tracking-widest">Hololab Inventory</h1>
        <span className="text-xs text-gray-500 uppercase">{status}</span>
      </div>

      {/* Form */}
      <ItemForm onItemCreated={fetchLatestItems} />

      {/* List */}
      <div className="space-y-2">
        {items.length === 0 && <p className="text-gray-600 text-center">No items found.</p>}

        {items.map((item) => (
          <div key={item.id} className="flex justify-between p-3 border border-gray-800 bg-black rounded hover:border-hologram-blue/50">
            <div>
              <span className="block font-bold text-white">{item.name}</span>
              <span className="text-xs text-gray-500">{item.description}</span>
            </div>

            {/* Price + Delete Button Container */}
            <div className="flex items-center gap-4">
              {/* The Price */}
              <span className="text-hologram-blue font-bold">{item.price} cr</span>

              {/* The Delete Button */}
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-700 font-bold px-2 cursor-pointer"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}