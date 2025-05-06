// src/routes.jsx
import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import DoctorDirectory from "./pages/DoctorDirectory";
import AppointmentPage from "./pages/AppointmentPage";
import ReportsAndClaims from "./pages/ReportsAndClaims";
import ClientProfile from "./pages/ClientProfile";
import SupportFeedback from "./pages/SupportFeedback";
import LoadingSpinner from "./components/LoadingSpinner";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

// Component to handle redirection for already authenticated users from login/signup
const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to="/client/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Publicly Accessible Routes */}
      <Route path="/" element={<HomePage />} />{" "}
      {/* HomePage is always accessible */}
      {/* Public Routes only for non-authenticated users */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Route>
      {/* Protected Client Routes */}
      <Route path="/client" element={<ProtectedRoute />}>
        {/* Redirect /client to /client/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="find-doctor" element={<DoctorDirectory />} />
        <Route
          path="book-appointment/:doctorId"
          element={<AppointmentPage />}
        />
        <Route path="reports-claims" element={<ReportsAndClaims />} />
        <Route path="profile" element={<ClientProfile />} />
        <Route path="support-feedback" element={<SupportFeedback />} />
      </Route>
      {/* Fallback for unmatched routes - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
