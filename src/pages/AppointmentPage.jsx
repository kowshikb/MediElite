import React, { useState, useEffect } from "react";
import AppointmentCalendar from "../components/AppointmentCalendar";
import { motion } from "framer-motion";
import appointmentsData from "../data/appointments.json";

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(appointmentsData.appointments);
  }, []);

  const handleBooking = (date, time) => {
    const newAppointment = {
      id: appointments.length + 1,
      date: date.toISOString().split("T")[0],
      time: time,
      status: "upcoming",
      patientId: 1, // This should come from actual user context
      notes: "New appointment",
      location: "To be assigned",
    };

    setAppointments((prevAppointments) => [
      ...prevAppointments,
      newAppointment,
    ]);
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Book an Appointment
        </h1>
        <AppointmentCalendar
          appointments={appointments}
          onBook={handleBooking}
        />
      </motion.div>
    </div>
  );
};

export default AppointmentPage;
