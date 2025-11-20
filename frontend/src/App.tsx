


function App() {
  // TypeScript allows us to define types later, for now this is standard React
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
      
      {/* The Logo */}
      <h1 className="text-6xl font-bold text-hologram-blue tracking-widest drop-shadow-[0_0_15px_rgba(0,240,255,0.5)] mb-6">
        🌌 HOLOLAB
      </h1>
      
      {/* The Subtitle */}
      <p className="text-xl text-tatooine-sand opacity-80 border-b border-tatooine-sand pb-4 inline-block mb-10">
        Cantina Management System // v1.0
      </p>

      {/* A Test Card */}
      <div className="bg-white/5 border border-hologram-blue/30 p-8 rounded-xl backdrop-blur-md hover:border-hologram-blue transition-all duration-300 cursor-pointer group shadow-lg">
        <h3 className="text-sm uppercase tracking-[0.2em] text-gray-400 group-hover:text-hologram-blue transition-colors">
          System Status
        </h3>
        <p className="text-3xl font-bold mt-4 text-white group-hover:scale-110 transition-transform">
          ONLINE
        </p>
      </div>

    </div>
  )
}

export default App