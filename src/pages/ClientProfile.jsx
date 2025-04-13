import React, { useState } from "react";
import { motion } from "framer-motion";

const ClientProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

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
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-400 to-blue-500 rounded-3xl p-8 md:p-12">
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl md:text-5xl shadow-xl ring-4 ring-white/30">
              👤
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {user.name}
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(!isEditing)}
            className={`${
              isEditing
                ? "bg-white text-blue-600 hover:bg-gray-100"
                : "bg-white/90 text-blue-600 hover:bg-white"
            } px-6 py-2.5 rounded-xl font-medium transition-all duration-200 hover:shadow-lg`}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </motion.button>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
      </div>

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
