import React, { createContext, useState, useContext } from "react";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [currentAppointments, setCurrentAppointments] = useState([]);

  const isDuplicateAppointment = (newAppointment) => {
    return currentAppointments.some(
      (apt) =>
        apt.doctorName === newAppointment.doctorName &&
        apt.date === newAppointment.date &&
        apt.time === newAppointment.time
    );
  };

  const addAppointment = (appointment) => {
    if (isDuplicateAppointment(appointment)) {
      throw new Error(
        "You already have an appointment with this doctor at the selected time."
      );
    }

    setCurrentAppointments((prev) => [
      ...prev,
      {
        ...appointment,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <AppointmentContext.Provider
      value={{ currentAppointments, addAppointment }}
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
