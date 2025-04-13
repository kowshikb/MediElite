import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AppRoutes from "./routes";
import { NotificationContext } from "./components/AppointmentCalendar";
import { AppointmentProvider } from "./context/AppointmentContext";
import "./index.css";

const App = () => {
  const [userRole, setUserRole] = useState("client");
  const [notification, setNotification] = useState(null);
  const location = useLocation();

  const addNotification = (message, type = "info") => {
    setNotification({ id: Date.now(), message, type });
    setTimeout(() => setNotification(null), 3000); // Increased duration to 5 seconds
  };

  const navigation = {
    client: [
      { name: "Dashboard", path: "/client/dashboard", icon: "🏠" },
      { name: "Find Doctor", path: "/client/find-doctor", icon: "👨‍⚕️" },
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
      addNotification(message, type);
    },
  };

  return (
    <AppointmentProvider>
      <NotificationContext.Provider value={notificationContextValue}>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
          <nav className="bg-white/80 backdrop-blur-lg fixed w-full z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link
                    to="/"
                    className="flex items-center space-x-3 px-2 hover:opacity-80 transition-opacity"
                  >
                    <span className="text-2xl">🏥</span>
                    <span className="gradient-text text-xl font-bold">
                      MediElite
                    </span>
                  </Link>
                  <div className="hidden md:ml-8 md:flex md:space-x-2">
                    {navigation[userRole].map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`nav-link flex items-center space-x-2 ${
                          location.pathname === item.path ? "active" : ""
                        }`}
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-50">
            <div className="grid grid-cols-4 gap-1 p-2">
              {navigation[userRole].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl ${
                    location.pathname === item.path
                      ? "gradient-text bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  } transition-all duration-300`}
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
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <AppRoutes userRole={userRole} />
              </motion.div>
            </AnimatePresence>
          </main>

          <AnimatePresence>
            {notification && (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 50, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 50, x: "-50%" }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 40,
                }}
                whileHover={{ scale: 1.02 }}
                className="fixed bottom-20 left-1/2 z-50"
              >
                <div
                  className={`shadow-lg rounded-2xl p-4 backdrop-blur-md border transform transition-all duration-300 hover:shadow-xl ${
                    notification.type === "success"
                      ? "bg-green-500/90 text-white border-green-400"
                      : notification.type === "error"
                      ? "bg-red-500/90 text-white border-red-400"
                      : notification.type === "warning"
                      ? "bg-amber-500/90 text-white border-amber-400"
                      : "bg-blue-500/90 text-white border-blue-400"
                  }`}
                >
                  <p className="text-sm font-medium shadow-sm">
                    {notification.message}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </NotificationContext.Provider>
    </AppointmentProvider>
  );
};

export default App;
