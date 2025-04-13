import React, { useState, useContext } from "react";
import Calendar from "react-calendar";
import { motion, AnimatePresence } from "framer-motion";
import "react-calendar/dist/Calendar.css";

export const NotificationContext = React.createContext(null);

const AppointmentCalendar = ({ appointments = [], onBook }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null);
  const notification = useContext(NotificationContext);

  // Set min date to today and max date to 3 months from now
  const minDate = new Date();
  minDate.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const timeSlots = [
    { time: "09:00", label: "9:00 AM" },
    { time: "09:30", label: "9:30 AM" },
    { time: "10:00", label: "10:00 AM" },
    { time: "10:30", label: "10:30 AM" },
    { time: "11:00", label: "11:00 AM" },
    { time: "11:30", label: "11:30 AM" },
    { time: "14:00", label: "2:00 PM" },
    { time: "14:30", label: "2:30 PM" },
    { time: "15:00", label: "3:00 PM" },
    { time: "15:30", label: "3:30 PM" },
    { time: "16:00", label: "4:00 PM" },
    { time: "16:30", label: "4:30 PM" },
  ];

  // Function to check if a time slot is in the past
  const isTimeSlotPast = (time) => {
    if (selectedDate.toDateString() !== new Date().toDateString()) return false;
    const [hours, minutes] = time.split(":").map(Number);
    const currentDate = new Date();
    return (
      currentDate.getHours() > hours ||
      (currentDate.getHours() === hours && currentDate.getMinutes() > minutes)
    );
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return appointments.filter((apt) => apt.date === dateStr);
  };

  const tileContent = ({ date }) => {
    const dateAppointments = getAppointmentsForDate(date);
    if (dateAppointments.length > 0) {
      return (
        <div className="absolute bottom-1 left-0 right-0">
          <div className="flex justify-center gap-1">
            {dateAppointments.map((apt, index) => (
              <div
                key={index}
                className="h-2 w-2 bg-blue-500 rounded-full"
                title={`${apt.time} - ${apt.doctorName || apt.patientName}`}
              />
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const tileClassName = ({ date }) => {
    const dateStr = date.toISOString().split("T")[0];
    const hasAppointments = appointments.some((apt) => apt.date === dateStr);
    const isHovered = hoveredDate?.toDateString() === date.toDateString();
    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

    return `relative cursor-pointer transition-all duration-200 text-lg font-medium ${
      hasAppointments
        ? "has-appointments bg-blue-50 hover:bg-blue-100"
        : isPast
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "hover:bg-blue-50"
    } ${isHovered ? "ring-2 ring-blue-500" : ""} ${
      date.toDateString() === selectedDate?.toDateString()
        ? "bg-blue-500 text-white hover:bg-blue-600"
        : ""
    }`;
  };

  const tileDisabled = ({ date }) => {
    return date < minDate;
  };

  const handleDateMouseEnter = (date) => {
    setHoveredDate(date);
  };

  const handleDateMouseLeave = () => {
    setHoveredDate(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowAppointmentDetails(true);
  };

  const handleReschedule = (appointment) => {
    notification.addNotification(
      `Rescheduling appointment with ${
        appointment.doctorName || appointment.patientName
      }`,
      "appointment"
    );
    // Handle reschedule logic
  };

  const handleCancel = (appointment) => {
    notification.addNotification(
      `Cancelled appointment with ${
        appointment.doctorName || appointment.patientName
      }`,
      "appointment"
    );
    // Handle cancel logic
  };

  const handleNewAppointment = (time) => {
    notification.addNotification(
      `Booked new appointment for ${selectedDate.toLocaleDateString()} at ${time}`,
      "appointment"
    );
    if (onBook) {
      onBook(selectedDate, time);
    }
    // Handle new appointment logic
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center">
          <span className="mr-3">📅</span> Schedule Appointment
        </h2>
        <p className="text-gray-600 mt-2">
          Select a date and time for your appointment
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileContent={tileContent}
            tileClassName={tileClassName}
            minDate={minDate}
            maxDate={maxDate}
            onMouseOver={({ date }) => setHoveredDate(date)}
            onMouseOut={() => setHoveredDate(null)}
            className="rounded-lg border-none shadow-sm"
          />
        </div>

        <AnimatePresence>
          {showAppointmentDetails && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="time-slots-container bg-gray-50 p-6 rounded-xl"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Available Times for {selectedDate.toLocaleDateString()}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map(({ time, label }) => {
                  const isPast = isTimeSlotPast(time);
                  const isBooked = getAppointmentsForDate(selectedDate).some(
                    (apt) => apt.time === time
                  );
                  return (
                    <motion.button
                      key={time}
                      whileHover={!isPast && !isBooked ? { scale: 1.02 } : {}}
                      whileTap={!isPast && !isBooked ? { scale: 0.98 } : {}}
                      onClick={() =>
                        !isPast && !isBooked && handleNewAppointment(time)
                      }
                      className={`p-3 rounded-lg transition-all ${
                        isPast
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : isBooked
                          ? "bg-blue-100 text-blue-600 cursor-not-allowed"
                          : "bg-white hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md"
                      }`}
                      disabled={isPast || isBooked}
                    >
                      {label}
                      {isBooked && (
                        <span className="block text-sm text-blue-500">
                          Booked
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .calendar-wrapper .react-calendar {
          width: 100%;
          border: none;
          padding: 2rem;
          font-family: system-ui, -apple-system, sans-serif;
          background: #ffffff;
          border-radius: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .calendar-wrapper .react-calendar__tile {
          padding: 1.5em;
          position: relative;
          font-size: 1rem;
          height: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.25rem;
        }
        .calendar-wrapper .react-calendar__month-view__days__day {
          font-weight: 500;
          aspect-ratio: 1;
        }
        .calendar-wrapper .react-calendar__month-view__weekdays {
          text-transform: uppercase;
          font-weight: 600;
          font-size: 0.9rem;
          color: #4b5563;
          padding: 0.5rem 0;
          margin-bottom: 0.5rem;
        }
        .calendar-wrapper .react-calendar__navigation {
          height: 3rem;
          margin-bottom: 1rem;
        }
        .calendar-wrapper .react-calendar__navigation button {
          font-size: 1.5rem;
          color: #1f2937;
          font-weight: 600;
          padding: 0.5rem;
          background: none;
          border-radius: 0.5rem;
        }
        .calendar-wrapper .react-calendar__tile:enabled:hover,
        .calendar-wrapper .react-calendar__tile:enabled:focus {
          background-color: #eff6ff;
          color: #2563eb;
        }
        .calendar-wrapper .react-calendar__tile--now {
          background-color: #f3f4f6;
          color: #2563eb;
        }
        .calendar-wrapper .react-calendar__tile--active {
          background-color: #2563eb !important;
          color: white;
        }
        .calendar-wrapper .has-appointments {
          font-weight: 600;
        }
      `}</style>
    </motion.div>
  );
};

export default AppointmentCalendar;
