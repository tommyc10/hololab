import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Inventory } from './pages/Inventory';
import { Home } from './pages/Home'; 

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-empire-black text-tatooine-sand font-mono p-8">
        
        {/* The Route Configuration */}
        <Routes>
          {/* Root URL: Shows the Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* /inventory URL: Shows the Dashboard */}
          <Route path="/inventory" element={<Inventory />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;