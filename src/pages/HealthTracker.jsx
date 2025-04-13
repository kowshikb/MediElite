import React from "react";
import VitalsChart from "../components/VitalsChart";

const HealthTracker = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Main Content */}
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden glass-card bg-gradient-to-r from-blue-400 to-blue-500 rounded-3xl p-8 md:p-12">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Health Tracker
            </h1>
            <p className="text-blue-100 text-lg">
              Monitor your vital signs and health metrics
            </p>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        </div>

        {/* Vitals Chart */}
        <div className="card p-6">
          <VitalsChart />
        </div>
      </div>
    </div>
  );
};

export default HealthTracker;
