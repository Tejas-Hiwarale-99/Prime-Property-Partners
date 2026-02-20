import React from 'react';
import { Navigate } from 'react-router-dom';

const PostProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem('user');  // Check if the user is logged in (you can adjust this condition as per your app)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;  // Redirect to login if not logged in
  }

  return element;  // Render the element if logged in
};

export default PostProtectedRoute;
