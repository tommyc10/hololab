import { useState } from 'react';
import { createItem } from '../api';

interface ItemFormProps {
    onItemCreated: () => void;
}

// removed 'export' from here, we will do it at the bottom for consistency
function ItemForm({ onItemCreated }: ItemFormProps) {
    // FIX 1: Standard Naming (camelCase)
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createItem({ name, description, price });

            // clear form
            setName("");
            setDescription("");
            setPrice(0);

            // Refresh parent
            onItemCreated(); 
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create item");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 bg-gray-900/50 p-4 rounded border border-hologram-blue/30">
            <h3 className="text-hologram-blue mb-4 uppercase text-sm tracking-widest">Add New Asset</h3>
            
            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-gray-700 text-white p-2 rounded focus:border-hologram-blue outline-none"
                    required
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-black border border-gray-700 text-white p-2 rounded focus:border-hologram-blue outline-none"
                />

                <input
                    type="number"
                    placeholder="Price (Credits)"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-black border border-gray-700 text-white p-2 rounded focus:border-hologram-blue outline-none"
                    min="0"
                />

                <button 
                    type="submit"
                    className="w-full bg-hologram-blue/20 text-hologram-blue border border-hologram-blue py-2 rounded hover:bg-hologram-blue hover:text-black transition-colors uppercase font-bold text-xs tracking-widest cursor-pointer"
                >
                    Initialize Item
                </button>
            </div>
        </form>
    );
}

export default ItemForm;