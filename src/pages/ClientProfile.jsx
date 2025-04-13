import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import HealthCard from "../components/HealthCard";

const PatientProfile = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    id: "P14869",
    name: "John Doe",
    age: 30,
    gender: "Male",
    contact: {
      email: "john.doe@example.com",
      phone: "123-456-7890",
    },
    medicalHistory: [
      {
        condition: "Hypertension",
        diagnosed: "2018-05-20",
        treatment: "Medication",
      },
      {
        condition: "Allergy",
        diagnosed: "2020-08-15",
        treatment: "Avoidance",
      },
    ],
    insurance: {
      provider: "Health Insurance Co.",
      policyNumber: "HIC123456",
    },
    prescriptions: [
      {
        id: 1,
        medication: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        prescribedDate: "2025-04-01",
        doctor: "Dr. Sarah Johnson",
        status: "Active",
      },
      {
        id: 2,
        medication: "Cetirizine",
        dosage: "10mg",
        frequency: "As needed",
        prescribedDate: "2025-03-15",
        doctor: "Dr. Robert Kim",
        status: "Active",
      },
    ],
    testResults: [
      {
        id: 1,
        testName: "Complete Blood Count",
        date: "2025-04-10",
        doctor: "Dr. Lisa Thompson",
        status: "Completed",
        summary: "All values within normal range",
        details: {
          hemoglobin: "14.2 g/dL",
          whiteBloodCells: "7.5 K/µL",
          platelets: "250 K/µL",
        },
      },
      {
        id: 2,
        testName: "Lipid Panel",
        date: "2025-04-05",
        doctor: "Dr. Sarah Johnson",
        status: "Completed",
        summary: "Slightly elevated LDL cholesterol",
        details: {
          totalCholesterol: "210 mg/dL",
          ldl: "130 mg/dL",
          hdl: "45 mg/dL",
        },
      },
    ],
  });

  const handleBookAppointment = () => {
    navigate("/client/find-doctor");
  };

  const handleMessageDoctor = () => {
    navigate("/client/find-doctor");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-4"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={`https://ui-avatars.com/api/?name=${patient.name}&size=128&background=0D8ABC&color=fff`}
                alt={patient.name}
                className="w-32 h-32 rounded-full shadow-lg border-4 border-white"
              />
              <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-white"></span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {patient.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-blue-400 bg-opacity-50 rounded-full text-sm text-white">
                  Patient ID: {patient.id}
                </span>
                <span className="px-3 py-1 bg-blue-400 bg-opacity-50 rounded-full text-sm text-white">
                  {patient.gender}
                </span>
                <span className="px-3 py-1 bg-blue-400 bg-opacity-50 rounded-full text-sm text-white">
                  {patient.age} years old
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Contact Information
          </h3>
          <div className="space-y-2 text-gray-600">
            <p>📧 {patient.contact.email}</p>
            <p>📱 {patient.contact.phone}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Insurance Details
          </h3>
          <div className="space-y-2 text-gray-600">
            <p>🏥 {patient.insurance.provider}</p>
            <p>🔢 Policy: {patient.insurance.policyNumber}</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button
              onClick={handleBookAppointment}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Book Appointment
            </button>
            <button
              onClick={handleMessageDoctor}
              className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Message Doctor
            </button>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <Tabs>
          <TabList className="flex space-x-4 border-b border-gray-200 mb-6">
            <Tab className="px-4 py-2 text-gray-600 cursor-pointer hover:text-blue-500">
              Medical History
            </Tab>
            <Tab className="px-4 py-2 text-gray-600 cursor-pointer hover:text-blue-500">
              Prescriptions
            </Tab>
            <Tab className="px-4 py-2 text-gray-600 cursor-pointer hover:text-blue-500">
              Test Results
            </Tab>
          </TabList>

          <TabPanel>
            <div className="space-y-4">
              {patient.medicalHistory.map((history, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition"
                >
                  <h4 className="font-semibold text-lg text-gray-800">
                    {history.condition}
                  </h4>
                  <p className="text-gray-600">
                    Diagnosed:{" "}
                    {new Date(history.diagnosed).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600">
                    Treatment: {history.treatment}
                  </p>
                </motion.div>
              ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="space-y-4">
              {patient.prescriptions.map((prescription) => (
                <motion.div
                  key={prescription.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">
                        {prescription.medication}
                      </h4>
                      <p className="text-gray-600">
                        Dosage: {prescription.dosage}
                      </p>
                      <p className="text-gray-600">
                        Frequency: {prescription.frequency}
                      </p>
                      <p className="text-gray-600">
                        Prescribed by: {prescription.doctor}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        prescription.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {prescription.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabPanel>

          <TabPanel>
            <div className="space-y-4">
              {patient.testResults.map((test) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-800">
                        {test.testName}
                      </h4>
                      <p className="text-gray-600">
                        Date: {new Date(test.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-600">Doctor: {test.doctor}</p>
                    </div>
                    <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                      {test.status}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-gray-700 font-medium">
                      Summary: {test.summary}
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {Object.entries(test.details).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-2 rounded">
                          <span className="text-gray-600 text-sm capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </span>
                          <span className="text-gray-900 ml-2">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default PatientProfile;
