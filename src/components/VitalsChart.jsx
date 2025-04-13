import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import vitalsData from "../data/vitals.json";

const VitalsChart = () => {
  const [selectedMetric, setSelectedMetric] = useState("heartRate");
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const { dailyReadings, monthlyReadings, yearlyReadings, normalRanges } =
    vitalsData.vitals;

  const metrics = {
    heartRate: {
      label: "Heart Rate",
      color: "#ef4444",
      backgroundColor: "#fef2f2",
      textColor: "#991b1b",
      unit: "bpm",
      icon: "❤️",
    },
    bloodPressure: {
      label: "Blood Pressure",
      color: "#3b82f6",
      backgroundColor: "#eff6ff",
      textColor: "#1e40af",
      unit: "mmHg",
      icon: "🩺",
    },
    temperature: {
      label: "Temperature",
      color: "#f59e0b",
      backgroundColor: "#fffbeb",
      textColor: "#92400e",
      unit: "°F",
      icon: "🌡️",
    },
    oxygenLevel: {
      label: "Oxygen Level",
      color: "#10b981",
      backgroundColor: "#ecfdf5",
      textColor: "#065f46",
      unit: "%",
      icon: "💨",
    },
    glucose: {
      label: "Glucose",
      color: "#8b5cf6",
      backgroundColor: "#f5f3ff",
      textColor: "#5b21b6",
      unit: "mg/dL",
      icon: "📊",
    },
  };

  const getReadingsForPeriod = () => {
    switch (selectedPeriod) {
      case "week":
        return dailyReadings;
      case "month":
        return monthlyReadings;
      case "year":
        return yearlyReadings;
      default:
        return dailyReadings;
    }
  };

  const formatDate = (dateStr) => {
    switch (selectedPeriod) {
      case "week":
        return new Date(dateStr).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      case "month":
        // For monthly data, format like "Jan 2025"
        const [year, month] = dateStr.split("-");
        const date = new Date(year, parseInt(month) - 1);
        return date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      case "year":
        // For yearly data, just show the year
        return dateStr;
      default:
        return dateStr;
    }
  };

  const isInNormalRange = (value, metric) => {
    if (metric === "bloodPressure") {
      return true; // Handle blood pressure separately
    }
    const range = normalRanges[metric];
    return value >= range.min && value <= range.max;
  };

  const renderBloodPressureChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={getReadingsForPeriod()}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tickFormatter={formatDate} />
        <YAxis />
        <Tooltip
          labelFormatter={formatDate}
          formatter={(value, name) => [
            value,
            name === "systolic" ? "Systolic" : "Diastolic",
          ]}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="bloodPressure.systolic"
          name="Systolic"
          stroke="#3b82f6"
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="bloodPressure.diastolic"
          name="Diastolic"
          stroke="#60a5fa"
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderMetricChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={getReadingsForPeriod()}>
        <defs>
          <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={metrics[selectedMetric].color}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={metrics[selectedMetric].color}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="date" tickFormatter={formatDate} />
        <YAxis />
        <Tooltip
          labelFormatter={formatDate}
          formatter={(value) => [
            `${value} ${metrics[selectedMetric].unit}`,
            metrics[selectedMetric].label,
          ]}
        />
        <Area
          type="monotone"
          dataKey={selectedMetric}
          stroke={metrics[selectedMetric].color}
          fill="url(#colorMetric)"
          dot={{ r: 4 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Vitals Overview</h2>
        <p className="text-gray-600">Track your health metrics over time</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
        {Object.entries(metrics).map(
          ([key, { label, icon, backgroundColor, textColor }]) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMetric(key)}
              style={{ backgroundColor }}
              className={`p-4 rounded-lg text-left transition-colors ${
                selectedMetric === key ? "ring-2 ring-offset-2" : ""
              }`}
            >
              <span className="text-2xl mb-2 block">{icon}</span>
              <span
                className="text-sm font-medium block"
                style={{ color: textColor }}
              >
                {label}
              </span>
            </motion.button>
          )
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        {selectedMetric === "bloodPressure"
          ? renderBloodPressureChart()
          : renderMetricChart()}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dailyReadings.slice(-1).map((reading) => (
          <React.Fragment key={reading.date}>
            {selectedMetric === "bloodPressure" ? (
              <>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-700 mb-1">Systolic</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {reading.bloodPressure.systolic}
                    <span className="text-sm font-normal ml-1">mmHg</span>
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-700 mb-1">Diastolic</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {reading.bloodPressure.diastolic}
                    <span className="text-sm font-normal ml-1">mmHg</span>
                  </p>
                </div>
              </>
            ) : (
              <div
                className={`${
                  isInNormalRange(reading[selectedMetric], selectedMetric)
                    ? "bg-green-50"
                    : "bg-red-50"
                } rounded-lg p-4 col-span-2`}
              >
                <p
                  className={`text-sm ${
                    isInNormalRange(reading[selectedMetric], selectedMetric)
                      ? "text-green-700"
                      : "text-red-700"
                  } mb-1`}
                >
                  Latest Reading
                </p>
                <p
                  className={`text-2xl font-bold ${
                    isInNormalRange(reading[selectedMetric], selectedMetric)
                      ? "text-green-900"
                      : "text-red-900"
                  }`}
                >
                  {reading[selectedMetric]}
                  <span className="text-sm font-normal ml-1">
                    {metrics[selectedMetric].unit}
                  </span>
                </p>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
};

export default VitalsChart;
