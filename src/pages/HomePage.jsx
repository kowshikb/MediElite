import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

const EnhancedLanding = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    gsap.fromTo(
      ".hero-video",
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Video */}
      <video
        className="hero-video absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/path-to-your-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80 z-10" />

      {/* Hero Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-screen text-center px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
          Welcome to MediElite
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto">
          Revolutionizing healthcare with cutting-edge technology and
          personalized care.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/client/dashboard")}
            className="px-8 py-4 bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold rounded-xl shadow-lg text-lg tracking-wide hover:shadow-emerald-400/40 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-400"
          >
            Get Started
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/client/find-doctor")}
            className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border-2 border-emerald-200/20 hover:bg-white/20 backdrop-blur-md text-lg tracking-wide transition-all focus:outline-none focus:ring-4 focus:ring-emerald-400"
          >
            Find a Doctor
          </motion.button>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400 to-teal-500 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-400 to-green-500 opacity-20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
    </div>
  );
};

export default EnhancedLanding;
