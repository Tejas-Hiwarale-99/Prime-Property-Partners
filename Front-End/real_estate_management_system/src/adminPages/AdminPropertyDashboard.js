import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminDashboardLayout from './AdminDashboardLayout';

const PostPropertyDashboard = () => {
  return (
    <AdminDashboardLayout>
      <Outlet /> {/* All nested routes will render here */}
    </AdminDashboardLayout>
  );
};

export default PostPropertyDashboard;
