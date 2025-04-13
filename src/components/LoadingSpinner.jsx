import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "default", text = "Loading..." }) => {
  const sizeClasses = {
    small: "w-16 h-16",
    default: "w-24 h-24",
    large: "w-32 h-32",
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const crossVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Outer Circle */}
        <motion.div
          variants={circleVariants}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 rounded-full border-4 border-blue-200"
        />

        {/* Spinning Circle */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border-t-4 border-blue-500"
        />

        {/* Pulsing Background */}
        <motion.div
          variants={pulseVariants}
          animate="animate"
          className="absolute inset-2 rounded-full bg-blue-50"
        />

        {/* Medical Cross */}
        <motion.div
          variants={crossVariants}
          animate="animate"
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-8 h-8">
            <div
              className="absolute inset-0 bg-blue-500 rounded-md transform rotate-0"
              style={{ width: "25%", left: "37.5%" }}
            />
            <div
              className="absolute inset-0 bg-blue-500 rounded-md transform rotate-90"
              style={{ height: "25%", top: "37.5%" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-gray-600 font-medium"
      >
        {text}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
