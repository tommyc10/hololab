
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/SideBar';
import { TopBar } from '../components/layout/TopBar';
import { GridBackground } from '../components/layout/GridBackground';

export function DashboardLayout() {
  return (
    <GridBackground>
      <div className="flex min-h-screen text-white">
        
        {/* 1. Fixed Sidebar */}
        <Sidebar />

        {/* 2. Main Content Area (Pushed right by 64/256px) */}
        <div className="flex-1 ml-64 flex flex-col">
          
          {/* Top Header */}
          <TopBar />

          {/* The Page Content */}
          <main className="flex-1 p-8 overflow-y-auto">
            {/* <Outlet /> is where the nested routes (Inventory, Overview) will appear */}
            <Outlet />
          </main>
          
        </div>

      </div>
    </GridBackground>
  );
}