import React, { useState, useEffect } from "react";
import AppointmentCalendar from "../components/AppointmentCalendar";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner"; // Assuming you have a loading spinner

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        // Use the API endpoint. The proxy in vite.config.js handles the base URL.
        const response = await fetch("/api/data/appointments");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Assuming the API returns an object with an 'appointments' array
        setAppointments(data.appointments || data); // Adjust based on actual API response structure
      } catch (e) {
        console.error("Failed to fetch appointments:", e);
        setError("Failed to load appointments. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading regardless of outcome
      }
    };

    fetchAppointments();
  }, []); // Empty dependency array means this runs once on mount

  const handleBooking = (date, time) => {
    // TODO: Implement API call to POST new appointment
    console.log("Booking requested for:", date, time);
    // For now, we won't update the local state directly.
    // The list should refresh from the backend after a successful booking.
    // Or, optimistically update UI and revert on error.

    // Example optimistic update (can be removed if backend handles refresh):
    /*
    const newAppointment = {
      id: `temp-${Date.now()}`, // Temporary ID
      date: date.toISOString().split("T")[0],
      time: time,
      status: "pending", // Indicate it's being processed
      patientId: 1, // This should come from actual user context
      notes: "New appointment booking...",
      location: "Pending assignment",
    };
    setAppointments((prevAppointments) => [
      ...prevAppointments,
      newAppointment,
    ]);
    */
    alert("Booking functionality needs backend integration.");
  };

  if (isLoading) {
    return <LoadingSpinner />; // Show spinner while loading
  }

  if (error) {
    return <div className="p-6 text-red-600">{error}</div>; // Show error message
  }

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
