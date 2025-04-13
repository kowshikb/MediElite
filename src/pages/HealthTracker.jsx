import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import VitalsChart from "../components/VitalsChart";

const HealthTracker = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const sleepData = [
    { date: "2025-04-07", hours: 7.5, quality: 85 },
    { date: "2025-04-08", hours: 8, quality: 90 },
    { date: "2025-04-09", hours: 6.5, quality: 75 },
    { date: "2025-04-10", hours: 7, quality: 80 },
    { date: "2025-04-11", hours: 7.8, quality: 88 },
    { date: "2025-04-12", hours: 8.2, quality: 92 },
    { date: "2025-04-13", hours: 7.6, quality: 86 },
  ];

  const exerciseData = [
    { date: "2025-04-07", minutes: 45, calories: 320 },
    { date: "2025-04-08", minutes: 30, calories: 250 },
    { date: "2025-04-09", minutes: 60, calories: 450 },
    { date: "2025-04-10", minutes: 40, calories: 300 },
    { date: "2025-04-11", minutes: 50, calories: 380 },
    { date: "2025-04-12", minutes: 35, calories: 270 },
    { date: "2025-04-13", minutes: 55, calories: 410 },
  ];

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-6"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Health Tracking Dashboard</h1>
        <p className="text-green-100">
          Monitor your daily health metrics and progress
        </p>
      </div>

      {/* Period Selection */}
      <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
        <div className="flex space-x-4">
          {["week", "month", "year"].map((period) => (
            <motion.button
              key={period}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPeriod(period)}
              className={`px-6 py-2 rounded-lg ${
                selectedPeriod === period
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sleep Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <span className="mr-2">😴</span> Sleep Analysis
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sleepData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis />
                <Tooltip labelFormatter={formatDate} />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#8b5cf6"
                  fill="#c4b5fd"
                  name="Hours Slept"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Exercise Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <span className="mr-2">🏃‍♂️</span> Exercise Activity
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={exerciseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip labelFormatter={formatDate} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="minutes"
                  stroke="#2563eb"
                  name="Exercise Minutes"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="calories"
                  stroke="#dc2626"
                  name="Calories Burned"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-blue-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            Weekly Average
          </h3>
          <div className="space-y-2">
            <p className="text-blue-600">Sleep: 7.5 hours/day</p>
            <p className="text-blue-600">Exercise: 45 min/day</p>
            <p className="text-blue-600">Calories: 340 kcal/day</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-green-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            Goals Progress
          </h3>
          <div className="space-y-2">
            <p className="text-green-600">Sleep Goal: 85%</p>
            <p className="text-green-600">Exercise Goal: 92%</p>
            <p className="text-green-600">Steps Goal: 78%</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-purple-50 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-purple-700 mb-2">
            Recommendations
          </h3>
          <div className="space-y-2">
            <p className="text-purple-600">✓ Maintain current sleep schedule</p>
            <p className="text-purple-600">→ Increase water intake</p>
            <p className="text-purple-600">→ Add 10 min to workout</p>
          </div>
        </motion.div>
      </div>

      {/* Vitals Section */}
      <div className="mt-8">
        <VitalsChart />
      </div>
    </motion.div>
  );
};

export default HealthTracker;
