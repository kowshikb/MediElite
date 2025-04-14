import React, { useState, createContext } from "react";
import Calendar from "react-calendar";
import { motion, AnimatePresence } from "framer-motion";
import "react-calendar/dist/Calendar.css";

export const NotificationContext = createContext();

const AppointmentCalendar = ({ appointments, onBook }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Define available time slots
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedSlot(time);
  };

  const handleBooking = () => {
    if (selectedDate && selectedSlot) {
      onBook(selectedDate, selectedSlot);
    }
  };

  const isTimeSlotBooked = (time) => {
    const dateAppointments = getAppointmentsForDate(selectedDate);
    return dateAppointments.some((apt) => apt.time === time);
  };

  const hasAppointmentOnDate = (date) => {
    return getAppointmentsForDate(date).length > 0;
  };

  return (
    <div className="space-y-6">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        minDate={new Date()}
        tileClassName={({ date }) =>
          hasAppointmentOnDate(date) ? "has-appointment" : ""
        }
      />

      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Available Time Slots
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {timeSlots.map((time) => (
              <motion.button
                key={time}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTimeSelect(time)}
                disabled={isTimeSlotBooked(time)}
                className={`relative p-3 text-sm font-medium rounded-xl transition-all duration-300
                  ${
                    isTimeSlotBooked(time)
                      ? "cursor-not-allowed"
                      : selectedSlot === time
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }
                `}
              >
                {time}
                {isTimeSlotBooked(time) && (
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
            ))}
          </div>

          {selectedSlot && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-emerald-50 rounded-xl"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">📅</span>
                <div>
                  <p className="font-medium text-emerald-900">
                    Selected Appointment Time
                  </p>
                  <p className="text-emerald-700">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    at{" "}
                    {selectedSlot.includes(":30")
                      ? selectedSlot.replace(":30", ":30 ")
                      : selectedSlot + " "}
                    {parseInt(selectedSlot) < 12 ? "AM" : "PM"}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBooking}
                  className="btn-primary"
                >
                  Book Appointment
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
