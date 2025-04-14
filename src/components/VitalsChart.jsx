import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { format, subDays } from "date-fns";

const VitalsChart = () => {
  const [selectedMetric, setSelectedMetric] = useState("temperature");
  const [dynamicData, setDynamicData] = useState({});

  const metrics = [
    {
      id: "heartRate",
      name: "Heart Rate",
      icon: "❤️",
      color: "red",
      bg: "bg-red-50",
    },
    {
      id: "bloodPressure",
      name: "Blood Pressure",
      icon: "🩺",
      color: "blue",
      bg: "bg-blue-50",
    },
    {
      id: "temperature",
      name: "Temperature",
      icon: "🌡️",
      color: "green",
      bg: "bg-green-50",
    },
    {
      id: "oxygenLevel",
      name: "Oxygen Level",
      icon: "🫁",
      color: "indigo",
      bg: "bg-indigo-50",
    },
    {
      id: "glucose",
      name: "Glucose",
      icon: "📊",
      color: "purple",
      bg: "bg-purple-50",
    },
  ];

  // Static data template with sample values
  const staticData = {
    heartRate: [79, 74, 70, 73, 74, 69, 73],
    bloodPressure: [110, 122, 118, 121, 119, 120, 121],
    temperature: [98.6, 95.6, 98.6, 98.6, 98.6, 98.6, 102.6],
    oxygenLevel: [98, 97, 94, 98, 98, 97, 98],
    glucose: [95, 92, 94, 93, 96, 95, 94],
  };

  useEffect(() => {
    // Generate data with dynamic dates when component mounts
    generateDynamicData();
  }, []);

  // Function to generate data with current dates
  const generateDynamicData = () => {
    const today = new Date();
    const dynamicDataObj = {};

    metrics.forEach((metric) => {
      const metricData = [];

      // Generate data for the last 7 days (current day and 6 previous days)
      for (let i = 6; i >= 0; i--) {
        const date = subDays(today, i);
        const formattedDate = format(date, "MMM d");

        metricData.push({
          date: formattedDate,
          value: staticData[metric.id][6 - i], // Use the sample values from the static data
        });
      }

      dynamicDataObj[metric.id] = metricData;
    });

    setDynamicData(dynamicDataObj);
  };

  // Updated chart colors to use emerald/green palette
  const chartColors = {
    heartRate: "#EF4444",
    bloodPressure: "#10B981", // Changed from blue to emerald
    temperature: "#047857", // Darker emerald
    oxygenLevel: "#34D399", // Light emerald
    glucose: "#059669", // Medium emerald
  };

  const gradientColors = {
    heartRate: ["#FEE2E2", "#FFF1F2"],
    bloodPressure: ["#D1FAE5", "#ECFDF5"], // Changed to emerald gradients
    temperature: ["#ECFDF5", "#D1FAE5"],
    oxygenLevel: ["#A7F3D0", "#ECFDF5"],
    glucose: ["#D1FAE5", "#A7F3D0"],
  };

  const cardStyles = {
    heartRate: "hover:shadow-red-500/10",
    bloodPressure: "hover:shadow-emerald-500/10", // Changed from blue to emerald
    temperature: "hover:shadow-emerald-600/10",
    oxygenLevel: "hover:shadow-emerald-400/10",
    glucose: "hover:shadow-emerald-500/10",
  };

  const latestReadings = {
    heartRate: "72 bpm",
    bloodPressure: "120/80 mmHg",
    temperature: "98.6 °F",
    oxygenLevel: "98 %",
    glucose: "95 mg/dL",
  };

  return (
    <div className="space-y-6">
      {/* Header with Latest Reading side by side */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Vitals Overview
          </h2>
          <p className="text-gray-500 text-sm">
            Track your health metrics over time
          </p>
        </div>

        <motion.div
          className="bg-gray-50 rounded-xl p-4 mt-3 md:mt-0 flex flex-col justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-600 text-sm mb-1">Latest Reading</p>
          <div
            className="text-3xl font-semibold"
            style={{ color: chartColors[selectedMetric] }}
          >
            {latestReadings[selectedMetric]}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {metrics.map((metric) => (
          <motion.button
            key={metric.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedMetric(metric.id)}
            className={`rounded-lg py-2 px-3 transition-all duration-200 text-left border
            ${
              selectedMetric === metric.id
                ? "border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                : "border-gray-200 bg-white hover:bg-gray-50/80 text-gray-700 hover:text-emerald-600"
            }`}
          >
            <div className="flex items-center">
              <span className="text-base mr-1.5">{metric.icon}</span>
              <span className="font-medium text-sm">{metric.name}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div className="h-[400px]">
          {Object.keys(dynamicData).length > 0 && (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={dynamicData[selectedMetric]}
                margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={chartColors[selectedMetric]}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={chartColors[selectedMetric]}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "none",
                    borderRadius: "12px",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    padding: "12px",
                  }}
                  labelStyle={{
                    color: "#1F2937",
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                  itemStyle={{ color: chartColors[selectedMetric] }}
                  cursor={{ stroke: "#E2E8F0", strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="none"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartColors[selectedMetric]}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: "white",
                    stroke: chartColors[selectedMetric],
                    strokeWidth: 2,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VitalsChart;
