// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Overview from '../pages/Overview';
import Reports from '../pages/Reports';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';
import DashboardLayout from '../layouts/DashboardLayout';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PrivateRoute from '../components/PrivateRoutes';
import { ToastContainer } from 'react-toastify';

const AppRoutes = () => (
  <Routes>
   
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route element={<PrivateRoute />}>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<Overview />} />
      <Route path="reports" element={<Reports />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="settings" element={<Settings />} />
    </Route>
    </Route>
  </Routes>
);

export default AppRoutes;