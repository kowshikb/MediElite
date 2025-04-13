import React, { useState, useEffect } from "react";
import AppointmentCalendar from "../components/AppointmentCalendar";
import { motion } from "framer-motion";
import doctorsData from "../data/doctors.json";
import appointmentsData from "../data/appointments.json";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [availability, setAvailability] = useState(true);

  useEffect(() => {
    // Load appointments from mock data
    setAppointments(appointmentsData.appointments);
  }, []);

  const toggleAvailability = () => {
    setAvailability(!availability);
  };

  const handleNewAppointment = (date, time) => {
    // Handle new appointment creation
    const newAppointment = {
      id: appointments.length + 1,
      date: date.toISOString().split("T")[0],
      time: time,
      status: "upcoming",
      // Add other required fields
    };

    setAppointments([...appointments, newAppointment]);
  };

  const resetFilters = () => {
    // Reset any filters or state variables related to filtering in the doctor view
    // Example: setFilterState("");
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Doctor Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleAvailability}
          className={`px-4 py-2 rounded-lg text-white transition-colors ${
            availability
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {availability
            ? "Available for Appointments"
            : "Currently Unavailable"}
        </motion.button>
      </div>

      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AppointmentCalendar
            appointments={appointments}
            onBook={handleNewAppointment}
          />
        </motion.div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
