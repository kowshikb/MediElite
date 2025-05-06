import React, { createContext, useState, useContext, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner"; // Assuming LoadingSpinner exists

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [currentAppointments, setCurrentAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/data/appointments");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCurrentAppointments(data.appointments || data); // Adjust based on API response
      } catch (e) {
        console.error("Failed to fetch appointments in context:", e);
        setError("Failed to load appointments.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const isDuplicateAppointment = (newAppointment) => {
    // This check might be better handled by the backend API
    return currentAppointments.some(
      (apt) =>
        apt.doctorName === newAppointment.doctorName &&
        apt.date === newAppointment.date &&
        apt.time === newAppointment.time
    );
  };

  const addAppointment = async (appointment) => {
    // TODO: Implement API POST request to add appointment
    console.log(
      "Attempting to add appointment (API call needed):",
      appointment
    );
    // Example optimistic update (remove if backend handles refresh or use proper state management)
    /*
    if (isDuplicateAppointment(appointment)) {
      throw new Error(
        "You already have an appointment with this doctor at the selected time."
      );
    }
    setCurrentAppointments((prev) => [
      ...prev,
      {
        ...appointment,
        id: `temp-${Date.now()}`, // Use temporary ID until backend confirms
        createdAt: new Date().toISOString(),
        status: 'pending' // Indicate pending state
      },
    ]);
    */
    // After successful POST, refetch appointments or update state based on API response
    alert("Add appointment functionality requires backend integration.");
    // Example refetch:
    // fetchAppointments(); // Call the fetch function again
  };

  // Display loading or error state for the context provider
  if (isLoading) {
    return <LoadingSpinner />; // Or some other loading indicator
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        Error loading appointments: {error}
      </div>
    );
  }

  return (
    <AppointmentContext.Provider
      value={{ currentAppointments, addAppointment, isLoading, error }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error(
      "useAppointments must be used within an AppointmentProvider"
    );
  }
  return context;
};
