import React, { useState, createContext } from "react";
import Calendar from "react-calendar";
import { motion, AnimatePresence } from "framer-motion";
import "react-calendar/dist/Calendar.css";

export const NotificationContext = createContext();

const AppointmentCalendar = ({ appointments, onSelectSlot }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  const getAppointmentsForDate = (date) => {
    return appointments.filter(
      (apt) => new Date(apt.date).toDateString() === date.toDateString()
    );
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowTimeSlots(true);
    setSelectedSlot(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedSlot(time);
    onSelectSlot(selectedDate, time);
  };

  const isSlotBooked = (time) => {
    const dateAppointments = getAppointmentsForDate(selectedDate);
    return dateAppointments.some((apt) => apt.time === time);
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const hasAppointments = getAppointmentsForDate(date).length > 0;
      return hasAppointments ? (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
        </div>
      ) : null;
    }
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const isSelected = selectedDate?.toDateString() === date.toDateString();
      return `relative h-14 ${isSelected ? "bg-blue-50 text-blue-600" : ""}`;
    }
  };

  const today = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() + 1);

  const tileDisabled = ({ date }) => {
    return date < today;
  };

  return (
    <div className="space-y-6">
      {/* Calendar Section */}
      <div className="card overflow-hidden">
        <Calendar
          onChange={handleDateSelect}
          value={selectedDate}
          tileContent={tileContent}
          tileClassName={tileClassName}
          minDate={today}
          maxDate={maxDate}
          tileDisabled={tileDisabled}
          className="border-0 p-4"
        />
      </div>

      {/* Time Slots Section */}
      <AnimatePresence>
        {showTimeSlots && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Available Time Slots for{" "}
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => {
                const isBooked = isSlotBooked(time);
                const isSelected = selectedSlot === time;

                return (
                  <motion.button
                    key={time}
                    whileHover={!isBooked ? { scale: 1.05 } : {}}
                    whileTap={!isBooked ? { scale: 0.95 } : {}}
                    onClick={() => !isBooked && handleTimeSelect(time)}
                    className={`relative p-4 rounded-xl text-center transition-all ${
                      isBooked
                        ? "bg-gray-100 cursor-not-allowed"
                        : isSelected
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                        : "bg-white hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
                    }`}
                    disabled={isBooked}
                  >
                    <span className="text-sm font-medium">
                      {time.includes(":30")
                        ? time.replace(":30", ":30 ") +
                          (parseInt(time) < 12 ? "AM" : "PM")
                        : time + " " + (parseInt(time) < 12 ? "AM" : "PM")}
                    </span>
                    {isBooked && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gray-500/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
                      >
                        <span className="text-xs font-medium text-gray-600">
                          Booked
                        </span>
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {selectedSlot && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-blue-50 rounded-xl"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-medium text-blue-900">
                      Selected Appointment Time
                    </p>
                    <p className="text-blue-700">
                      {selectedDate.toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      at{" "}
                      {selectedSlot.includes(":30")
                        ? selectedSlot.replace(":30", ":30 ") +
                          (parseInt(selectedSlot) < 12 ? "AM" : "PM")
                        : selectedSlot +
                          " " +
                          (parseInt(selectedSlot) < 12 ? "AM" : "PM")}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppointmentCalendar;
