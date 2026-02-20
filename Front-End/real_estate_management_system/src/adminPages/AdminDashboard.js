import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPropertyDashboard from './AdminPropertyDashboard';
import UsersTable from './UsersTable';
import ProtectedRoute from './ProtectedRoute';  // Import ProtectedRoute
import UsersProperties from './UsersProperties';

const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminPropertyDashboard />} />} >
        <Route
          index
          element={
            <div className="d-flex justify-content-center mt-5">
              <div className="shadow p-4 mt-5" style={{ width: '100%', maxWidth: '600px' }}>
                <h1 className="mb-4 text-center">Admin Dashboard</h1>
                <p className="text-center">Welcome, Admin! You have successfully logged in.</p>

                <div className="mt-4 d-flex justify-content-center gap-3">
                  <button
                    onClick={() => window.location.href = '/admin/dashboard/user-table'}
                    className="btn btn-primary"
                  >
                    View Users
                  </button>
                </div>
              </div>
            </div>
          }
        />
        <Route path="user-table" element={<ProtectedRoute element={<UsersTable />} />} />
        <Route path="userProperties" element={<ProtectedRoute element={<UsersProperties />} />} />
      </Route>
    </Routes>
  );
};

export default AdminDashboard;
