import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('admin');  // Check if the admin is logged in (you can adjust this condition as per your app)

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;  // Redirect to login if not logged in
  }

  return element;  // Render the element if logged in
};

export default ProtectedRoute;
