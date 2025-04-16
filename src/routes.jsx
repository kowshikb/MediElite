// src/routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import ClientProfile from "./pages/ClientProfile";
import DoctorDirectory from "./pages/DoctorDirectory";
import ReportsAndClaims from "./pages/ReportsAndClaims";
import SupportFeedback from "./pages/SupportFeedback";

const AppRoutes = ({ userRole }) => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<HomePage />} />

      {/* Default route - now points to home page */}
      <Route
        path="/default"
        element={
          <Navigate
            to={
              userRole === "client" ? "/client/dashboard" : "/doctor/dashboard"
            }
            replace
          />
        }
      />

      {/* Client Routes */}
      <Route path="/client/dashboard" element={<Dashboard />} />
      <Route path="/client/profile" element={<ClientProfile />} />
      <Route path="/client/find-doctor" element={<DoctorDirectory />} />
      <Route path="/client/reports-claims" element={<ReportsAndClaims />} />
      <Route path="/client/support-feedback" element={<SupportFeedback />} />

      {/* Catch-all route for 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full text-center">
              <span className="text-5xl mb-4 block">🤔</span>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Page Not Found
              </h1>
              <p className="text-gray-600 mb-4">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <button
                onClick={() => window.history.back()}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
