import { useEffect, useState } from 'react';
import { X, Save, } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAdded: () => void; // Refresh table after adding
}

export function AddItemModal({ isOpen, onClose, onItemAdded }: AddItemModalProps) {
  const [isSyndicate, setIsSyndicate] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Check Identity
  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user === 'crimson_dawn') setIsSyndicate(true);
  }, []);

  if (!isOpen) return null;

  // Theme Logic
  const theme = isSyndicate ? {
    bg: 'bg-empire-black/90 border-crimson-light/30',
    title: 'text-crimson-light',
    input: 'bg-crimson-dark/20 border-crimson-light/20 focus:border-crimson-light text-white placeholder-red-900/50',
    button: 'bg-crimson-light text-black hover:bg-white',
    label: 'text-red-400'
  } : {
    bg: 'bg-empire-black/90 border-white/20',
    title: 'text-hologram-blue',
    input: 'bg-gray-900/50 border-white/10 focus:border-hologram-blue text-white placeholder-gray-600',
    button: 'bg-hologram-blue text-black hover:bg-white',
    label: 'text-hologram-blue'
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: data.name,
            description: data.description,
            price: parseInt(data.price),
            is_active: true
        }),
      });

      if (response.ok) {
        reset(); // Clear form
        onItemAdded(); // Tell parent to refresh
        onClose(); // Close modal
      }
    } catch (error) {
      console.error("Smuggling failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className={`relative w-full max-w-md border rounded-lg p-6 shadow-2xl animate-in zoom-in-95 duration-200 ${theme.bg}`}>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
            <h2 className={`font-death-star text-xl tracking-widest ${theme.title}`}>
                {isSyndicate ? 'NEW CONTRABAND' : 'LOG NEW CARGO'}
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Name */}
            <div className="space-y-1">
                <label className={`font-mono text-[10px] uppercase tracking-widest ${theme.label}`}>Item Identifier</label>
                <input 
                    {...register('name', { required: true })}
                    className={`w-full p-3 font-mono text-sm border outline-none transition-all ${theme.input}`} 
                    placeholder="e.g. Coaxium Canisters"
                    autoFocus
                />
            </div>

            {/* Description */}
            <div className="space-y-1">
                <label className={`font-mono text-[10px] uppercase tracking-widest ${theme.label}`}>Manifest Details</label>
                <textarea 
                    {...register('description')}
                    rows={3}
                    className={`w-full p-3 font-mono text-sm border outline-none transition-all ${theme.input}`} 
                    placeholder="e.g. Highly volatile. Handle with magnetic clamps."
                />
            </div>

            {/* Price */}
            <div className="space-y-1">
                <label className={`font-mono text-[10px] uppercase tracking-widest ${theme.label}`}>Value (Credits)</label>
                <input 
                    {...register('price', { required: true })}
                    type="number"
                    className={`w-full p-3 font-mono text-sm border outline-none transition-all ${theme.input}`} 
                    placeholder="0"
                />
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-4">
                <button 
                    type="button" 
                    onClick={onClose}
                    className="flex-1 py-3 border border-white/10 text-gray-400 font-mono text-xs uppercase hover:bg-white/5 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className={`flex-1 py-3 font-bold font-death-star tracking-widest flex items-center justify-center gap-2 transition-all ${theme.button}`}
                >
                    {isLoading ? 'PROCESSING...' : (
                        <><Save size={16} /> CONFIRM LOG</>
                    )}
                </button>
            </div>

        </form>

      </div>
    </div>
  );
}