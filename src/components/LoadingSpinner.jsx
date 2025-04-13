import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "md", color = "blue" }) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const colors = {
    blue: "border-blue-500",
    green: "border-green-500",
    purple: "border-purple-500",
    white: "border-white",
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} border-4 border-t-transparent rounded-full ${colors[color]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
