import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { FaInfoCircle, FaFileContract, FaShieldAlt } from "react-icons/fa";
import logo from "../../public/favicon.svg"; // Import the logo

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const sliderRef = useRef();
  const [sliderPosition, setSliderPosition] = useState(0);
  const sliderMax = 220; // width of container (256px) - handle (36px)

  useEffect(() => {
    setIsLoaded(true);
    gsap.fromTo(
      ".hero-video",
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.out" }
    );
  }, []);

  // Modal component for displaying additional information
  const InfoModal = ({ title, content, onClose }) => (
    <motion.div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 border border-emerald-500/30 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-white-400 hover:text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6 text-gray-300">{content}</div>
      </motion.div>
    </motion.div>
  );

  const aboutUsContent = (
    <div className="space-y-4">
      <p>
        MediElite was founded in 2023 with a vision to transform healthcare
        delivery through technology. Our mission is to create a seamless
        healthcare experience that puts patients first and connects them with
        the best healthcare providers.
      </p>

      <h3 className="text-xl font-bold text-white mt-6">Our Goals</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Simplify appointment scheduling and reduce wait times</li>
        <li>Improve patient access to medical records and test results</li>
        <li>Streamline prescription management and medication reminders</li>
        <li>Facilitate easy insurance claims processing and tracking</li>
        <li>
          Enable secure communication between patients and healthcare providers
        </li>
        <li>Promote preventive care through health tracking and monitoring</li>
      </ul>

      <h3 className="text-xl font-bold text-white mt-6">Use Cases We Solve</h3>
      <div className="space-y-3">
        <div>
          <h4 className="font-bold text-emerald-400">
            Simplified Appointment Booking
          </h4>
          <p>
            Find available doctors and book appointments with just a few clicks,
            eliminating phone calls and paperwork.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-emerald-400">
            Unified Medical Records
          </h4>
          <p>
            Access all your medical history, test results, and reports in one
            secure place.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-emerald-400">
            Insurance Claims Management
          </h4>
          <p>
            Submit and track insurance claims digitally, reducing errors and
            processing time.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-emerald-400">
            Prescription Management
          </h4>
          <p>
            Receive digital prescriptions, request refills, and get medication
            reminders.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-emerald-400">Health Monitoring</h4>
          <p>
            Track vital signs and health metrics to stay proactive about your
            wellness.
          </p>
        </div>
      </div>
    </div>
  );

  const termsContent = (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">1. Terms of Use</h3>
      <p>
        By accessing and using the MediElite platform, you agree to be bound by
        these Terms and Conditions. If you do not agree with any part of these
        terms, you may not access or use our services.
      </p>

      <h3 className="text-xl font-bold text-white">2. User Accounts</h3>
      <p>
        Users are responsible for maintaining the confidentiality of their
        account information and password. You are responsible for all activities
        that occur under your account.
      </p>

      <h3 className="text-xl font-bold text-white">
        3. Healthcare Information
      </h3>
      <p>
        MediElite provides access to healthcare information and services but
        does not provide medical advice. The platform should not be used for
        emergency medical situations. Always consult with qualified healthcare
        professionals for medical advice.
      </p>

      <h3 className="text-xl font-bold text-white">4. Intellectual Property</h3>
      <p>
        All content on MediElite, including text, graphics, logos, and software,
        is the property of MediElite or its content suppliers and is protected
        by copyright and intellectual property laws.
      </p>

      <h3 className="text-xl font-bold text-white">
        5. Limitation of Liability
      </h3>
      <p>
        MediElite and its affiliates shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages arising from
        your use of the platform or services.
      </p>
    </div>
  );

  const privacyContent = (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">Information We Collect</h3>
      <p>
        We collect personal information, including name, contact details, and
        health information necessary to provide our services. This information
        is collected with your consent and used solely for the purposes stated
        in this policy.
      </p>

      <h3 className="text-xl font-bold text-white">
        How We Use Your Information
      </h3>
      <p>
        Your information is used to provide and improve our services,
        communicate with you, and comply with legal obligations. We implement
        appropriate security measures to protect your data.
      </p>

      <h3 className="text-xl font-bold text-white">Data Protection</h3>
      <p>
        We comply with applicable data protection laws and regulations,
        including HIPAA for health information. Your personal health information
        is encrypted and stored securely.
      </p>

      <h3 className="text-xl font-bold text-white">Your Rights</h3>
      <p>
        You have the right to access, correct, or delete your personal
        information. You can also withdraw consent for data processing at any
        time by contacting our privacy team.
      </p>

      <h3 className="text-xl font-bold text-white">Third-Party Services</h3>
      <p>
        We may use third-party services for certain functions. These services
        have their own privacy policies, and we ensure they provide adequate
        protection for your data.
      </p>
    </div>
  );

  return (
    <div
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #134E4A 0%, #059669 40%, #10B981 100%)",
      }}
    >
      {/* Background Overlays for depth and premium look */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/70 via-transparent to-emerald-900/40"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400 to-teal-500 opacity-20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-400 to-green-500 opacity-20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Top-left Logo and Text */}
      <div className="absolute top-8 left-8 z-10 flex items-center space-x-4">
        <img
          src={logo}
          alt="MediElite Logo"
          className="w-12 h-12 drop-shadow-lg"
        />
        <div>
          <h1 className="text-2xl font-bold text-white drop-shadow-md">
            MediElite
          </h1>
          <p className="text-sm text-emerald-200">Revolutionizing Healthcare</p>
        </div>
      </div>

      {/* Hero Content */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-screen text-center px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-xl">
          Welcome to MediElite
        </h1>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          {/* iPhone-style Slide to Start */}
          <div
            ref={sliderRef}
            className="relative w-64 h-12 bg-black/40 rounded-full overflow-hidden select-none shadow-xl border border-white/10"
            style={{ userSelect: "none" }}
          >
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold z-10 pointer-events-none drop-shadow-lg">
              Slide to Start
            </span>
            {/* Animated thin arrow */}
            <span className="absolute left-10 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <svg
                width="32"
                height="16"
                viewBox="0 0 32 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <rect
                    x="0"
                    y="7"
                    width="24"
                    height="2"
                    rx="1"
                    fill="#fff"
                    opacity="0.7"
                  >
                    <animate
                      attributeName="x"
                      values="0;8;0"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <polygon points="24,4 32,8 24,12" fill="#fff" opacity="0.9">
                    <animate
                      attributeName="points"
                      values="24,4 32,8 24,12;28,4 32,8 28,12;24,4 32,8 24,12"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </polygon>
                </g>
              </svg>
            </span>
            {/* Slider handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0 w-9 h-9 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full shadow-lg cursor-pointer z-20 flex items-center justify-center border-2 border-white/30"
              style={{
                transform: `translateY(-50%) translateX(${sliderPosition}px)`,
              }}
              onMouseDown={(e) => {
                const sliderRect = sliderRef.current.getBoundingClientRect();
                const handleWidth = 36;
                const onMouseMove = (moveEvent) => {
                  let x = moveEvent.clientX - sliderRect.left - handleWidth / 2;
                  x = Math.max(0, Math.min(x, sliderMax));
                  setSliderPosition(x);
                  if (x >= sliderMax) {
                    setSliderPosition(sliderMax);
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", onMouseUp);
                    setTimeout(() => navigate("/client/dashboard"), 100); // instant navigation
                  }
                };
                const onMouseUp = () => {
                  if (sliderPosition < sliderMax) setSliderPosition(0);
                  document.removeEventListener("mousemove", onMouseMove);
                  document.removeEventListener("mouseup", onMouseUp);
                };
                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
              }}
              onTouchStart={(e) => {
                const sliderRect = sliderRef.current.getBoundingClientRect();
                const handleWidth = 36;
                const onTouchMove = (moveEvent) => {
                  let x =
                    moveEvent.touches[0].clientX -
                    sliderRect.left -
                    handleWidth / 2;
                  x = Math.max(0, Math.min(x, sliderMax));
                  setSliderPosition(x);
                  if (x >= sliderMax) {
                    setSliderPosition(sliderMax);
                    document.removeEventListener("touchmove", onTouchMove);
                    document.removeEventListener("touchend", onTouchEnd);
                    setTimeout(() => navigate("/client/dashboard"), 100);
                  }
                };
                const onTouchEnd = () => {
                  if (sliderPosition < sliderMax) setSliderPosition(0);
                  document.removeEventListener("touchmove", onTouchMove);
                  document.removeEventListener("touchend", onTouchEnd);
                };
                document.addEventListener("touchmove", onTouchMove);
                document.addEventListener("touchend", onTouchEnd);
              }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Semi-transparent Watermark */}
      <div className="absolute right-0 top-1/4 transform -translate-y-1/2 translate-x-1/4 opacity-70 drop-shadow-[0_0_70px_white]">
        <img
          src={logo}
          alt="MediElite Watermark"
          className="w-[500px] h-[500px] rotate-[-15deg]"
          style={{ filter: "drop-shadow(0 0 48px #fff) brightness(2.2)" }}
        />
      </div>

      {/* Footer */}
      <div className="relative z-20 w-full py-8 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Quick Links - Moved to the left */}
            <div className="space-y-3 flex flex-col items-center md:items-start justify-center">
              <h3 className="text-lg font-semibold text-emerald-300">
                Quick Links
              </h3>
              <div className="flex gap-4 items-center justify-center">
                <button
                  onClick={() => setActiveModal("about")}
                  className="quick-link-btn"
                  title="About Us"
                >
                  <FaInfoCircle className="text-2xl" />
                </button>
                <button
                  onClick={() => setActiveModal("terms")}
                  className="quick-link-btn"
                  title="Terms & Conditions"
                >
                  <FaFileContract className="text-2xl" />
                </button>
                <button
                  onClick={() => setActiveModal("privacy")}
                  className="quick-link-btn"
                  title="Privacy Policy"
                >
                  <FaShieldAlt className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Social Media - Centered */}
            <div className="flex justify-center gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-icon"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-icon"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="https://www.x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-icon"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-icon"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-media-icon"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>

            {/* Contact - Right aligned */}
            <div className="space-y-3 flex flex-col items-center md:items-end justify-center">
              <h3 className="text-lg font-semibold text-emerald-300">
                Contact
              </h3>
              <p className="text-emerald-100 text-sm text-center md:text-right">
                2141 Ramalyam Street
                <br />
                Rajahmundry, CA 534350
                <br />
                support@medielite.com
                <br />
                (800) 123-4567
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-emerald-200 text-sm">
              &copy; {new Date().getFullYear()} MediElite. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "about" && (
        <InfoModal
          title="About Us"
          content={aboutUsContent}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "terms" && (
        <InfoModal
          title="Terms and Conditions"
          content={termsContent}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === "privacy" && (
        <InfoModal
          title="Privacy Policy"
          content={privacyContent}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
