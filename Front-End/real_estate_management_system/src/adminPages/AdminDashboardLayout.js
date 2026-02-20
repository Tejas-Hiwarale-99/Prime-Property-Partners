import React, { useState } from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AdminDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar open by default

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <AdminNavbar toggleSidebar={toggleSidebar} />

      <div className="d-flex">
        <AdminSidebar isOpen={isSidebarOpen} />

        <main
          className="p-4 flex-grow-1"
          style={{
            background: '#f5f5f5',
            minHeight: '100vh',
            marginLeft: isSidebarOpen ? '250px' : '0',
            transition: 'margin-left 0.3s ease-in-out',
          }}
        >
          {children} {/* The main content passed to the layout */}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
