// postPropertyPages/PostPropertyDashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout2 from './DashboardLayout2';

const FindPropertyDashboard = () => {
  return (
    <DashboardLayout2>
      <Outlet /> {/* All nested routes like UpdateProfile will render here */}
    </DashboardLayout2>
  );
};

export default FindPropertyDashboard;
