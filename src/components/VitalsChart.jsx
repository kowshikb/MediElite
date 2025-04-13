import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import { motion } from "framer-motion";

const VitalsChart = () => {
  const [selectedMetric, setSelectedMetric] = useState("temperature");

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

  const data = {
    heartRate: [
      { date: "Apr 13", value: 72 },
      { date: "Apr 12", value: 75 },
      { date: "Apr 11", value: 71 },
      { date: "Apr 10", value: 73 },
      { date: "Apr 9", value: 74 },
      { date: "Apr 8", value: 72 },
      { date: "Apr 7", value: 73 },
    ],
    bloodPressure: [
      { date: "Apr 13", value: 120 },
      { date: "Apr 12", value: 122 },
      { date: "Apr 11", value: 118 },
      { date: "Apr 10", value: 121 },
      { date: "Apr 9", value: 119 },
      { date: "Apr 8", value: 120 },
      { date: "Apr 7", value: 121 },
    ],
    temperature: [
      { date: "Apr 13", value: 98.6 },
      { date: "Apr 12", value: 98.6 },
      { date: "Apr 11", value: 98.6 },
      { date: "Apr 10", value: 98.6 },
      { date: "Apr 9", value: 98.6 },
      { date: "Apr 8", value: 98.6 },
      { date: "Apr 7", value: 98.6 },
    ],
    oxygenLevel: [
      { date: "Apr 13", value: 98 },
      { date: "Apr 12", value: 97 },
      { date: "Apr 11", value: 99 },
      { date: "Apr 10", value: 98 },
      { date: "Apr 9", value: 98 },
      { date: "Apr 8", value: 97 },
      { date: "Apr 7", value: 98 },
    ],
    glucose: [
      { date: "Apr 13", value: 95 },
      { date: "Apr 12", value: 92 },
      { date: "Apr 11", value: 94 },
      { date: "Apr 10", value: 93 },
      { date: "Apr 9", value: 96 },
      { date: "Apr 8", value: 95 },
      { date: "Apr 7", value: 94 },
    ],
  };

  const chartColors = {
    heartRate: "#EF4444",
    bloodPressure: "#3B82F6",
    temperature: "#10B981",
    oxygenLevel: "#6366F1",
    glucose: "#8B5CF6",
  };

  const gradientColors = {
    heartRate: ["#FEE2E2", "#FFF1F2"],
    bloodPressure: ["#DBEAFE", "#F0F9FF"],
    temperature: ["#D1FAE5", "#ECFDF5"],
    oxygenLevel: ["#E0E7FF", "#EEF2FF"],
    glucose: ["#F3E8FF", "#FAF5FF"],
  };

  const cardStyles = {
    heartRate: "hover:shadow-red-500/10",
    bloodPressure: "hover:shadow-blue-500/10",
    temperature: "hover:shadow-green-500/10",
    oxygenLevel: "hover:shadow-indigo-500/10",
    glucose: "hover:shadow-purple-500/10",
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
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          Vitals Overview
        </h2>
        <p className="text-gray-500 text-sm">
          Track your health metrics over time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {metrics.map((metric) => (
          <motion.button
            key={metric.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedMetric(metric.id)}
            className={`${
              metric.bg
            } rounded-lg py-1.5 px-2.5 transition-all duration-200 text-left border
              ${
                selectedMetric === metric.id
                  ? `border-${metric.color}-400 bg-${metric.color}-50/70 shadow-sm`
                  : "border-transparent hover:border-gray-200 hover:bg-gray-50/80"
              }`}
          >
            <div className="flex items-center">
              <span className="text-base mr-1.5">{metric.icon}</span>
              <span className="font-medium text-gray-700 text-sm">
                {metric.name}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
        style={{
          background: `linear-gradient(to bottom, white, ${gradientColors[selectedMetric][0]}15, ${gradientColors[selectedMetric][1]}10)`,
        }}
      >
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data[selectedMetric]}
              margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
            >
              <defs>
                <linearGradient
                  id={`gradient-${selectedMetric}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={chartColors[selectedMetric]}
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartColors[selectedMetric]}
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                stroke="#94A3B8"
                tickLine={false}
                axisLine={false}
                dy={10}
                tick={{ fill: "#64748B", fontSize: 12 }}
              />
              <YAxis
                stroke="#94A3B8"
                tickLine={false}
                axisLine={false}
                domain={["auto", "auto"]}
                dx={-10}
                tick={{ fill: "#64748B", fontSize: 12 }}
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
                fill={`url(#gradient-${selectedMetric})`}
                fillOpacity={1}
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
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        className="bg-gray-50 rounded-xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-gray-600 text-sm mb-2">Latest Reading</p>
        <div
          className="text-4xl font-semibold"
          style={{ color: chartColors[selectedMetric] }}
        >
          {latestReadings[selectedMetric]}
        </div>
      </motion.div>
    </div>
  );
};

export default VitalsChart;
