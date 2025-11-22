import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import { Home } from './pages/Home'; 
import { Login } from './pages/Login';
import { Inventory } from './pages/Inventory'; 

// Layouts & Components
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Navbar } from './components/NavBar';

function App() {
  return (
    <BrowserRouter>
      
      {/* 
         NOTE: We removed the global <div p-8> wrapper. 
         Layouts (Home and Dashboard) now handle their own spacing/backgrounds.
      */}

      <Routes>

        {/* --- PUBLIC ROUTES --- */}
        
        {/* Landing Page: Needs the Navbar + Home Content */}
        <Route path="/" element={
          <div className="bg-empire-black min-h-screen">
            <Navbar />
            <Home />
          </div>
        } />
        
        {/* Login Page: Full screen, no Navbar */}
        <Route path="/login" element={<Login />} />


        {/* --- PROTECTED DASHBOARD ROUTES --- */}
        
        {/* 
            This renders the Sidebar + TopBar + GridBackground.
            The nested routes below will appear inside the <Outlet /> 
        */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          
          {/* /dashboard (The default view) */}
          <Route index element={
            <div className="text-white font-death-star text-3xl tracking-widest animate-pulse">
              COCKPIT OVERVIEW // AWAITING DATA
            </div>
          } />

          {/* /dashboard/inventory */}
          <Route path="inventory" element={<Inventory />} />
          
          {/* Placeholders for future modules */}
          <Route path="bounties" element={<div className="text-white">BOUNTY BOARD OFFLINE</div>} />
          <Route path="finance" element={<div className="text-white">CREDIT ANALYTICS OFFLINE</div>} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;