import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationContext } from "../components/AppointmentCalendar";
import ChatBox from "./ChatBox";

const DoctorCard = ({ doctor }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const { addNotification } = useContext(NotificationContext);

  const {
    name,
    specialty,
    subspecialty,
    image,
    rating,
    availability,
    experience,
    qualifications,
    languages,
    schedule,
    specializations,
  } = doctor;

  const handleBookAppointment = () => {
    if (!availability) {
      addNotification(
        "This doctor is currently unavailable for appointments",
        "warning"
      );
      return;
    }
    setShowBookingModal(true);
  };

  const handleMessageDoctor = () => {
    if (!availability) {
      addNotification(
        "This doctor is currently unavailable for chat",
        "warning"
      );
      return;
    }
    setShowChatModal(true);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col"
      >
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-64 object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${name}&size=400&background=0D8ABC&color=fff`;
            }}
          />
          {availability ? (
            <span className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-sm rounded-full shadow-lg">
              Available
            </span>
          ) : (
            <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm rounded-full shadow-lg">
              Unavailable
            </span>
          )}
        </div>

        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <p className="text-blue-600 font-medium">{specialty}</p>
              <p className="text-gray-500 text-sm">{subspecialty}</p>
            </div>
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
              <span className="text-yellow-500 mr-1">⭐</span>
              <span className="text-blue-700 font-medium">{rating}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <span className="mr-2">👨‍⚕️</span>
              <span>{experience} experience</span>
            </div>

            <div className="flex items-center text-gray-600">
              <span className="mr-2">🎓</span>
              <div className="flex flex-wrap gap-1">
                {qualifications.map((qual, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm"
                  >
                    {qual}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <span className="mr-2">🗣️</span>
              <div className="flex flex-wrap gap-1">
                {languages.map((lang, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-gray-600">
              <span className="mr-2">🔬</span>
              <span className="font-medium">Specializations:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-green-50 text-green-700 px-2 py-1 rounded text-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100">
          <div className="flex gap-2">
            <motion.button
              whileHover={availability ? { scale: 1.02 } : {}}
              whileTap={availability ? { scale: 0.98 } : {}}
              onClick={handleBookAppointment}
              className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center transition-colors ${
                availability
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!availability}
              title={
                availability
                  ? "Book an appointment"
                  : "Doctor is currently unavailable"
              }
            >
              <span className={`mr-2 ${!availability ? "opacity-50" : ""}`}>
                📅
              </span>
              Book Appointment
            </motion.button>
            <motion.button
              whileHover={availability ? { scale: 1.02 } : {}}
              whileTap={availability ? { scale: 0.98 } : {}}
              onClick={handleMessageDoctor}
              className={`px-4 py-2 border rounded-lg transition-colors ${
                availability
                  ? "border-gray-300 hover:bg-gray-50"
                  : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              disabled={!availability}
              title={
                availability
                  ? "Chat with doctor"
                  : "Doctor is currently unavailable"
              }
            >
              <span
                role="img"
                aria-label="chat"
                className={availability ? "" : "opacity-50"}
              >
                💬
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Book Appointment with {name}
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <AppointmentBookingForm
                doctor={doctor}
                onClose={() => setShowBookingModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Chat with {name}</h3>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <ChatBox doctorId={doctor.id} doctorName={name} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AppointmentBookingForm = ({ doctor, onClose }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("Regular Checkup");

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
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Please select a future date");
      setDate("");
      return;
    }
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!doctor.availability) {
      alert("This doctor is currently unavailable for appointments");
      return;
    }
    alert(`Appointment booked with ${doctor.name} for ${date} at ${time}`);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Date
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          min={today.toISOString().split("T")[0]}
          max={maxDate.toISOString().split("T")[0]}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Select Time
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
          required
        >
          <option value="">Choose a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>
              {slot.includes(":30")
                ? slot.replace(":30", ":30 ") +
                  (parseInt(slot) < 12 ? "AM" : "PM")
                : slot + ":00 " + (parseInt(slot) < 12 ? "AM" : "PM")}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Appointment Type
          <span className="text-red-500 ml-1">*</span>
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
          required
        >
          <option>Regular Checkup</option>
          <option>Follow-up</option>
          <option>Consultation</option>
          <option>Emergency</option>
        </select>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200"
        >
          Book Appointment
        </button>
      </div>
    </form>
  );
};

export default DoctorCard;
