import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HealthCard from "../components/HealthCard";
import VitalsChart from "../components/VitalsChart";

const Dashboard = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: "appointment",
      message: "Upcoming appointment with Dr. Johnson tomorrow at 10:00 AM",
    },
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
      className="max-w-7xl mx-auto px-4 py-6"
    >
      {/* Welcome Section */}
      <motion.div
        variants={item}
        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 mb-6 text-white"
      >
        <h1 className="text-3xl font-bold mb-2">Welcome Back, John!</h1>
        <p className="text-blue-100">Here's your health summary for today</p>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={item} className="mb-6">
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">🔔</span> Notifications
          </h2>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                whileHover={{ scale: 1.02 }}
                className="p-3 rounded-lg bg-blue-50 border border-blue-100"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">
                    {notification.type === "appointment"
                      ? "👨‍⚕️"
                      : notification.type === "medication"
                      ? "💊"
                      : "📋"}
                  </span>
                  <p className="text-gray-700">{notification.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Cards Grid */}
        <motion.div
          variants={item}
          className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          <HealthCard type="heartRate" />
          <HealthCard type="bloodPressure" />
          <HealthCard type="oxygenLevel" />
          <HealthCard type="glucose" />
        </motion.div>

        {/* Vitals Chart */}
        <motion.div variants={item} className="lg:col-span-2">
          <VitalsChart />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={item}
          className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Link to="/client/find-doctor">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-500 text-white rounded-xl p-6 text-center hover:bg-blue-600 transition-colors"
            >
              <span className="text-3xl mb-2 block">👨‍⚕️</span>
              <h3 className="text-lg font-semibold">Find Doctor</h3>
            </motion.div>
          </Link>

          <Link to="/client/health-tracker">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white rounded-xl p-6 text-center hover:bg-green-600 transition-colors"
            >
              <span className="text-3xl mb-2 block">📊</span>
              <h3 className="text-lg font-semibold">Track Health</h3>
            </motion.div>
          </Link>

          <Link to="/client/profile">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-500 text-white rounded-xl p-6 text-center hover:bg-purple-600 transition-colors"
            >
              <span className="text-3xl mb-2 block">👤</span>
              <h3 className="text-lg font-semibold">View Profile</h3>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
