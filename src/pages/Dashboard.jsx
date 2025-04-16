import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppointments } from "../context/AppointmentContext";
import { format } from "date-fns";
import HealthCard from "../components/HealthCard";
import VitalsChart from "../components/VitalsChart";

const Dashboard = () => {
  const { currentAppointments } = useAppointments();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    // Always initialize new notifications to ensure they all appear
    initNotifications();
  }, [currentAppointments]);

  const initNotifications = () => {
    const notifs = [
      {
        id: "med-1",
        type: "medication",
        message: "Time to take medication for fever",
        read: false,
      },
      {
        id: "med-3",
        type: "health",
        message: "You're staying on track with your medication—great job!",
        read: false,
      },
      {
        id: "report-1",
        type: "report",
        message: "Your recent lab results are ready to view",
        read: false,
      },
    ];

    setNotifications(notifs);
    setUnreadCount(notifs.length);
    localStorage.setItem("notifications", JSON.stringify(notifs));
  };

  const markAsRead = (notificationId) => {
    setNotifications((prevNotifications) => {
      const updated = prevNotifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Welcome Section with enhanced gradient styling */}
      <motion.div
        variants={item}
        className="relative overflow-hidden glass-card bg-gradient-to-r from-emerald-700 to-green-400 rounded-3xl p-4 md:p-6 mb-6"
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white drop-shadow-md">
            Welcome Back, Kowshik!
          </h1>
          <p className="text-blue-100 text-base">
            Here's your health summary for today
          </p>
        </div>
        {/* Enhanced decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-20 w-32 h-32 bg-blue-300 rounded-full filter blur-xl opacity-20"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-purple-300 rounded-full filter blur-xl opacity-10"></div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Appointments and Notifications */}
        <motion.div variants={item} className="lg:w-1/4 space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Appointments Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <span className="mr-3 text-3xl">📅</span> Appointments
                </h2>
                <Link
                  to="/client/find-doctor"
                  className="btn-primary text-sm py-2 px-4"
                >
                  + New
                </Link>
              </div>
              <div className="space-y-4">
                {currentAppointments.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6 text-center"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <span className="text-4xl mb-2">🗓️</span>
                      <h3 className="text-lg font-semibold text-gray-800">
                        No Appointments Yet
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Book your first appointment with our experienced
                        doctors.
                      </p>
                      <Link
                        to="/client/find-doctor"
                        className="btn-primary inline-flex items-center space-x-2"
                      >
                        <span>Find a Doctor</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  currentAppointments.map((appointment) => (
                    <motion.div
                      key={appointment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="card hover:scale-[1.02] transition-transform p-4"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">👨‍⚕️</span>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-900">
                            Dr. {appointment.doctorName.replace("Dr. ", "")}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {format(new Date(appointment.date), "MMM d, yyyy")}{" "}
                            at{" "}
                            {appointment.time.includes(":30")
                              ? appointment.time.replace(":30", ":30 ")
                              : appointment.time + " "}
                            {parseInt(appointment.time) < 12 ? "AM" : "PM"}
                          </p>
                          <span className="inline-block mt-2 px-2.5 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {appointment.type}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Notifications Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
                <span className="mr-3 text-3xl">🔔</span> Recent Updates
              </h2>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`card p-4 ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">
                        {notification.type === "appointment"
                          ? "👨‍⚕️"
                          : notification.type === "medication"
                          ? "💊"
                          : notification.type === "health"
                          ? "❤️"
                          : notification.type === "report"
                          ? "📋"
                          : "💡"}
                      </span>
                      <div className="flex-1">
                        <p
                          className={`text-sm ${
                            !notification.read
                              ? "font-medium text-gray-900"
                              : "text-gray-600"
                          }`}
                        >
                          {notification.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Support & Feedback button */}
              <div className="mt-8 flex justify-end">
                <Link
                  to="/client/support-feedback"
                  className="glass-card bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-3 hover:scale-105 hover:shadow-emerald-400/30 transition-all duration-300 text-base font-semibold border border-emerald-200/40 backdrop-blur-md"
                  style={{ width: "100%", maxWidth: "100%", height: 44 }}
                >
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 text-2xl shadow-md mr-1">
                    🧩
                  </span>
                  <span>Support & Feedback</span>
                  <span className="ml-1 text-lg">→</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div variants={item} className="lg:w-3/4 space-y-8">
          {/* Health Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <HealthCard type="heartRate" />
            <HealthCard type="bloodPressure" />
            <HealthCard type="oxygenLevel" />
            <HealthCard type="glucose" />
          </div>

          {/* Vitals Chart */}
          <div id="vitals-chart" className="card p-6 scroll-mt-20">
            <VitalsChart />
          </div>

          {/* Quick Actions - Replaced with more useful healthcare information cards */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Medical Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Insurance Claims Card */}
              <Link to="/client/reports-claims" state={{ activeTab: "claims" }}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="card relative overflow-hidden bg-gradient-to-br from-blue-400 to-sky-500 p-6 h-full"
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full translate-y-8 -translate-x-8"></div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white drop-shadow-md">
                        Insurance Claims
                      </h3>
                      <p className="text-blue-100 text-sm mt-1 mb-4">
                        2 pending claims
                      </p>

                      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">🧾</span>
                          <div>
                            <p className="text-white font-medium">
                              Claim #CLM-85142
                            </p>
                            <p className="text-blue-100 text-xs">
                              $420.50 • Pending Review
                            </p>
                          </div>
                        </div>
                      </div>

                      <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm backdrop-blur-sm transition-colors flex items-center">
                        <span>View or File a Claim</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Medical Bills Card */}
              <Link to="/client/reports-claims" state={{ activeTab: "bills" }}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="card relative overflow-hidden bg-gradient-to-br from-rose-400 to-red-500 p-6 h-full"
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full translate-y-8 -translate-x-8"></div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white drop-shadow-md">
                        Medical Bills
                      </h3>
                      <p className="text-rose-100 text-sm mt-1 mb-4">
                        1 bill due this week
                      </p>

                      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">💳</span>
                          <div>
                            <p className="text-white font-medium">
                              City Hospital
                            </p>
                            <p className="text-rose-100 text-xs">
                              $125.00 • Due Apr 20
                            </p>
                          </div>
                        </div>
                      </div>

                      <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm backdrop-blur-sm transition-colors flex items-center">
                        <span>Manage Bills</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Prescriptions Card */}
              <Link
                to="/client/reports-claims"
                state={{ activeTab: "prescriptions", scrollToTop: true }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="card relative overflow-hidden bg-gradient-to-br from-emerald-400 to-teal-500 p-6 h-full"
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full translate-y-8 -translate-x-8"></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white drop-shadow-md">
                        Prescriptions
                      </h3>
                      <p className="text-emerald-100 text-sm mt-1 mb-4">
                        3 active medications
                      </p>
                      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">💊</span>
                          <div>
                            <p className="text-white font-medium">
                              Amoxicillin
                            </p>
                            <p className="text-emerald-100 text-xs">
                              500mg • Once daily
                            </p>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm backdrop-blur-sm transition-colors flex items-center">
                        <span>View All Medications</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Medical Reports Card */}
              <Link
                to="/client/reports-claims"
                state={{ activeTab: "reports" }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="card relative overflow-hidden bg-gradient-to-br from-violet-400 to-purple-500 p-6 h-full"
                >
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full translate-y-8 -translate-x-8"></div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-white drop-shadow-md">
                        Medical Reports
                      </h3>
                      <p className="text-purple-100 text-sm mt-1 mb-4">
                        2 new test results available
                      </p>
                      <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">📄</span>
                          <div>
                            <p className="text-white font-medium">Blood Test</p>
                            <p className="text-purple-100 text-xs">
                              Complete CBC • Apr 12
                            </p>
                          </div>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm backdrop-blur-sm transition-colors flex items-center">
                        <span>View All Reports</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
