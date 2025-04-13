import React from "react";
import { motion } from "framer-motion";
import vitalsData from "../data/vitals.json";

const HealthCard = ({ type }) => {
  const { dailyReadings, normalRanges } = vitalsData.vitals;
  const latestReading = dailyReadings[dailyReadings.length - 1];

  const cardTypes = {
    heartRate: {
      title: "Heart Rate",
      icon: "❤️",
      value: latestReading.heartRate,
      unit: "bpm",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
      range: normalRanges.heartRate,
      trend: calculateTrend("heartRate"),
    },
    bloodPressure: {
      title: "Blood Pressure",
      icon: "🩺",
      value: `${latestReading.bloodPressure.systolic}/${latestReading.bloodPressure.diastolic}`,
      unit: "mmHg",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      range: normalRanges.bloodPressure,
      trend: calculateTrend("bloodPressure", "systolic"),
    },
    oxygenLevel: {
      title: "Oxygen Level",
      icon: "💨",
      value: latestReading.oxygenLevel,
      unit: "%",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      range: normalRanges.oxygenLevel,
      trend: calculateTrend("oxygenLevel"),
    },
    glucose: {
      title: "Blood Glucose",
      icon: "📊",
      value: latestReading.glucose,
      unit: "mg/dL",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      range: normalRanges.glucose,
      trend: calculateTrend("glucose"),
    },
  };

  function calculateTrend(metric, subMetric = null) {
    const last3Days = dailyReadings.slice(-3);
    const values = subMetric
      ? last3Days.map((reading) => reading[metric][subMetric])
      : last3Days.map((reading) => reading[metric]);

    const diff = values[2] - values[1];
    if (Math.abs(diff) < 0.5) return "stable";
    return diff > 0 ? "up" : "down";
  }

  function getStatusColor(type, value) {
    if (type === "bloodPressure") {
      const [systolic, diastolic] = value.split("/").map(Number);
      const isNormal =
        systolic >= normalRanges.bloodPressure.systolic.min &&
        systolic <= normalRanges.bloodPressure.systolic.max &&
        diastolic >= normalRanges.bloodPressure.diastolic.min &&
        diastolic <= normalRanges.bloodPressure.diastolic.max;
      return isNormal ? "green" : "red";
    }

    const numValue = Number(value);
    const range = normalRanges[type];
    return numValue >= range.min && numValue <= range.max ? "green" : "red";
  }

  const card = cardTypes[type];
  const statusColor = getStatusColor(type, card.value);

  const trendIcons = {
    up: "↗️",
    down: "↘️",
    stable: "→",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`rounded-xl shadow-sm p-6 border ${card.bgColor} ${card.borderColor}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-2">{card.icon}</span>
          <div>
            <h3 className={`font-medium ${card.textColor}`}>{card.title}</h3>
            <p
              className={`${
                statusColor === "green" ? "text-green-600" : "text-red-600"
              } text-sm font-medium`}
            >
              {statusColor === "green" ? "Normal" : "Attention needed"}
            </p>
          </div>
        </div>
        <span className="text-xl" title={`Trend: ${card.trend}`}>
          {trendIcons[card.trend]}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline">
          <span className={`text-3xl font-bold ${card.textColor}`}>
            {card.value}
          </span>
          <span className={`ml-1 ${card.textColor} text-sm opacity-75`}>
            {card.unit}
          </span>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Normal range:
          {type === "bloodPressure" ? (
            <span className={`font-medium ${card.textColor}`}>
              {" "}
              {card.range.systolic.min}-{card.range.systolic.max}/
              {card.range.diastolic.min}-{card.range.diastolic.max} {card.unit}
            </span>
          ) : (
            <span className={`font-medium ${card.textColor}`}>
              {" "}
              {card.range.min}-{card.range.max} {card.unit}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HealthCard;
