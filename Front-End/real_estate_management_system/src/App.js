// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './adminPages/AdminDashboard';
import PostDashboard from './postPropertyPages/PostDashboard';
import FindDashboard from './findPropertyPages/FindDashboard';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>

    {/* Post Dashboard nested routing moved to separate file */}
    <PostDashboard />
    {/* Find Dashboard nested routing moved to separate file */}
    <FindDashboard />
    {/* Admin Dashboard nested routing moved to separate file */}
    <AdminDashboard />
  </BrowserRouter>
);

export default App;
