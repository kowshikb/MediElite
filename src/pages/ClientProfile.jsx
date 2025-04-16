import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showFlyaway, setShowFlyaway] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when the component mounts, especially if scrollToTop state is present
    if (location.state?.scrollToTop) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const shareProfile = () => {
    setShowFlyaway(true);
    setShowShareModal(false);
    setTimeout(() => setShowFlyaway(false), 3000);
  };

  const user = {
    name: "kowshik kumar",
    email: "kowshik.kumar@example.com",
    dob: "1990-05-15",
    gender: "Male",
    phone: "+1 (555) 123-4567",
    address: "123 Health Street, Medical City, MC 12345",
    bloodType: "A+",
    allergies: ["Penicillin", "Peanuts"],
    medications: ["Lisinopril", "Metformin"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    emergencyContact: {
      name: "Subbu kowshik",
      relation: "Spouse",
      phone: "+1 (555) 987-6543",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8 space-y-8"
    >
      {/* Profile Header */}
      <div className="relative overflow-hidden glass-card bg-gradient-to-r from-emerald-700 to-green-400 rounded-3xl p-4 md:p-6">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl shadow-xl ring-2 ring-white/30">
              👤
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white capitalize">
                {user.name}
              </h1>
              <p className="text-blue-100 text-sm md:text-base">
                View and manage your profile
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className={`${
                isEditing
                  ? "bg-white text-blue-600 hover:bg-gray-100"
                  : "bg-white/90 text-blue-600 hover:bg-white"
              } px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg text-sm flex items-center gap-2`}
            >
              <span className="text-lg">✏️</span>
              {isEditing ? "Save Changes" : "Edit Profile"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="bg-white/90 text-blue-600 hover:bg-white px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg text-sm flex items-center gap-2"
            >
              <span className="text-lg">📤</span>
              Share Profile
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/client/support-feedback"
              className="bg-white/90 text-blue-600 hover:bg-white px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:shadow-lg text-sm flex items-center gap-2"
            >
              <span className="text-lg">🧩</span>
              Support & Feedback
            </motion.a>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Flyaway Animation - Centered, no confetti */}
      <AnimatePresence>
        {showFlyaway && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: -50 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center"
          >
            <div className="bg-white px-8 py-4 rounded-xl shadow-xl text-center">
              <p className="text-emerald-700 font-medium text-lg">
                Your profile has been shared!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Profile Modal - Updated X button style */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Share {user.name}'s Profile Summary
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
                  style={{ lineHeight: 1 }}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                {/* Profile Summary Card */}
                <div className="bg-gray-50 p-4 rounded-xl space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">❤️</span>
                    <div>
                      <p className="text-sm text-gray-600">
                        Current Heart Rate
                      </p>
                      <p className="font-medium">72 bpm</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🩸</span>
                    <div>
                      <p className="text-sm text-gray-600">Blood Type</p>
                      <p className="font-medium">{user.bloodType}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <h4 className="font-medium mb-2">Medical Conditions</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.conditions.map((condition) => (
                        <span
                          key={condition}
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm"
                        >
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <h4 className="font-medium mb-2">Current Medications</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.medications.map((med) => (
                        <span
                          key={med}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-sm"
                        >
                          {med}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <h4 className="font-medium mb-2">Allergies</h4>
                    <div className="flex flex-wrap gap-2">
                      {user.allergies.map((allergy) => (
                        <span
                          key={allergy}
                          className="px-2 py-1 bg-red-50 text-red-700 rounded-lg text-sm"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={shareProfile}
                    className="px-4 py-2 bg-white text-emerald-600 rounded-lg border border-emerald-200 flex items-center gap-2"
                  >
                    <span>Share Profile</span>
                    <span className="text-lg">📤</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Content */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">👤</span>
              Personal Information
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={user.name}
                  disabled={!isEditing}
                  className="input-field bg-white"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user.email}
                  disabled={!isEditing}
                  className="input-field bg-white"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue={user.phone}
                  disabled={!isEditing}
                  className="input-field bg-white"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  defaultValue={user.address}
                  disabled={!isEditing}
                  rows={2}
                  className="input-field bg-white"
                />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">⚡</span>
              Emergency Contact
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Name
                </label>
                <input
                  type="text"
                  defaultValue={user.emergencyContact.name}
                  disabled={!isEditing}
                  className="input-field bg-white"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  defaultValue={user.emergencyContact.relation}
                  disabled={!isEditing}
                  className="input-field bg-white"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  defaultValue={user.emergencyContact.phone}
                  disabled={!isEditing}
                  className="input-field bg-white"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Medical Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">🏥</span>
              Medical Information
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">🩸</span>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Blood Type
                    </p>
                    <p className="text-2xl font-semibold text-blue-600">
                      {user.bloodType}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Allergies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {user.allergies.map((allergy) => (
                      <span
                        key={allergy}
                        className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium inline-flex items-center"
                      >
                        <span className="mr-1">⚠️</span>
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">💊</span>
                  Current Medications
                </h3>
                <div className="grid gap-3">
                  {user.medications.map((medication) => (
                    <div
                      key={medication}
                      className="flex items-center p-3 bg-blue-50 rounded-xl"
                    >
                      <span className="text-xl mr-3">💊</span>
                      <span className="font-medium text-blue-900">
                        {medication}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-3">📋</span>
                  Medical Conditions
                </h3>
                <div className="grid gap-3">
                  {user.conditions.map((condition) => (
                    <div
                      key={condition}
                      className="flex items-center p-3 bg-blue-50 rounded-xl"
                    >
                      <span className="text-xl mr-3">🏥</span>
                      <span className="font-medium text-blue-900">
                        {condition}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ClientProfile;
