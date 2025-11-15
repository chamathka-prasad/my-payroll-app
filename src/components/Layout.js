import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css'; // <-- IMPORT NEW CSS FILE

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Renamed for clarity
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="layout-wrapper d-flex">
      {/* Overlay to close sidebar when clicking content */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar} 
      ></div>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <div className="main-content-column flex-grow-1 d-flex flex-column">
        <Navbar onMenuClick={toggleSidebar} />
        
        {/* Main Page Content */}
        <div className="page-content flex-grow-1">
          <Outlet />
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default Layout;