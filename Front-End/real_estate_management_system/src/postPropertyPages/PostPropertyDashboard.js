// postPropertyPages/PostPropertyDashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';

const PostPropertyDashboard = () => {
  return (
    <DashboardLayout>
      <Outlet /> {/* All nested routes like UpdateProfile will render here */}
    </DashboardLayout>
  );
};

export default PostPropertyDashboard;
