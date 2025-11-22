import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-8">
      
      {/* Hero Section */}
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-hologram-blue tracking-tighter drop-shadow-[0_0_25px_rgba(0,240,255,0.4)]">
          HOLOLAB
        </h1>
        <p className="text-tatooine-sand text-xl tracking-widest uppercase max-w-md mx-auto border-t border-b border-gray-700 py-4">
          Cantina Management Systems
        </p>
      </div>

      {/* Call to Action */}
      <div className="p-8 border border-gray-800 bg-gray-900/50 rounded-lg max-w-lg">
        <p className="text-gray-400 mb-6 font-mono text-sm">
          "Running a wretched hive of scum and villainy? Keep your inventory tracked with Imperial precision."
        </p>
        
        {/* The Magic Link: Swaps views instantly */}
        <Link 
          to="/inventory" 
          className="inline-block bg-hologram-blue text-black font-bold py-3 px-8 rounded hover:bg-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,240,255,0.5)] uppercase tracking-wider"
        >
          Launch Dashboard
        </Link>
      </div>

    </div>
  );
}