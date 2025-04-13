import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AppRoutes from "./routes";
import { NotificationContext } from "./components/AppointmentCalendar";
import "./index.css";

const App = () => {
  const [userRole, setUserRole] = useState("client");
  const [notification, setNotification] = useState(null);
  const location = useLocation();

  const addNotification = (message, type = "info") => {
    setNotification({ id: Date.now(), message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const navigation = {
    client: [
      { name: "Dashboard", path: "/client/dashboard", icon: "🏠" },
      { name: "Find Doctor", path: "/client/find-doctor", icon: "👨‍⚕️" },
      { name: "Health Tracker", path: "/client/health-tracker", icon: "📊" },
      { name: "Profile", path: "/client/profile", icon: "👤" },
    ],
    doctor: [
      { name: "Dashboard", path: "/doctor/dashboard", icon: "🏥" },
      { name: "Appointments", path: "/doctor/appointments", icon: "📅" },
      { name: "Patients", path: "/doctor/patients", icon: "👥" },
    ],
  };

  const notificationContextValue = {
    addNotification: (message, type) => {
      if (type === "appointment") {
        addNotification(message, type);
      }
    },
  };

  return (
    <NotificationContext.Provider value={notificationContextValue}>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg fixed w-full z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center">
                  <span className="text-2xl mr-2">🏥</span>
                  <span className="font-bold text-xl text-blue-600">
                    MediElite
                  </span>
                </Link>
                <div className="hidden md:ml-8 md:flex md:space-x-4">
                  {navigation[userRole].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === item.path
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="grid grid-cols-4 gap-1 p-2">
            {navigation[userRole].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center p-2 rounded-md ${
                  location.pathname === item.path
                    ? "text-blue-600"
                    : "text-gray-600"
                }`}
              >
                <span className="text-xl mb-1">{item.icon}</span>
                <span className="text-xs">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <main className="pt-16 pb-16 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <AppRoutes userRole={userRole} />
            </motion.div>
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {notification && (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 left-4 z-50"
            >
              <div
                className={`p-4 rounded-lg shadow-lg ${
                  notification.type === "success"
                    ? "bg-green-500"
                    : "bg-blue-500"
                } text-white`}
              >
                <p className="text-sm">{notification.message}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export default App;
