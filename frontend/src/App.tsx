import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import { Home } from './pages/Home'; 
import { Login } from './pages/Login';
import { Inventory } from './pages/Inventory'; 
import { DashboardHome } from './pages/DashboardHome';
import HeatMap from './pages/HeatMap';
// --- NEW IMPORTS (Ensure these match your file names) ---
import Eliminations from './pages/Eliminations.tsx';
import Finance from './pages/Finance.tsx';

// Layouts & Components
import { DashboardLayout } from './layouts/DashboardLayout';
import { Navbar } from './components/layout/NavBar';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* --- PUBLIC ROUTES --- */}
        <Route path="/" element={
          <div className="bg-empire-black min-h-screen">
            <Navbar />
            <Home />
          </div>
        } />
        
        <Route path="/login" element={<Login />} />

        {/* --- PROTECTED DASHBOARD ROUTES --- */}
        <Route element={<ProtectedRoute />}>
          
          {/* 
            CHANGE: We removed 'path="/dashboard"' from this wrapper.
            Now, DashboardLayout wraps ANY route inside it, 
            allowing for clean URLs like /inventory instead of /dashboard/inventory 
          */}
          <Route element={<DashboardLayout />}>
            
            {/* The Main Overview (http://localhost:5173/dashboard) */}
            <Route path="/dashboard" element={<DashboardHome />} />

            {/* Modules (Matches your Sidebar Links) */}
            <Route path="/inventory" element={<Inventory />} />
            
            {/* The New Pages */}
            <Route path="/eliminations" element={<Eliminations />} />
            <Route path="/finance" element={<Finance />} />
            
            {/* Placeholder for future expansion */}
            <Route path="/heat" element={<HeatMap />} />


          </Route>

        </Route>

        {/* Catch-all: Redirect unknown URLs to login */}
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;