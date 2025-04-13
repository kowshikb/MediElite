import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppointments } from "../context/AppointmentContext";
import { format } from "date-fns";
import HealthCard from "../components/HealthCard";
import VitalsChart from "../components/VitalsChart";

const Dashboard = () => {
  const { currentAppointments } = useAppointments();
  const [notifications] = useState([
    {
      id: 2,
      type: "medication",
      message: "Time to take your evening medication",
    },
    { id: 3, type: "report", message: "New test results are available" },
  ]);

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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-4 py-8"
    >
      {/* Welcome Section */}
      <motion.div
        variants={item}
        className="relative overflow-hidden glass-card bg-gradient-to-r from-blue-400 to-blue-500 rounded-3xl p-8 md:p-12 mb-8"
      >
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Welcome Back, Kowshik!
          </h1>
          <p className="text-blue-100 text-lg">
            Here's your health summary for today
          </p>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar - Appointments */}
        <motion.div variants={item} className="lg:w-1/4 space-y-4">
          <div className="sticky top-24">
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
                      Book your first appointment with our experienced doctors.
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
                          {format(new Date(appointment.date), "MMM d, yyyy")} at{" "}
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

          {/* Notifications */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="mr-3 text-3xl">🔔</span> Notifications
            </h2>
            <div className="grid gap-4">
              {notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card hover:scale-[1.02] transition-transform p-6"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">
                      {notification.type === "appointment"
                        ? "👨‍⚕️"
                        : notification.type === "medication"
                        ? "💊"
                        : "📋"}
                    </span>
                    <div>
                      <p className="text-gray-800 font-medium">
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Just now</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="#vitals-chart">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="card bg-gradient-to-br from-green-400 to-green-500 p-8 text-center"
              >
                <span className="text-4xl mb-4 block">📊</span>
                <h3 className="text-xl font-semibold text-white">
                  Track Health
                </h3>
              </motion.div>
            </a>

            <Link to="/client/profile">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="card bg-gradient-to-br from-purple-400 to-purple-500 p-8 text-center"
              >
                <span className="text-4xl mb-4 block">👤</span>
                <h3 className="text-xl font-semibold text-white">
                  View Profile
                </h3>
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
