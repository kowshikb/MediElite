import React from "react";
import { motion } from "framer-motion";
const HealthCard = ({ type }) => {
  const getCardData = () => {
    switch (type) {
      case "heartRate":
        return {
          title: "Heart Rate",
          value: "72",
          unit: "bpm",
          icon: "❤️",
          color: "red",
          change: "+2",
          status: "normal",
        };
      case "bloodPressure":
        return {
          title: "Blood Pressure",
          value: "120/80",
          unit: "mmHg",
          icon: "🩺",
          color: "blue",
          change: "-5",
          status: "normal",
        };
      case "oxygenLevel":
        return {
          title: "Oxygen Level",
          value: "98",
          unit: "%",
          icon: "🫁",
          color: "green",
          change: "+1",
          status: "excellent",
        };
      case "glucose":
        return {
          title: "Blood Glucose",
          value: "95",
          unit: "mg/dL",
          icon: "🩸",
          color: "purple",
          change: "-3",
          status: "normal",
        };
      default:
        return {
          title: "Unknown",
          value: "0",
          unit: "",
          icon: "📊",
          color: "gray",
          change: "0",
          status: "unknown",
        };
    }
  };

  const data = getCardData();
  const colorVariants = {
    red: "from-red-500 to-red-600",
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    gray: "from-gray-500 to-gray-600",
  };

  const statusColors = {
    excellent: "text-green-500",
    normal: "text-blue-500",
    warning: "text-yellow-500",
    critical: "text-red-500",
    unknown: "text-gray-500",
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="card relative overflow-hidden"
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          colorVariants[data.color]
        } opacity-10`}
      />

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-3xl mb-2 block">{data.icon}</span>
            <h3 className="text-lg font-semibold text-gray-900">
              {data.title}
            </h3>
          </div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              statusColors[data.status]
            } bg-${data.color}-50`}
          >
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </motion.div>
        </div>

        <div className="mt-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">
              {data.value}
            </span>
            <span className="ml-2 text-gray-600">{data.unit}</span>
          </div>

          <div className="mt-2 flex items-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center text-sm ${
                parseFloat(data.change) > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {parseFloat(data.change) > 0 ? "↑" : "↓"}
              {Math.abs(parseFloat(data.change))}
            </motion.span>
            <span className="text-gray-500 text-sm ml-2">
              from last reading
            </span>
          </div>
        </div>

        {/* Chart Preview (placeholder) */}
        <div className="mt-4 h-12 w-full overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d="M0,10 Q25,5 50,10 T100,10"
              fill="none"
              stroke={`var(--${data.color}-500)`}
              strokeWidth="2"
              className={`stroke-${data.color}-500`}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default HealthCard;
