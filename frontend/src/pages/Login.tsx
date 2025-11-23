import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // This function runs when you click "Initialize Session"
  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError('');
    
    // 1. Prepare the Form Data (FastAPI expects x-www-form-urlencoded)
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('password', data.password);

    try {
      // 2. Send the Request to the Backend
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        body: formData,
      });

      // 3. Handle the Result
      if (!response.ok) {
        throw new Error('Access Denied: Invalid Credentials');
      }

      const result = await response.json();
      
      // 4. Save the Token (The "Keycard")
      localStorage.setItem('token', result.access_token);
      
      // 5. Route to Dashboard
      navigate('/dashboard');
      
    } catch (err) {
      setError('AUTHENTICATION FAILED: CHECK CREDENTIALS');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      
      {/* Layer 0: Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/terminalaccess.png" 
          alt="Terminal Access" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Layer 1: Dark Overlay with Blur */}
      <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm"></div>

      {/* Layer 2: Grid Texture */}
      <div className="absolute inset-0 z-20 opacity-10 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-size-[50px_50px]"></div>

      {/* Layer 3: Content */}
      <div className="relative z-30">
        
        {/* The Glass Card */}
        <div className="w-full max-w-md bg-empire-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            
            {/* Decorative Top Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-hologram-blue to-transparent opacity-50"></div>

            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="font-death-star text-3xl text-white tracking-widest mb-2">TERMINAL ACCESS</h2>
                <p className="font-mono text-xs text-hologram-blue tracking-[0.2em] uppercase">Restricted Area // Imperial Clearance Only</p>
            </div>

            {/* The Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Username Input */}
                <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Operator Callsign</label>
                    <input 
                        {...register('username')}
                        type="text" 
                        className="w-full bg-black/40 border border-white/10 text-white font-mono p-3 focus:outline-none focus:border-hologram-blue focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
                        placeholder="ENTER ID"
                    />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <label className="text-xs font-mono text-gray-400 uppercase tracking-widest">Access Code</label>
                    <input 
                        {...register('password')}
                        type="password" 
                        className="w-full bg-black/40 border border-white/10 text-white font-mono p-3 focus:outline-none focus:border-hologram-blue focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
                        placeholder="••••••••"
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 font-mono text-xs text-center tracking-widest">
                        ⚠ {error}
                    </div>
                )}

                {/* Submit Button */}
                <button 
                    disabled={isLoading}
                    type="submit" 
                    className="w-full bg-hologram-blue text-empire-black font-bold font-death-star text-lg py-4 hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'VERIFYING...' : 'INITIALIZE SESSION'}
                </button>
            </form>

        </div>
      </div>
    </div>
  );
}