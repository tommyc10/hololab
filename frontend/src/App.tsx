import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Inventory } from './pages/Inventory';
import { Home } from './pages/Home'; 
import { Navbar } from './components/NavBar';
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-empire-black text-tatooine-sand font-mono">

        {/* The Navigation Bar */}
        <Navbar />
        
        {/* The Route Configuration */}
        <div className="p-8">
          <Routes>
            {/* Root URL: Shows the Landing Page */}
            <Route path="/" element={<Home />} />
            
            {/* /inventory URL: Shows the Dashboard */}
            <Route path="/inventory" element={<Inventory />} />
            
            {/* /login URL: Shows the Login Page */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;