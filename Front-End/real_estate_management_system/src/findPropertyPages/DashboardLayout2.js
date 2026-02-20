import React, { useState } from 'react';
import Navbar from './Navbar-2';
import Sidebar from './Sidebar-2';

const DashboardLayout2 = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Open by default

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="d-flex">
        <Sidebar isOpen={isSidebarOpen} />

        <div
          className="p-4 flex-grow-1"
          style={{
            background: '#f5f5f5',
            minHeight: '100vh',
            marginLeft: isSidebarOpen ? '250px' : '0',
            transition: 'margin-left 0.3s ease-in-out',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout2;
