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

  // Modern gradient color variants
  const colorVariants = {
    red: "from-rose-400 to-red-500",
    blue: "from-sky-400 to-blue-600",
    green: "from-emerald-400 to-green-600",
    purple: "from-violet-400 to-purple-600",
    gray: "from-slate-400 to-gray-600",
  };

  // Icon background colors
  const iconBgColors = {
    red: "bg-red-50",
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
    gray: "bg-gray-50",
  };

  // Status styling with refined colors
  const statusColors = {
    excellent: "text-emerald-500 bg-emerald-50 border-emerald-200",
    normal: "text-sky-500 bg-sky-50 border-sky-200",
    warning: "text-amber-500 bg-amber-50 border-amber-200",
    critical: "text-rose-500 bg-rose-50 border-rose-200",
    unknown: "text-slate-500 bg-slate-50 border-slate-200",
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
      className="card relative overflow-hidden"
    >
      {/* Enhanced Background Gradient with better opacity */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          colorVariants[data.color]
        } opacity-5`}
      />

      {/* Decorative Corner Element */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${
          colorVariants[data.color]
        } opacity-20 rounded-full -translate-y-10 translate-x-10`}
      ></div>

      {/* Content */}
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className={`${iconBgColors[data.color]} p-3 rounded-xl mr-3`}>
              <span className="text-2xl block">{data.icon}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {data.title}
              </h3>
              <p className="text-xs text-gray-500">Last updated: Today</p>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
              statusColors[data.status]
            }`}
          >
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </motion.div>
        </div>

        <div className="mt-6">
          <div className="flex items-baseline">
            <span
              className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                colorVariants[data.color]
              }`}
            >
              {data.value}
            </span>
            <span className="ml-2 text-gray-500 font-medium">{data.unit}</span>
          </div>

          <div className="mt-2 flex items-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`inline-flex items-center font-medium text-sm px-2 py-1 rounded-md ${
                parseFloat(data.change) > 0
                  ? "text-emerald-600 bg-emerald-50"
                  : "text-rose-600 bg-rose-50"
              }`}
            >
              {parseFloat(data.change) > 0 ? "↑" : "↓"}
              {Math.abs(parseFloat(data.change))}
            </motion.span>
            <span className="text-gray-500 text-sm ml-2 font-medium">
              from last reading
            </span>
          </div>
        </div>

        {/* Enhanced Chart Preview with animation */}
        <div className="mt-5 h-14 w-full overflow-hidden">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 30"
            preserveAspectRatio="none"
          >
            {/* Background grid lines */}
            <line
              x1="0"
              y1="15"
              x2="100"
              y2="15"
              stroke="#f0f0f0"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <line
              x1="0"
              y1="7"
              x2="100"
              y2="7"
              stroke="#f0f0f0"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
            <line
              x1="0"
              y1="22"
              x2="100"
              y2="22"
              stroke="#f0f0f0"
              strokeWidth="1"
              strokeDasharray="2,2"
            />

            {/* Chart line with enhanced animation */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
              d="M0,20 Q10,25 20,15 T40,10 T60,20 T80,5 T100,15"
              fill="none"
              stroke={`var(--${
                data.color.includes("purple")
                  ? "accent"
                  : data.color.includes("green")
                  ? "success"
                  : data.color.includes("red")
                  ? "danger"
                  : "primary"
              }-gradient)`}
              strokeWidth="2.5"
              strokeLinecap="round"
              className="drop-shadow-md"
            />

            {/* Gradient under the line */}
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 2 }}
              d="M0,20 Q10,25 20,15 T40,10 T60,20 T80,5 T100,15 L100,30 L0,30 Z"
              fill={`url(#${data.color}Gradient)`}
            />

            {/* Define gradient for the area under the line */}
            <defs>
              <linearGradient
                id={`${data.color}Gradient`}
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor={
                    data.color === "red"
                      ? "#ef4444"
                      : data.color === "blue"
                      ? "#3b82f6"
                      : data.color === "green"
                      ? "#10b981"
                      : data.color === "purple"
                      ? "#8b5cf6"
                      : "#6b7280"
                  }
                />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default HealthCard;
